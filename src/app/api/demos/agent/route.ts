import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai";

export const maxDuration = 60;

const N8N_WEBHOOK_URL = "https://n8n.srv708090.hstgr.cloud/webhook/chat";

export async function POST(req: Request) {
  const { messages, sessionId }: { messages: UIMessage[]; sessionId: string } =
    await req.json();

  const lastUserMessage = messages.filter((m) => m.role === "user").pop();

  const chatInput =
    lastUserMessage?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || "";

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      execute: async ({ writer }) => {
        const textId = crypto.randomUUID();

        try {
          const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chatInput,
              sessionId: sessionId || crypto.randomUUID(),
            }),
          });

          if (!response.ok) {
            writer.write({ type: "text-start", id: textId });
            writer.write({
              type: "text-delta",
              id: textId,
              delta:
                "Sorry, I'm having trouble connecting right now. Please try again later.",
            });
            writer.write({ type: "text-end", id: textId });
            return;
          }

          const contentType = response.headers.get("content-type") || "";
          const isStreaming = contentType.includes("text/event-stream");
          const isNdjson = contentType.includes("application/x-ndjson");

          writer.write({ type: "text-start", id: textId });

          if (isStreaming || isNdjson) {
            // Handle true streaming responses (SSE or NDJSON)
            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });

              if (isStreaming) {
                // Parse SSE format: lines starting with "data: "
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  const trimmed = line.trim();
                  if (trimmed.startsWith("data: ")) {
                    const data = trimmed.slice(6);
                    if (data && data !== "[DONE]") {
                      writer.write({
                        type: "text-delta",
                        id: textId,
                        delta: data,
                      });
                    }
                  }
                }
              } else {
                // Parse JSONL format: one JSON object per line
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  if (line.trim()) {
                    try {
                      const parsed = JSON.parse(line);
                      const text =
                        parsed.token ||
                        parsed.text ||
                        parsed.output ||
                        parsed.data ||
                        "";
                      if (text) {
                        writer.write({
                          type: "text-delta",
                          id: textId,
                          delta: text,
                        });
                      }
                    } catch {
                      writer.write({
                        type: "text-delta",
                        id: textId,
                        delta: line,
                      });
                    }
                  }
                }
              }
            }

            // Flush remaining buffer
            if (buffer.trim()) {
              writer.write({
                type: "text-delta",
                id: textId,
                delta: buffer,
              });
            }
          } else {
            // Non-streaming response — read full body then simulate typewriter
            const rawText = await response.text();

            let output = rawText;
            try {
              const data = JSON.parse(rawText);
              output =
                data.output || data.text || data.message || rawText;
            } catch {
              // Not JSON — use the raw text directly
            }

            // Stream word-by-word for a typewriter effect
            const words = output.split(/(\s+)/);
            for (const word of words) {
              writer.write({
                type: "text-delta",
                id: textId,
                delta: word,
              });
              // Small delay between chunks for natural feel
              if (word.trim()) {
                await new Promise((r) => setTimeout(r, 30));
              }
            }
          }

          writer.write({ type: "text-end", id: textId });
        } catch (error) {
          console.error("n8n webhook error:", error);
          writer.write({ type: "text-start", id: textId });
          writer.write({
            type: "text-delta",
            id: textId,
            delta: "Something went wrong. Please try again.",
          });
          writer.write({ type: "text-end", id: textId });
        }
      },
    }),
  });
}

export const maxDuration = 30;

const N8N_WEBHOOK_URL =
  "https://n8n.srv708090.hstgr.cloud/webhook/46fdc4e7-9939-473d-9ef2-0f3e97a33920";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioBlob = formData.get("audio") as Blob;

  if (!audioBlob) {
    return Response.json({ error: "No audio provided" }, { status: 400 });
  }

  // Forward the audio to n8n webhook
  const n8nForm = new FormData();
  n8nForm.append(
    "file",
    new File([audioBlob], "audio.webm", { type: "audio/webm" })
  );

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    body: n8nForm,
  });

  if (!response.ok) {
    console.error("n8n voice webhook error:", response.status);
    return Response.json(
      { error: "Failed to process audio" },
      { status: 500 }
    );
  }

  const contentType = response.headers.get("content-type") || "";

  // n8n returns audio directly — forward the binary to the client
  if (contentType.includes("audio/")) {
    const audioBuffer = await response.arrayBuffer();
    return new Response(audioBuffer, {
      headers: { "Content-Type": contentType },
    });
  }

  // n8n returns JSON — normalise and forward
  if (contentType.includes("application/json")) {
    const data = await response.json();
    return Response.json({
      userText: data.userText || data.transcription || null,
      aiResponse:
        data.aiResponse || data.output || data.text || data.message || null,
      audioBase64: data.audioBase64 || data.audio || null,
      audioUrl: data.audioUrl || null,
    });
  }

  // Fallback: treat as binary audio (some webhooks omit content-type)
  const audioBuffer = await response.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString("base64");
  return Response.json({ userText: null, aiResponse: null, audioBase64 });
}

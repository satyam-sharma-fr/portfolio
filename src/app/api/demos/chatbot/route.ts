import { streamText, UIMessage, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a friendly AI customer support chatbot for "TechStore", an online electronics retailer. You help customers with:
- Product recommendations and comparisons
- Order tracking and status updates
- Returns and refund policies
- Technical specifications
- Shipping information

Keep responses concise (2-3 sentences max). Be helpful, warm, and professional.
If asked about a specific order, make up a realistic response.
You're a demo on a portfolio site showcasing AI chatbot capabilities.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Limit conversation length to prevent abuse
  const recentMessages = messages.slice(-10);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(recentMessages),
    maxOutputTokens: 200,
  });

  return result.toUIMessageStreamResponse();
}

import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Satyam's AI assistant on his portfolio website. You help visitors learn about Satyam and his work. You can:

1. Answer questions about Satyam's skills, experience, and services
2. Help visitors book a call with Satyam
3. Provide information about Satyam's availability
4. Share details about past projects and case studies

About Satyam:
- AI Automation Engineer specializing in chatbots, voice agents, and workflow automation
- Expert in OpenAI, LangChain, n8n, Make, Zapier, Pinecone, and more
- Has helped businesses reduce support tickets by 70%, save 40+ hours monthly
- Builds RAG-powered chatbots, AI voice receptionists, lead gen systems, and data extraction tools
- Available for freelance projects and consulting

Keep responses concise and helpful. Use tools when appropriate.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const recentMessages = messages.slice(-12);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(recentMessages),
    maxOutputTokens: 300,
    stopWhen: stepCountIs(3),
    tools: {
      bookCall: tool({
        description:
          "Book a discovery call with Satyam. Use this when the user wants to schedule a meeting, consultation, or call.",
        inputSchema: z.object({
          reason: z
            .string()
            .describe("The reason for booking the call"),
        }),
        execute: async ({ reason }) => {
          return {
            success: true,
            message: `Great! Here's the link to book a call with Satyam.`,
            calendlyUrl: "https://calendly.com/satyam",
            reason,
          };
        },
      }),
      getServices: tool({
        description:
          "Get details about Satyam's services. Use when someone asks what Satyam offers or can build.",
        inputSchema: z.object({
          category: z
            .string()
            .optional()
            .describe("Optional service category to filter by"),
        }),
        execute: async () => {
          return {
            services: [
              {
                name: "AI Chatbots",
                description: "RAG-powered chatbots for customer support, sales, and FAQ",
                tech: ["OpenAI", "Pinecone", "LangChain"],
              },
              {
                name: "Voice Agents",
                description: "AI phone agents for appointment booking and call handling",
                tech: ["Twilio", "Voiceflow", "Google Calendar"],
              },
              {
                name: "Workflow Automation",
                description: "End-to-end business process automation",
                tech: ["n8n", "Make", "Zapier"],
              },
              {
                name: "AI Agents",
                description: "Autonomous multi-step task execution agents",
                tech: ["LangChain", "OpenAI", "Custom tools"],
              },
              {
                name: "Lead Generation",
                description: "Automated prospect scraping, enrichment, and outreach",
                tech: ["Clay", "Instantly", "OpenAI"],
              },
              {
                name: "Data Extraction",
                description: "AI-powered extraction from websites, PDFs, invoices",
                tech: ["Tavily", "DocumentAI", "Custom parsers"],
              },
            ],
          };
        },
      }),
      getAvailability: tool({
        description:
          "Check Satyam's current availability for new projects.",
        inputSchema: z.object({}),
        execute: async () => {
          return {
            available: true,
            nextSlot: "This week",
            timezone: "IST (UTC+5:30)",
            preferredContact: "Book a call or email",
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}

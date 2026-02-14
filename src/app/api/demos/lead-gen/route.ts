import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { tavily } from "@tavily/core";

export const maxDuration = 30;

function getTavily() {
  return tavily({ apiKey: process.env.TAVILY_API_KEY! });
}

export async function POST(req: Request) {
  const { company } = await req.json();

  if (!company || typeof company !== "string") {
    return Response.json(
      { error: "Please provide a company name" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Research the company using Tavily
    const tvly = getTavily();
    const searchResult = await tvly.search(
      `${company} company overview products services revenue`,
      {
        maxResults: 5,
        searchDepth: "basic",
      }
    );

    const researchContext = searchResult.results
      .map((r) => `${r.title}: ${r.content}`)
      .join("\n\n");

    // Step 2: Generate lead score + personalized email
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      maxOutputTokens: 600,
      prompt: `Based on this research about "${company}", generate a JSON response with:
1. A lead score (0-100) based on how likely they'd benefit from AI automation services
2. A brief company summary (2 sentences)
3. Key insights (3 bullet points about their business)
4. A personalized cold outreach email (short, compelling, mentioning specific ways AI automation could help THEIR business)

Research data:
${researchContext}

Respond ONLY with valid JSON in this exact format:
{
  "score": <number>,
  "summary": "<string>",
  "insights": ["<string>", "<string>", "<string>"],
  "email": {
    "subject": "<string>",
    "body": "<string>"
  }
}`,
    });

    // Parse the JSON response
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const result = JSON.parse(cleaned);

    return Response.json({
      company,
      research: searchResult.results.slice(0, 3).map((r) => ({
        title: r.title,
        url: r.url,
      })),
      ...result,
    });
  } catch (error) {
    console.error("Lead gen error:", error);
    return Response.json(
      { error: "Failed to research company. Please try again." },
      { status: 500 }
    );
  }
}

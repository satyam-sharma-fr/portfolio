import { tavily } from "@tavily/core";

export const maxDuration = 30;

function getTavily() {
  return tavily({ apiKey: process.env.TAVILY_API_KEY! });
}

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return Response.json({ error: "Please provide a URL" }, { status: 400 });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return Response.json({ error: "Invalid URL format" }, { status: 400 });
  }

  try {
    const tvly = getTavily();
    const result = await tvly.extract([url], {
      extractDepth: "basic",
    });

    if (!result.results || result.results.length === 0) {
      return Response.json(
        { error: "Could not extract content from this URL" },
        { status: 400 }
      );
    }

    const extracted = result.results[0];

    return Response.json({
      url: extracted.url,
      content: extracted.rawContent,
      extractedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Extract error:", error);
    return Response.json(
      { error: "Failed to extract content. Please try a different URL." },
      { status: 500 }
    );
  }
}

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export const maxDuration = 60;

/* ------------------------------------------------------------------ */
/*  Input validation                                                   */
/* ------------------------------------------------------------------ */

const EstimateInputSchema = z.object({
  applicationType: z.string().min(1, "Application type is required"),
  applicationTypeOther: z.string().optional(),
  monetization: z.array(z.string()).min(1, "At least one monetization model is required"),
  monetizationOther: z.string().optional(),
  description: z.string().min(1, "Project description is required"),
  platforms: z.array(z.string()).min(1, "At least one platform is required"),
  platformsOther: z.string().optional(),
  integrations: z.array(z.string()),
  integrationsOther: z.string().optional(),
  technicalRequirements: z.array(z.string()),
  technicalRequirementsOther: z.string().optional(),
  additionalDetails: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
});

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = EstimateInputSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    /* ---- Build context string for AI ---- */
    const appType =
      data.applicationType === "Other" && data.applicationTypeOther
        ? `Other: ${data.applicationTypeOther}`
        : data.applicationType;

    const monetization = data.monetization
      .map((m) => (m === "Other" && data.monetizationOther ? `Other: ${data.monetizationOther}` : m))
      .join(", ");

    const platforms = data.platforms
      .map((p) => (p === "Other" && data.platformsOther ? `Other: ${data.platformsOther}` : p))
      .join(", ");

    const integrations =
      data.integrations.length > 0
        ? data.integrations
            .map((i) =>
              i === "Other" && data.integrationsOther ? `Other: ${data.integrationsOther}` : i,
            )
            .join(", ")
        : "None specified";

    const techReqs =
      data.technicalRequirements.length > 0
        ? data.technicalRequirements
            .map((t) =>
              t === "Other" && data.technicalRequirementsOther
                ? `Other: ${data.technicalRequirementsOther}`
                : t,
            )
            .join(", ")
        : "None specified";

    const projectContext = `
Application Type: ${appType}
Monetization Model(s): ${monetization}
Project Description: ${data.description}
Target Platforms: ${platforms}
Third-Party Integrations: ${integrations}
Technical Requirements: ${techReqs}
Additional Details: ${data.additionalDetails || "None"}
`.trim();

    /* ---- Call OpenAI ---- */
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      maxOutputTokens: 1200,
      prompt: `You are an expert software project estimator. Based on the following project requirements, provide a detailed cost and time estimate.

PROJECT REQUIREMENTS:
${projectContext}

Analyze the requirements carefully. Consider:
- The complexity of each feature implied by the app type, monetization model, and description
- Multi-platform development adds significant cost (native iOS/Android vs web)
- Third-party integrations each add development time
- Technical requirements like real-time updates, offline mode, or large data handling add complexity
- Consider typical freelancer/agency rates ($80-200/hr USD)

Respond ONLY with valid JSON in this exact format (no markdown, no code fences):
{
  "timeEstimate": "<range, e.g. '8-12 weeks' or '3-5 months'>",
  "costEstimate": "<range in USD, e.g. '$15,000 - $30,000'>",
  "complexity": "<one of: Simple, Moderate, Complex, Enterprise>",
  "summary": "<2-3 sentence summary of the project scope and what drives the estimate>",
  "features": [
    {
      "feature": "<feature area name>",
      "timeEstimate": "<e.g. '2-3 weeks'>",
      "costEstimate": "<e.g. '$3,000 - $5,000'>"
    }
  ],
  "recommendations": [
    "<actionable recommendation 1>",
    "<actionable recommendation 2>",
    "<actionable recommendation 3>"
  ]
}

Provide 4-8 features in the breakdown. Include 3-5 recommendations. Be realistic and helpful.`,
    });

    /* ---- Parse AI response ---- */
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    const estimate = JSON.parse(cleaned);

    /* ---- Persist to JSON file ---- */
    const submission = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      contact: { name: data.name, email: data.email },
      answers: {
        applicationType: appType,
        monetization,
        description: data.description,
        platforms,
        integrations,
        technicalRequirements: techReqs,
        additionalDetails: data.additionalDetails,
      },
      estimate,
    };

    await persistSubmission(submission);

    return Response.json(estimate);
  } catch (error) {
    console.error("Estimate error:", error);
    return Response.json(
      { error: "Failed to generate estimate. Please try again." },
      { status: 500 },
    );
  }
}

/* ------------------------------------------------------------------ */
/*  JSON file persistence                                              */
/* ------------------------------------------------------------------ */

async function persistSubmission(submission: Record<string, unknown>) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "estimates.json");

  try {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    // Read existing data or start with empty array
    let entries: Record<string, unknown>[] = [];
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      entries = JSON.parse(raw);
    } catch {
      // File doesn't exist yet — that's fine
    }

    entries.push(submission);

    await fs.writeFile(filePath, JSON.stringify(entries, null, 2), "utf-8");
  } catch (err) {
    // Non-fatal — log but don't fail the request
    console.error("Failed to persist estimate submission:", err);
  }
}

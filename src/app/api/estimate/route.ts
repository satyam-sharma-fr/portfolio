import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

export const maxDuration = 60;

/* ------------------------------------------------------------------ */
/*  Input validation                                                   */
/* ------------------------------------------------------------------ */

const EstimateInputSchema = z.object({
  projectType: z.string().min(1, "Project type is required"),
  description: z.string().min(1, "Project description is required"),
  platforms: z.array(z.string()).min(1, "At least one platform is required"),
  features: z.array(z.string()),
  timeline: z.string().min(1, "Timeline preference is required"),
  budget: z.string().min(1, "Budget range is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
});

/* ------------------------------------------------------------------ */
/*  Output schema for structured AI response                           */
/* ------------------------------------------------------------------ */

const EstimateOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      "2-3 sentence summary of the project scope and what drives the estimate"
    ),
  timeEstimate: z
    .string()
    .describe("Time range estimate, e.g. '8-12 weeks' or '3-5 months'"),
  costEstimate: z
    .string()
    .describe("Cost range in USD, e.g. '$15,000 - $30,000'"),
  complexity: z
    .enum(["Simple", "Moderate", "Complex", "Enterprise"])
    .describe("Overall project complexity level"),
  features: z
    .array(
      z.object({
        feature: z.string().describe("Feature area name"),
        timeEstimate: z
          .string()
          .describe("Time estimate for this feature, e.g. '2-3 weeks'"),
        costEstimate: z
          .string()
          .describe("Cost estimate for this feature, e.g. '$3,000 - $5,000'"),
      })
    )
    .describe("Breakdown of 4-8 major feature areas with individual estimates"),
  recommendations: z
    .array(z.string())
    .describe("3-5 actionable recommendations for the client"),
});

/* ------------------------------------------------------------------ */
/*  Label mappings (IDs → human-readable)                              */
/* ------------------------------------------------------------------ */

const PROJECT_TYPE_LABELS: Record<string, string> = {
  saas: "SaaS Platform",
  mobile: "Mobile App",
  webapp: "Web Application",
  ecommerce: "E-Commerce / Marketplace",
  ai: "AI / ML Solution",
  internal: "Internal Tool",
  api: "API / Backend Service",
  other: "Other / Custom",
};

const FEATURE_LABELS: Record<string, string> = {
  auth: "User Authentication & Authorization",
  payments: "Payment Processing (e.g. Stripe)",
  realtime: "Real-time Updates (WebSockets)",
  ai: "AI / ML Integration",
  api: "Third-party API Integrations",
  admin: "Admin Dashboard",
  analytics: "Analytics & Reporting",
  storage: "File Upload & Storage",
  email: "Email & Push Notifications",
  search: "Search Functionality",
  maps: "Maps & Location Services",
  chat: "Chat & Messaging",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP (less than 1 month)",
  "1-3": "1-3 months",
  "3-6": "3-6 months",
  "6+": "6+ months",
  unsure: "Not sure yet",
};

const BUDGET_LABELS: Record<string, string> = {
  "<5k": "Under $5,000",
  "5-15k": "$5,000 - $15,000",
  "15-50k": "$15,000 - $50,000",
  "50-100k": "$50,000 - $100,000",
  "100k+": "$100,000+",
  unsure: "Not sure yet",
};

/* ------------------------------------------------------------------ */
/*  POST handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = EstimateInputSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    /* ---- Resolve labels ---- */
    const projectType =
      PROJECT_TYPE_LABELS[data.projectType] || data.projectType;
    const platforms = data.platforms.join(", ");
    const features =
      data.features.length > 0
        ? data.features
            .map((f) => FEATURE_LABELS[f] || f)
            .join(", ")
        : "None specified";
    const timeline = TIMELINE_LABELS[data.timeline] || data.timeline;
    const budget = BUDGET_LABELS[data.budget] || data.budget;

    /* ---- Call OpenAI with structured output ---- */
    const { output } = await generateText({
      model: openai("gpt-4o-mini"),
      output: Output.object({
        schema: EstimateOutputSchema,
      }),
      prompt: `You are an expert software project estimator working for a professional AI automation and full-stack development consultancy. Analyze the following project requirements and provide a detailed, realistic cost and time estimate.

PROJECT REQUIREMENTS:
- Project Type: ${projectType}
- Description: ${data.description}
- Target Platforms: ${platforms}
- Required Features: ${features}
- Desired Timeline: ${timeline}
- Budget Range: ${budget}${data.company ? `\n- Company: ${data.company}` : ""}

ESTIMATION GUIDELINES:
- Consider the complexity of each feature implied by the project type and description
- Multi-platform development (iOS + Android + Web) significantly increases cost and timeline
- Each third-party integration adds 1-3 weeks of development time
- Technical features like real-time updates, AI integration, and offline mode add complexity
- Use typical senior developer / agency rates ($100-180/hr USD)
- Factor in project management, QA testing, deployment, and DevOps time (~20-30% overhead)
- Be realistic and honest — clients prefer truthful estimates over lowballs
- If the stated budget range seems insufficient for the described project, note this clearly in recommendations
- If the timeline seems too aggressive, recommend a phased approach
- Provide 4-8 features in the breakdown covering all major development areas
- Include 3-5 actionable recommendations that demonstrate deep expertise
- For the cost estimate, always provide a range (e.g. "$15,000 - $25,000")
- For the time estimate, always provide a range (e.g. "8-12 weeks")`,
    });

    if (!output) {
      throw new Error("Failed to generate structured estimate output");
    }

    /* ---- Persist submission to JSON file ---- */
    const submission = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      contact: {
        name: data.name,
        email: data.email,
        company: data.company || null,
      },
      answers: {
        projectType,
        description: data.description,
        platforms,
        features,
        timeline,
        budget,
      },
      estimate: output,
    };

    await persistSubmission(submission);

    return Response.json(output);
  } catch (error) {
    console.error("Estimate error:", error);
    return Response.json(
      { error: "Failed to generate estimate. Please try again." },
      { status: 500 }
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
    await fs.mkdir(dataDir, { recursive: true });

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

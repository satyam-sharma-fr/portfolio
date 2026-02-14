import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an AI voice receptionist for a medical clinic called "HealthFirst Clinic". You handle:
- Appointment booking and rescheduling
- General inquiries about services and hours
- Routing urgent calls to the right department

Keep responses very brief (1-2 sentences) since this is a voice conversation.
Be warm, professional, and efficient. Always confirm key details.
This is a demo on a portfolio site showcasing AI voice agent capabilities.`;

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioBlob = formData.get("audio") as Blob;

  if (!audioBlob) {
    return Response.json({ error: "No audio provided" }, { status: 400 });
  }

  // Step 1: Transcribe audio with Whisper via fetch
  const transcriptionForm = new FormData();
  transcriptionForm.append(
    "file",
    new File([audioBlob], "audio.webm", { type: "audio/webm" })
  );
  transcriptionForm.append("model", "whisper-1");

  const transcriptionRes = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: transcriptionForm,
    }
  );

  if (!transcriptionRes.ok) {
    return Response.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }

  const { text: userText } = await transcriptionRes.json();

  if (!userText || userText.trim().length === 0) {
    return Response.json(
      { error: "Could not transcribe audio" },
      { status: 400 }
    );
  }

  // Step 2: Get AI response
  const messagesRaw = formData.get("messages");
  const previousMessages = messagesRaw
    ? JSON.parse(messagesRaw as string)
    : [];

  const conversationMessages = [
    ...previousMessages,
    { role: "user" as const, content: userText },
  ];

  const { text: aiResponse } = await generateText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: conversationMessages,
    maxOutputTokens: 150,
  });

  // Step 3: Generate speech from AI response via fetch
  const ttsRes = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      voice: "nova",
      input: aiResponse,
      response_format: "mp3",
    }),
  });

  if (!ttsRes.ok) {
    // Return text response even if TTS fails
    return Response.json({ userText, aiResponse, audioBase64: null });
  }

  const audioBuffer = await ttsRes.arrayBuffer();
  const audioBase64 = Buffer.from(audioBuffer).toString("base64");

  return Response.json({
    userText,
    aiResponse,
    audioBase64,
    audioFormat: "mp3",
  });
}

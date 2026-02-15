export const maxDuration = 30;

const SYSTEM_INSTRUCTIONS = `You are an AI voice receptionist for a medical clinic called "HealthFirst Clinic". You handle:
- Appointment booking and rescheduling
- General inquiries about services and hours
- Routing urgent calls to the right department

Keep responses very brief (1-2 sentences) since this is a voice conversation.
Be warm, professional, and efficient. Always confirm key details.
This is a demo on a portfolio site showcasing AI voice agent capabilities.`;

export async function POST(req: Request) {
  const clientSdp = await req.text();

  if (!clientSdp) {
    return new Response("Missing SDP offer", { status: 400 });
  }

  const sessionConfig = JSON.stringify({
    type: "realtime",
    model: "gpt-4o-mini-realtime-preview",
    audio: { output: { voice: "coral" } },
  });

  const fd = new FormData();
  fd.set("sdp", clientSdp);
  fd.set("session", sessionConfig);

  const response = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: fd,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI Realtime API error:", response.status, errorText);
    return new Response("Failed to create realtime session", { status: 502 });
  }

  const answerSdp = await response.text();

  return new Response(answerSdp, {
    headers: { "Content-Type": "application/sdp" },
  });
}

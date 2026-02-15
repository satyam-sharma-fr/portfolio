"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type ConnectionState = "disconnected" | "connecting" | "connected";
type SpeechState = "idle" | "user-speaking" | "ai-speaking";

interface TranscriptEntry {
  role: "user" | "assistant";
  content: string;
}

export function VoiceAgentDemo() {
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("disconnected");
  const [speechState, setSpeechState] = useState<SpeechState>("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [currentAiText, setCurrentAiText] = useState("");
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const aiTextBufferRef = useRef("");
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Call-duration timer
  useEffect(() => {
    if (connectionState === "connected") {
      timerRef.current = setInterval(
        () => setCallDuration((d) => d + 1),
        1000
      );
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (connectionState === "disconnected") setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [connectionState]);


  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  /* ── data-channel event handler ── */

  const handleDataChannelMessage = useCallback((e: MessageEvent) => {
    try {
      const event = JSON.parse(e.data);

      switch (event.type) {
        case "input_audio_buffer.speech_started":
          setSpeechState("user-speaking");
          break;

        case "input_audio_buffer.speech_stopped":
          setSpeechState("idle");
          break;

        case "conversation.item.input_audio_transcription.completed":
          if (event.transcript?.trim()) {
            setTranscripts((prev) => [
              ...prev,
              { role: "user", content: event.transcript.trim() },
            ]);
          }
          break;

        case "response.output_audio_transcript.delta":
          setSpeechState("ai-speaking");
          aiTextBufferRef.current += event.delta || "";
          setCurrentAiText(aiTextBufferRef.current);
          break;

        case "response.output_audio_transcript.done": {
          const fullText =
            event.transcript?.trim() || aiTextBufferRef.current.trim();
          if (fullText) {
            setTranscripts((prev) => [
              ...prev,
              { role: "assistant", content: fullText },
            ]);
          }
          aiTextBufferRef.current = "";
          setCurrentAiText("");
          break;
        }

        case "response.done":
          setSpeechState("idle");
          break;

        case "error":
          console.error("Realtime API error:", event.error);
          setError(event.error?.message || "An error occurred");
          break;
      }
    } catch {
      /* ignore non-JSON messages */
    }
  }, []);

  /* ── cleanup helper ── */

  const cleanup = useCallback(() => {
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
      audioElRef.current = null;
    }
  }, []);

  /* ── start call ── */

  const startCall = useCallback(async () => {
    try {
      setError(null);
      setConnectionState("connecting");
      setTranscripts([]);
      setCurrentAiText("");
      aiTextBufferRef.current = "";

      // Request microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Audio output element
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      // Add mic track
      pc.addTrack(stream.getTracks()[0]);

      // Data channel for events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.addEventListener("message", handleDataChannelMessage);

      dc.addEventListener("open", () => {
        setConnectionState("connected");

        // Configure session — schema from OpenAI docs:
        // session.type and session.model are required
        dc.send(
          JSON.stringify({
            type: "session.update",
            session: {
              type: "realtime",
              model: "gpt-4o-mini-realtime-preview",
              instructions: `You are an AI voice receptionist for a medical clinic called "HealthFirst Clinic". You handle appointment booking, rescheduling, general inquiries about services and hours, and routing urgent calls. Keep responses very brief (1-2 sentences) since this is a voice conversation. Be warm, professional, and efficient. Always confirm key details. This is a demo on a portfolio site showcasing AI voice agent capabilities. Start by greeting the caller warmly.`,
              output_modalities: ["audio"],
              audio: {
                input: {
                  turn_detection: {
                    type: "server_vad",
                    threshold: 0.5,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 600,
                  },
                },
                output: {
                  voice: "coral",
                },
              },
            },
          })
        );

        // Trigger an initial greeting after config is applied
        setTimeout(() => {
          dc.send(JSON.stringify({ type: "response.create" }));
        }, 500);
      });

      // Handle connection failure
      pc.onconnectionstatechange = () => {
        if (
          pc.connectionState === "failed" ||
          pc.connectionState === "disconnected"
        ) {
          setError("Connection lost.");
          setConnectionState("disconnected");
          cleanup();
        }
      };

      // Create SDP offer and negotiate via our API
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResponse = await fetch("/api/demos/voice/session", {
        method: "POST",
        body: offer.sdp,
        headers: { "Content-Type": "application/sdp" },
      });

      if (!sdpResponse.ok) throw new Error("Failed to create session");

      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch {
      setError("Failed to connect. Please try again.");
      setConnectionState("disconnected");
      cleanup();
    }
  }, [handleDataChannelMessage, cleanup]);

  /* ── end call ── */

  const endCall = useCallback(() => {
    cleanup();
    setConnectionState("disconnected");
    setSpeechState("idle");
  }, [cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cleanup]);

  /* ── derived state ── */

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";
  const isDisconnected = connectionState === "disconnected";
  const isUserSpeaking = speechState === "user-speaking";
  const isAiSpeaking = speechState === "ai-speaking";

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-64 h-64 rounded-full blur-[100px] transition-colors duration-700 pointer-events-none ${
          isUserSpeaking
            ? "bg-sky-500/15"
            : isAiSpeaking
              ? "bg-[#FF4444]/15"
              : isConnected
                ? "bg-emerald-500/10"
                : "bg-white/[0.02]"
        }`}
      />

      {/* Header — call style */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-medium text-white/70 leading-none">
              HealthFirst Clinic
            </p>
            <p className="text-[9px] text-white/30 mt-0.5">AI Receptionist</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected && (
            <span className="text-[10px] font-mono text-white/30 tabular-nums">
              {formatTime(callDuration)}
            </span>
          )}
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              isUserSpeaking
                ? "bg-sky-400 animate-pulse"
                : isAiSpeaking
                  ? "bg-[#FF6B6B] animate-pulse"
                  : isConnected
                    ? "bg-emerald-400"
                    : isConnecting
                      ? "bg-amber-400 animate-pulse"
                      : "bg-white/20"
            }`}
          />
        </div>
      </div>

      {/* Center — Orb + status */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3 px-6 min-h-0">
        {/* Animated orb */}
        <div className="relative flex items-center justify-center">
          {/* Outer ring animations */}
          {isUserSpeaking && (
            <>
              <div className="absolute w-24 h-24 rounded-full border border-sky-400/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full border border-sky-400/30 animate-pulse" />
            </>
          )}
          {isAiSpeaking && (
            <>
              <div className="absolute w-24 h-24 rounded-full border border-[#FF4444]/20 animate-[spin_4s_linear_infinite]" />
              <div className="absolute w-20 h-20 rounded-full border border-[#FF4444]/15 animate-[spin_3s_linear_infinite_reverse]" />
            </>
          )}
          {isConnecting && (
            <div className="absolute w-20 h-20 rounded-full border-2 border-transparent border-t-amber-500/40 animate-spin" />
          )}
          {isConnected && speechState === "idle" && (
            <div className="absolute w-20 h-20 rounded-full border border-emerald-500/10 animate-pulse" />
          )}

          {/* Core orb */}
          <div
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
              isUserSpeaking
                ? "bg-gradient-to-br from-sky-500 to-sky-600 scale-110 shadow-[0_0_40px_rgba(56,189,248,0.3)]"
                : isAiSpeaking
                  ? "bg-gradient-to-br from-[#FF4444] to-[#CC3333] scale-105 shadow-[0_0_30px_rgba(255,68,68,0.3)]"
                  : isConnecting
                    ? "bg-gradient-to-br from-amber-500/80 to-amber-600/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    : isConnected
                      ? "bg-gradient-to-br from-emerald-500/60 to-emerald-600/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "bg-white/[0.06] border border-white/[0.08]"
            }`}
          >
            {/* Waveform bars */}
            {(isUserSpeaking || isAiSpeaking) && (
              <div className="flex items-center gap-[3px]">
                {[3, 5, 2, 6, 4, 3, 5].map((h, i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-white/80 animate-pulse"
                    style={{
                      height: `${h * 3}px`,
                      animationDelay: `${i * 80}ms`,
                      animationDuration: isUserSpeaking ? "300ms" : "500ms",
                    }}
                  />
                ))}
              </div>
            )}
            {isConnecting && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:0ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
              </div>
            )}
            {isConnected && speechState === "idle" && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
            {isDisconnected && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            )}
          </div>
        </div>

        {/* Status label */}
        <p
          className={`text-[11px] font-medium uppercase tracking-widest ${
            isUserSpeaking
              ? "text-sky-400"
              : isAiSpeaking
                ? "text-[#FF6B6B]"
                : isConnecting
                  ? "text-amber-400/70"
                  : isConnected
                    ? "text-emerald-400/70"
                    : "text-white/25"
          }`}
        >
          {isUserSpeaking
            ? "Listening..."
            : isAiSpeaking
              ? "Speaking"
              : isConnecting
                ? "Connecting..."
                : isConnected
                  ? "On call — speak anytime"
                  : "Ready to call"}
        </p>

        {/* Live AI transcript (streaming) */}
        {currentAiText && (
          <p className="text-[12px] text-white/40 leading-relaxed text-center max-w-[260px] line-clamp-2 italic">
            &ldquo;{currentAiText}&rdquo;
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="relative z-10 mx-4 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] text-center">
          {error}
        </div>
      )}

      {/* Bottom — transcript + call button */}
      <div className="relative z-10 border-t border-white/[0.06] px-4 pt-2.5 pb-3">
        {/* Recent transcript pills */}
        {transcripts.length > 0 && (
          <div className="flex flex-col gap-1 mb-3 max-h-[52px] overflow-y-auto scrollbar-none">
            {transcripts.slice(-3).map((t, i) => (
              <div
                key={i}
                className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full truncate max-w-[80%] ${
                    t.role === "user"
                      ? "bg-sky-500/10 text-sky-300/50"
                      : "bg-[#FF4444]/10 text-[#FF6B6B]/50"
                  }`}
                >
                  {t.content}
                </span>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        )}

        {/* Call button */}
        {isDisconnected ? (
          <button
            onClick={startCall}
            className="w-full py-3 rounded-xl text-[12px] font-medium tracking-wide bg-emerald-500/90 text-white hover:bg-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Start Call
          </button>
        ) : isConnecting ? (
          <button
            disabled
            className="w-full py-3 rounded-xl text-[12px] font-medium tracking-wide bg-white/[0.04] text-white/20 cursor-wait flex items-center justify-center gap-2"
          >
            <div className="w-3 h-3 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            Connecting...
          </button>
        ) : (
          <button
            onClick={endCall}
            className="w-full py-3 rounded-xl text-[12px] font-medium tracking-wide bg-red-500/90 text-white hover:bg-red-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

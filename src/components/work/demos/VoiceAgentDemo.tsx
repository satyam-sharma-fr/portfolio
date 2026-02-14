"use client";

import { useState, useRef, useCallback } from "react";

interface VoiceMessage {
  role: "user" | "assistant";
  content: string;
}

export function VoiceAgentDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! You've reached HealthFirst Clinic. How can I help you today?",
    },
  ]);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const processAudio = useCallback(async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append(
        "messages",
        JSON.stringify(
          messagesRef.current.map((m) => ({
            role: m.role,
            content: m.content,
          }))
        )
      );

      const response = await fetch("/api/demos/voice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process audio");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "user", content: data.userText },
        { role: "assistant", content: data.aiResponse },
      ]);

      // Play the AI response audio
      if (data.audioBase64) {
        const audioSrc = `data:audio/mp3;base64,${data.audioBase64}`;
        if (audioRef.current) {
          audioRef.current.src = audioSrc;
          audioRef.current.play();
        }
      }
    } catch {
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setError("Microphone access denied. Please allow microphone access.");
    }
  }, [processAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
        <div
          className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-400 animate-pulse" : "bg-emerald-400"}`}
        />
        <span className="text-xs text-white/50 font-mono">
          HealthFirst Clinic — AI Receptionist
        </span>
      </div>

      {/* Transcript */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#FF4444] text-white rounded-br-md"
                  : "bg-white/[0.06] text-white/80 rounded-bl-md border border-white/[0.06]"
              }`}
            >
              {msg.role === "assistant" && (
                <span className="inline-block mr-1.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="inline opacity-40"
                  >
                    <path d="M12 3v10.586l3.707-3.707 1.414 1.414L12 16.414l-5.121-5.121 1.414-1.414L12 13.586V3z" />
                    <path d="M3 18h18v2H3z" />
                  </svg>
                </span>
              )}
              {msg.content}
            </div>
          </div>
        ))}

        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-[#FF4444]/60 rounded-full animate-pulse" />
                  <div className="w-1 h-4 bg-[#FF4444]/80 rounded-full animate-pulse [animation-delay:100ms]" />
                  <div className="w-1 h-2 bg-[#FF4444]/40 rounded-full animate-pulse [animation-delay:200ms]" />
                  <div className="w-1 h-5 bg-[#FF4444]/70 rounded-full animate-pulse [animation-delay:300ms]" />
                  <div className="w-1 h-3 bg-[#FF4444]/50 rounded-full animate-pulse [animation-delay:150ms]" />
                </div>
                <span className="text-[11px] text-white/30 ml-1">
                  Processing...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">
          {error}
        </div>
      )}

      {/* Voice control */}
      <div className="flex flex-col items-center gap-3 px-4 py-4 border-t border-white/[0.08]">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={() => isRecording && stopRecording()}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          disabled={isProcessing}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
            isRecording
              ? "bg-[#FF4444] scale-110 shadow-[0_0_30px_rgba(255,68,68,0.4)]"
              : isProcessing
                ? "bg-white/10 cursor-wait"
                : "bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/20"
          }`}
        >
          {isRecording && (
            <div className="absolute inset-0 rounded-full border-2 border-[#FF4444] animate-ping opacity-30" />
          )}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isRecording ? "white" : "rgba(255,255,255,0.5)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        <span className="text-[11px] text-white/30">
          {isRecording
            ? "Listening... release to send"
            : isProcessing
              ? "Processing your request..."
              : "Hold to speak"}
        </span>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
}

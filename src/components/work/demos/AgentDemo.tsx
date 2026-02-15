"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";

function generateSessionId() {
  return `portfolio-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function AgentDemo() {
  const [input, setInput] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => generateSessionId(), []);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/demos/agent",
      body: { sessionId },
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm Satyam's AI assistant. Ask me anything about his services, projects, or availability — I'm powered by an n8n AI agent behind the scenes.",
          },
        ],
      },
    ] as UIMessage[],
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Image
            src="/satyam.png"
            alt="Satyam"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover object-top"
          />
          <span className="text-xs text-white/70 font-medium">
            Satyam&apos;s AI Agent
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-400">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-[#FF4444] text-white text-[13px] leading-relaxed">
                  {message.parts.map((part, i) =>
                    part.type === "text" ? (
                      <span key={i}>{part.text}</span>
                    ) : null
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {message.parts.map((part, i) => {
                  if (part.type === "text" && part.text) {
                    return (
                      <div key={i} className="flex justify-start">
                        <div className="max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-md bg-white/[0.06] text-white/80 border border-white/[0.06] text-[13px] leading-relaxed whitespace-pre-wrap">
                          {part.text}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}

        {isLoading &&
          messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex justify-start">
              <div className="bg-white/[0.06] border border-white/[0.06] px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:0ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:150ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

        <div />
      </div>

      {/* Quick actions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {[
            "What services do you offer?",
            "Book a call",
            "Are you available?",
          ].map((q) => (
            <button
              key={q}
              onClick={() => sendMessage({ text: q })}
              className="text-[11px] px-3 py-1.5 rounded-full border border-white/[0.1] text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.08]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about services, book a call..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF4444]/30 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 rounded-xl bg-[#FF4444] text-white hover:bg-[#FF5555] disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

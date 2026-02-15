"use client";

import { useState, useEffect, useRef } from "react";

/* ── Simulated RAG pipeline ─────────────────────────────── */

const sampleDocs = [
  { name: "company-handbook.pdf", pages: 142, icon: "📄" },
  { name: "product-docs.md", pages: 89, icon: "📋" },
  { name: "support-tickets.csv", pages: 2340, icon: "📊" },
  { name: "meeting-notes.docx", pages: 56, icon: "📝" },
];

const sampleQueries = [
  "What is our refund policy?",
  "How do I reset MFA?",
  "Summarize Q4 support trends",
];

interface RetrievedChunk {
  doc: string;
  snippet: string;
  score: number;
}

const mockResults: Record<
  string,
  { chunks: RetrievedChunk[]; answer: string }
> = {
  "What is our refund policy?": {
    chunks: [
      {
        doc: "company-handbook.pdf",
        snippet:
          "...refunds processed within 5-7 business days. Customers must submit request within 30 days...",
        score: 0.94,
      },
      {
        doc: "support-tickets.csv",
        snippet:
          "...common ticket: refund request — auto-routed to billing, avg resolution 2.3 days...",
        score: 0.87,
      },
      {
        doc: "product-docs.md",
        snippet:
          "...subscription cancellations trigger pro-rated refund based on remaining days...",
        score: 0.81,
      },
    ],
    answer:
      "Your refund policy allows requests within 30 days of purchase, processed in 5-7 business days. Subscriptions receive pro-rated refunds. Requests are auto-routed to billing with ~2.3 day resolution.",
  },
  "How do I reset MFA?": {
    chunks: [
      {
        doc: "company-handbook.pdf",
        snippet:
          "...MFA reset requires admin approval. Navigate to Settings → Security → Reset MFA...",
        score: 0.96,
      },
      {
        doc: "product-docs.md",
        snippet:
          "...backup codes can be used if MFA device is lost. Each user receives 10 one-time codes...",
        score: 0.89,
      },
    ],
    answer:
      "Go to Settings → Security → Reset MFA. An admin must verify your identity via video call. Alternatively, use one of your 10 backup codes from MFA setup.",
  },
  "Summarize Q4 support trends": {
    chunks: [
      {
        doc: "support-tickets.csv",
        snippet:
          "...Q4 saw 34% increase in tickets. Top: billing (28%), login (22%), features (18%)...",
        score: 0.95,
      },
      {
        doc: "meeting-notes.docx",
        snippet:
          "...Q4 retro: need better self-service docs, 40% of tickets could be deflected...",
        score: 0.88,
      },
      {
        doc: "product-docs.md",
        snippet:
          "...v3.2 release in Q4 introduced new dashboard — 12% of tickets from UI confusion...",
        score: 0.76,
      },
    ],
    answer:
      "Q4 support saw 34% ticket increase. Top issues: billing (28%), login (22%), features (18%). The v3.2 UI caused 12% of tickets. 40% could be deflected with better self-service docs.",
  },
};

export function RAGDemo() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<
    "idle" | "embedding" | "searching" | "generating" | "done"
  >("idle");
  const [activeQuery, setActiveQuery] = useState("");
  const [result, setResult] = useState<{
    chunks: RetrievedChunk[];
    answer: string;
  } | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [stage, result]);

  const runQuery = (q: string) => {
    const queryText = q || query;
    if (!queryText.trim()) return;

    setActiveQuery(queryText);
    setResult(null);
    setStage("embedding");

    setTimeout(() => setStage("searching"), 800);
    setTimeout(() => setStage("generating"), 1800);
    setTimeout(() => {
      const r =
        mockResults[queryText] || mockResults["What is our refund policy?"];
      setResult(r);
      setStage("done");
    }, 3000);
  };

  const reset = () => {
    setStage("idle");
    setResult(null);
    setQuery("");
    setActiveQuery("");
  };

  const isProcessing = stage !== "idle" && stage !== "done";

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4444"
            strokeWidth="2"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span className="text-xs text-white/50 font-mono">
            RAG Knowledge Engine
          </span>
        </div>
        <span className="text-[10px] text-white/30">
          {sampleDocs.length} docs indexed
        </span>
      </div>

      {/* Two-column body */}
      <div className="flex-1 flex min-h-0">
        {/* Left — Chat */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-3 min-h-0 space-y-2.5">
            {stage === "idle" ? (
              /* Quick queries */
              <div className="flex flex-col justify-center h-full">
                <p className="text-[10px] uppercase tracking-wider text-white/25 font-medium mb-2">
                  Try asking
                </p>
                <div className="space-y-1.5">
                  {sampleQueries.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuery(q);
                        runQuery(q);
                      }}
                      className="block w-full text-left text-[11px] text-white/40 hover:text-[#FF6B6B] px-2.5 py-2 rounded-lg hover:bg-white/[0.03] transition-all"
                    >
                      → {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Pipeline + answer */
              <>
                {/* User query bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[90%] px-3 py-2 rounded-2xl rounded-br-md bg-[#FF4444] text-white text-[11px] leading-relaxed">
                    {activeQuery}
                  </div>
                </div>

                {/* Pipeline steps */}
                <div className="space-y-1">
                  {(
                    [
                      {
                        key: "embedding",
                        label: "Embedding query",
                        after: ["searching", "generating", "done"],
                      },
                      {
                        key: "searching",
                        label: "Searching vectors",
                        after: ["generating", "done"],
                      },
                      {
                        key: "generating",
                        label: "Generating answer",
                        after: ["done"],
                      },
                    ] as const
                  ).map((step) => {
                    const isActive = stage === step.key;
                    const isDone = (step.after as readonly string[]).includes(stage);
                    const isPending = !isActive && !isDone;

                    return (
                      <div
                        key={step.key}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[10px] transition-all duration-300 ${
                          isActive
                            ? "bg-[#FF4444]/10 text-white/70"
                            : isDone
                              ? "text-white/35"
                              : "text-white/15"
                        }`}
                      >
                        {isDone ? (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeLinecap="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        )}
                        <span>{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* AI Answer */}
                {result && (
                  <div className="animate-in fade-in duration-500 space-y-2.5">
                    <div className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <p className="text-[10px] uppercase tracking-wider text-[#FF6B6B] font-medium mb-1.5">
                        Answer
                      </p>
                      <p className="text-[11px] text-white/55 leading-relaxed">
                        {result.answer}
                      </p>
                    </div>

                    <button
                      onClick={reset}
                      className="text-[10px] text-white/25 hover:text-white/50 transition-colors"
                    >
                      ← Ask another
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input */}
          {stage === "idle" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runQuery(query);
              }}
              className="flex items-center gap-2 px-3 py-2.5 border-t border-white/[0.08]"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask your docs..."
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF4444]/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="p-2 rounded-lg bg-[#FF4444] text-white hover:bg-[#FF5555] disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          )}
        </div>

        {/* Right — Knowledge Base */}
        <div className="w-[42%] shrink-0 border-l border-white/[0.06] flex flex-col min-h-0">
          <div className="px-3 py-2.5 border-b border-white/[0.06] shrink-0">
            <p className="text-[9px] uppercase tracking-wider text-white/30 font-medium">
              Knowledge Base
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-3">
            {/* Document list */}
            <div className="space-y-1">
              {sampleDocs.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="text-[10px]">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-white/45 truncate">
                      {doc.name}
                    </p>
                    <p className="text-[8px] text-white/20">
                      {doc.pages} {doc.name.endsWith(".csv") ? "rows" : "pg"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Retrieved chunks appear here when results come in */}
            {result && (
              <div className="animate-in fade-in duration-500">
                <p className="text-[9px] uppercase tracking-wider text-white/25 font-medium mb-1.5">
                  Retrieved Chunks
                </p>
                <div className="space-y-1.5">
                  {result.chunks.map((chunk, i) => (
                    <div
                      key={i}
                      className="px-2 py-2 rounded-md bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] text-white/30 font-mono truncate">
                          {chunk.doc}
                        </span>
                        <span className="text-[8px] text-[#FF6B6B] font-mono shrink-0 ml-1">
                          {chunk.score.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[8px] text-white/25 leading-relaxed">
                        {chunk.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Processing indicator */}
            {isProcessing && (
              <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-[#FF4444]/5 border border-[#FF4444]/10">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-[#FF4444] animate-bounce [animation-delay:0ms]" />
                  <div className="w-1 h-1 rounded-full bg-[#FF4444] animate-bounce [animation-delay:150ms]" />
                  <div className="w-1 h-1 rounded-full bg-[#FF4444] animate-bounce [animation-delay:300ms]" />
                </div>
                <span className="text-[8px] text-white/30">
                  Searching docs...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

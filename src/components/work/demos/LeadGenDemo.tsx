"use client";

import { useState } from "react";

interface LeadResult {
  company: string;
  score: number;
  summary: string;
  insights: string[];
  email: {
    subject: string;
    body: string;
  };
  research: { title: string; url: string }[];
}

export function LeadGenDemo() {
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    // Simulate step progression
    setStep("Researching company...");
    const stepTimer1 = setTimeout(() => setStep("Analyzing business data..."), 2000);
    const stepTimer2 = setTimeout(() => setStep("Scoring lead quality..."), 4000);
    const stepTimer3 = setTimeout(() => setStep("Crafting personalized email..."), 6000);

    try {
      const response = await fetch("/api/demos/lead-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company: company.trim() }),
      });

      if (!response.ok) throw new Error("Failed to analyze");

      const data = await response.json();
      setResult(data);
    } catch {
      setError("Failed to research company. Please try again.");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsLoading(false);
      setStep("");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-white/40";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Hot Lead";
    if (score >= 60) return "Warm Lead";
    return "Cold Lead";
  };

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF4444"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="text-xs text-white/50 font-mono">
          AI Lead Qualifier
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {!result && !isLoading && (
          <div className="text-center py-6">
            <div className="text-2xl mb-3">🎯</div>
            <p className="text-[13px] text-white/50 mb-1">
              Enter any company name
            </p>
            <p className="text-[11px] text-white/30">
              AI will research, score, and draft a personalized outreach email
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="py-8 space-y-4">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-[#FF4444]/20 border-t-[#FF4444] animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-[13px] text-white/60 font-medium">
                  {step}
                </p>
                <p className="text-[11px] text-white/30 mt-1">
                  Researching &quot;{company}&quot;
                </p>
              </div>
            </div>

            {/* Animated pipeline steps */}
            <div className="space-y-2 mt-6">
              {[
                "Searching web for company data",
                "Analyzing products & services",
                "Scoring against ICP criteria",
                "Generating personalized email",
              ].map((s, i) => (
                <div
                  key={s}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02]"
                  style={{
                    opacity: isLoading ? 1 : 0,
                    animation: `fadeIn 0.3s ease ${i * 0.15}s both`,
                  }}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      i <= ["Researching company...", "Analyzing business data...", "Scoring lead quality...", "Crafting personalized email..."].indexOf(step)
                        ? "bg-emerald-400"
                        : "bg-white/10 animate-pulse"
                    }`}
                  />
                  <span className="text-[11px] text-white/40">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Score card */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div>
                <p className="text-[13px] text-white/80 font-medium">
                  {result.company}
                </p>
                <p className="text-[11px] text-white/30">
                  {getScoreLabel(result.score)}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`text-2xl font-bold ${getScoreColor(result.score)}`}
                >
                  {result.score}
                </span>
                <span className="text-[10px] text-white/30 block">/ 100</span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-[12px] text-white/50 leading-relaxed">
              {result.summary}
            </p>

            {/* Insights */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                Key Insights
              </p>
              {result.insights.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-[11px] text-white/50"
                >
                  <span className="text-[#FF4444] mt-0.5 shrink-0">→</span>
                  {insight}
                </div>
              ))}
            </div>

            {/* Generated email */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
              <div className="px-3 py-2 border-b border-white/[0.06] flex items-center gap-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FF4444"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-[10px] text-white/40 font-medium">
                  Generated Outreach Email
                </span>
              </div>
              <div className="p-3 space-y-2">
                <div className="text-[11px]">
                  <span className="text-white/30">Subject: </span>
                  <span className="text-white/60">{result.email.subject}</span>
                </div>
                <div className="text-[11px] text-white/50 leading-relaxed whitespace-pre-wrap border-t border-white/[0.04] pt-2">
                  {result.email.body}
                </div>
              </div>
            </div>

            {/* Sources */}
            {result.research && result.research.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-white/20 font-medium">
                  Sources
                </p>
                {result.research.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[10px] text-white/30 hover:text-white/50 truncate transition-colors"
                  >
                    {r.title}
                  </a>
                ))}
              </div>
            )}

            {/* Try another */}
            <button
              onClick={() => {
                setResult(null);
                setCompany("");
              }}
              className="w-full text-[11px] text-white/30 hover:text-white/50 py-2 transition-colors"
            >
              ← Try another company
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px]">
          {error}
        </div>
      )}

      {/* Input */}
      {!result && (
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-3 border-t border-white/[0.08]"
        >
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Stripe, Shopify, Notion..."
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF4444]/30 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !company.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#FF4444] text-white text-[12px] font-medium hover:bg-[#FF5555] disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
          >
            {isLoading ? "..." : "Analyze"}
          </button>
        </form>
      )}
    </div>
  );
}

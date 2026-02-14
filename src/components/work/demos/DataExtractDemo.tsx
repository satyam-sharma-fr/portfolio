"use client";

import { useState } from "react";

interface ExtractResult {
  url: string;
  content: string;
  extractedAt: string;
}

export function DataExtractDemo() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExtractResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/demos/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to extract");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to extract. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const truncatedContent = result?.content
    ? result.content.length > 2000
      ? result.content.slice(0, 2000) + "\n\n... [truncated for demo]"
      : result.content
    : "";

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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="text-xs text-white/50 font-mono">
          AI Web Scraper
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {!result && !isLoading && (
          <div className="text-center py-6">
            <div className="text-2xl mb-3">🕸️</div>
            <p className="text-[13px] text-white/50 mb-1">
              Enter any website URL
            </p>
            <p className="text-[11px] text-white/30">
              AI will extract and structure the page content
            </p>

            {/* Example URLs */}
            <div className="mt-4 space-y-1.5">
              <p className="text-[10px] text-white/20 uppercase tracking-wider">
                Try these
              </p>
              {[
                "https://openai.com/about",
                "https://stripe.com/about",
                "https://vercel.com/about",
              ].map((exUrl) => (
                <button
                  key={exUrl}
                  onClick={() => setUrl(exUrl)}
                  className="block mx-auto text-[11px] text-white/30 hover:text-[#FF6B6B] transition-colors"
                >
                  {exUrl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-[#FF4444]/20 border-t-[#FF4444] animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-[13px] text-white/60">
                Extracting content...
              </p>
              <p className="text-[11px] text-white/30 mt-1 max-w-[200px] truncate">
                {url}
              </p>
            </div>

            {/* Animated extraction visualization */}
            <div className="w-full mt-4 space-y-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full bg-white/[0.03] overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF4444]/20 to-[#FF4444]/5 animate-pulse"
                    style={{
                      width: `${60 + Math.random() * 40}%`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-3 animate-in fade-in duration-500">
            {/* Meta info */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="min-w-0">
                <p className="text-[12px] text-white/60 font-medium truncate">
                  {result.url}
                </p>
                <p className="text-[10px] text-white/30 mt-0.5">
                  Extracted at{" "}
                  {new Date(result.extractedAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <span className="text-[11px] text-emerald-400 font-medium">
                  {(result.content?.length || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-white/30 block">chars</span>
              </div>
            </div>

            {/* Extracted content */}
            <div className="rounded-xl bg-[#111111] border border-white/[0.06] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
                  <span className="text-[10px] text-white/40 font-mono">
                    extracted-content.md
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result.content || "");
                  }}
                  className="text-[10px] text-white/30 hover:text-white/60 transition-colors px-2 py-0.5 rounded border border-white/[0.06] hover:border-white/[0.12]"
                >
                  Copy
                </button>
              </div>
              <pre className="p-3 text-[11px] text-white/50 leading-relaxed font-mono whitespace-pre-wrap max-h-[250px] overflow-y-auto">
                {truncatedContent}
              </pre>
            </div>

            {/* Try another */}
            <button
              onClick={() => {
                setResult(null);
                setUrl("");
              }}
              className="w-full text-[11px] text-white/30 hover:text-white/50 py-2 transition-colors"
            >
              ← Extract another URL
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FF4444]/30 transition-colors font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-4 py-2.5 rounded-xl bg-[#FF4444] text-white text-[12px] font-medium hover:bg-[#FF5555] disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
          >
            {isLoading ? "..." : "Extract"}
          </button>
        </form>
      )}
    </div>
  );
}

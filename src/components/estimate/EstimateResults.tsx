import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface FeatureBreakdown {
  feature: string;
  timeEstimate: string;
  costEstimate: string;
}

export interface EstimateResult {
  timeEstimate: string;
  costEstimate: string;
  complexity: "Simple" | "Moderate" | "Complex" | "Enterprise";
  features: FeatureBreakdown[];
  recommendations: string[];
  summary: string;
}

/* ------------------------------------------------------------------ */
/*  Complexity badge                                                   */
/* ------------------------------------------------------------------ */

function ComplexityBadge({ level }: { level: EstimateResult["complexity"] }) {
  const colorMap: Record<string, string> = {
    Simple: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Moderate: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Complex: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Enterprise: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorMap[level] || colorMap.Moderate}`}
    >
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface EstimateResultsProps {
  result: EstimateResult;
  name: string;
}

export function EstimateResults({ result, name }: EstimateResultsProps) {
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0A0A0A] border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/work"
            className="text-white/50 hover:text-white transition-colors text-sm flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Your Estimate
          </p>
          <div className="w-24" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FF4444]/10 mb-4">
              <svg
                className="w-7 h-7 text-[#FF4444]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.5 8.25l.75-1.5.75 1.5 1.5.75-1.5.75-.75 1.5-.75-1.5-1.5-.75 1.5-.75z"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Hey {firstName}, here&apos;s your estimate!
            </h1>
            <p className="text-white/50 text-base">
              AI-powered analysis based on your project requirements
            </p>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-6">
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {result.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Time */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Estimated Time
                </p>
                <p className="text-xl font-bold text-white">{result.timeEstimate}</p>
              </div>

              {/* Cost */}
              <div className="rounded-xl bg-[#FF4444]/[0.06] border border-[#FF4444]/20 p-4 text-center">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  Estimated Cost
                </p>
                <p className="text-xl font-bold text-[#FF4444]">{result.costEstimate}</p>
              </div>

              {/* Complexity */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                  Complexity
                </p>
                <ComplexityBadge level={result.complexity} />
              </div>
            </div>
          </div>

          {/* Feature breakdown */}
          {result.features.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Feature Breakdown</h2>
              <div className="space-y-3">
                {result.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0"
                  >
                    <p className="text-white/80 text-sm font-medium">{f.feature}</p>
                    <div className="flex items-center gap-4 text-right shrink-0">
                      <span className="text-white/40 text-xs">{f.timeEstimate}</span>
                      <span className="text-white/60 text-sm font-medium">{f.costEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-10">
              <h2 className="text-lg font-bold text-white mb-4">Recommendations</h2>
              <ul className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-[#FF4444]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-white/30 text-xs text-center mb-8">
            This estimate is AI-generated and intended as a rough guide. Actual costs and timelines
            may vary based on detailed requirements, scope changes, and technical complexity.
          </p>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4444] text-white font-medium rounded-full hover:bg-[#E03B3B] transition-colors text-base"
            >
              Book a Free Consultation to Discuss
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

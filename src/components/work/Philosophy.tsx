const approaches = [
  {
    title: "ROI-First Thinking",
    points: [
      "Every project starts with impact analysis",
      "Prioritize highest time-saving workflows",
      "Measurable KPIs defined before building",
      "Clear before/after cost comparison",
    ],
  },
  {
    title: "Bulletproof by Design",
    featured: true,
    points: [
      "Edge cases handled from day one",
      "Human-in-the-loop escalation built in",
      "Error handling and fallback logic",
      "24/7 monitoring and alerting",
    ],
  },
  {
    title: "Scale Without Limits",
    points: [
      "Handles 10x volume spikes gracefully",
      "Modular architecture for easy expansion",
      "No vendor lock-in on any platform",
      "Future-proof tech stack choices",
    ],
  },
];

const philosophies = [
  {
    quote: "If a human does it twice, a machine should do it forever.",
    description:
      "Repetitive tasks are a tax on your team's potential. I identify these patterns and replace them with intelligent automation that runs flawlessly.",
  },
  {
    quote: "AI should augment your business, not complicate it.",
    description:
      "No black-box solutions, no overcomplicated setups. Just clean systems that your team can understand, trust, and scale.",
  },
  {
    quote: "The best automation is the one you never have to think about.",
    description:
      "A well-built system runs silently in the background—answering calls, nurturing leads, syncing data. You only hear from it when it delivers results.",
  },
];

export function Philosophy() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Approach section - pricing-style cards */}
        <div className="mb-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              ROI-first automation
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Every project is designed around measurable business impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {approaches.map((approach) => (
              <div
                key={approach.title}
                className={`relative p-8 border rounded-xl transition-all duration-300 ${
                  approach.featured
                    ? "border-[#FF4444]/40 bg-[#FF4444]/[0.04] hover:shadow-[0_0_40px_rgba(255,68,68,0.1)]"
                    : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                {approach.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF4444] text-white text-[10px] font-semibold uppercase tracking-wider rounded-full">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-6">
                  {approach.title}
                </h3>
                <ul className="space-y-3">
                  {approach.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/50 leading-relaxed"
                    >
                      <svg
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          approach.featured
                            ? "text-[#FF4444]"
                            : "text-white/30"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy quotes */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              The beliefs behind the work
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {philosophies.map((item) => (
              <div
                key={item.quote}
                className="p-8 border border-white/[0.08] rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Oversized quotation mark */}
                <span className="text-5xl font-serif text-[#FF4444]/30 leading-none block mb-4">
                  &ldquo;
                </span>
                <p className="text-white/90 font-medium text-lg leading-snug mb-4 italic">
                  {item.quote}
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

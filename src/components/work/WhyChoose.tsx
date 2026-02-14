const reasons = [
  {
    number: "01",
    title: "50+ Automations Delivered",
    subtitle: "Proven track record across industries",
  },
  {
    number: "02",
    title: "Direct Engineer Access",
    subtitle: "No middlemen, no account managers",
  },
  {
    number: "03",
    title: "Full Ownership Guarantee",
    subtitle: "Everything I build belongs to you",
  },
  {
    number: "04",
    title: "ROI Within Weeks",
    subtitle: "Measurable impact from day one",
  },
];

const badges = [
  { label: "AI Automation", detail: "Specialist" },
  { label: "Enterprise", detail: "Ready" },
  { label: "24/7 Systems", detail: "Uptime" },
];

export function WhyChoose() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
          {/* Left — large stacked heading */}
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] uppercase">
              Why
              <br />
              Businesses
              <br />
              Choose
              <br />
              <span className="text-[#FF4444]">Satyam</span>
            </h2>
          </div>

          {/* Right — numbered reasons + badges */}
          <div className="space-y-10">
            {/* Numbered list */}
            <div className="space-y-8">
              {reasons.map((reason) => (
                <div key={reason.number} className="flex items-start gap-6">
                  {/* Number */}
                  <span className="text-lg font-semibold text-white/20 tabular-nums shrink-0 mt-0.5">
                    {reason.number}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {reason.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-white/[0.08]" />

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 px-5 py-3 border border-white/[0.08] rounded-lg bg-white/[0.02]"
                >
                  {/* Shield icon */}
                  <svg
                    className="w-5 h-5 text-[#FF4444]/60 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>

                  <div className="leading-tight">
                    <span className="text-xs font-semibold text-white/70 uppercase tracking-wider block">
                      {badge.label}
                    </span>
                    <span className="text-[10px] text-white/30 uppercase tracking-wider">
                      {badge.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

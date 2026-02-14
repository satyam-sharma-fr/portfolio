const beforeItems = [
  "Hours wasted on manual data entry daily",
  "Same customer questions answered repeatedly",
  "Leads going cold from slow follow-ups",
  "Missed calls and scheduling chaos",
  "Manual reporting taking full workdays",
  "Human errors in repetitive processes",
];

const afterItems = [
  "Zero manual data entry — fully automated",
  "AI chatbot handles 70%+ of support 24/7",
  "Leads auto-enriched, scored, and nurtured",
  "AI receptionist books every appointment",
  "Real-time dashboards update themselves",
  "99.7% accuracy on automated workflows",
];

const capabilities = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: "Multi-Channel AI Support",
    description:
      "Deploy chatbots across web, WhatsApp, Telegram, and phone. One AI, every channel, consistent responses.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Automation Setup",
    description:
      "From audit to live in under 2 weeks. No infrastructure setup, no DevOps — just working automations.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "Observable by Default",
    description:
      "Built-in monitoring, error alerts, and performance dashboards. Know exactly how your automations perform.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.491 48.491 0 01-4.163-.3c-1.11-.169-2.11-.8-2.648-1.706a2.494 2.494 0 01-.378-1.307v0c0-1.636 1.27-2.96 2.848-3.19A48.462 48.462 0 0112 1.5c2.34 0 4.627.213 6.843.614 1.578.23 2.848 1.554 2.848 3.19v0c0 .457-.13.91-.378 1.307-.538.906-1.537 1.537-2.648 1.706a48.489 48.489 0 01-4.163.3.64.64 0 01-.657-.643v0zm-1.5 0v0a.64.64 0 00-.657.643 48.491 48.491 0 01-4.163.3c-1.11.169-2.11.8-2.648 1.706a2.494 2.494 0 00-.378 1.307v0c0 1.636 1.27 2.96 2.848 3.19A48.462 48.462 0 0012 22.5c2.34 0 4.627-.213 6.843-.614 1.578-.23 2.848-1.554 2.848-3.19v0a2.494 2.494 0 00-.378-1.307c-.538-.906-1.537-1.537-2.648-1.706a48.489 48.489 0 01-4.163-.3.64.64 0 00-.657.643v0" />
      </svg>
    ),
    title: "Compatible with Your Stack",
    description:
      "Works with the tools you already use — HubSpot, Slack, Gmail, Notion, Sheets, and 5,000+ more via APIs.",
  },
];

export function Capabilities() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Why businesses choose AI automation
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Everything needed to run operations on autopilot.
          </p>
        </div>

        {/* Before / After comparison panels */}
        <div className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-white/[0.08] mb-16">
          {/* Before panel */}
          <div className="p-8 md:p-10 bg-white/[0.02]">
            <h3 className="text-xl font-semibold text-white/60 mb-6">
              Doing everything manually
            </h3>
            <ul className="space-y-4">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-white/20 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="text-white/40 text-sm leading-relaxed line-through decoration-white/20">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After panel */}
          <div className="p-8 md:p-10 bg-[#FF4444]/[0.04] border-t md:border-t-0 md:border-l border-white/[0.08]">
            <h3 className="text-xl font-semibold text-white mb-6">
              With <span className="text-[#FF4444]">AI Automation</span>
            </h3>
            <ul className="space-y-4">
              {afterItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#FF4444] shrink-0 mt-0.5"
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
                  <span className="text-white/70 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Capability feature grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-6 border border-white/[0.08] rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="text-[#FF4444] mb-4">{cap.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {cap.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

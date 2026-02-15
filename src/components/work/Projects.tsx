import Image from "next/image";

const caseStudies = [
  {
    number: "01",
    title: "AI Customer Support Agent",
    subtitle: "RAG-Powered Chatbot for E-Commerce",
    description:
      "Custom AI chatbot trained on 500+ product pages and support docs. Handles order tracking, returns, sizing, and escalates complex issues seamlessly.",
    stack: ["OpenAI", "Pinecone", "n8n", "Next.js", "WhatsApp API"],
    metric: { value: "70%", label: "Fewer Support Tickets" },
    status: "Live",
    // Replace with your image path, e.g. "/case-studies/support-agent.png"
    image: null as string | null,
    gradient: ["rgba(255,68,68,0.08)", "rgba(255,68,68,0.03)", "transparent"],
  },
  {
    number: "02",
    title: "AI Voice Receptionist",
    subtitle: "Automated Appointment Booking",
    description:
      "AI voice agent that answers calls, understands patient requests, checks availability, books appointments, and sends confirmation SMS — fully hands-free.",
    stack: ["Voiceflow", "Twilio", "Google Calendar", "Make", "Airtable"],
    metric: { value: "40+", label: "Hours Saved Monthly" },
    status: "In Production",
    image: null as string | null,
    gradient: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.015)", "transparent"],
  },
  {
    number: "03",
    title: "Lead Gen Autopilot",
    subtitle: "End-to-End Sales Pipeline",
    description:
      "Automated lead generation that scrapes prospects, enriches data with AI, scores leads, and triggers personalized outreach sequences at scale.",
    stack: ["n8n", "Clay", "OpenAI", "Instantly", "Google Sheets"],
    metric: { value: "3x", label: "More Qualified Leads" },
    status: "Active",
    image: null as string | null,
    gradient: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.015)", "transparent"],
  },
  {
    number: "04",
    title: "Multi-App Business Hub",
    subtitle: "CRM + Email + Slack Automation",
    description:
      "Centralized hub connecting HubSpot, Gmail, Slack, Notion, and Stripe. New deals auto-create projects, channels, and sequences — zero manual work.",
    stack: ["Zapier", "HubSpot API", "Slack API", "Notion API", "Stripe"],
    metric: { value: "20+", label: "Hours Saved Weekly" },
    status: "Live",
    image: null as string | null,
    gradient: ["rgba(255,68,68,0.08)", "rgba(255,68,68,0.03)", "transparent"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[#FF4444] mb-4 font-medium">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Projects that speak{" "}
            <span className="text-[#FF4444]">for themselves</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Real solutions built for real businesses. Here&apos;s the impact.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {caseStudies.map((study, index) => {
            const isWide = index === 0 || index === 3;

            return (
              <article
                key={study.number}
                className={`bento-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_8px_60px_rgba(255,68,68,0.06)] hover:-translate-y-1 ${
                  isWide ? "lg:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Animated top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4444]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Image / Visual Area */}
                <div
                  className={`relative overflow-hidden ${
                    isWide ? "h-44 sm:h-48 lg:h-56" : "h-40 sm:h-44"
                  }`}
                  style={{
                    background: `linear-gradient(145deg, ${study.gradient[0]}, ${study.gradient[1]}, ${study.gradient[2]})`,
                  }}
                >
                  {/* Subtle dot grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Scan line effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4444]/[0.03] via-transparent to-transparent group-hover:animate-[bento-scan_3s_ease-in-out_infinite]" />
                  </div>

                  {/* Large watermark number */}
                  <span className="absolute -bottom-6 -right-3 text-[140px] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
                    {study.number}
                  </span>

                  {/* Image or placeholder */}
                  {study.image ? (
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Image
                        src={study.image}
                        alt={study.title}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-16 h-16 rounded-2xl border border-dashed border-white/[0.08] flex items-center justify-center bg-white/[0.02] group-hover:border-[#FF4444]/25 group-hover:bg-[#FF4444]/[0.04] group-hover:scale-110 transition-all duration-500">
                        <svg
                          className="w-6 h-6 text-white/[0.12] group-hover:text-[#FF4444]/40 transition-colors duration-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                          />
                        </svg>
                        {/* Pulsing ring on hover */}
                        <div className="absolute inset-0 rounded-2xl border border-[#FF4444]/0 group-hover:border-[#FF4444]/10 group-hover:animate-[bento-pulse_2s_ease-in-out_infinite] transition-colors" />
                      </div>
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[green-pulse_2s_ease-in-out_infinite]" />
                    <span className="text-[10px] text-white/60 tracking-wider uppercase font-medium">
                      {study.status}
                    </span>
                  </div>

                  {/* Bottom fade into content */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
                </div>

                {/* Content Area */}
                <div className="relative p-5 sm:p-6">
                  {/* Metric highlight */}
                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-[#FF4444] drop-shadow-[0_0_12px_rgba(255,68,68,0.25)]">
                      {study.metric.value}
                    </span>
                    <span className="text-[11px] text-white/35 uppercase tracking-wider font-medium">
                      {study.metric.label}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-xs text-white/30 mb-3 font-medium tracking-wide">
                    {study.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-white/45 leading-relaxed mb-5">
                    {study.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {study.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 text-[10px] bg-white/[0.03] text-white/30 border border-white/[0.05] rounded-full tracking-wide font-medium group-hover:border-white/[0.08] group-hover:text-white/40 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover arrow indicator */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <svg
                    className="w-3.5 h-3.5 text-white/30 group-hover:text-[#FF4444]/60 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

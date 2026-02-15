const projects = [
  {
    title: "AI Customer Support Agent",
    subtitle: "RAG-Powered Chatbot for E-Commerce",
    description:
      "Built a custom AI chatbot trained on 500+ product pages and support docs using RAG. Handles order tracking, returns, sizing questions, and escalates complex issues to human agents.",
    stack: ["OpenAI", "Pinecone", "n8n", "Next.js", "WhatsApp API"],
    impact: "70% reduction in support tickets",
    stat: "70%",
    statLabel: "fewer tickets",
  },
  {
    title: "AI Voice Receptionist",
    subtitle: "Automated Appointment Booking System",
    description:
      "AI voice agent for a clinic that answers phone calls, understands patient requests, checks calendar availability, books appointments, and sends confirmation SMS.",
    stack: ["Voiceflow", "Twilio", "Google Calendar", "Make", "Airtable"],
    impact: "40+ hours saved monthly",
    stat: "40+",
    statLabel: "hours saved/mo",
  },
  {
    title: "Lead Gen Autopilot",
    subtitle: "End-to-End Sales Pipeline Automation",
    description:
      "Fully automated lead generation system that scrapes prospects, enriches data with AI, scores leads, and triggers personalized email outreach sequences.",
    stack: ["n8n", "Clay", "OpenAI", "Instantly", "Google Sheets"],
    impact: "3x increase in qualified leads",
    stat: "3x",
    statLabel: "more leads",
  },
  {
    title: "Multi-App Business Workflow",
    subtitle: "CRM + Email + Slack Automation Hub",
    description:
      "Centralized automation hub connecting HubSpot, Gmail, Slack, Notion, and Stripe. New deals auto-create projects, channels, and email sequences—zero manual entry.",
    stack: ["Zapier", "HubSpot API", "Slack API", "Notion API", "Stripe"],
    impact: "20+ hours of weekly work eliminated",
    stat: "20+",
    statLabel: "hrs saved/week",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Big stat heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Automation that delivers{" "}
            <span className="text-[#FF4444]">measurable ROI</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Trusted by businesses that value their time. And hundreds of hours
            saved.
          </p>
        </div>

        {/* 2x2 project card grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative p-5 sm:p-8 border border-white/[0.08] rounded-xl bg-white/[0.02] border-t-2 border-t-[#FF4444] hover:bg-white/[0.04] active:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,68,68,0.08)]"
            >
              {/* Impact stat */}
              <div className="mb-4 sm:mb-5">
                <span className="text-3xl sm:text-4xl font-bold text-[#FF4444]">
                  {project.stat}
                </span>
                <span className="text-xs sm:text-sm text-white/40 ml-2">
                  {project.statLabel}
                </span>
              </div>

              {/* Title + subtitle */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 group-hover:text-[#FF6B6B] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/40 mb-3 sm:mb-4">{project.subtitle}</p>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-4 sm:mb-6">
                {project.description}
              </p>

              {/* Stack pills — horizontal scroll on small screens */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] bg-white/5 text-white/50 border border-white/[0.08] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, lazy, Suspense, type ComponentType } from "react";

const ChatbotDemo = lazy(() =>
  import("./demos/ChatbotDemo").then((m) => ({ default: m.ChatbotDemo }))
);
const VoiceAgentDemo = lazy(() =>
  import("./demos/VoiceAgentDemo").then((m) => ({ default: m.VoiceAgentDemo }))
);
const WorkflowDemo = lazy(() =>
  import("./demos/WorkflowDemo").then((m) => ({ default: m.WorkflowDemo }))
);
const AgentDemo = lazy(() =>
  import("./demos/AgentDemo").then((m) => ({ default: m.AgentDemo }))
);
const LeadGenDemo = lazy(() =>
  import("./demos/LeadGenDemo").then((m) => ({ default: m.LeadGenDemo }))
);
const DataExtractDemo = lazy(() =>
  import("./demos/DataExtractDemo").then((m) => ({
    default: m.DataExtractDemo,
  }))
);

interface ServiceItem {
  title: string;
  fullTitle: string;
  description: string;
  tags: string[];
  Demo: ComponentType;
}

const services: ServiceItem[] = [
  {
    title: "AI Chatbots",
    fullTitle: "AI Chatbots & Customer Support",
    description:
      "Custom AI chatbots trained on your business data using RAG. Deploy on your website, WhatsApp, or Telegram to handle FAQs, qualify leads, and provide 24/7 support—so your team focuses on what matters.",
    tags: ["RAG", "Knowledge Base", "Multi-channel"],
    Demo: ChatbotDemo,
  },
  {
    title: "Voice Agents",
    fullTitle: "AI Voice Agents",
    description:
      "Intelligent phone agents that answer calls, book appointments, handle follow-ups, and route inquiries—just like a real receptionist, but available around the clock with instant response times.",
    tags: ["Phone", "Scheduling", "Follow-ups"],
    Demo: VoiceAgentDemo,
  },
  {
    title: "Workflow Automation",
    fullTitle: "Workflow Automation",
    description:
      "End-to-end business process automation using n8n, Make, and Zapier. Connect your CRM, email, Slack, Sheets, and 5,000+ apps into workflows that eliminate manual busywork.",
    tags: ["n8n", "Make", "Zapier"],
    Demo: WorkflowDemo,
  },
  {
    title: "AI Agents",
    fullTitle: "AI Agents & Autonomous Systems",
    description:
      "Custom AI agents that research, analyze, decide, and execute multi-step tasks autonomously. From data analysis to content generation to smart email responders—agents that think and act.",
    tags: ["Autonomous", "Multi-step", "Decision-making"],
    Demo: AgentDemo,
  },
  {
    title: "Lead Generation",
    fullTitle: "Lead Generation & Sales Automation",
    description:
      "Automated lead capture, enrichment, and nurture sequences. From scraping and qualifying prospects to personalized outreach—build a pipeline that fills itself while you sleep.",
    tags: ["Scraping", "Enrichment", "Outreach"],
    Demo: LeadGenDemo,
  },
  {
    title: "Data Extraction",
    fullTitle: "Data Extraction & Document Processing",
    description:
      "AI-powered extraction from websites, PDFs, invoices, and unstructured data. Transform messy information into clean, structured datasets ready for analysis or integration.",
    tags: ["Web Scraping", "PDF/Invoice", "ETL"],
    Demo: DataExtractDemo,
  },
];

function DemoSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0D0D0D] items-center justify-center">
      <div className="flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:0ms]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:150ms]" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce [animation-delay:300ms]" />
      </div>
      <span className="text-[11px] text-white/20 mt-3">Loading demo...</span>
    </div>
  );
}

export function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const active = services[activeTab];
  const ActiveDemo = active.Demo;

  return (
    <section
      id="services"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            What I Build
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            High-demand AI automation services that save time, cut costs, and
            scale your operations.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === index
                  ? "bg-[#FF4444] text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div className="border border-white/[0.08] rounded-xl bg-white/[0.02] overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[480px]">
            {/* Left - text content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF4444] animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest text-[#FF6B6B] font-medium">
                  Live Demo
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {active.fullTitle}
              </h3>
              <p className="text-white/50 leading-relaxed mb-6">
                {active.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wider uppercase px-3 py-1.5 bg-[#FF4444]/10 text-[#FF6B6B] border border-[#FF4444]/15 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Interactive Demo */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#0D0D0D] h-[480px]">
              <Suspense fallback={<DemoSkeleton />}>
                <ActiveDemo key={activeTab} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

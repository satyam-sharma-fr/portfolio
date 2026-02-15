"use client";

import { lazy, Suspense, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import {
  HoverSlider,
  TextStaggerHover,
  useHoverSliderContext,
} from "@/components/ui/animated-slideshow";

const AgentDemo = lazy(() =>
  import("./demos/AgentDemo").then((m) => ({ default: m.AgentDemo }))
);
const VoiceAgentDemo = lazy(() =>
  import("./demos/VoiceAgentDemo").then((m) => ({ default: m.VoiceAgentDemo }))
);
const WorkflowDemo = lazy(() =>
  import("./demos/WorkflowDemo").then((m) => ({ default: m.WorkflowDemo }))
);
const SaaSDemo = lazy(() =>
  import("./demos/SaaSDemo").then((m) => ({ default: m.SaaSDemo }))
);
const RAGDemo = lazy(() =>
  import("./demos/RAGDemo").then((m) => ({ default: m.RAGDemo }))
);
const ComputerVisionDemo = lazy(() =>
  import("./demos/ComputerVisionDemo").then((m) => ({
    default: m.ComputerVisionDemo,
  }))
);
const FineTuningDemo = lazy(() =>
  import("./demos/FineTuningDemo").then((m) => ({
    default: m.FineTuningDemo,
  }))
);
const InternalToolsDemo = lazy(() =>
  import("./demos/InternalToolsDemo").then((m) => ({
    default: m.InternalToolsDemo,
  }))
);
const APIIntegrationDemo = lazy(() =>
  import("./demos/APIIntegrationDemo").then((m) => ({
    default: m.APIIntegrationDemo,
  }))
);
const ConsultingDemo = lazy(() =>
  import("./demos/ConsultingDemo").then((m) => ({
    default: m.ConsultingDemo,
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
    title: "AI Agents",
    fullTitle: "AI Agents & Autonomous Systems",
    description:
      "Custom AI agents that research, analyze, decide, and execute multi-step tasks autonomously. From intelligent chatbots and customer support to data analysis, content generation, and smart email responders — agents that think, act, and get things done 24/7.",
    tags: ["Autonomous", "Multi-step", "RAG", "Tool Use"],
    Demo: AgentDemo,
  },
  {
    title: "Voice Agents",
    fullTitle: "AI Voice Agents",
    description:
      "Intelligent phone agents that answer calls, book appointments, handle follow-ups, and route inquiries — just like a real receptionist, but available around the clock with instant response times.",
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
    title: "AI App Dev",
    fullTitle: "AI App Development & Rapid MVP Building",
    description:
      "Full-stack AI-powered apps and SaaS products built at speed using vibe coding and modern AI tooling. From idea to deployed product — custom dashboards, internal tools, AI-native apps, and MVPs shipped in days, not months.",
    tags: ["Vibe Coding", "Full-Stack", "MVP", "SaaS"],
    Demo: SaaSDemo,
  },
  {
    title: "RAG & Knowledge",
    fullTitle: "RAG & Knowledge Base Systems",
    description:
      "Enterprise knowledge search, semantic document retrieval, and AI-powered Q&A over your company data. Build intelligent wikis, support systems, and search engines that actually understand context — not just keywords.",
    tags: ["Vector DB", "Embeddings", "Enterprise Search"],
    Demo: RAGDemo,
  },
  {
    title: "Computer Vision",
    fullTitle: "Computer Vision & Image AI",
    description:
      "Document OCR, product image classification, visual QA, defect detection, and receipt scanning. AI that sees and understands — from manufacturing quality control to automated document processing.",
    tags: ["OCR", "Image Classification", "Visual AI"],
    Demo: ComputerVisionDemo,
  },
  {
    title: "Fine-Tuning",
    fullTitle: "Fine-Tuning & Custom Model Training",
    description:
      "Fine-tune LLMs for your specific business use case — custom tone, domain-specific language, proprietary data. From LoRA adapters to full fine-tunes, plus model distillation for cost optimization at scale.",
    tags: ["LoRA", "QLoRA", "Domain-specific"],
    Demo: FineTuningDemo,
  },
  {
    title: "Internal Tools",
    fullTitle: "AI-Powered Internal Tools",
    description:
      "Custom admin panels, CRM enhancements, inventory systems, HR tools — all with AI baked in. Purpose-built internal tools that automate decisions, surface insights, and make your team 10x faster.",
    tags: ["Admin Panels", "Custom CRM", "Dashboards"],
    Demo: InternalToolsDemo,
  },
  {
    title: "API & Integrations",
    fullTitle: "API & Integration Development",
    description:
      "Custom API development to connect AI models to your existing business systems — ERP, CRM, payment gateways, legacy systems. The glue layer that makes AI actually useful in your stack.",
    tags: ["API Dev", "System Integration", "Webhooks"],
    Demo: APIIntegrationDemo,
  },
  {
    title: "AI Consulting",
    fullTitle: "AI Consulting & Readiness Audit",
    description:
      "Assess your business's AI readiness, identify automation opportunities, and get a clear implementation roadmap with ROI estimates. A high-impact starting point that turns into real results.",
    tags: ["Strategy", "AI Audit", "Roadmap"],
    Demo: ConsultingDemo,
  },
];

/* ─── Skeleton for lazy-loaded demos ─── */

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

/* ─── Sub-components that read from HoverSlider context ─── */

function ServiceNameItem({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const { activeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <div className="flex items-center gap-3 md:gap-4">
      <span
        className={cn(
          "text-[11px] font-mono tabular-nums transition-colors duration-300 shrink-0 select-none",
          isActive ? "text-[#FF4444]" : "text-white/15"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <TextStaggerHover
        index={index}
        text={service.title}
        className="cursor-pointer text-xl sm:text-2xl lg:text-[1.65rem] xl:text-[1.85rem] font-bold uppercase tracking-tighter text-white"
      />
    </div>
  );
}

function ServiceDetails() {
  const { activeSlide } = useHoverSliderContext();
  const active = services[activeSlide];

  return (
    <div className="min-h-[120px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg md:text-xl font-semibold text-white">
              {active.fullTitle}
            </h3>
            <div className="inline-flex items-center gap-1.5 shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#FF6B6B] font-medium">
                Live Demo
              </span>
            </div>
          </div>

          <p className="text-white/45 text-sm leading-relaxed mb-3">
            {active.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase px-2.5 py-1 bg-[#FF4444]/10 text-[#FF6B6B]/80 border border-[#FF4444]/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DemoPanel() {
  const { activeSlide } = useHoverSliderContext();
  const ActiveDemo = services[activeSlide].Demo;

  return (
    <div className="border border-white/[0.08] rounded-xl bg-[#0D0D0D] overflow-hidden h-[380px] sm:h-[420px] lg:h-[480px]">
      <Suspense fallback={<DemoSkeleton />}>
        <ActiveDemo key={activeSlide} />
      </Suspense>
    </div>
  );
}

/* ─── Main section ─── */

export function Services() {
  return (
    <section
      id="services"
      className="relative z-[1] py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            What I Build
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            High-demand AI automation services that save time, cut costs, and
            scale your operations.
          </p>
        </div>

        {/* Two-column layout: sidebar nav + info & demo panel */}
        <HoverSlider>
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12">
            {/* Left — service names: horizontal scroll on mobile, vertical on desktop */}
            <div className="flex flex-col justify-center">
              {/* Mobile: horizontal scrollable tabs */}
              <div className="lg:hidden -mx-6 px-6">
                <div className="flex gap-2 overflow-x-auto pb-3 scroll-touch snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {services.map((service, index) => (
                    <div key={service.title} className="snap-start shrink-0">
                      <ServiceNameItem service={service} index={index} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: vertical list */}
              <div className="hidden lg:flex flex-col space-y-2">
                {services.map((service, index) => (
                  <ServiceNameItem
                    key={service.title}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Right — info + demo stacked */}
            <div className="flex flex-col gap-5">
              <ServiceDetails />
              <DemoPanel />
            </div>
          </div>
        </HoverSlider>
      </div>
    </section>
  );
}

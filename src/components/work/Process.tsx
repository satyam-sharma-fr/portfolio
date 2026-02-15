"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    description:
      "I deep-dive into your current workflows, map every manual process, and identify the biggest time sinks. You get a clear picture of what's costing you hours every week — and exactly where automation will have the highest ROI.",
    deliverables: [
      "Full workflow audit report",
      "Bottleneck & time-sink analysis",
      "Automation roadmap ranked by ROI",
    ],
    outcome: "47 hrs/week",
    outcomeLabel: "of manual work identified on average",
  },
  {
    number: "02",
    title: "Solution Design",
    description:
      "I architect the entire automation system — selecting the right platforms, AI models, and integrations for your specific needs. You see exactly how everything connects before a single thing is built.",
    deliverables: [
      "System architecture diagram",
      "Integration & data flow map",
      "Tool & platform recommendations",
    ],
    outcome: "Zero surprises",
    outcomeLabel: "every connection mapped upfront",
  },
  {
    number: "03",
    title: "Build & Train",
    description:
      "Rapid development of your automation stack — workflows, AI agents, chatbots, and integrations. AI models are trained on your actual business data so they understand your context from day one.",
    deliverables: [
      "Working automation workflows",
      "AI models trained on your data",
      "All integrations connected & tested",
    ],
    outcome: "Under 2 weeks",
    outcomeLabel: "from design to working system",
  },
  {
    number: "04",
    title: "Test & Deploy",
    description:
      "Rigorous testing with real-world scenarios, edge cases, and load testing at 10x your current volume. Once everything passes, the system goes live with monitoring, alerts, and automatic rollback.",
    deliverables: [
      "200+ scenario test coverage",
      "Edge case & load validation",
      "Live deployment with monitoring",
    ],
    outcome: "99.7%",
    outcomeLabel: "accuracy on edge cases",
  },
  {
    number: "05",
    title: "Monitor & Optimize",
    description:
      "Post-launch, I continuously monitor performance, refine AI accuracy, and optimize workflow speed. You get real-time dashboards and regular reports showing exactly how your automation performs.",
    deliverables: [
      "Real-time performance dashboard",
      "Weekly optimization reports",
      "Continuous AI accuracy refinement",
    ],
    outcome: "24/7",
    outcomeLabel: "monitoring & continuous improvement",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white/[0.02]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Go from <span className="text-[#FF4444]">idea</span> to{" "}
            <span className="text-[#FF4444]">autopilot</span> in days
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A proven 5-step process. No busywork. No maintenance headaches. Just
            results.
          </p>
        </div>

        {/* ===== Desktop: Sticky Left + Scrolling Right ===== */}
        <div className="hidden md:grid md:grid-cols-[2fr_3fr] gap-12 lg:gap-20">
          {/* Left sticky panel */}
          <div className="sticky top-0 h-screen flex flex-col justify-center">
            {/* Animated step number + title — all rendered, only active visible */}
            <div className="relative h-[180px] lg:h-[210px] mb-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    i === activeStep
                      ? "opacity-100 translate-y-0"
                      : i < activeStep
                        ? "opacity-0 -translate-y-8"
                        : "opacity-0 translate-y-8"
                  }`}
                  aria-hidden={i !== activeStep}
                >
                  <span className="block text-[110px] lg:text-[140px] font-bold text-[#FF4444]/[0.07] font-mono leading-none select-none">
                    {step.number}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-white -mt-5 lg:-mt-6">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Vertical progress tracker */}
            <div className="relative pl-7">
              {/* Background track */}
              <div className="absolute left-[7px] top-[8px] bottom-[8px] w-[2px] bg-white/[0.06] rounded-full" />
              {/* Animated fill */}
              <div
                className="absolute left-[7px] top-[8px] w-[2px] rounded-full bg-gradient-to-b from-[#FF4444] to-[#FF4444]/30 transition-all duration-700 ease-out"
                style={{
                  height:
                    steps.length > 1
                      ? `${(activeStep / (steps.length - 1)) * 100}%`
                      : "0%",
                }}
              />

              <nav className="flex flex-col gap-7" aria-label="Process steps">
                {steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      stepRefs.current[i]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }}
                    className="flex items-center gap-4 relative text-left group"
                    aria-current={i === activeStep ? "step" : undefined}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute -left-7 w-[16px] h-[16px] rounded-full border-2 transition-all duration-500 ${
                        i === activeStep
                          ? "border-[#FF4444] bg-[#FF4444] shadow-[0_0_14px_rgba(255,68,68,0.5)]"
                          : i < activeStep
                            ? "border-[#FF4444]/40 bg-[#FF4444]/20"
                            : "border-white/10 bg-transparent"
                      }`}
                    />
                    {/* Label */}
                    <span
                      className={`text-sm transition-all duration-300 ${
                        i === activeStep
                          ? "text-white font-medium translate-x-0.5"
                          : "text-white/25 group-hover:text-white/50"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right scrollable panels */}
          <div>
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="min-h-[85vh] flex items-center py-8"
              >
                <div
                  className={`w-full p-8 lg:p-10 border rounded-2xl transition-all duration-500 ${
                    i === activeStep
                      ? "border-white/[0.1] bg-white/[0.03] shadow-[0_0_80px_rgba(255,68,68,0.03)]"
                      : "border-white/[0.06] bg-white/[0.01] opacity-50"
                  }`}
                >
                  {/* Step label line */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono text-[#FF4444] font-semibold tracking-wider">
                      STEP {step.number}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-8">
                    <h4 className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium mb-4">
                      What you get
                    </h4>
                    <ul className="space-y-3">
                      {step.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-white/50"
                        >
                          <svg
                            className="w-4 h-4 text-[#FF4444] shrink-0 mt-0.5"
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
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome stat card */}
                  <div className="p-5 rounded-xl bg-[#FF4444]/[0.04] border border-[#FF4444]/10">
                    <span className="text-2xl lg:text-3xl font-bold text-[#FF4444]">
                      {step.outcome}
                    </span>
                    <p className="text-white/40 text-sm mt-1">
                      {step.outcomeLabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Mobile: Stacked timeline cards ===== */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-7 sm:pl-8">
              {/* Timeline track */}
              <div
                className={`absolute left-[7px] top-0 w-[2px] ${
                  i === 0 ? "h-1/2 top-1/2" : i === steps.length - 1 ? "h-1/2" : "h-full"
                } bg-white/[0.06]`}
              />
              {/* Dot */}
              <div className="absolute left-0 top-7 w-[16px] h-[16px] rounded-full border-2 border-[#FF4444] bg-[#FF4444] shadow-[0_0_10px_rgba(255,68,68,0.3)]" />

              {/* Card */}
              <div className="py-3 sm:py-4">
                <div className="p-4 sm:p-6 border border-white/[0.08] rounded-xl bg-white/[0.02]">
                  {/* Step header */}
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-[#FF4444]/15 font-mono">
                      {step.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/50 text-[13px] sm:text-sm leading-relaxed mb-4 sm:mb-5">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 sm:gap-2.5 text-[13px] sm:text-sm text-white/40"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-[#FF4444] shrink-0 mt-0.5"
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
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Outcome stat */}
                  <div className="p-3 sm:p-4 rounded-lg bg-[#FF4444]/[0.04] border border-[#FF4444]/10">
                    <span className="text-lg sm:text-xl font-bold text-[#FF4444]">
                      {step.outcome}
                    </span>
                    <p className="text-white/40 text-[11px] sm:text-xs mt-0.5">
                      {step.outcomeLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

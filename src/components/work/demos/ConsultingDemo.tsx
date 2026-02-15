"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Consulting deck slides ─────────────────────────────── */

interface Slide {
  label: string;
  title: string;
  content: React.ReactNode;
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1 rounded-full bg-white/[0.06]">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

const slides: Slide[] = [
  {
    label: "Overview",
    title: "Executive Summary",
    content: (
      <div className="space-y-3">
        <p className="text-[11px] text-white/50 leading-relaxed">
          Following a comprehensive audit of your operations, we identified{" "}
          <span className="text-white/80 font-medium">7 high-impact AI
          opportunities</span>{" "}
          across customer support, sales, and operations — with a combined
          estimated savings of{" "}
          <span className="text-emerald-400 font-medium">$214K/year</span>.
        </p>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            { label: "AI Readiness", value: "42/100", sub: "Early Stage" },
            { label: "Opportunities", value: "7", sub: "High Impact" },
            { label: "Est. Savings", value: "$214K", sub: "Per Year" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
            >
              <p className="text-[13px] text-white/80 font-semibold">
                {stat.value}
              </p>
              <p className="text-[8px] text-white/25 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Findings",
    title: "Key Findings",
    content: (
      <div className="space-y-2.5">
        {[
          {
            area: "Customer Support",
            score: 30,
            color: "#FF4444",
            finding: "100% manual — 4h avg response time, no self-service",
          },
          {
            area: "Sales Pipeline",
            score: 50,
            color: "#F59E0B",
            finding: "CRM in place but no lead scoring or automated follow-ups",
          },
          {
            area: "Operations",
            score: 45,
            color: "#F59E0B",
            finding: "Spreadsheet-based inventory, no demand forecasting",
          },
          {
            area: "Data & Analytics",
            score: 35,
            color: "#FF4444",
            finding: "Siloed data, manual weekly reports, no dashboards",
          },
        ].map((item) => (
          <div key={item.area} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/55 font-medium">
                {item.area}
              </span>
              <span
                className="text-[9px] font-mono font-medium"
                style={{ color: item.color }}
              >
                {item.score}%
              </span>
            </div>
            <ProgressBar value={item.score} color={item.color} />
            <p className="text-[9px] text-white/30">{item.finding}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Opportunities",
    title: "AI Opportunities",
    content: (
      <div className="space-y-1.5">
        {[
          {
            name: "AI Support Chatbot",
            impact: "High",
            savings: "$62K/yr",
            effort: "2 weeks",
          },
          {
            name: "Lead Scoring Pipeline",
            impact: "High",
            savings: "$48K/yr",
            effort: "3 weeks",
          },
          {
            name: "Demand Forecasting",
            impact: "Medium",
            savings: "$35K/yr",
            effort: "4 weeks",
          },
          {
            name: "Automated Reporting",
            impact: "Medium",
            savings: "$28K/yr",
            effort: "1 week",
          },
          {
            name: "Email Automation",
            impact: "Medium",
            savings: "$22K/yr",
            effort: "1 week",
          },
          {
            name: "Content Generation",
            impact: "Low",
            savings: "$12K/yr",
            effort: "2 weeks",
          },
          {
            name: "Predictive Analytics",
            impact: "Low",
            savings: "$7K/yr",
            effort: "5 weeks",
          },
        ].map((opp) => (
          <div
            key={opp.name}
            className="flex items-center gap-2 px-2.5 py-2 rounded-md bg-white/[0.02] border border-white/[0.04]"
          >
            <span
              className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full ${
                opp.impact === "High"
                  ? "bg-[#FF4444]/10 text-[#FF6B6B]"
                  : opp.impact === "Medium"
                    ? "bg-amber-500/10 text-amber-400"
                    : "bg-blue-500/10 text-blue-400"
              }`}
            >
              {opp.impact}
            </span>
            <span className="text-[10px] text-white/50 flex-1 truncate">
              {opp.name}
            </span>
            <span className="text-[9px] text-emerald-400/70 font-mono shrink-0">
              {opp.savings}
            </span>
            <span className="text-[8px] text-white/20 shrink-0">
              {opp.effort}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "ROI",
    title: "ROI Projection",
    content: (
      <div className="space-y-3">
        {/* Chart */}
        <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
          <p className="text-[8px] uppercase tracking-wider text-white/25 mb-2">
            Projected Monthly Savings
          </p>
          <div className="flex items-end gap-[3px] h-16">
            {[2, 5, 9, 14, 18, 22, 28, 34, 41, 52, 65, 78].map((val, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${(val / 78) * 100}%`,
                  backgroundColor:
                    i >= 9
                      ? "#10B981"
                      : i >= 6
                        ? "#F59E0B"
                        : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[7px] text-white/15">Month 1</span>
            <span className="text-[7px] text-white/15">Month 6</span>
            <span className="text-[7px] text-white/15">Month 12</span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Implementation Cost", value: "$32K", color: "text-white/70" },
            { label: "Annual Savings", value: "$214K", color: "text-emerald-400" },
            { label: "Payback Period", value: "~2 months", color: "text-white/70" },
            { label: "3-Year ROI", value: "1,906%", color: "text-emerald-400" },
          ].map((m) => (
            <div
              key={m.label}
              className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
            >
              <p className="text-[8px] text-white/25 mb-0.5">{m.label}</p>
              <p className={`text-[12px] font-semibold ${m.color}`}>
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Roadmap",
    title: "Implementation Roadmap",
    content: (
      <div className="space-y-2">
        {[
          {
            phase: "Phase 1 — Quick Wins",
            time: "Weeks 1–2",
            items: [
              "Deploy AI chatbot for support",
              "Automate email sequences",
              "Connect CRM to marketing",
            ],
          },
          {
            phase: "Phase 2 — Core Automation",
            time: "Weeks 3–6",
            items: [
              "AI lead scoring pipeline",
              "Demand forecasting model",
              "Automated reporting dashboard",
            ],
          },
          {
            phase: "Phase 3 — Intelligence",
            time: "Weeks 7–10",
            items: [
              "Custom AI sales agent",
              "Predictive analytics suite",
              "Full workflow orchestration",
            ],
          },
        ].map((phase, i) => (
          <div
            key={phase.phase}
            className="px-2.5 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    i === 0
                      ? "bg-[#FF4444]/15 text-[#FF6B6B]"
                      : i === 1
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-emerald-500/15 text-emerald-400"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-[10px] text-white/55 font-medium">
                  {phase.phase}
                </span>
              </div>
              <span className="text-[8px] text-white/20">{phase.time}</span>
            </div>
            <div className="space-y-0.5 ml-6">
              {phase.items.map((item) => (
                <p
                  key={item}
                  className="text-[9px] text-white/30 flex items-center gap-1.5"
                >
                  <span className="text-emerald-400/60">→</span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

/* ── Component ──────────────────────────────────────────── */

export function ConsultingDemo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      setIsAutoPlaying(false);
    },
    []
  );

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4444"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span className="text-xs text-white/50 font-medium">
            AI Consulting Deliverable
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-[9px] text-white/25 hover:text-white/50 transition-colors"
          >
            {isAutoPlaying ? "Pause" : "Play"}
          </button>
          <span className="text-[10px] text-white/20 font-mono">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>
      </div>

      {/* Slide nav tabs */}
      <div className="flex border-b border-white/[0.06] shrink-0">
        {slides.map((s, i) => (
          <button
            key={s.label}
            onClick={() => goToSlide(i)}
            className={`flex-1 py-2 text-[9px] font-medium transition-all relative ${
              i === currentSlide
                ? "text-white/70"
                : "text-white/20 hover:text-white/40"
            }`}
          >
            {s.label}
            {i === currentSlide && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF4444]" />
            )}
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        <h3 className="text-[13px] text-white/70 font-semibold mb-3">
          {slide.title}
        </h3>
        {slide.content}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] shrink-0">
        <button
          onClick={() =>
            goToSlide(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1
            )
          }
          className="text-[10px] text-white/25 hover:text-white/50 transition-colors"
        >
          ← Previous
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all ${
                i === currentSlide
                  ? "w-4 h-1.5 bg-[#FF4444]"
                  : "w-1.5 h-1.5 bg-white/10 hover:bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="text-[10px] text-white/25 hover:text-white/50 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

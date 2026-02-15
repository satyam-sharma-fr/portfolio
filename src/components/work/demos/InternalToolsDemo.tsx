"use client";

import { useState } from "react";

/* ── Simulated internal tool dashboard ───────────────────── */

interface ToolModule {
  name: string;
  icon: string;
  description: string;
  stats: { label: string; value: string }[];
  rows: { label: string; status: string; statusColor: string; value: string }[];
}

const tools: ToolModule[] = [
  {
    name: "AI-Powered CRM",
    icon: "👥",
    description: "Smart contact management with AI lead scoring, auto-enrichment, and predictive deal forecasting.",
    stats: [
      { label: "Active Contacts", value: "2,847" },
      { label: "Deals in Pipeline", value: "$1.2M" },
      { label: "Win Rate", value: "68%" },
    ],
    rows: [
      { label: "Acme Corp", status: "Hot", statusColor: "#10B981", value: "$45,000" },
      { label: "TechStart Inc", status: "Warm", statusColor: "#F59E0B", value: "$28,000" },
      { label: "DataFlow Ltd", status: "Hot", statusColor: "#10B981", value: "$67,000" },
      { label: "CloudBase", status: "New", statusColor: "#3B82F6", value: "$15,000" },
      { label: "AI Solutions", status: "Warm", statusColor: "#F59E0B", value: "$33,000" },
    ],
  },
  {
    name: "HR & Onboarding",
    icon: "📋",
    description: "Automated employee onboarding, document collection, training assignment, and compliance tracking.",
    stats: [
      { label: "Employees", value: "156" },
      { label: "Onboarding", value: "8" },
      { label: "Compliance", value: "98%" },
    ],
    rows: [
      { label: "Sarah Chen", status: "Day 2", statusColor: "#3B82F6", value: "Engineering" },
      { label: "Mike Ross", status: "Day 5", statusColor: "#3B82F6", value: "Sales" },
      { label: "Lisa Park", status: "Complete", statusColor: "#10B981", value: "Design" },
      { label: "James Lee", status: "Day 1", statusColor: "#F59E0B", value: "Marketing" },
      { label: "Anna Kim", status: "Complete", statusColor: "#10B981", value: "Product" },
    ],
  },
  {
    name: "Inventory Manager",
    icon: "📦",
    description: "AI demand forecasting, auto-reorder triggers, supplier management, and real-time stock alerts.",
    stats: [
      { label: "SKUs Tracked", value: "4,231" },
      { label: "Low Stock", value: "12" },
      { label: "Accuracy", value: "99.2%" },
    ],
    rows: [
      { label: "Widget Pro X", status: "Low", statusColor: "#FF4444", value: "23 units" },
      { label: "Sensor Module", status: "OK", statusColor: "#10B981", value: "456 units" },
      { label: "Power Supply", status: "Reorder", statusColor: "#F59E0B", value: "8 units" },
      { label: "Display Panel", status: "OK", statusColor: "#10B981", value: "189 units" },
      { label: "Cable Kit", status: "Low", statusColor: "#FF4444", value: "15 units" },
    ],
  },
];

export function InternalToolsDemo() {
  const [activeTool, setActiveTool] = useState(0);
  const tool = tools[activeTool];

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header with tool tabs */}
      <div className="flex items-center gap-1 px-3 py-2.5 border-b border-white/[0.08] overflow-x-auto">
        {tools.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActiveTool(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
              activeTool === i
                ? "bg-[#FF4444]/10 text-[#FF6B6B] border border-[#FF4444]/20"
                : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
            }`}
          >
            <span className="text-xs">{t.icon}</span>
            {t.name}
          </button>
        ))}
      </div>

      {/* Dashboard content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        <div className="space-y-4">
          {/* Description */}
          <p className="text-[11px] text-white/40 leading-relaxed">
            {tool.description}
          </p>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-2">
            {tool.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center"
              >
                <p className="text-[14px] text-white/80 font-semibold">
                  {stat.value}
                </p>
                <p className="text-[9px] text-white/30 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Data table */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {/* Table header */}
            <div className="flex items-center px-3 py-2 border-b border-white/[0.06] text-[9px] text-white/30 uppercase tracking-wider">
              <span className="flex-1">Name</span>
              <span className="w-16 text-center">Status</span>
              <span className="w-20 text-right">Value</span>
            </div>

            {/* Table rows */}
            {tool.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center px-3 py-2.5 text-[11px] ${
                  i < tool.rows.length - 1 ? "border-b border-white/[0.04]" : ""
                } hover:bg-white/[0.02] transition-colors`}
              >
                <span className="flex-1 text-white/60">{row.label}</span>
                <span className="w-16 text-center">
                  <span
                    className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                    style={{
                      backgroundColor: `${row.statusColor}15`,
                      color: row.statusColor,
                    }}
                  >
                    {row.status}
                  </span>
                </span>
                <span className="w-20 text-right text-white/40 font-mono text-[10px]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* AI insight bar */}
          <div className="px-3 py-2.5 rounded-xl bg-[#FF4444]/5 border border-[#FF4444]/15">
            <div className="flex items-start gap-2">
              <span className="text-xs mt-0.5">🧠</span>
              <div>
                <p className="text-[10px] text-[#FF6B6B] font-medium mb-0.5">
                  AI Insight
                </p>
                <p className="text-[10px] text-white/40 leading-relaxed">
                  {activeTool === 0 &&
                    "2 deals are predicted to close this week based on engagement patterns. Recommend following up with Acme Corp — they've viewed the proposal 4 times."}
                  {activeTool === 1 &&
                    "Sarah Chen's onboarding is on track. Auto-assigned 3 training modules based on her role. Compliance docs are 90% complete."}
                  {activeTool === 2 &&
                    "Widget Pro X and Cable Kit need restock. AI predicts stockout in 5 days based on current burn rate. Auto-purchase order drafted for approval."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

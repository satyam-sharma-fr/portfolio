"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  type Node,
  type Edge,
  Position,
  Handle,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ── Custom Node ──────────────────────────────────────────── */

interface WorkflowNodeData {
  label: string;
  description: string;
  icon: string;
  color: string;
  badge?: string;
  [key: string]: unknown;
}

function WorkflowNode({ data }: NodeProps<Node<WorkflowNodeData>>) {
  return (
    <div
      className="relative px-3.5 py-2.5 rounded-xl border bg-[#141414] min-w-[140px] max-w-[170px] transition-all duration-200 hover:shadow-lg group"
      style={{
        borderColor: `${data.color}30`,
        boxShadow: `0 0 24px ${data.color}08`,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !border-0 !rounded-full"
        style={{ background: data.color }}
      />

      {data.badge && (
        <div
          className="absolute -top-2 -right-2 text-[8px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            background: `${data.color}20`,
            color: data.color,
            border: `1px solid ${data.color}40`,
          }}
        >
          {data.badge}
        </div>
      )}

      <div className="flex items-start gap-2">
        <span className="text-base shrink-0 mt-0.5">{data.icon}</span>
        <div className="min-w-0">
          <div
            className="text-[11px] font-semibold mb-0.5 truncate"
            style={{ color: data.color }}
          >
            {data.label}
          </div>
          <div className="text-[9px] text-white/35 leading-snug">
            {data.description}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !border-0 !rounded-full"
        style={{ background: data.color }}
      />
    </div>
  );
}

/* ── Nodes ────────────────────────────────────────────────── */

const COL = [0, 240, 460, 700, 920, 1160, 1400];

const initialNodes: Node<WorkflowNodeData>[] = [
  // ─── Layer 0: Triggers ───
  {
    id: "trigger-webhook",
    type: "workflow",
    position: { x: COL[0], y: 30 },
    data: {
      label: "Webhook Trigger",
      description: "HubSpot new deal created",
      icon: "⚡",
      color: "#FF4444",
      badge: "TRIGGER",
    },
  },
  {
    id: "trigger-form",
    type: "workflow",
    position: { x: COL[0], y: 160 },
    data: {
      label: "Form Submit",
      description: "Typeform response received",
      icon: "📋",
      color: "#FF4444",
      badge: "TRIGGER",
    },
  },
  {
    id: "trigger-email",
    type: "workflow",
    position: { x: COL[0], y: 290 },
    data: {
      label: "Email Inbound",
      description: "Gmail parser + classifier",
      icon: "📨",
      color: "#FF4444",
      badge: "TRIGGER",
    },
  },

  // ─── Layer 1: Preprocessing ───
  {
    id: "merge",
    type: "workflow",
    position: { x: COL[1], y: 95 },
    data: {
      label: "Merge & Dedupe",
      description: "Combine all lead sources",
      icon: "🔄",
      color: "#F59E0B",
    },
  },
  {
    id: "validate",
    type: "workflow",
    position: { x: COL[1], y: 240 },
    data: {
      label: "Validate Schema",
      description: "Check required fields",
      icon: "✅",
      color: "#F59E0B",
    },
  },

  // ─── Layer 2: Enrichment (parallel) ───
  {
    id: "enrich",
    type: "workflow",
    position: { x: COL[2], y: 20 },
    data: {
      label: "Enrich Contact",
      description: "Apollo + Clearbit lookup",
      icon: "🔍",
      color: "#3B82F6",
    },
  },
  {
    id: "scrape",
    type: "workflow",
    position: { x: COL[2], y: 150 },
    data: {
      label: "Scrape Company",
      description: "Website & LinkedIn data",
      icon: "🌐",
      color: "#3B82F6",
    },
  },
  {
    id: "history",
    type: "workflow",
    position: { x: COL[2], y: 280 },
    data: {
      label: "Fetch History",
      description: "Past interactions & deals",
      icon: "📂",
      color: "#3B82F6",
    },
  },

  // ─── Layer 3: AI Processing ───
  {
    id: "ai-score",
    type: "workflow",
    position: { x: COL[3], y: 70 },
    data: {
      label: "AI Lead Score",
      description: "GPT-4o fit analysis",
      icon: "🧠",
      color: "#8B5CF6",
      badge: "AI",
    },
  },
  {
    id: "sentiment",
    type: "workflow",
    position: { x: COL[3], y: 220 },
    data: {
      label: "Sentiment Check",
      description: "Intent & urgency detection",
      icon: "💬",
      color: "#8B5CF6",
      badge: "AI",
    },
  },

  // ─── Layer 4: Routing ───
  {
    id: "router",
    type: "workflow",
    position: { x: COL[4], y: 145 },
    data: {
      label: "Quality Gate",
      description: "Route by score + intent",
      icon: "🔀",
      color: "#F59E0B",
    },
  },

  // ─── Layer 5: Action Branches ───
  {
    id: "slack",
    type: "workflow",
    position: { x: COL[5], y: 0 },
    data: {
      label: "Slack #hot-leads",
      description: "Alert sales team instantly",
      icon: "🔔",
      color: "#10B981",
    },
  },
  {
    id: "task",
    type: "workflow",
    position: { x: COL[5], y: 110 },
    data: {
      label: "Create Task",
      description: "Asana follow-up + deadline",
      icon: "📌",
      color: "#10B981",
    },
  },
  {
    id: "email-seq",
    type: "workflow",
    position: { x: COL[5], y: 220 },
    data: {
      label: "Email Sequence",
      description: "SendGrid 5-step drip",
      icon: "📧",
      color: "#EC4899",
    },
  },
  {
    id: "archive",
    type: "workflow",
    position: { x: COL[5], y: 330 },
    data: {
      label: "Log & Archive",
      description: "Google Sheets + tag cold",
      icon: "🗂️",
      color: "#6B7280",
    },
  },

  // ─── Layer 6: Final Actions ───
  {
    id: "calendar",
    type: "workflow",
    position: { x: COL[6], y: 50 },
    data: {
      label: "Book Meeting",
      description: "Calendly auto-schedule",
      icon: "📅",
      color: "#10B981",
    },
  },
  {
    id: "crm",
    type: "workflow",
    position: { x: COL[6], y: 170 },
    data: {
      label: "Sync to CRM",
      description: "HubSpot deal + notes",
      icon: "📊",
      color: "#06B6D4",
    },
  },
  {
    id: "error",
    type: "workflow",
    position: { x: COL[6], y: 300 },
    data: {
      label: "Error Handler",
      description: "Retry 3× then alert ops",
      icon: "🚨",
      color: "#EF4444",
      badge: "FALLBACK",
    },
  },
];

/* ── Edges ────────────────────────────────────────────────── */

const initialEdges: Edge[] = [
  // Triggers → Merge
  { id: "e-t1", source: "trigger-webhook", target: "merge", animated: true, style: { stroke: "#FF444450" } },
  { id: "e-t2", source: "trigger-form", target: "merge", animated: true, style: { stroke: "#FF444450" } },
  { id: "e-t3", source: "trigger-email", target: "merge", animated: true, style: { stroke: "#FF444450" } },

  // Merge → Validate
  { id: "e-mv", source: "merge", target: "validate", animated: true, style: { stroke: "#F59E0B50" } },

  // Merge → Enrichment (parallel fan-out)
  { id: "e-me", source: "merge", target: "enrich", animated: true, style: { stroke: "#3B82F650" } },
  { id: "e-ms", source: "validate", target: "scrape", animated: true, style: { stroke: "#3B82F650" } },
  { id: "e-mh", source: "validate", target: "history", animated: true, style: { stroke: "#3B82F650" } },

  // Enrichment → AI Processing
  { id: "e-ea", source: "enrich", target: "ai-score", animated: true, style: { stroke: "#8B5CF650" } },
  { id: "e-sa", source: "scrape", target: "ai-score", animated: true, style: { stroke: "#8B5CF650" } },
  { id: "e-hs", source: "history", target: "sentiment", animated: true, style: { stroke: "#8B5CF650" } },

  // AI → Router
  { id: "e-ar", source: "ai-score", target: "router", animated: true, style: { stroke: "#F59E0B50" } },
  { id: "e-sr", source: "sentiment", target: "router", animated: true, style: { stroke: "#F59E0B50" } },

  // Router → Hot path (score > 85)
  {
    id: "e-rs",
    source: "router",
    target: "slack",
    animated: true,
    label: "Hot >85",
    labelStyle: { fill: "#10B981", fontSize: 9, fontWeight: 600 },
    labelBgStyle: { fill: "#0D0D0D", fillOpacity: 0.8 },
    style: { stroke: "#10B98160" },
  },
  {
    id: "e-rt",
    source: "router",
    target: "task",
    animated: true,
    label: "Hot >85",
    labelStyle: { fill: "#10B981", fontSize: 9, fontWeight: 600 },
    labelBgStyle: { fill: "#0D0D0D", fillOpacity: 0.8 },
    style: { stroke: "#10B98160" },
  },

  // Router → Warm path (score 50-85)
  {
    id: "e-re",
    source: "router",
    target: "email-seq",
    animated: true,
    label: "Warm",
    labelStyle: { fill: "#EC4899", fontSize: 9, fontWeight: 600 },
    labelBgStyle: { fill: "#0D0D0D", fillOpacity: 0.8 },
    style: { stroke: "#EC489960" },
  },

  // Router → Cold path (score < 50)
  {
    id: "e-ra",
    source: "router",
    target: "archive",
    animated: true,
    label: "Cold",
    labelStyle: { fill: "#6B7280", fontSize: 9, fontWeight: 600 },
    labelBgStyle: { fill: "#0D0D0D", fillOpacity: 0.8 },
    style: { stroke: "#6B728060" },
  },

  // Hot path → Final
  { id: "e-sc", source: "slack", target: "calendar", animated: true, style: { stroke: "#10B98150" } },
  { id: "e-tc", source: "task", target: "crm", animated: true, style: { stroke: "#10B98150" } },
  { id: "e-cc", source: "calendar", target: "crm", animated: true, style: { stroke: "#06B6D450" } },

  // Warm path → CRM
  { id: "e-ec", source: "email-seq", target: "crm", animated: true, style: { stroke: "#EC489950" } },

  // Archive → Error handler (re-queue)
  { id: "e-ae", source: "archive", target: "error", animated: true, style: { stroke: "#6B728050" } },

  // Error handler feedback loop (to CRM for logging)
  { id: "e-er", source: "error", target: "crm", animated: true, style: { stroke: "#EF444440", strokeDasharray: "6 3" } },
];

/* ── Component ────────────────────────────────────────────── */

export function WorkflowDemo() {
  const nodeTypes = useMemo(() => ({ workflow: WorkflowNode }), []);

  const onInit = useCallback((instance: { fitView: () => void }) => {
    instance.fitView();
  }, []);

  return (
    <div className="h-full w-full bg-[#0D0D0D] relative">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.2}
        maxZoom={1.5}
        defaultEdgeOptions={{ type: "smoothstep" }}
        proOptions={{ hideAttribution: true }}
        className="[&_.react-flow__controls]:!bg-[#1a1a1a] [&_.react-flow__controls]:!border-white/10 [&_.react-flow__controls]:!rounded-lg [&_.react-flow__controls-button]:!bg-transparent [&_.react-flow__controls-button]:!border-white/10 [&_.react-flow__controls-button]:!fill-white/50 [&_.react-flow__controls-button:hover]:!bg-white/10"
      >
        <Background color="#ffffff08" gap={20} size={1} />
      </ReactFlow>

      {/* Stats overlay */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3">
        <div className="px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10px] text-white/30">
          18 nodes · 22 connections
        </div>
        <div className="px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10px] flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400/70">Live</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.06] flex items-center gap-3 text-[9px] text-white/30">
        <span className="flex items-center gap-1"><span className="w-2 h-1 rounded-full bg-[#FF4444]" />Triggers</span>
        <span className="flex items-center gap-1"><span className="w-2 h-1 rounded-full bg-[#8B5CF6]" />AI</span>
        <span className="flex items-center gap-1"><span className="w-2 h-1 rounded-full bg-[#10B981]" />Hot</span>
        <span className="flex items-center gap-1"><span className="w-2 h-1 rounded-full bg-[#EC4899]" />Warm</span>
        <span className="flex items-center gap-1"><span className="w-2 h-1 rounded-full bg-[#6B7280]" />Cold</span>
      </div>

      {/* Hint */}
      <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10px] text-white/30 pointer-events-none">
        Scroll to zoom · Drag to pan
      </div>
    </div>
  );
}

"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
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
  [key: string]: unknown;
}

function WorkflowNode({ data }: NodeProps<Node<WorkflowNodeData>>) {
  return (
    <div
      className="relative px-4 py-3 rounded-xl border bg-[#141414] min-w-[160px] transition-all duration-200 hover:shadow-lg group"
      style={{
        borderColor: `${data.color}30`,
        boxShadow: `0 0 20px ${data.color}10`,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !border-0 !rounded-full"
        style={{ background: data.color }}
      />

      <div className="flex items-start gap-2.5">
        <span className="text-lg shrink-0 mt-0.5">{data.icon}</span>
        <div>
          <div
            className="text-xs font-semibold mb-0.5"
            style={{ color: data.color }}
          >
            {data.label}
          </div>
          <div className="text-[10px] text-white/40 leading-snug">
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

/* ── Nodes & Edges ────────────────────────────────────────── */

const initialNodes: Node<WorkflowNodeData>[] = [
  {
    id: "trigger",
    type: "workflow",
    position: { x: 0, y: 120 },
    data: {
      label: "New Deal Created",
      description: "HubSpot webhook trigger",
      icon: "⚡",
      color: "#FF4444",
    },
  },
  {
    id: "enrich",
    type: "workflow",
    position: { x: 250, y: 40 },
    data: {
      label: "Enrich Contact",
      description: "Pull LinkedIn + company data",
      icon: "🔍",
      color: "#3B82F6",
    },
  },
  {
    id: "score",
    type: "workflow",
    position: { x: 250, y: 200 },
    data: {
      label: "AI Lead Score",
      description: "GPT-4o analyzes fit",
      icon: "🧠",
      color: "#8B5CF6",
    },
  },
  {
    id: "decision",
    type: "workflow",
    position: { x: 500, y: 120 },
    data: {
      label: "Score > 80?",
      description: "Route by lead quality",
      icon: "🔀",
      color: "#F59E0B",
    },
  },
  {
    id: "slack",
    type: "workflow",
    position: { x: 750, y: 40 },
    data: {
      label: "Notify Sales",
      description: "Slack #hot-leads channel",
      icon: "💬",
      color: "#10B981",
    },
  },
  {
    id: "email",
    type: "workflow",
    position: { x: 750, y: 200 },
    data: {
      label: "Email Sequence",
      description: "Auto-nurture campaign",
      icon: "📧",
      color: "#EC4899",
    },
  },
  {
    id: "crm",
    type: "workflow",
    position: { x: 1000, y: 120 },
    data: {
      label: "Update CRM",
      description: "Sync deal stage + notes",
      icon: "📊",
      color: "#06B6D4",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "trigger",
    target: "enrich",
    animated: true,
    style: { stroke: "#FF444460" },
  },
  {
    id: "e2",
    source: "trigger",
    target: "score",
    animated: true,
    style: { stroke: "#FF444460" },
  },
  {
    id: "e3",
    source: "enrich",
    target: "decision",
    animated: true,
    style: { stroke: "#3B82F660" },
  },
  {
    id: "e4",
    source: "score",
    target: "decision",
    animated: true,
    style: { stroke: "#8B5CF660" },
  },
  {
    id: "e5",
    source: "decision",
    target: "slack",
    animated: true,
    label: "Hot",
    labelStyle: { fill: "#10B981", fontSize: 10 },
    style: { stroke: "#10B98160" },
  },
  {
    id: "e6",
    source: "decision",
    target: "email",
    animated: true,
    label: "Warm",
    labelStyle: { fill: "#EC489960", fontSize: 10 },
    style: { stroke: "#EC489960" },
  },
  {
    id: "e7",
    source: "slack",
    target: "crm",
    animated: true,
    style: { stroke: "#10B98160" },
  },
  {
    id: "e8",
    source: "email",
    target: "crm",
    animated: true,
    style: { stroke: "#EC489960" },
  },
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
        minZoom={0.3}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
        proOptions={{ hideAttribution: true }}
        className="[&_.react-flow__controls]:!bg-[#1a1a1a] [&_.react-flow__controls]:!border-white/10 [&_.react-flow__controls]:!rounded-lg [&_.react-flow__controls-button]:!bg-transparent [&_.react-flow__controls-button]:!border-white/10 [&_.react-flow__controls-button]:!fill-white/50 [&_.react-flow__controls-button:hover]:!bg-white/10"
      >
        <Background color="#ffffff08" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="!bottom-3 !right-3 !left-auto"
        />
      </ReactFlow>

      {/* Overlay hint */}
      <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/[0.06] text-[10px] text-white/30 pointer-events-none">
        Scroll to zoom · Drag to pan
      </div>
    </div>
  );
}

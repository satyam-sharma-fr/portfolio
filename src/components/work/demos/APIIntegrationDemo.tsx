"use client";

import { useState, useEffect } from "react";

/* ── Simulated API integration flow ──────────────────────── */

interface APINode {
  id: string;
  name: string;
  icon: string;
  type: "source" | "middleware" | "destination";
  color: string;
}

interface DataPacket {
  id: number;
  from: string;
  to: string;
  label: string;
  status: "pending" | "in-flight" | "delivered";
}

const apiNodes: APINode[] = [
  { id: "shopify", name: "Shopify", icon: "🛍️", type: "source", color: "#95BF47" },
  { id: "stripe", name: "Stripe", icon: "💳", type: "source", color: "#635BFF" },
  { id: "api", name: "Your API", icon: "⚡", type: "middleware", color: "#FF4444" },
  { id: "crm", name: "HubSpot", icon: "🔶", type: "destination", color: "#FF7A59" },
  { id: "slack", name: "Slack", icon: "💬", type: "destination", color: "#4A154B" },
  { id: "db", name: "PostgreSQL", icon: "🗄️", type: "destination", color: "#336791" },
];

const integrationFlows = [
  {
    name: "E-Commerce Sync",
    description: "New Shopify orders sync to HubSpot CRM, trigger Slack alerts, and update your database — all through a unified API layer.",
    packets: [
      { id: 1, from: "shopify", to: "api", label: "New Order #4821" },
      { id: 2, from: "stripe", to: "api", label: "Payment $149.00" },
      { id: 3, from: "api", to: "crm", label: "Create Deal" },
      { id: 4, from: "api", to: "slack", label: "Alert: New Sale!" },
      { id: 5, from: "api", to: "db", label: "INSERT order_data" },
    ],
  },
  {
    name: "Payment Reconciliation",
    description: "Stripe webhooks processed through your API — payment matching, refund handling, and real-time financial reporting.",
    packets: [
      { id: 1, from: "stripe", to: "api", label: "Webhook: payment.succeeded" },
      { id: 2, from: "api", to: "db", label: "UPDATE payment_status" },
      { id: 3, from: "api", to: "crm", label: "Update Deal Stage" },
      { id: 4, from: "shopify", to: "api", label: "Fulfill Order" },
      { id: 5, from: "api", to: "slack", label: "Revenue +$149" },
    ],
  },
];

export function APIIntegrationDemo() {
  const [activeFlow, setActiveFlow] = useState<number | null>(null);
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [currentPacket, setCurrentPacket] = useState(-1);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (activeFlow === null) return;

    const flow = integrationFlows[activeFlow];
    const initialPackets: DataPacket[] = flow.packets.map((p) => ({
      ...p,
      status: "pending" as const,
    }));
    setPackets(initialPackets);
    setCurrentPacket(-1);
    setIsDone(false);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < flow.packets.length) {
        setCurrentPacket(idx);
        setPackets((prev) =>
          prev.map((p, i) =>
            i === idx
              ? { ...p, status: "in-flight" }
              : i < idx
                ? { ...p, status: "delivered" }
                : p
          )
        );
        idx++;
      } else {
        setPackets((prev) => prev.map((p) => ({ ...p, status: "delivered" })));
        setIsDone(true);
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [activeFlow]);

  const getNode = (id: string) => apiNodes.find((n) => n.id === id);

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
          </svg>
          <span className="text-xs text-white/50 font-mono">
            API Integration Hub
          </span>
        </div>
        {isDone && (
          <span className="text-[10px] text-emerald-400 font-medium">
            All synced
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {activeFlow === null ? (
          /* ── Flow selection ── */
          <div className="space-y-4">
            {/* Connected services */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium mb-2">
                Connected Services
              </p>
              <div className="grid grid-cols-3 gap-2">
                {apiNodes.map((node) => (
                  <div
                    key={node.id}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                  >
                    <span className="text-lg">{node.icon}</span>
                    <span className="text-[10px] text-white/40">{node.name}</span>
                    <div
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Flow options */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium mb-2">
                Integration Flows
              </p>
              <div className="space-y-2">
                {integrationFlows.map((flow, i) => (
                  <button
                    key={flow.name}
                    onClick={() => setActiveFlow(i)}
                    className="w-full text-left px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                  >
                    <p className="text-[12px] text-white/70 font-medium group-hover:text-white/90 transition-colors">
                      {flow.name}
                    </p>
                    <p className="text-[10px] text-white/30 mt-1 leading-relaxed">
                      {flow.description.slice(0, 80)}...
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {flow.packets.slice(0, 3).map((p) => {
                        const fromNode = getNode(p.from);
                        return (
                          <span key={p.id} className="text-xs">{fromNode?.icon}</span>
                        );
                      })}
                      <span className="text-[10px] text-white/20 ml-1">
                        {flow.packets.length} operations
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── Active flow visualization ── */
          <div className="space-y-4">
            {/* Flow info */}
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[12px] text-white/70 font-medium">
                {integrationFlows[activeFlow].name}
              </p>
              <p className="text-[10px] text-white/30 mt-1 leading-relaxed">
                {integrationFlows[activeFlow].description}
              </p>
            </div>

            {/* Data flow packets */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                Data Flow
              </p>
              {packets.map((packet, i) => {
                const fromNode = getNode(packet.from);
                const toNode = getNode(packet.to);
                const isActive = i === currentPacket;
                const isDelivered = packet.status === "delivered";

                return (
                  <div
                    key={packet.id}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#FF4444]/10 border border-[#FF4444]/20"
                        : isDelivered
                          ? "bg-white/[0.02]"
                          : "opacity-30"
                    }`}
                  >
                    {/* From */}
                    <div className="flex items-center gap-1.5 min-w-[60px]">
                      <span className="text-xs">{fromNode?.icon}</span>
                      <span className="text-[10px] text-white/40">{fromNode?.name}</span>
                    </div>

                    {/* Arrow */}
                    <div className="flex-1 flex items-center gap-1">
                      <div className="flex-1 h-px bg-white/[0.08] relative">
                        {isActive && (
                          <div
                            className="absolute inset-y-0 left-0 h-px bg-[#FF4444]"
                            style={{
                              animation: "flowLine 0.9s ease-in-out",
                              width: "100%",
                            }}
                          />
                        )}
                      </div>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#FF4444" : "rgba(255,255,255,0.15)"} strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>

                    {/* To */}
                    <div className="flex items-center gap-1.5 min-w-[60px]">
                      <span className="text-xs">{toNode?.icon}</span>
                      <span className="text-[10px] text-white/40">{toNode?.name}</span>
                    </div>

                    {/* Status */}
                    <div className="w-4 text-center">
                      {isDelivered && (
                        <span className="text-[10px] text-emerald-400">✓</span>
                      )}
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse mx-auto" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Packet detail */}
            {currentPacket >= 0 && (
              <div className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] text-white/30 font-mono">
                  {packets[Math.min(currentPacket, packets.length - 1)]?.label}
                </span>
              </div>
            )}

            {/* Response codes */}
            {isDone && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <div className="px-3 py-3 rounded-xl bg-emerald-400/5 border border-emerald-400/15">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-medium">
                      All Operations Successful
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">{packets.length}</p>
                      <p className="text-[9px] text-white/30">API Calls</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">200</p>
                      <p className="text-[9px] text-white/30">Status</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">142ms</p>
                      <p className="text-[9px] text-white/30">Avg Latency</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveFlow(null);
                    setPackets([]);
                    setCurrentPacket(-1);
                    setIsDone(false);
                  }}
                  className="w-full text-[11px] text-white/30 hover:text-white/50 py-2 transition-colors"
                >
                  ← Try another flow
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes flowLine {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

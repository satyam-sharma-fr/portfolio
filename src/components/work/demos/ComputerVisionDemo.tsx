"use client";

import { useState } from "react";

/* ── Simulated computer vision analysis ──────────────────── */

interface Detection {
  label: string;
  confidence: number;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SceneAnalysis {
  name: string;
  thumbnail: string;
  description: string;
  detections: Detection[];
  tags: string[];
}

const scenes: SceneAnalysis[] = [
  {
    name: "Retail Shelf",
    thumbnail: "🏪",
    description: "Product inventory monitoring — detect stock levels, misplaced items, and empty shelves in real-time.",
    detections: [
      { label: "Product A", confidence: 0.97, color: "#10B981", x: 8, y: 15, w: 25, h: 30 },
      { label: "Product B", confidence: 0.94, color: "#3B82F6", x: 38, y: 12, w: 22, h: 35 },
      { label: "Empty Slot", confidence: 0.91, color: "#FF4444", x: 65, y: 18, w: 28, h: 28 },
      { label: "Price Tag", confidence: 0.88, color: "#F59E0B", x: 12, y: 60, w: 15, h: 10 },
    ],
    tags: ["Inventory", "Stock Detection", "Planogram Compliance"],
  },
  {
    name: "Document OCR",
    thumbnail: "📄",
    description: "Extract structured data from invoices, receipts, and forms — amounts, dates, line items with 99%+ accuracy.",
    detections: [
      { label: "Header", confidence: 0.99, color: "#8B5CF6", x: 5, y: 5, w: 90, h: 12 },
      { label: "Amount", confidence: 0.98, color: "#10B981", x: 60, y: 25, w: 30, h: 8 },
      { label: "Line Items", confidence: 0.96, color: "#3B82F6", x: 5, y: 38, w: 90, h: 30 },
      { label: "Signature", confidence: 0.92, color: "#F59E0B", x: 55, y: 75, w: 35, h: 15 },
    ],
    tags: ["OCR", "Invoice Processing", "Data Extraction"],
  },
  {
    name: "Quality Control",
    thumbnail: "🔧",
    description: "Automated defect detection on manufacturing lines — scratches, dents, color variations flagged instantly.",
    detections: [
      { label: "Surface OK", confidence: 0.99, color: "#10B981", x: 5, y: 10, w: 40, h: 45 },
      { label: "Scratch", confidence: 0.94, color: "#FF4444", x: 55, y: 20, w: 20, h: 15 },
      { label: "Dent", confidence: 0.89, color: "#FF4444", x: 50, y: 55, w: 18, h: 18 },
      { label: "Color OK", confidence: 0.97, color: "#10B981", x: 10, y: 65, w: 35, h: 25 },
    ],
    tags: ["Defect Detection", "Manufacturing", "Quality Assurance"],
  },
];

export function ComputerVisionDemo() {
  const [activeScene, setActiveScene] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDetections, setShowDetections] = useState(false);

  const analyze = (index: number) => {
    setActiveScene(index);
    setIsAnalyzing(true);
    setShowDetections(false);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDetections(true);
    }, 1500);
  };

  const scene = activeScene !== null ? scenes[activeScene] : null;

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span className="text-xs text-white/50 font-mono">
            Vision AI Analyzer
          </span>
        </div>
        {showDetections && scene && (
          <span className="text-[10px] text-emerald-400">
            {scene.detections.length} objects detected
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {activeScene === null ? (
          /* ── Scene selection ── */
          <div className="space-y-4">
            <div className="text-center py-2">
              <p className="text-[13px] text-white/60 font-medium mb-1">
                Select a scene to analyze
              </p>
              <p className="text-[11px] text-white/30">
                AI will detect and classify objects in real-time
              </p>
            </div>

            <div className="space-y-2">
              {scenes.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => analyze(i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all text-left group"
                >
                  <span className="text-2xl">{s.thumbnail}</span>
                  <div className="flex-1">
                    <p className="text-[12px] text-white/70 font-medium group-hover:text-white/90 transition-colors">
                      {s.name}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5 leading-relaxed">
                      {s.description.slice(0, 60)}...
                    </p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20 group-hover:text-white/50 transition-colors">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Analysis view ── */
          <div className="space-y-4">
            {/* Image area with detections */}
            <div className="relative rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden aspect-[4/3]">
              {/* Simulated image background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl opacity-20">{scene?.thumbnail}</span>
              </div>

              {/* Grid overlay */}
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }} />

              {/* Scanning animation */}
              {isAnalyzing && (
                <div className="absolute inset-0">
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF4444] to-transparent animate-scan"
                    style={{
                      animation: "scan 1.5s ease-in-out infinite",
                    }}
                  />
                </div>
              )}

              {/* Detection boxes */}
              {showDetections && scene?.detections.map((det, i) => (
                <div
                  key={i}
                  className="absolute border-2 rounded-sm transition-all duration-500"
                  style={{
                    left: `${det.x}%`,
                    top: `${det.y}%`,
                    width: `${det.w}%`,
                    height: `${det.h}%`,
                    borderColor: det.color,
                    animation: `fadeIn 0.3s ease ${i * 0.15}s both`,
                  }}
                >
                  <span
                    className="absolute -top-4 left-0 text-[8px] font-mono px-1 rounded-sm"
                    style={{ backgroundColor: det.color, color: "#000" }}
                  >
                    {det.label} {(det.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}

              {/* Analysis overlay */}
              {isAnalyzing && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse" />
                  <span className="text-[10px] text-white/60">Analyzing...</span>
                </div>
              )}
            </div>

            {/* Description */}
            {showDetections && scene && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <p className="text-[12px] text-white/50 leading-relaxed">
                  {scene.description}
                </p>

                {/* Detections list */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                    Detections
                  </p>
                  {scene.detections.map((det, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02]"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: det.color }}
                      />
                      <span className="text-[11px] text-white/50 flex-1">
                        {det.label}
                      </span>
                      <span className="text-[10px] font-mono text-white/30">
                        {(det.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {scene.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-2 py-1 rounded-full bg-[#FF4444]/10 text-[#FF6B6B] border border-[#FF4444]/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setActiveScene(null);
                    setShowDetections(false);
                  }}
                  className="w-full text-[11px] text-white/30 hover:text-white/50 py-2 transition-colors"
                >
                  ← Analyze another scene
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

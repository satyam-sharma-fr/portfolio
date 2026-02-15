"use client";

import { useState, useEffect, useRef } from "react";

/* ── Simulated fine-tuning dashboard ─────────────────────── */

interface TrainingMetric {
  epoch: number;
  loss: number;
  accuracy: number;
  valLoss: number;
  valAccuracy: number;
}

const trainingData: TrainingMetric[] = [
  { epoch: 1, loss: 2.31, accuracy: 0.42, valLoss: 2.28, valAccuracy: 0.44 },
  { epoch: 2, loss: 1.87, accuracy: 0.56, valLoss: 1.92, valAccuracy: 0.54 },
  { epoch: 3, loss: 1.43, accuracy: 0.67, valLoss: 1.51, valAccuracy: 0.65 },
  { epoch: 4, loss: 1.02, accuracy: 0.76, valLoss: 1.18, valAccuracy: 0.73 },
  { epoch: 5, loss: 0.71, accuracy: 0.83, valLoss: 0.94, valAccuracy: 0.79 },
  { epoch: 6, loss: 0.48, accuracy: 0.88, valLoss: 0.76, valAccuracy: 0.84 },
  { epoch: 7, loss: 0.31, accuracy: 0.92, valLoss: 0.62, valAccuracy: 0.88 },
  { epoch: 8, loss: 0.19, accuracy: 0.95, valLoss: 0.54, valAccuracy: 0.91 },
];

const modelConfigs = [
  { name: "Customer Support Bot", base: "GPT-4o-mini", dataset: "12,400 conversations", method: "LoRA" },
  { name: "Legal Doc Analyzer", base: "Llama 3.1 8B", dataset: "8,200 documents", method: "QLoRA" },
  { name: "Code Review Agent", base: "CodeLlama 13B", dataset: "45,000 PRs", method: "Full Fine-tune" },
];

export function FineTuningDemo() {
  const [selectedConfig, setSelectedConfig] = useState<number | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Draw loss chart */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || currentEpoch === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const padding = { top: 10, right: 10, bottom: 20, left: 30 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "9px monospace";
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const val = (2.5 - (2.5 / 4) * i).toFixed(1);
      const y = padding.top + (chartH / 4) * i;
      ctx.fillText(val, padding.left - 5, y + 3);
    }

    const data = trainingData.slice(0, currentEpoch);
    const maxLoss = 2.5;

    const getX = (epoch: number) => padding.left + ((epoch - 1) / 7) * chartW;
    const getY = (loss: number) => padding.top + (1 - loss / maxLoss) * chartH;

    // Training loss line
    if (data.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = "#FF4444";
      ctx.lineWidth = 2;
      data.forEach((d, i) => {
        const x = getX(d.epoch);
        const y = getY(d.loss);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Validation loss line
      ctx.beginPath();
      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      data.forEach((d, i) => {
        const x = getX(d.epoch);
        const y = getY(d.valLoss);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Dots
    data.forEach((d) => {
      // Training
      ctx.beginPath();
      ctx.fillStyle = "#FF4444";
      ctx.arc(getX(d.epoch), getY(d.loss), 3, 0, Math.PI * 2);
      ctx.fill();
      // Validation
      ctx.beginPath();
      ctx.fillStyle = "#3B82F6";
      ctx.arc(getX(d.epoch), getY(d.valLoss), 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // X-axis labels
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "9px monospace";
    ctx.textAlign = "center";
    data.forEach((d) => {
      ctx.fillText(`E${d.epoch}`, getX(d.epoch), h - 4);
    });
  }, [currentEpoch]);

  const startTraining = (configIndex: number) => {
    setSelectedConfig(configIndex);
    setIsTraining(true);
    setCurrentEpoch(0);
    setIsDone(false);

    let epoch = 0;
    const interval = setInterval(() => {
      epoch++;
      setCurrentEpoch(epoch);
      if (epoch >= trainingData.length) {
        clearInterval(interval);
        setIsTraining(false);
        setIsDone(true);
      }
    }, 700);
  };

  const config = selectedConfig !== null ? modelConfigs[selectedConfig] : null;
  const currentMetrics = currentEpoch > 0 ? trainingData[currentEpoch - 1] : null;

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="2">
            <path d="M12 20V10" />
            <path d="M18 20V4" />
            <path d="M6 20v-4" />
          </svg>
          <span className="text-xs text-white/50 font-mono">
            Model Fine-Tuning Lab
          </span>
        </div>
        {isTraining && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444] animate-pulse" />
            <span className="text-[10px] text-white/40">
              Epoch {currentEpoch}/{trainingData.length}
            </span>
          </div>
        )}
        {isDone && (
          <span className="text-[10px] text-emerald-400 font-medium">
            Training Complete
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {selectedConfig === null ? (
          /* ── Model selection ── */
          <div className="space-y-4">
            <div className="text-center py-2">
              <p className="text-[13px] text-white/60 font-medium mb-1">
                Choose a fine-tuning job
              </p>
              <p className="text-[11px] text-white/30">
                Watch the model train in real-time with live metrics
              </p>
            </div>

            <div className="space-y-2">
              {modelConfigs.map((cfg, i) => (
                <button
                  key={cfg.name}
                  onClick={() => startTraining(i)}
                  className="w-full text-left px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[12px] text-white/70 font-medium group-hover:text-white/90 transition-colors">
                      {cfg.name}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF4444]/10 text-[#FF6B6B] border border-[#FF4444]/15">
                      {cfg.method}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/30">
                    <span>Base: {cfg.base}</span>
                    <span>·</span>
                    <span>{cfg.dataset}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Training view ── */
          <div className="space-y-4">
            {/* Config info */}
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-white/70 font-medium">
                  {config?.name}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF4444]/10 text-[#FF6B6B]">
                  {config?.method}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-white/30">
                <span>{config?.base}</span>
                <span>·</span>
                <span>{config?.dataset}</span>
              </div>
            </div>

            {/* Loss chart */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/40 font-medium">
                  Loss Curve
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-0.5 bg-[#FF4444] rounded-full" />
                    <span className="text-[9px] text-white/30">Train</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-0.5 bg-[#3B82F6] rounded-full" style={{ borderBottom: "1px dashed #3B82F6" }} />
                    <span className="text-[9px] text-white/30">Val</span>
                  </div>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                className="w-full h-[120px]"
                style={{ imageRendering: "auto" }}
              />
            </div>

            {/* Live metrics */}
            {currentMetrics && (
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-[14px] text-[#FF4444] font-semibold tabular-nums">
                    {currentMetrics.loss.toFixed(3)}
                  </p>
                  <p className="text-[9px] text-white/30">Train Loss</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-[14px] text-[#3B82F6] font-semibold tabular-nums">
                    {currentMetrics.valLoss.toFixed(3)}
                  </p>
                  <p className="text-[9px] text-white/30">Val Loss</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-[14px] text-emerald-400 font-semibold tabular-nums">
                    {(currentMetrics.accuracy * 100).toFixed(1)}%
                  </p>
                  <p className="text-[9px] text-white/30">Train Acc</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
                  <p className="text-[14px] text-emerald-400/70 font-semibold tabular-nums">
                    {(currentMetrics.valAccuracy * 100).toFixed(1)}%
                  </p>
                  <p className="text-[9px] text-white/30">Val Acc</p>
                </div>
              </div>
            )}

            {/* Completion */}
            {isDone && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <div className="px-3 py-3 rounded-xl bg-emerald-400/5 border border-emerald-400/15">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-medium">
                      Model Ready for Deployment
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">95.0%</p>
                      <p className="text-[9px] text-white/30">Final Acc</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">0.190</p>
                      <p className="text-[9px] text-white/30">Final Loss</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-white/70 font-semibold">8</p>
                      <p className="text-[9px] text-white/30">Epochs</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedConfig(null);
                    setCurrentEpoch(0);
                    setIsDone(false);
                  }}
                  className="w-full text-[11px] text-white/30 hover:text-white/50 py-2 transition-colors"
                >
                  ← Train another model
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

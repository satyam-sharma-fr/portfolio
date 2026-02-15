"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Clock,
  DollarSign,
  ArrowRight,
  Check,
  ArrowLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface FeatureBreakdown {
  feature: string;
  timeEstimate: string;
  costEstimate: string;
}

export interface EstimateResult {
  timeEstimate: string;
  costEstimate: string;
  complexity: "Simple" | "Moderate" | "Complex" | "Enterprise";
  features: FeatureBreakdown[];
  recommendations: string[];
  summary: string;
}

/* ------------------------------------------------------------------ */
/*  Animated text — fades in after a delay                             */
/* ------------------------------------------------------------------ */

function AnimatedValue({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {text}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Complexity badge                                                   */
/* ------------------------------------------------------------------ */

function ComplexityBadge({ level }: { level: EstimateResult["complexity"] }) {
  const config: Record<string, string> = {
    Simple: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    Moderate: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Complex: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    Enterprise: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        config[level] || config.Moderate
      )}
    >
      {level}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 } as const,
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 24 },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface EstimateResultsProps {
  result: EstimateResult;
  name: string;
}

export function EstimateResults({ result, name }: EstimateResultsProps) {
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-white/40 hover:text-white text-sm flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em]">
            Your Estimate
          </p>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-12 sm:py-16">
        <motion.div
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Celebration header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 12,
                delay: 0.1,
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF4444]/20 to-[#FF6B6B]/5 border border-[#FF4444]/10 mb-6"
            >
              <Sparkles className="w-8 h-8 text-[#FF4444]" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              Hey {firstName}, your estimate is ready!
            </h1>
            <p className="text-white/35 text-base">
              AI-powered analysis based on your project requirements
            </p>
          </motion.div>

          {/* Summary card with key metrics */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-6"
          >
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              {result.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Timeline */}
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
                <Clock className="w-5 h-5 text-white/20 mx-auto mb-2" />
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1 font-medium">
                  Timeline
                </p>
                <p className="text-lg font-bold text-white">
                  <AnimatedValue text={result.timeEstimate} delay={400} />
                </p>
              </div>

              {/* Cost — highlighted */}
              <div className="rounded-xl bg-[#FF4444]/[0.06] border border-[#FF4444]/15 p-4 text-center">
                <DollarSign className="w-5 h-5 text-[#FF4444]/40 mx-auto mb-2" />
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1 font-medium">
                  Estimated Cost
                </p>
                <p className="text-lg font-bold text-[#FF4444]">
                  <AnimatedValue text={result.costEstimate} delay={600} />
                </p>
              </div>

              {/* Complexity */}
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
                <div className="w-5 h-5 mx-auto mb-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                </div>
                <p className="text-white/30 text-[10px] uppercase tracking-wider mb-2 font-medium">
                  Complexity
                </p>
                <ComplexityBadge level={result.complexity} />
              </div>
            </div>
          </motion.div>

          {/* Feature breakdown */}
          {result.features.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-6"
            >
              <h2 className="text-lg font-bold text-white mb-5">
                Feature Breakdown
              </h2>
              <div className="space-y-0">
                {result.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0"
                  >
                    <p className="text-white/60 text-sm font-medium">
                      {f.feature}
                    </p>
                    <div className="flex items-center gap-5 text-right shrink-0 ml-4">
                      <span className="text-white/20 text-xs hidden sm:block">
                        {f.timeEstimate}
                      </span>
                      <span className="text-white/45 text-sm font-medium min-w-[100px] text-right">
                        {f.costEstimate}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 mb-10"
            >
              <h2 className="text-lg font-bold text-white mb-5">
                Our Recommendations
              </h2>
              <ul className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FF4444]/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#FF4444]" />
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {rec}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Disclaimer */}
          <motion.p
            variants={itemVariants}
            className="text-white/15 text-xs text-center mb-10 max-w-md mx-auto leading-relaxed"
          >
            This estimate is AI-generated and intended as a rough guide. Actual
            costs and timelines may vary based on detailed requirements, scope
            changes, and technical complexity.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center pb-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#FF4444] to-[#FF6B6B] text-white font-semibold rounded-full shadow-[0_0_30px_rgba(255,68,68,0.25)] hover:shadow-[0_0_40px_rgba(255,68,68,0.4)] transition-all duration-300 text-base"
            >
              Let&apos;s Discuss Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-white/15 text-xs mt-4">
              Free 30-minute consultation — no commitment required
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

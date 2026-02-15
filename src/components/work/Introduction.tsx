"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ── Animated number counter ─────────────────────────────────── */

function AnimatedCounter({
  to,
  suffix = "",
  label,
}: {
  to: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 40, damping: 30 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionVal.set(to);
  }, [isInView, to, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
        {display}
        <span className="text-[#FF4444]">{suffix}</span>
      </p>
      <p className="text-white/40 text-[11px] sm:text-sm mt-1 sm:mt-2">{label}</p>
    </div>
  );
}

/* ── Scroll-reveal variant ───────────────────────────────────── */

const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

/* ── Section ─────────────────────────────────────────────────── */

export function Introduction() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative z-[1] py-20 sm:py-36 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden pointer-events-none"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50%, rgba(255,68,68,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* ── Manifesto heading ── */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.2]">
          <motion.span
            className="block text-white/50"
            variants={reveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
          >
            Most businesses don&apos;t have an automation problem.
          </motion.span>

          <motion.span
            className="block mt-3 md:mt-5"
            variants={reveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
          >
            <span className="text-white/50">They have a </span>
            <em className="text-white">
              &ldquo;where do I even start&rdquo;
            </em>
            <span className="text-white/50"> problem.</span>
          </motion.span>
        </h2>

        {/* ── Punchline ── */}
        <motion.p
          className="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl text-[#FF4444] font-medium"
          variants={reveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
        >
          That&apos;s where I come in.
        </motion.p>

        {/* ── Decorative divider ── */}
        <motion.div
          className="mx-auto mt-16 md:mt-20 mb-16 md:mb-20 flex items-center gap-3 max-w-[200px]"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4444]/50" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 1.0,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <AnimatedCounter to={50} suffix="+" label="Businesses Automated" />
          <AnimatedCounter to={100} suffix="K+" label="Hours Saved" />
          <AnimatedCounter to={48} suffix="h" label="To First Automation" />
        </motion.div>
      </div>
    </section>
  );
}

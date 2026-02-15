"use client";

import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { PulseBeams, type BeamPath } from "@/components/ui/pulse-beams";

const TICKER_ITEMS = [
  "Zapier Automation",
  "Make / Integromat",
  "n8n Workflows",
  "AI Agents",
  "CRM Automation",
  "ChatGPT Integration",
  "Lead Nurturing",
  "Invoice Automation",
];

const ESTIMATE_BEAMS: BeamPath[] = [
  {
    path: "M170 100H60C54.5 100 50 95.5 50 90V30",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.2,
      },
    },
  },
  {
    path: "M330 100H440C445.5 100 450 95.5 450 90V30",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.8,
      },
    },
  },
  {
    path: "M200 150V185C200 190.5 195.5 195 190 195H45",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.4,
      },
    },
  },
  {
    path: "M300 150V185C300 190.5 304.5 195 310 195H455",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: {
        x1: "0%",
        x2: "10%",
        y1: "-40%",
        y2: "-20%",
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.8,
      },
    },
  },
  {
    path: "M250 100V50C250 44.5 254.5 40 260 40H300",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.6,
      },
    },
  },
];

const ESTIMATE_GRADIENT_COLORS = {
  start: "#FF4444",
  middle: "#FF6B6B",
  end: "#FF4444",
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function SocialProofRow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <div className="flex items-center gap-4">
        {/* Stacked avatar circles */}
        <div className="flex -space-x-2.5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="" className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] object-cover" />
        </div>

        <div>
          {/* Star rating */}
          <div className="flex gap-0.5 mb-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="w-3.5 h-3.5 text-[#FF4444]" />
            ))}
          </div>
          {/* Text */}
          <p className="text-white/50 text-sm">
            Trusted by 50+ business owners worldwide
          </p>
        </div>
      </div>
    </div>
  );
}

function AvailableBadge({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-full px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
            style={{ animation: "green-pulse 2s ease-in-out infinite" }}
          />
          <p className="text-white text-sm font-medium leading-tight">Available for Projects</p>
        </div>
      </div>
    </div>
  );
}

function TickerBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] overflow-hidden opacity-0 pointer-events-none"
      style={{ animation: "hero-fade-in 0.6s ease-out 1s both" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-white/30 text-[11px] uppercase tracking-[0.15em] px-4 py-3 font-medium">
              {item}
            </span>
            <span className="text-[#FF4444] text-[6px]">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function WorkHero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">
      {/* Interactive boxes background — no overflow-hidden so grid extends into sections below */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
      </div>

      {/* Top-right red glow */}
      <div
        className="absolute -top-20 right-0 w-[800px] h-[600px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 20%, rgba(255,80,50,0.18) 0%, rgba(255,60,60,0.06) 40%, transparent 70%)",
          animation: "hero-fade-in 1.5s ease-out both",
        }}
      />

      {/* Scrolling ticker bar */}
      <TickerBar />

      {/* ===== Desktop: Two-column layout ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto hidden md:grid md:grid-cols-2 gap-8 items-center min-h-screen py-24 pointer-events-none">
        {/* --- Left column: Text + cards --- */}
        <div className="flex flex-col justify-center">
          {/* Heading — line by line staggered */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            <span
              className="block opacity-0"
              style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
            >
              Every Hour You Spend
            </span>
            <span
              className="block opacity-0"
              style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
            >
              on Repetitive Tasks
            </span>
            <span
              className="block opacity-0"
              style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}
            >
              is Money Left{" "}
              <span className="text-[#FF4444]">on the Table.</span>
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg lg:text-xl text-white/45 leading-relaxed max-w-lg mb-8 opacity-0"
            style={{ animation: "hero-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
          >
            One automation system can save your team{" "}
            <span className="text-white/70 font-medium">20+ hours a week</span>.
            <br />
            I build exactly that — tailored to your business, running in days.
          </p>

          {/* CTA buttons — slide in from left */}
          <div
            className="flex flex-wrap items-center gap-3 mb-8 opacity-0"
            style={{ animation: "hero-slide-left 0.6s cubic-bezier(0.16,1,0.3,1) 0.75s both" }}
          >
            <Link href="/contact" className="pointer-events-auto relative flex items-center gap-3 bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] rounded-2xl px-5 py-3 hover:bg-white/[0.1] transition-colors group">
              {/* FREE ribbon */}
              <div className="absolute -top-2.5 -right-2.5 bg-[#FF4444] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-[0_2px_12px_rgba(255,68,68,0.4)]">
                Free
              </div>

              <div className="flex -space-x-1">
                <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">Consultation</p>
                <p className="text-white/40 text-xs">Book Now</p>
              </div>
            </Link>

            <PulseBeams
              className="w-auto h-auto overflow-visible inline-flex"
              beams={ESTIMATE_BEAMS}
              width={500}
              height={250}
              baseColor="rgba(255,255,255,0.08)"
              accentColor="rgba(255,68,68,0.4)"
              gradientColors={ESTIMATE_GRADIENT_COLORS}
            >
              <Link
                href="/estimate"
                className="pointer-events-auto bg-[#141414] no-underline group cursor-pointer relative shadow-2xl shadow-red-950/30 rounded-full p-px font-semibold leading-6 text-white inline-block"
              >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,68,68,0.6)_0%,rgba(255,68,68,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex items-center gap-3 z-10 rounded-full bg-[#0A0A0A] px-6 py-3.5 ring-1 ring-white/10">
                  <svg className="w-5 h-5 text-[#FF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM19.5 8.25l.75-1.5.75 1.5 1.5.75-1.5.75-.75 1.5-.75-1.5-1.5-.75 1.5-.75z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-white to-neutral-200">AI Estimate</p>
                    <p className="text-white/50 text-xs">Free & Instant</p>
                  </div>
                </div>
              </Link>
            </PulseBeams>
          </div>

          {/* Social proof row — fades up */}
          <SocialProofRow
            className="mb-10 opacity-0"
            style={{ animation: "hero-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.9s both" }}
          />
        </div>

        {/* --- Right column: Photo + stats --- */}
        <div className="relative flex items-center justify-center">
          {/* Photo — slides in from right */}
          <div
            className="relative shrink-0 opacity-0"
            style={{ animation: "hero-slide-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/satyam.png"
              alt="Satyam — AI Automation Engineer"
              className="object-cover object-top w-[400px] lg:w-[460px] xl:w-[510px] h-auto max-h-[80vh] select-none"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 55%, transparent 90%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 55%, transparent 90%)",
              }}
            />

          </div>

          {/* Stats + Available badge — scales in */}
          <div
            className="absolute -right-4 lg:right-0 bottom-[20%] opacity-0 flex flex-col items-end gap-3"
            style={{ animation: "hero-scale-in 0.5s cubic-bezier(0.16,1,0.3,1) 1.1s both" }}
          >
            <div className="flex items-start gap-5 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl px-6 py-5">
              <div className="text-center">
                <p className="text-3xl xl:text-4xl font-bold text-white">70%</p>
                <p className="text-white/40 text-xs mt-1">Fewer Tickets</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl xl:text-4xl font-bold text-white">24/7</p>
                <p className="text-white/40 text-xs mt-1">AI Uptime</p>
              </div>
            </div>
            <AvailableBadge />
          </div>
        </div>
      </div>

      {/* ===== Mobile layout ===== */}
      <div className="relative z-10 md:hidden w-full pt-28 pb-10 pointer-events-none">
        <h1 className="text-3xl font-bold tracking-tight leading-[1.1] mb-4">
          <span
            className="block opacity-0"
            style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
          >
            Every Hour You Spend
          </span>
          <span
            className="block opacity-0"
            style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
          >
            on Repetitive Tasks
          </span>
          <span
            className="block opacity-0"
            style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both" }}
          >
            is Money Left{" "}
            <span className="text-[#FF4444]">on the Table.</span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-base text-white/45 leading-relaxed mb-6 opacity-0"
          style={{ animation: "hero-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both" }}
        >
          One automation system can save your team{" "}
          <span className="text-white/70 font-medium">20+ hours a week</span>.
          <br />
          I build exactly that — tailored to your business, running in days.
        </p>

        {/* Photo — slides up */}
        <div
          className="relative flex justify-center mb-6 -mx-6 opacity-0"
          style={{ animation: "hero-slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/satyam.png"
            alt="Satyam — AI Automation Engineer"
            className="object-cover object-top w-[320px] h-auto max-h-[50vh] select-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 85%)",
            }}
          />

        </div>

        {/* Available badge — below photo on mobile */}
        <div
          className="flex justify-center mb-4 opacity-0"
          style={{ animation: "hero-scale-in 0.5s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}
        >
          <AvailableBadge />
        </div>

        {/* Social proof row — fades up */}
        <SocialProofRow
          className="mb-6 opacity-0"
          style={{ animation: "hero-slide-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s both" }}
        />

        {/* CTAs — fade in */}
        <div
          className="flex flex-col gap-3 opacity-0"
          style={{ animation: "hero-fade-in 0.5s ease-out 1s both" }}
        >
          <Link
            href="/contact"
            className="pointer-events-auto inline-block px-8 py-3.5 bg-white/[0.07] backdrop-blur-sm border border-white/[0.1] text-white font-medium rounded-full hover:bg-white/[0.1] transition-colors text-base text-center"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/estimate"
            className="pointer-events-auto bg-[#141414] no-underline group cursor-pointer relative shadow-2xl shadow-red-950/30 rounded-full p-px font-semibold leading-6 text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(255,68,68,0.6)_0%,rgba(255,68,68,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex items-center justify-center gap-2 z-10 rounded-full bg-[#0A0A0A] px-8 py-3.5 ring-1 ring-white/10">
              <svg className="w-4 h-4 text-[#FF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-base font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-white to-neutral-200">
                Get Your Free AI Estimate
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

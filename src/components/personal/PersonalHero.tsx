"use client";

import { useEffect, useState } from "react";

const emojis = ["👋", "🎨", "🎵", "📚", "🌱", "✨", "🎮", "☕"];

export function PersonalHero() {
  const [currentEmoji, setCurrentEmoji] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-svh flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-16 sm:pt-0 relative overflow-hidden">
      {/* Playful background shapes — reduced on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient blob — smaller on mobile */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full opacity-20 sm:opacity-30"
          style={{
            background: "radial-gradient(circle, #FF6B6B 0%, #FFE66D 50%, transparent 70%)",
          }}
        />
        {/* Smaller accent blob */}
        <div
          className="absolute bottom-0 -left-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full opacity-15 sm:opacity-20"
          style={{
            background: "radial-gradient(circle, #4ECDC4 0%, #44A08D 50%, transparent 70%)",
          }}
        />
        {/* Floating shapes — hidden on very small screens for performance */}
        <div className="hidden sm:block absolute top-1/4 right-1/4 w-24 h-24 bg-[#FF6B6B]/10 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="hidden sm:block absolute bottom-1/3 left-1/3 w-16 h-16 bg-[#4ECDC4]/10 rounded-2xl rotate-12 animate-pulse" />
        <div className="hidden sm:block absolute top-1/2 right-1/3 w-12 h-12 bg-[#FFE66D]/20 rounded-full animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Animated emoji */}
        <div className="mb-6 sm:mb-8">
          <span
            className="text-5xl sm:text-6xl md:text-8xl inline-block transition-all duration-500"
            style={{ transform: `rotate(${currentEmoji * 5}deg)` }}
          >
            {emojis[currentEmoji]}
          </span>
        </div>

        <h1 className="text-[2.5rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.08]">
          Hey, I&apos;m{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] via-[#4ECDC4] to-[#FFE66D]">
              Satyam
            </span>
            {/* Underline decoration */}
            <svg
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 8C50 2 150 2 198 8"
                stroke="#FF6B6B"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-[#2D2A26]/60 leading-relaxed max-w-xl">
          A curious human who loves building things, exploring ideas, and finding beauty in the everyday.
        </p>

        {/* Scroll hint */}
        <div className="mt-10 sm:mt-16 flex items-center gap-3 text-[#2D2A26]/40">
          <span className="text-sm tracking-wide">Scroll to know me better</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

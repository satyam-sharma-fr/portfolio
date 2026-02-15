"use client";

import Link from "next/link";
import { useState } from "react";

export function SideNav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Top left - Home link */}
      <Link
        href="/"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none bg-white/[0.06] md:bg-transparent backdrop-blur-sm md:backdrop-blur-none text-white/60 md:text-white/40 hover:text-white active:bg-white/[0.12] transition-colors text-sm tracking-[0.2em] uppercase"
      >
        <span className="hidden md:inline">← Home</span>
        <svg className="w-5 h-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>
      
      {/* Bottom left corner - subtle link to personal side */}
      <Link
        href="/me"
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 group no-min-touch"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3 py-2 px-3 md:py-0 md:px-0 rounded-full md:rounded-none bg-white/[0.04] md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
          {/* Animated indicator */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovered ? "bg-[#F7C59F] scale-125" : "bg-white/20"
            }`}
          />
          
          <span
            className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
              isHovered ? "text-[#F7C59F] translate-x-1" : "text-white/30"
            }`}
          >
            The Human Side
          </span>
          
          {/* Arrow — always visible on mobile, hover on desktop */}
          <svg
            className={`w-3 h-3 transition-all duration-300 text-[#F7C59F]/50 md:text-[#F7C59F] ${
              isHovered ? "md:opacity-100 md:translate-x-0" : "md:opacity-0 md:-translate-x-2"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </Link>
    </>
  );
}

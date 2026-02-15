"use client";

import Link from "next/link";
import { useState } from "react";

export function PersonalNav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Top left - Home link */}
      <Link
        href="/"
        className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center justify-center w-10 h-10 md:w-auto md:h-auto rounded-full md:rounded-none bg-[#2D2A26]/[0.06] md:bg-transparent text-[#2D2A26]/60 md:text-[#2D2A26]/40 hover:text-[#2D2A26] active:bg-[#2D2A26]/[0.12] transition-colors text-sm tracking-wide font-medium"
      >
        <span className="hidden md:inline">← Home</span>
        <svg className="w-5 h-5 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {/* Bottom right corner - subtle link to work side */}
      <Link
        href="/work"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group no-min-touch"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3 py-2 px-3 md:py-0 md:px-0 rounded-full md:rounded-none bg-[#2D2A26]/[0.04] md:bg-transparent">
          <span
            className={`text-xs tracking-wide font-medium transition-all duration-300 ${
              isHovered ? "text-[#3B82F6] -translate-x-1" : "text-[#2D2A26]/30"
            }`}
          >
            See my work
          </span>

          {/* Animated indicator */}
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isHovered ? "bg-[#3B82F6] scale-125" : "bg-[#2D2A26]/20"
            }`}
          />
        </div>
      </Link>
    </>
  );
}

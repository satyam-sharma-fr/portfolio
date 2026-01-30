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
        className="fixed top-6 left-6 z-50 text-white/40 hover:text-white transition-colors text-sm tracking-[0.2em] uppercase"
      >
        ← Home
      </Link>
      
      {/* Bottom left corner - subtle link to personal side */}
      <Link
        href="/me"
        className="fixed bottom-6 left-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
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
          
          {/* Arrow that appears on hover */}
          <svg
            className={`w-3 h-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0 text-[#F7C59F]" : "opacity-0 -translate-x-2"
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

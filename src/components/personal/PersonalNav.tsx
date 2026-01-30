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
        className="fixed top-6 left-6 z-50 text-[#2D2A26]/40 hover:text-[#2D2A26] transition-colors text-sm tracking-wide font-medium"
      >
        ← Home
      </Link>

      {/* Bottom right corner - subtle link to work side */}
      <Link
        href="/work"
        className="fixed bottom-6 right-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
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

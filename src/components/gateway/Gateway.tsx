"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Entropy } from "@/components/ui/entropy";

function LurkingPhoto({ hoveredSide }: { hoveredSide: "personal" | "work" | null }) {
  // Set to true once you add your PNG cutouts to /public/images/
  const hasPhotos = false;

  return (
    <>
      {/* Personal photo - lurks from LEFT */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[45%] pointer-events-none transition-all duration-700 ease-out z-10"
        style={{
          transform: `translateX(${hoveredSide === "personal" ? "0%" : "-85%"})`,
          opacity: hoveredSide === "work" ? 0 : 1,
        }}
      >
        {/* Diagonal clip for artistic edge */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)",
          }}
        >
          {hasPhotos ? (
            <Image
              src="/images/cutout-casual.png"
              alt="Satyam - casual"
              fill
              className="object-contain object-left-bottom"
              priority
            />
          ) : (
            /* Placeholder */
            <div className="absolute inset-0 flex items-end justify-center pb-20">
              <div
                className={`transition-all duration-500 ${
                  hoveredSide === "personal" ? "opacity-100 scale-100" : "opacity-40 scale-95"
                }`}
              >
                <div className="relative">
                  {/* Silhouette placeholder */}
                  <div className="w-64 h-96 bg-gradient-to-t from-[#FF6B35]/30 via-[#F7C59F]/20 to-transparent rounded-t-full" />
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-8xl">
                    😊
                  </div>
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap">
                    Add cutout-casual.png
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Warm glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#FF6B35]/20 to-transparent transition-opacity duration-500 ${
            hoveredSide === "personal" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Work photo - lurks from RIGHT */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none transition-all duration-700 ease-out z-10"
        style={{
          transform: `translateX(${hoveredSide === "work" ? "0%" : "85%"})`,
          opacity: hoveredSide === "personal" ? 0 : 1,
        }}
      >
        {/* Diagonal clip for artistic edge (mirrored) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {hasPhotos ? (
            <Image
              src="/images/cutout-professional.png"
              alt="Satyam - professional"
              fill
              className="object-contain object-right-bottom"
              priority
            />
          ) : (
            /* Placeholder */
            <div className="absolute inset-0 flex items-end justify-center pb-20">
              <div
                className={`transition-all duration-500 ${
                  hoveredSide === "work" ? "opacity-100 scale-100" : "opacity-40 scale-95"
                }`}
              >
                <div className="relative">
                  {/* Silhouette placeholder */}
                  <div className="w-64 h-96 bg-gradient-to-t from-[#64C8FF]/30 via-[#3B82F6]/20 to-transparent rounded-t-full" />
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-8xl">
                    💼
                  </div>
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap">
                    Add cutout-professional.png
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cool glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-l from-[#64C8FF]/20 to-transparent transition-opacity duration-500 ${
            hoveredSide === "work" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </>
  );
}

export function Gateway() {
  const [hoveredSide, setHoveredSide] = useState<"personal" | "work" | null>(null);

  return (
    <div className="h-svh w-screen relative overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Entropy particle background - order on left, chaos on right */}
      <Entropy hoveredSide={hoveredSide} className="opacity-40" />

      {/* Lurking photos - behind text but above particles */}
      <LurkingPhoto hoveredSide={hoveredSide} />

      {/* Warm ambient glow for personal side */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at left center, rgba(255, 107, 53, 0.08) 0%, transparent 50%)",
          opacity: hoveredSide === "personal" ? 1 : 0,
        }}
      />

      {/* Cool ambient glow for work side */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at right center, rgba(100, 200, 255, 0.08) 0%, transparent 50%)",
          opacity: hoveredSide === "work" ? 1 : 0,
        }}
      />

      {/* Top - Name */}
      <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-center">
        <h1
          className={`text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] text-white transition-all duration-700 ${
            hoveredSide ? "opacity-60" : "opacity-90"
          }`}
        >
          SATYAM SHARMA
        </h1>
        {/* Subtitle only appears on hover */}
        <p
          className={`mt-2 text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
            hoveredSide === "personal"
              ? "text-[#F7C59F] opacity-100"
              : hoveredSide === "work"
              ? "text-[#64C8FF] opacity-100"
              : "opacity-0"
          }`}
        >
          {hoveredSide === "personal"
            ? "The Human"
            : hoveredSide === "work"
            ? "The Engineer"
            : ""}
        </p>
      </div>

      {/* Split screen interactive areas - 45% | 10% neutral | 45% */}
      <div className="absolute inset-0 z-30 flex flex-col md:flex-row">
        {/* Personal Side - LEFT 45% */}
        <Link
          href="/me"
          className="md:w-[45%] flex-1 md:flex-none flex items-end md:items-center justify-start p-8 md:p-12 group cursor-pointer"
          onMouseEnter={() => setHoveredSide("personal")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="relative">
            <div
              className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#FF6B35] to-[#F7C59F] transition-all duration-500 rounded-full ${
                hoveredSide === "personal" ? "h-full opacity-100" : "opacity-0"
              }`}
            />

            <div className="space-y-3">
              <p
                className={`text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
                  hoveredSide === "personal" ? "text-[#F7C59F]" : "text-white/40"
                }`}
              >
                The Human
              </p>
              <h2
                className={`text-2xl md:text-3xl font-light tracking-tight transition-all duration-500 ${
                  hoveredSide === "personal" ? "text-white translate-x-2" : "text-white/70"
                }`}
              >
                See who I am
              </h2>
              <p
                className={`text-sm max-w-[200px] transition-all duration-500 ${
                  hoveredSide === "personal" ? "text-white/60 translate-x-2" : "text-white/30"
                }`}
              >
                Life, interests, values & everything in between
              </p>

              <div
                className={`flex items-center gap-2 pt-2 transition-all duration-500 ${
                  hoveredSide === "personal" ? "opacity-100 translate-x-2" : "opacity-0"
                }`}
              >
                <span className="text-[#F7C59F] text-sm">Enter</span>
                <svg className="w-4 h-4 text-[#F7C59F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* NEUTRAL ZONE - MIDDLE 10% (no hover interaction) */}
        <div className="hidden md:block md:w-[10%] pointer-events-none" />

        {/* Work Side - RIGHT 45% */}
        <Link
          href="/work"
          className="md:w-[45%] flex-1 md:flex-none flex items-start md:items-center justify-end p-8 md:p-12 group cursor-pointer"
          onMouseEnter={() => setHoveredSide("work")}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="relative text-right">
            <div
              className={`absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-[#64C8FF] to-[#3B82F6] transition-all duration-500 rounded-full ${
                hoveredSide === "work" ? "h-full opacity-100" : "opacity-0"
              }`}
            />

            <div className="space-y-3">
              <p
                className={`text-xs tracking-[0.3em] uppercase transition-all duration-500 ${
                  hoveredSide === "work" ? "text-[#64C8FF]" : "text-white/40"
                }`}
              >
                The Engineer
              </p>
              <h2
                className={`text-2xl md:text-3xl font-light tracking-tight transition-all duration-500 ${
                  hoveredSide === "work" ? "text-white -translate-x-2" : "text-white/70"
                }`}
              >
                See what I build
              </h2>
              <p
                className={`text-sm max-w-[200px] ml-auto transition-all duration-500 ${
                  hoveredSide === "work" ? "text-white/60 -translate-x-2" : "text-white/30"
                }`}
              >
                AI automation, projects & professional work
              </p>

              <div
                className={`flex items-center justify-end gap-2 pt-2 transition-all duration-500 ${
                  hoveredSide === "work" ? "opacity-100 -translate-x-2" : "opacity-0"
                }`}
              >
                <span className="text-[#64C8FF] text-sm">Enter</span>
                <svg className="w-4 h-4 text-[#64C8FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

    </div>
  );
}

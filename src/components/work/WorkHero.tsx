"use client";

import Link from "next/link";

export function WorkHero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl">
        <p className="text-sm tracking-[0.3em] text-white/40 uppercase mb-6">
          AI Automation Engineer
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
          I build applications at the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            speed of thought
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed">
          Using AI-powered tools and modern frameworks, I turn complex problems into elegant automated solutions.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-colors"
          >
            View Work
          </a>
          <Link
            href="/contact"
            className="px-8 py-4 border border-white/20 text-white font-medium tracking-wide hover:bg-white/5 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

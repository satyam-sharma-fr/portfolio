"use client";

import { useState } from "react";

const interests = [
  {
    emoji: "🎵",
    title: "Music",
    description: "From lo-fi beats to rock classics. Music is the soundtrack to everything I do.",
    color: "#FF6B6B",
  },
  {
    emoji: "📚",
    title: "Reading",
    description: "Psychology, philosophy, sci-fi, biographies—if it makes me think, I'm in.",
    color: "#4ECDC4",
  },
  {
    emoji: "🎮",
    title: "Gaming",
    description: "Story-driven games that feel like interactive movies. Big fan of open worlds.",
    color: "#FFE66D",
  },
  {
    emoji: "🎨",
    title: "Design",
    description: "Fascinated by beautiful interfaces and how design shapes experiences.",
    color: "#A8E6CF",
  },
  {
    emoji: "🧠",
    title: "Psychology",
    description: "How minds work, why we do what we do, and what makes us tick.",
    color: "#DDA0DD",
  },
  {
    emoji: "🌱",
    title: "Learning",
    description: "Always picking up something new. The joy is in the journey.",
    color: "#98D8C8",
  },
];

function InterestCard({ interest }: { interest: typeof interests[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group p-8 rounded-3xl bg-white border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
      style={{
        borderColor: isHovered ? interest.color : "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-5xl mb-4 block group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
        {interest.emoji}
      </span>
      <h3 className="text-xl font-bold text-[#2D2A26] mb-2">
        {interest.title}
      </h3>
      <p className="text-[#2D2A26]/60 leading-relaxed">
        {interest.description}
      </p>
    </div>
  );
}

export function Interests() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white/50">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl">✨</span>
          <h2 className="text-sm tracking-widest text-[#2D2A26]/40 uppercase font-medium">
            Things I Love
          </h2>
        </div>

        <p className="text-2xl md:text-3xl font-medium text-[#2D2A26] mb-16 max-w-2xl">
          A peek into what gets me excited outside of work.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest) => (
            <InterestCard key={interest.title} interest={interest} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

const blogPosts = [
  {
    title: "Why I Document Everything I Learn",
    preview: "On the power of writing things down and how it's changed how I think.",
    date: "Coming soon",
    color: "#FF6B6B",
  },
  {
    title: "The Books That Shaped My Thinking",
    preview: "A curated list of reads that fundamentally changed my perspective.",
    date: "Coming soon",
    color: "#4ECDC4",
  },
  {
    title: "Finding Balance in the Age of Hustle",
    preview: "Thoughts on productivity, rest, and what actually matters.",
    date: "Coming soon",
    color: "#FFE66D",
  },
];

function BlogPostCard({ post }: { post: typeof blogPosts[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group p-6 md:p-8 rounded-2xl bg-white border-2 transition-all duration-300 cursor-pointer hover:shadow-lg"
      style={{ borderColor: isHovered ? post.color : "transparent" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[#2D2A26] mb-2 group-hover:translate-x-1 transition-transform">
            {post.title}
          </h3>
          <p className="text-[#2D2A26]/60">{post.preview}</p>
        </div>
        <span
          className="text-sm px-4 py-2 rounded-full font-medium whitespace-nowrap"
          style={{ backgroundColor: `${post.color}20`, color: post.color }}
        >
          {post.date}
        </span>
      </div>
    </article>
  );
}

export function BlogPreview() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl">✍️</span>
          <h2 className="text-sm tracking-widest text-[#2D2A26]/40 uppercase font-medium">
            Writing
          </h2>
        </div>

        <p className="text-2xl md:text-3xl font-medium text-[#2D2A26] mb-16 max-w-2xl">
          Thoughts, ideas, and things I&apos;m figuring out.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.title} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#2D2A26]/50 mb-4">
            More posts coming soon. Stay tuned!
          </p>
          <button className="px-6 py-3 bg-[#2D2A26] text-white rounded-full font-medium hover:bg-[#2D2A26]/80 transition-colors">
            Get notified when I publish
          </button>
        </div>
      </div>
    </section>
  );
}

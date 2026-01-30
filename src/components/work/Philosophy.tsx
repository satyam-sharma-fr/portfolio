const philosophies = [
  {
    title: "AI is a tool, not a replacement.",
    description: "I use AI to accelerate development, explore solutions faster, and automate tedious work. The creativity, architecture decisions, and problem-solving? That's still human.",
  },
  {
    title: "Automation creates leverage.",
    description: "One hour building an automation can save hundreds of hours over time. I look for these multipliers in everything I build.",
  },
  {
    title: "Ship fast, learn faster.",
    description: "The best way to validate an idea is to build it and put it in front of users. AI-powered development makes this possible at unprecedented speed.",
  },
];

const approaches = [
  {
    title: "Speed Without Compromise",
    description: "AI-assisted development doesn't mean lower quality—it means faster iteration, cleaner code through AI review, and more time focused on solving actual problems instead of syntax.",
  },
  {
    title: "Automation First",
    description: "If a task is repetitive, it should be automated. I design systems that scale, reduce human error, and free up time for high-value work.",
  },
  {
    title: "Build, Measure, Learn",
    description: "Ship fast, gather feedback, iterate constantly. Every project is an opportunity to refine the process and improve outcomes.",
  },
];

export function Philosophy() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Approach section */}
        <div className="mb-32">
          <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
            Approach
          </h2>
          <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
            Principles that guide every project.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12">
            {approaches.map((approach) => (
              <div key={approach.title} className="group">
                <h3 className="text-xl font-medium text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {approach.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Philosophy section */}
        <div>
          <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
            Philosophy
          </h2>
          <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
            The beliefs behind the work.
          </p>
          
          <div className="space-y-12">
            {philosophies.map((item, index) => (
              <div
                key={item.title}
                className="grid md:grid-cols-[auto,1fr] gap-8 items-start group"
              >
                <span className="text-5xl font-extralight text-white/10 group-hover:text-blue-500/30 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="border-l border-white/10 pl-8">
                  <h3 className="text-xl md:text-2xl font-light text-white mb-4 italic">
                    &ldquo;{item.title}&rdquo;
                  </h3>
                  <p className="text-white/50 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

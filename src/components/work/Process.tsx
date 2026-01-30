const steps = [
  {
    number: "01",
    title: "Define",
    description: "Understanding the problem, identifying bottlenecks, and determining what needs automation.",
  },
  {
    number: "02",
    title: "Architect",
    description: "Designing the solution with AI assistance—mapping out systems, choosing the right tools, and planning the build.",
  },
  {
    number: "03",
    title: "Build",
    description: "Rapid development using AI-powered coding tools. Iterative, test-driven, and focused on shipping.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Getting solutions live quickly with modern deployment pipelines and monitoring.",
  },
  {
    number: "05",
    title: "Iterate",
    description: "Continuous improvement based on real-world usage and feedback.",
  },
];

export function Process() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          How I Work
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
          A refined process that maximizes speed without sacrificing quality.
        </p>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-8 group">
                {/* Number circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-[#0A0A0A] group-hover:border-blue-500/50 transition-colors">
                    <span className="text-xl font-light text-white/60 group-hover:text-blue-400 transition-colors">
                      {step.number}
                    </span>
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="pt-4">
                  <h3 className="text-2xl font-light mb-3 text-white group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/50 max-w-lg leading-relaxed">
                    {step.description}
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

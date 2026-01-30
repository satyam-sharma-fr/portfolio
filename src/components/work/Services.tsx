const services = [
  {
    title: "AI-Powered Development",
    description: "Building web applications, tools, and platforms using Cursor, Claude, and modern frameworks. What used to take weeks now takes days.",
    icon: "⚡",
  },
  {
    title: "Automation Engineering",
    description: "Designing systems that handle repetitive work—from data pipelines to task automation. If it's manual and frequent, I automate it.",
    icon: "🔄",
  },
  {
    title: "Rapid Prototyping",
    description: "Turning ideas into working prototypes in hours, not months. Perfect for validating concepts before heavy investment.",
    icon: "🚀",
  },
  {
    title: "Integration & Workflow Design",
    description: "Connecting tools, APIs, and services into seamless workflows that save time and reduce errors.",
    icon: "🔗",
  },
];

export function Services() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          What I Do
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
          Specialized services that leverage AI to deliver faster, better results.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <span className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {service.icon}
                </span>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-white group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Index number */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="text-xs text-white/20 font-mono">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

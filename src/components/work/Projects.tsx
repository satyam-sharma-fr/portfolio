const projects = [
  {
    title: "[Project Name 1]",
    subtitle: "Automated Content Pipeline",
    description: "Built an end-to-end system that transforms raw data into formatted content using AI, reducing manual processing time by 85%.",
    stack: ["Next.js", "OpenAI API", "PostgreSQL", "Vercel"],
    impact: "20+ hours saved weekly",
  },
  {
    title: "[Project Name 2]",
    subtitle: "Business Workflow Automation",
    description: "Created custom automation connecting 5+ tools to eliminate manual data entry and notification management.",
    stack: ["n8n", "Airtable", "Slack API", "Webhooks"],
    impact: "Eliminated 15 hours of weekly manual work",
  },
  {
    title: "[Project Name 3]",
    subtitle: "AI-Powered Dashboard",
    description: "Rapid prototype for data visualization and reporting, built in 48 hours using AI-assisted development.",
    stack: ["React", "TypeScript", "Recharts", "Tailwind"],
    impact: "Validated product concept before major investment",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-16 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          Selected Projects
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
          Real solutions that delivered real impact.
        </p>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative grid md:grid-cols-[1fr,2fr] gap-8 p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Project number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#0A0A0A] border border-white/20 flex items-center justify-center">
                <span className="text-xs font-mono text-white/40">0{index + 1}</span>
              </div>
              
              {/* Left column - metadata */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm mt-1">{project.subtitle}</p>
                </div>
                
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-white/5 text-white/60 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Impact</p>
                  <p className="text-blue-400 font-medium">{project.impact}</p>
                </div>
              </div>
              
              {/* Right column - description */}
              <div className="flex flex-col justify-between">
                <p className="text-white/60 leading-relaxed text-lg">
                  {project.description}
                </p>
                
                <div className="mt-8 flex items-center gap-4">
                  <button className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group/btn">
                    <span>View Case Study</span>
                    <svg
                      className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

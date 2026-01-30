const toolCategories = [
  {
    category: "AI Development Tools",
    tools: ["Cursor", "Claude", "ChatGPT", "GitHub Copilot"],
  },
  {
    category: "Languages & Frameworks",
    tools: ["JavaScript/TypeScript", "React", "Next.js", "Node.js", "Python"],
  },
  {
    category: "Automation & Integration",
    tools: ["Zapier", "Make", "n8n", "API Integrations", "Webhooks"],
  },
  {
    category: "Infrastructure",
    tools: ["Vercel", "AWS", "Docker", "Serverless"],
  },
];

export function Tools() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          Tools & Stack
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
          The technologies I use to build fast and ship faster.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {toolCategories.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-sm text-white/40 uppercase tracking-wider pb-2 border-b border-white/10">
                {category.category}
              </h3>
              <ul className="space-y-3">
                {category.tools.map((tool) => (
                  <li
                    key={tool}
                    className="text-white/70 hover:text-white transition-colors cursor-default flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full group-hover:bg-blue-400 transition-colors" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

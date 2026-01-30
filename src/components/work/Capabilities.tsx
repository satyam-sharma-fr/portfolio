const capabilities = [
  {
    category: "Frontend",
    skills: "React, Next.js, TypeScript, Responsive Design, Component Architecture",
  },
  {
    category: "Backend",
    skills: "Node.js, API Development, Database Design, Serverless Functions",
  },
  {
    category: "AI Integration",
    skills: "LLM APIs, Prompt Engineering, AI Workflow Design, RAG Systems",
  },
  {
    category: "Automation",
    skills: "Process Automation, Data Pipelines, Integration Architecture, Task Scheduling",
  },
  {
    category: "Development",
    skills: "Git, CI/CD, Testing, Performance Optimization, Deployment",
  },
];

export function Capabilities() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-4">
          Capabilities
        </h2>
        <p className="text-2xl md:text-3xl font-light text-white/80 mb-16 max-w-2xl">
          A comprehensive skill set across the modern development stack.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 pr-8 text-sm font-medium text-white/60 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left py-4 text-sm font-medium text-white/60 uppercase tracking-wider">
                  Expertise
                </th>
              </tr>
            </thead>
            <tbody>
              {capabilities.map((cap) => (
                <tr
                  key={cap.category}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-5 pr-8">
                    <span className="text-white font-medium">{cap.category}</span>
                  </td>
                  <td className="py-5 text-white/50">
                    {cap.skills}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

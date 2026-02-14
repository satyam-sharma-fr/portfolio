export function Introduction() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        {/* Centered heading block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
            AI automation that works for{" "}
            <span className="text-white">your business,</span>
            <br />
            not the other way around
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Every hour your team spends on manual tasks is an hour lost. I build
            AI-powered systems that take over the repetitive work&mdash;intelligently,
            reliably, 24/7.
          </p>
        </div>

        {/* Stat cards row - like CF's Run everywhere / Run anywhere / Run at massive scale */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border border-white/[0.08] rounded-lg bg-white/[0.02]">
            <div className="w-2 h-2 rounded-full bg-[#FF4444] mb-5" />
            <h3 className="text-lg font-semibold text-white mb-3">
              AI Agents &amp; Chatbots
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Custom AI chatbots trained on your data using RAG, voice agents
              that book appointments, and autonomous agents that research,
              decide, and execute.
            </p>
          </div>

          <div className="p-8 border border-white/[0.08] rounded-lg bg-white/[0.02]">
            <div className="w-2 h-2 rounded-full bg-[#FF4444] mb-5" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Workflow Automation
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              End-to-end business process automation using n8n, Make, and Zapier.
              Connect your CRM, email, Slack, and{" "}
              <span className="text-white font-medium">5,000+ apps</span> into
              seamless pipelines.
            </p>
          </div>

          <div className="p-8 border border-white/[0.08] rounded-lg bg-white/[0.02]">
            <div className="w-2 h-2 rounded-full bg-[#FF4444] mb-5" />
            <h3 className="text-lg font-semibold text-white mb-3">
              Full-Stack AI Systems
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Built on OpenAI, Claude, LangChain, and custom APIs. Deployed on
              modern infra with{" "}
              <span className="text-white font-medium">24/7 uptime</span> and
              real-time monitoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

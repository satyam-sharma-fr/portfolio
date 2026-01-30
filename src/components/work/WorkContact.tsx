import Link from "next/link";

export function WorkContact() {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-white/[0.02] to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm tracking-[0.3em] text-white/40 uppercase mb-6">
          Let&apos;s Build Something
        </h2>
        
        <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-8">
          Have a project in mind?
        </h3>
        
        <p className="text-white/50 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you need automation, rapid prototyping, or a workflow that&apos;s eating up too much time—let&apos;s talk about how I can help.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-white/90 transition-colors"
          >
            Schedule a Call
          </Link>
          <a
            href="mailto:your.email@domain.com"
            className="px-8 py-4 border border-white/20 text-white font-medium tracking-wide hover:bg-white/5 transition-colors"
          >
            Send a Message
          </a>
        </div>
        
        {/* Social links */}
        <div className="flex justify-center gap-8">
          <a
            href="mailto:your.email@domain.com"
            className="text-white/40 hover:text-white transition-colors text-sm tracking-wide"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors text-sm tracking-wide"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors text-sm tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors text-sm tracking-wide"
          >
            Twitter/X
          </a>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-32 pt-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>Built with Next.js and AI assistance.</p>
          <p>© 2026 Satyam. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
}

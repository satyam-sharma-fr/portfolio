import { ContactForm } from "@/components/contact/ContactForm";
import Link from "next/link";

export const metadata = {
  title: "Contact | Satyam",
  description: "Get in touch for AI automation, rapid prototyping, or workflow optimization projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-white/40 hover:text-white transition-colors text-sm tracking-[0.2em] uppercase"
        >
          ← Home
        </Link>
        <Link
          href="/work"
          className="text-white/40 hover:text-white transition-colors text-sm tracking-[0.2em] uppercase"
        >
          Work
        </Link>
      </nav>

      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-16">
          {/* Left column - Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                Let&apos;s work together
              </h1>
              <p className="text-white/50 text-lg leading-relaxed">
                Have a project that needs automation? An idea that requires rapid prototyping? A workflow that&apos;s eating up too much time?
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Email</p>
                <a
                  href="mailto:your.email@domain.com"
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  your.email@domain.com
                </a>
              </div>

              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Social</p>
                <div className="flex gap-6">
                  <a
                    href="https://linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/yourhandle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Twitter/X
                  </a>
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="p-6 border border-white/10 bg-white/[0.02]">
              <p className="text-sm text-white/40 mb-2">Typical response time</p>
              <p className="text-2xl font-light text-white">Within 24 hours</p>
            </div>
          </div>

          {/* Right column - Form */}
          <ContactForm />
        </div>
      </div>

      {/* Subtle link to personal side */}
      <Link
        href="/me"
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-3"
      >
        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#F7C59F] group-hover:scale-125 transition-all duration-300" />
        <span className="text-xs tracking-[0.15em] uppercase text-white/30 group-hover:text-[#F7C59F] group-hover:translate-x-1 transition-all duration-300">
          The Human Side
        </span>
      </Link>
    </main>
  );
}

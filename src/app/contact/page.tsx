import { ContactForm } from "@/components/contact/ContactForm";
import Link from "next/link";

export const metadata = {
  title: "Contact | Satyam",
  description: "Get in touch for AI automation, rapid prototyping, or workflow optimization projects.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex justify-between items-center backdrop-blur-sm bg-[#0A0A0A]/60">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto rounded-full sm:rounded-none bg-white/[0.06] sm:bg-transparent text-white/60 sm:text-white/40 hover:text-white active:bg-white/[0.12] transition-colors duration-300 text-sm tracking-[0.2em] uppercase"
        >
          <span className="hidden sm:inline">&larr; Home</span>
          <svg className="w-5 h-5 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link
          href="/work"
          className="text-white/40 hover:text-white active:text-white/80 transition-colors duration-300 text-sm tracking-[0.2em] uppercase"
        >
          Work
        </Link>
      </nav>

      <div className="relative min-h-screen flex items-center justify-center px-6 md:px-10 py-24 sm:py-28 md:py-24">
        <div className="max-w-5xl w-full grid md:grid-cols-[1fr_1.1fr] gap-10 sm:gap-12 md:gap-20">
          {/* Left column - Info */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/50 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available for projects
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                Let&apos;s build
                <br />
                <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
                  something great
                </span>
              </h1>

              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md">
                Have a project that needs automation, an idea requiring rapid prototyping, or a workflow eating up too much time? Let&apos;s talk.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/[0.06]">
              {/* Email */}
              <div className="group">
                <p className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-2">
                  Email
                </p>
                <a
                  href="mailto:satyam@sharma.fr"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-base"
                >
                  satyam@sharma.fr
                  <svg
                    className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>

              {/* Social */}
              <div>
                <p className="text-[11px] text-white/25 uppercase tracking-[0.2em] mb-3">
                  Social
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { label: "LinkedIn", href: "https://linkedin.com/in/your-profile" },
                    { label: "GitHub", href: "https://github.com/your-username" },
                    { label: "Twitter/X", href: "https://twitter.com/yourhandle" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 sm:px-3 sm:py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/20 hover:bg-white/[0.05] active:bg-white/[0.08] transition-all duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-white/30 uppercase tracking-[0.15em]">Typical response</p>
                <p className="text-lg font-light text-white/80">Within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="md:pt-4">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Subtle link to personal side */}
      <Link
        href="/me"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 group flex items-center gap-3 py-2 px-3 sm:py-0 sm:px-0 rounded-full sm:rounded-none bg-white/[0.04] sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none no-min-touch"
      >
        <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#F7C59F] group-hover:scale-125 transition-all duration-300" />
        <span className="text-xs tracking-[0.15em] uppercase text-white/30 group-hover:text-[#F7C59F] group-hover:translate-x-1 transition-all duration-300">
          The Human Side
        </span>
      </Link>
    </main>
  );
}

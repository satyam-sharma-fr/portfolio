import Link from "next/link";

import { Boxes } from "@/components/ui/background-boxes";

const marqueeItems = [
  "24/7 AI Support",
  "Zero Manual Work",
  "3x More Leads",
  "70% Fewer Tickets",
  "40+ Hours Saved Monthly",
  "99.7% Accuracy",
  "No Vendor Lock-in",
  "ROI in Weeks",
];

export function WorkContact() {
  return (
    <section className="relative pt-16 sm:pt-24 md:pt-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Interactive boxes background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
      </div>

      {/* Top fade so boxes blend in smoothly */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent z-[1] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto pointer-events-none">
        {/* CTA block */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Build without bottlenecks
          </h2>

          <p className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join businesses that eliminated manual work and scaled with AI.
            Start building for free&mdash;first consultation is on me.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 pointer-events-auto">
            <Link
              href="/contact"
              className="px-8 py-4 sm:py-3.5 bg-[#FF4444] text-white font-medium rounded-2xl sm:rounded-full hover:bg-[#E03B3B] active:bg-[#CC3333] active:scale-[0.98] transition-all text-base text-center"
            >
              Book a Free Consultation
            </Link>
            <a
              href="mailto:your.email@domain.com"
              className="px-8 py-4 sm:py-3.5 border border-white/20 text-white font-medium rounded-2xl sm:rounded-full hover:bg-white/5 active:bg-white/10 active:scale-[0.98] transition-all text-base text-center"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>

      {/* Scrolling marquee — pointer-events-none so boxes stay interactive beneath */}
      <div className="relative z-10 border-t border-b border-white/[0.06] py-3 sm:py-4 overflow-hidden pointer-events-none">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {/* Duplicate items twice for seamless loop */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-2 sm:gap-3 mx-4 sm:mx-6 text-xs sm:text-sm text-white/30"
              >
                <span className="w-1 h-1 rounded-full bg-[#FF4444]/50" />
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 md:px-12 lg:px-24 safe-bottom pointer-events-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pointer-events-auto">
            <a
              href="mailto:your.email@domain.com"
              className="text-white/30 hover:text-white/60 active:text-white/80 transition-colors text-sm py-1"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 active:text-white/80 transition-colors text-sm py-1"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 active:text-white/80 transition-colors text-sm py-1"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 active:text-white/80 transition-colors text-sm py-1"
            >
              Twitter/X
            </a>
          </div>
          <p className="text-sm text-white/20">
            &copy; 2026 Satyam. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

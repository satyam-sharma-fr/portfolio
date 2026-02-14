import Link from "next/link";

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
    <section className="pt-24 md:pt-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* CTA block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build without bottlenecks
          </h2>

          <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-2xl mx-auto">
            Join businesses that eliminated manual work and scaled with AI.
            Start building for free&mdash;first consultation is on me.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#FF4444] text-white font-medium rounded-full hover:bg-[#E03B3B] transition-colors text-base"
            >
              Book a Free Consultation
            </Link>
            <a
              href="mailto:your.email@domain.com"
              className="px-8 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors text-base"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="border-t border-b border-white/[0.06] py-4 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {/* Duplicate items twice for seamless loop */}
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex items-center gap-3 mx-6 text-sm text-white/30"
              >
                <span className="w-1 h-1 rounded-full bg-[#FF4444]/50" />
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-8">
            <a
              href="mailto:your.email@domain.com"
              className="text-white/30 hover:text-white/60 transition-colors text-sm"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 transition-colors text-sm"
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

import Link from "next/link";

export function PersonalFooter() {
  return (
    <footer className="py-12 sm:py-16 px-6 md:px-16 lg:px-24 bg-[#2D2A26] text-white safe-bottom">
      <div className="max-w-4xl mx-auto">
        {/* Main message */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Thanks for stopping by! 👋
          </p>
          <p className="text-white/60 text-base sm:text-lg">
            If you&apos;d like to connect, I&apos;m always up for a good conversation.
          </p>
        </div>

        {/* Social links — larger touch targets on mobile */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:bg-white/25 transition-colors"
          >
            <span className="text-lg sm:text-xl">𝕏</span>
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:bg-white/25 transition-colors"
          >
            <span className="text-base sm:text-lg">in</span>
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:bg-white/25 transition-colors"
          >
            <span className="text-lg sm:text-xl">⌨</span>
          </a>
          <a
            href="mailto:your.email@domain.com"
            className="w-12 h-12 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:bg-white/25 transition-colors"
          >
            <span className="text-lg sm:text-xl">✉</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>Made with curiosity and too much coffee.</p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-white active:text-white/80 transition-colors py-1">
                Home
              </Link>
              <Link href="/work" className="hover:text-white active:text-white/80 transition-colors py-1">
                Work
              </Link>
              <Link href="/contact" className="hover:text-white active:text-white/80 transition-colors py-1">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

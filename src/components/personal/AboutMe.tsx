export function AboutMe() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-3xl">🌟</span>
          <h2 className="text-sm tracking-widest text-[#2D2A26]/40 uppercase font-medium">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-12">
          {/* Main content */}
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-[#2D2A26]">
              I believe life is too short for boring things.
            </p>
            
            <div className="space-y-4 text-lg text-[#2D2A26]/70 leading-relaxed">
              <p>
                By day, I&apos;m an engineer who builds with AI and automation. But that&apos;s just one slice of who I am.
              </p>
              <p>
                I&apos;m endlessly curious about how things work—whether that&apos;s a piece of code, a song, or the way people think. I find joy in learning new skills, getting lost in good books, and having conversations that make me see the world differently.
              </p>
              <p>
                I&apos;m a big believer in the power of small moments: morning coffee rituals, late-night creative sessions, random walks that turn into adventures.
              </p>
            </div>
          </div>

          {/* Fun facts card */}
          <div className="bg-gradient-to-br from-[#FFE66D]/30 to-[#FF6B6B]/20 p-6 rounded-3xl h-fit">
            <h3 className="font-bold text-[#2D2A26] mb-4">Quick facts</h3>
            <ul className="space-y-3 text-[#2D2A26]/70">
              <li className="flex items-start gap-2">
                <span>☕</span>
                <span>Coffee enthusiast</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🌙</span>
                <span>Night owl by nature</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎧</span>
                <span>Always have music on</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📖</span>
                <span>Reading 3 books at once</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🌏</span>
                <span>Based in India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

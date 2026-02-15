const values = [
  {
    number: "01",
    title: "Stay Curious",
    description: "The moment you think you know everything is the moment you stop growing. I try to approach every day with beginner's eyes.",
  },
  {
    number: "02",
    title: "Create More Than You Consume",
    description: "It's easy to scroll endlessly. It's harder—and more rewarding—to make something, even if it's imperfect.",
  },
  {
    number: "03",
    title: "People Over Everything",
    description: "Technology is a tool. What matters is the connections we build and the impact we have on each other.",
  },
  {
    number: "04",
    title: "Embrace the Mess",
    description: "Life isn't linear. Growth is messy. I've learned to be okay with not having all the answers.",
  },
];

export function Values() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl">💭</span>
          <h2 className="text-sm tracking-widest text-[#2D2A26]/40 uppercase font-medium">
            What I Believe
          </h2>
        </div>
        
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#2D2A26] mb-10 sm:mb-16 max-w-2xl">
          The principles that guide how I live and work.
        </p>

        <div className="space-y-8 sm:space-y-12">
          {values.map((value, index) => (
            <div
              key={value.number}
              className="group grid grid-cols-[60px,1fr] md:grid-cols-[100px,1fr] gap-3 sm:gap-6 items-start"
            >
              {/* Number with decorative element */}
              <div className="relative">
                <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#2D2A26]/5 group-hover:text-[#FF6B6B]/20 transition-colors duration-500">
                  {value.number}
                </span>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    backgroundColor: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#DDA0DD"][index],
                  }}
                />
              </div>

              <div className="pt-2 sm:pt-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#2D2A26] mb-2 sm:mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {value.title}
                </h3>
                <p className="text-base sm:text-lg text-[#2D2A26]/60 leading-relaxed max-w-xl">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

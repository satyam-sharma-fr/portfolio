"use client";

const currentlyReading = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "The Psychology of Money", author: "Morgan Housel" },
  { title: "Project Hail Mary", author: "Andy Weir" },
];

const favoriteAlbums = [
  { title: "Random Access Memories", artist: "Daft Punk" },
  { title: "After Hours", artist: "The Weeknd" },
  { title: "Currents", artist: "Tame Impala" },
];

const watchingNow = [
  { title: "Severance", type: "TV Show" },
  { title: "The Bear", type: "TV Show" },
];

export function MediaShelf() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-[#4ECDC4]/10 to-[#FFE66D]/10">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl">🎬</span>
          <h2 className="text-sm tracking-widest text-[#2D2A26]/40 uppercase font-medium">
            Media Shelf
          </h2>
        </div>
        
        <p className="text-2xl md:text-3xl font-medium text-[#2D2A26] mb-16 max-w-2xl">
          What I&apos;m reading, listening to, and watching.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Currently Reading */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📚</span>
              <h3 className="font-bold text-[#2D2A26]">Reading</h3>
            </div>
            <ul className="space-y-4">
              {currentlyReading.map((book) => (
                <li key={book.title} className="group">
                  <p className="font-medium text-[#2D2A26] group-hover:text-[#FF6B6B] transition-colors">
                    {book.title}
                  </p>
                  <p className="text-sm text-[#2D2A26]/50">{book.author}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Favorite Albums */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎵</span>
              <h3 className="font-bold text-[#2D2A26]">On Repeat</h3>
            </div>
            <ul className="space-y-4">
              {favoriteAlbums.map((album) => (
                <li key={album.title} className="group">
                  <p className="font-medium text-[#2D2A26] group-hover:text-[#4ECDC4] transition-colors">
                    {album.title}
                  </p>
                  <p className="text-sm text-[#2D2A26]/50">{album.artist}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Watching Now */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎬</span>
              <h3 className="font-bold text-[#2D2A26]">Watching</h3>
            </div>
            <ul className="space-y-4">
              {watchingNow.map((show) => (
                <li key={show.title} className="group">
                  <p className="font-medium text-[#2D2A26] group-hover:text-[#FFE66D] transition-colors">
                    {show.title}
                  </p>
                  <p className="text-sm text-[#2D2A26]/50">{show.type}</p>
                </li>
              ))}
            </ul>
            
            {/* Placeholder for more */}
            <div className="mt-6 pt-4 border-t border-[#2D2A26]/10">
              <p className="text-sm text-[#2D2A26]/40 italic">
                Always looking for recommendations!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

export const metadata = {
  title: 'Gallery | Sankalp UPSC',
  description: 'View photos from our events, workshops, and activities',
};

export default function GalleryPage() {
  const categories = ['All', 'Events', 'Workshops', 'Talks', 'Celebrations'];
  
  const galleryItems = [
    { id: 1, category: 'Events', title: 'Annual Meet 2024' },
    { id: 2, category: 'Workshops', title: 'Essay Writing Workshop' },
    { id: 3, category: 'Talks', title: 'Guest Lecture Series' },
    { id: 4, category: 'Events', title: 'Mock Interview Session' },
    { id: 5, category: 'Workshops', title: 'Current Affairs Discussion' },
    { id: 6, category: 'Celebrations', title: 'Diwali Celebration' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#7A0102] to-[#630001] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Relive the moments from our events, workshops, and community gatherings.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-[#7A0102] text-white'
                  : 'bg-white text-[#6c757d] hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <p className="text-white/80 text-xs">{item.category}</p>
                  <p className="text-white font-medium">{item.title}</p>
                </div>
              </div>
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

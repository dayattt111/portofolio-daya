import { useEffect, useRef, useState } from 'react';
import { BookOpen, Calendar, ExternalLink, PenLine, RefreshCw, Tag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useMediumArticles } from '../hooks/useMediumArticles';

interface ArticlesProps {
  limit?: number;
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export default function Articles({ 
  limit, 
  showViewAll = true,
  title = "Insights & Tutorials",
  subtitle = "Artikel, tutorial pemrograman, dan wawasan teknologi oleh Muhammad Amin Hidayat di Medium."
}: ArticlesProps) {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { articles, loading, error, refetch } = useMediumArticles();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayedArticles = limit ? articles.slice(0, limit) : articles;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString.replace(/-/g, '/'));
      return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Unique scatter directions per card
  const getEntryStyle = (index: number): React.CSSProperties => {
    const dirs = [
      { x: -45, y: -35, r: -5 }, { x: 35, y: -45, r: 4 }, { x: 50, y: -15, r: 6 },
      { x: -55, y: 15, r: -3 }, { x: 0, y: -55, r: 0 }, { x: -30, y: 40, r: 3 }
    ];
    const d = dirs[index % dirs.length];
    const delay = index * 80;
    return {
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, filter 0.7s ease ${delay}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'translate3d(0,0,0) rotate(0deg) scale(1)'
        : `translate3d(${d.x}px,${d.y}px,0) rotate(${d.r}deg) scale(0.9)`,
      filter: isVisible ? 'blur(0px)' : 'blur(6px)',
    };
  };

  return (
    <section 
      ref={sectionRef}
      id="articles" 
      className={`py-12 sm:py-16 relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <PenLine className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm font-medium tracking-widest uppercase ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  Medium Feed &bull; @MuhammadAminHidayat
                </span>
              </div>
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
              <p className={`mt-3 text-base sm:text-lg max-w-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {subtitle}
              </p>
            </div>

            {/* Refresh button */}
            <button
              onClick={() => refetch()}
              disabled={loading}
              title="Perbarui daftar artikel dari Medium"
              className={`self-start sm:self-auto p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin text-blue-500' : ''} />
              <span>{loading ? 'Memuat...' : 'Sinkronkan'}</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && articles.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`rounded-2xl overflow-hidden border animate-pulse ${
                  theme === 'dark' ? 'bg-gray-800/60 border-gray-700/60' : 'bg-white border-gray-200 shadow-md'
                }`}
              >
                <div className={`h-48 w-full ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200'}`} />
                <div className="p-6 space-y-4">
                  <div className={`h-4 w-28 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-6 w-full rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-4 w-4/5 rounded ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-gray-200'}`} />
                  <div className={`h-4 w-2/3 rounded ${theme === 'dark' ? 'bg-gray-700/80' : 'bg-gray-200'}`} />
                  <div className="flex gap-2 pt-2">
                    <div className={`h-5 w-16 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <div className={`h-5 w-16 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && displayedArticles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedArticles.map((article, index) => (
              <article
                key={article.id}
                className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/70 border-gray-700/60 hover:border-blue-500/50 hover:bg-gray-800' 
                    : 'bg-white border-gray-200/90 hover:border-blue-400/60 shadow-lg'
                }`}
                style={getEntryStyle(index)}
              >
                {/* Thumbnail */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 shrink-0">
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback jika image gagal load
                        const target = e.target as HTMLElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
                      <BookOpen className={`w-10 h-10 ${theme === 'dark' ? 'text-blue-400/60' : 'text-blue-600/60'}`} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Medium Story</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'dark' ? 'from-gray-900/90 via-transparent' : 'from-black/40 via-transparent'
                  }`} />

                  {/* Top Badge: Medium Publication */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                      Medium
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Publication Date */}
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                      <time 
                        dateTime={article.pubDate}
                        className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        {formatDate(article.pubDate)}
                      </time>
                      <span className="text-xs text-gray-500">&bull;</span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.author}
                      </span>
                    </div>

                    {/* Semantic Title with natural anchor link */}
                    <h3 className={`text-lg sm:text-xl font-bold mb-3 leading-snug line-clamp-2 transition-colors ${
                      theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                    }`}>
                      <a 
                        href={article.link}
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={`Baca ${article.title} di Medium Muhammad Amin Hidayat`}
                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        {article.title}
                      </a>
                    </h3>

                    {/* Description Snippet */}
                    <p className={`text-sm mb-4 line-clamp-3 leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {article.snippet}
                    </p>
                  </div>

                  <div>
                    {/* Categories / Tags */}
                    {article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {article.categories.slice(0, 3).map((category, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                              theme === 'dark'
                                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            <Tag size={10} />
                            {category}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read on Medium Button */}
                    <div className={`pt-4 border-t ${theme === 'dark' ? 'border-gray-700/60' : 'border-gray-100'}`}>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Baca ${article.title} di Medium Muhammad Amin Hidayat`}
                        className={`inline-flex items-center justify-between w-full text-sm font-semibold transition-colors ${
                          theme === 'dark' 
                            ? 'text-blue-400 hover:text-blue-300' 
                            : 'text-blue-600 hover:text-blue-700'
                        }`}
                      >
                        <span>Baca di Medium</span>
                        <ExternalLink 
                          size={15} 
                          className="transition-transform duration-300 group-hover:translate-x-1" 
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayedArticles.length === 0 && (
          <div className="text-center py-16">
            <BookOpen 
              size={64} 
              className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} 
            />
            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Belum ada artikel yang dapat dimuat saat ini.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* View All on Medium Button */}
        {showViewAll && displayedArticles.length > 0 && (
          <div className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a
              href="https://medium.com/@MuhammadAminHidayat"
              target="_blank"
              rel="noopener noreferrer"
              title="Kunjungi Profil Medium Muhammad Amin Hidayat"
              className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25'
              }`}
            >
              <span>Ikuti di Medium &bull; @MuhammadAminHidayat</span>
              <ExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

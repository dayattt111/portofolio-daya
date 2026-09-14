import { useEffect } from 'react';
import { ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import Articles from '../components/Articles';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { useMediumArticles } from '../hooks/useMediumArticles';

export default function ArticlesPage() {
  const { theme } = useTheme();
  const { articles } = useMediumArticles();

  // Dynamic SEO Title, Meta Description & Schema.org Structured Data
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Artikel & Tulisan Teknis | Muhammad Amin Hidayat — Software Engineer Makassar';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Kumpulan artikel teknis, tutorial pemrograman Laravel, Linux WSL, MikroTik, dan arsitektur software oleh Muhammad Amin Hidayat — Software Engineer & Programmer Terlucu di Makassar.'
      );
    }

    // Dynamic Schema.org ItemList for Articles
    const scriptId = 'articles-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Artikel & Tulisan Teknis oleh Muhammad Amin Hidayat',
      'description': 'Kumpulan artikel, tutorial pemrograman, dan catatan teknis oleh Muhammad Amin Hidayat di Medium.',
      'url': 'https://devdaya.my.id/articles',
      'numberOfItems': articles.length,
      'itemListElement': articles.map((article, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'BlogPosting',
          'headline': article.title,
          'url': article.link,
          'datePublished': article.pubDate,
          'description': article.snippet,
          'image': article.thumbnail || 'https://devdaya.my.id/og-image.png',
          'author': {
            '@type': 'Person',
            '@id': 'https://devdaya.my.id/#person',
            'name': 'Muhammad Amin Hidayat',
            'url': 'https://devdaya.my.id'
          },
          'publisher': {
            '@type': 'Person',
            '@id': 'https://devdaya.my.id/#person',
            'name': 'Muhammad Amin Hidayat'
          }
        }
      }))
    };

    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [articles]);

  return (
    <div className={`min-h-screen pt-24 sm:pt-28 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className={`relative rounded-3xl p-6 sm:p-10 md:p-14 overflow-hidden border ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-800/80 via-gray-850 to-gray-900 border-gray-700/60 shadow-2xl' 
            : 'bg-gradient-to-br from-blue-50/70 via-white to-purple-50/70 border-gray-200 shadow-xl'
        }`}>
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-pink-500/15 via-blue-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill Tag */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5 border ${
              theme === 'dark' 
                ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' 
                : 'bg-blue-100/70 border-blue-200 text-blue-700'
            }`}>
              <Sparkles size={13} />
              <span>Publikasi &amp; Catatan Teknis</span>
            </div>

            {/* Semantic h1 Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              Artikel &amp; Tulisan Teknis oleh{' '}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Muhammad Amin Hidayat
              </span>
            </h1>

            <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Berbagi dokumentasi teknis, studi kasus pemecahan bug, arsitektur web backend, tutorial jaringan Mikrotik, dan eksplorasi ekosistem Linux secara terbuka dan santai.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="https://medium.com/@MuhammadAminHidayat"
                target="_blank"
                rel="noopener noreferrer"
                title="Buka profil Medium resmi Muhammad Amin Hidayat"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <BookOpen size={18} />
                <span>Follow di Medium</span>
                <ExternalLink size={15} />
              </a>

              <a
                href="https://medium.com/@MuhammadAminHidayat/about"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm sm:text-base border transition-all duration-300 hover:scale-105 ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Tentang Penulis</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Component */}
      <Articles 
        showViewAll={true} 
        title="Daftar Artikel Lengkap" 
        subtitle="Ditarik otomatis secara real-time dari RSS Feed Medium resmi @MuhammadAminHidayat"
      />

      <Footer />
    </div>
  );
}

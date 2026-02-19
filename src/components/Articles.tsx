import { useEffect, useRef } from 'react';
import { BookOpen, Calendar, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Article {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  url: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Error "Attempt to read property name on null" di Laravel dan Cara Menyelesaikannya',
    description: 'Membahas penyebab error "Attempt to read property name on null" yang sering terjadi di Laravel beserta cara-cara untuk menyelesaikannya.',
    publishedAt: '2024-01-01',
    readTime: '5 min read',
    url: 'https://medium.com/@MuhammadAminHidayat/error-attempt-to-read-property-name-on-null-di-laravel-dan-cara-menyelesaikannya-82fa56c0356c',
    tags: ['Laravel', 'PHP', 'Debugging']
  },
  {
    id: '2',
    title: 'Tutorial Install WSL (Windows Subsystem Linux)',
    description: 'Panduan lengkap cara menginstall WSL (Windows Subsystem for Linux) di Windows untuk menjalankan lingkungan Linux langsung di Windows.',
    publishedAt: '2024-01-01',
    readTime: '6 min read',
    url: 'https://medium.com/@MuhammadAminHidayat/tutorial-install-wsl-windows-subsystem-linux-6090057323b5',
    tags: ['WSL', 'Linux', 'Windows']
  },
  {
    id: '3',
    title: 'Konfigurasi DHCP Server pada Mikrotik',
    description: 'Tutorial langkah demi langkah cara mengkonfigurasi DHCP Server pada perangkat Mikrotik untuk manajemen jaringan yang lebih efisien.',
    publishedAt: '2024-01-01',
    readTime: '5 min read',
    url: 'https://medium.com/@MuhammadAminHidayat/konfigurasi-dhcp-server-pada-mikrotik-61b9328c3a6c',
    tags: ['Mikrotik', 'DHCP', 'Networking']
  },
  {
    id: '4',
    title: 'Konfigurasi Routing Information Protocol (RIP) Sederhana Menggunakan 2 Router',
    description: 'Panduan konfigurasi RIP (Routing Information Protocol) sederhana menggunakan 2 router untuk memahami dasar routing dinamis.',
    publishedAt: '2024-01-01',
    readTime: '7 min read',
    url: 'https://medium.com/@MuhammadAminHidayat/konfigurasi-routing-information-protocol-rip-sederhana-menggunakan-2-router-b40b36691b21',
    tags: ['Routing', 'RIP', 'Networking']
  },
  {
    id: '5',
    title: 'BIOS Terkunci (BIOS Lock)? Jangan Panik! Lupa Passwordnya? Ini Solusinya!',
    description: 'Solusi praktis ketika BIOS laptop atau PC terkunci dan lupa password. Panduan lengkap untuk membuka BIOS yang terkunci.',
    publishedAt: '2024-01-01',
    readTime: '4 min read',
    url: 'https://medium.com/@MuhammadAminHidayat/bios-terkunci-bios-lock-jangan-panik-lupa-passwordnya-ini-solusinya-8b45f63533a5',
    tags: ['BIOS', 'Hardware', 'Troubleshooting']
  }
];

export default function Articles() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger scroll-animate → animate-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      const elements = section.querySelectorAll('.scroll-animate');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 scroll-animate opacity-0">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <BookOpen className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} size={32} /> */}
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${
              theme === 'dark' 
                ? 'from-blue-400 via-purple-400 to-pink-400' 
                : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Latest Articles
            </h2>
          </div>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className={`group scroll-animate opacity-0 rounded-xl overflow-hidden transition-all duration-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-white hover:shadow-2xl'
                } shadow-lg hover:-translate-y-2 touch-manipulation`}
                style={{
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                    <time className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg sm:text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-500 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm sm:text-base mb-4 line-clamp-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold group/link transition-colors ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Read More
                    <ExternalLink 
                      size={16} 
                      className="transition-transform group-hover/link:translate-x-1" 
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-16">
            <BookOpen 
              size={64} 
              className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} 
            />
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              No articles available yet. Check back soon!
            </p>
          </div>
        )}

        {/* View All Button */}
        {articles.length > 0 && (
          <div className="text-center mt-12 scroll-animate opacity-0">
            <a
              href="https://medium.com/@MuhammadAminHidayat"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-btn-outline text-sm sm:text-base py-3 px-8 inline-flex items-center gap-2"
            >
              View All Articles
              <ExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

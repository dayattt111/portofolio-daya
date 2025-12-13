import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Article {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  readTime: string;
  url: string;
  tags: string[];
}

export default function Articles() {
  const { theme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Ganti dengan endpoint backend Anda
      const response = await fetch('https://your-backend-api.com/api/articles');
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Please try again later.');
      
      // Dummy data untuk development
      setArticles([
        {
          id: '1',
          title: 'Building Modern Web Applications with React and TypeScript',
          description: 'Learn how to create scalable and maintainable web applications using React 18 and TypeScript with best practices.',
          thumbnail: '/images/projects/project1.jpg',
          publishedAt: '2024-12-01',
          readTime: '8 min read',
          url: 'https://medium.com/@yourusername/article-1',
          tags: ['React', 'TypeScript', 'Web Development']
        },
        {
          id: '2',
          title: 'Mastering Tailwind CSS: Tips and Tricks',
          description: 'Discover advanced techniques and best practices for using Tailwind CSS in your projects.',
          thumbnail: '/images/projects/project2.jpg',
          publishedAt: '2024-11-15',
          readTime: '6 min read',
          url: 'https://medium.com/@yourusername/article-2',
          tags: ['CSS', 'Tailwind', 'Design']
        },
        {
          id: '3',
          title: 'The Future of Frontend Development',
          description: 'Exploring emerging trends and technologies that are shaping the future of web development.',
          thumbnail: '/images/projects/project3.jpg',
          publishedAt: '2024-10-20',
          readTime: '10 min read',
          url: 'https://medium.com/@yourusername/article-3',
          tags: ['Frontend', 'JavaScript', 'Future']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
            <BookOpen className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} size={32} />
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className={`animate-spin mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} size={48} />
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className={`text-center py-16 px-4 rounded-xl ${
            theme === 'dark' ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
          }`}>
            <p className="mb-4">{error}</p>
            <button
              onClick={fetchArticles}
              className="modern-btn text-sm py-2 px-6"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className={`group scroll-animate opacity-0 rounded-2xl overflow-hidden transition-all duration-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-white hover:shadow-2xl'
                } shadow-lg hover:-translate-y-2 touch-manipulation`}
                style={{
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Read Time Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-800">
                    <Clock size={14} />
                    {article.readTime}
                  </div>
                </div>

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
        {!loading && !error && articles.length === 0 && (
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
        {!loading && !error && articles.length > 0 && (
          <div className="text-center mt-12 scroll-animate opacity-0">
            <a
              href="https://medium.com/@yourusername"
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

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Calculate scroll progress percentage with better accuracy
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;
      const scrollableHeight = documentHeight - windowHeight;
      
      // Ensure we reach 100% when at bottom (with small threshold for browser differences)
      const rawProgress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      const progress = Math.round(Math.min(100, Math.max(0, rawProgress)));
      
      // Check if we're at the very bottom
      const isAtBottom = (windowHeight + scrollTop) >= documentHeight - 5;
      setScrollProgress(isAtBottom ? 100 : progress);

      // Detect active section with better viewport detection
      const sections = ['home', 'about', 'projects', 'articles', 'certificates', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const handleResize = () => {
      handleScroll(); // Recalculate on resize
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'articles', label: 'Articles' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-gray-700/50' 
          : 'bg-white/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/50'
        : 'bg-transparent'
    }`}>
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-visible">
        {/* Background track */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-200/50'
        }`}></div>
        
        {/* Milestone markers */}
        <div className="absolute inset-0 flex items-center">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className={`absolute h-full w-[2px] transition-colors duration-300 ${
                scrollProgress >= milestone
                  ? theme === 'dark' ? 'bg-blue-400/80' : 'bg-blue-500/80'
                  : theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-300/30'
              }`}
              style={{ left: `${milestone}%` }}
            >
              {milestone > 0 && milestone < 100 && (
                <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                  scrollProgress >= milestone
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-150'
                    : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress fill with gradient */}
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          
          {/* Glow effect at the end */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent"></div>
          
          {/* Percentage badge - Responsive positioning */}
          {scrollProgress > 2 && (
            <div className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-full z-10">
              <div className="relative sm:ml-3 group">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 ${
                  theme === 'dark' ? 'bg-blue-500/50' : 'bg-blue-400/50'
                } group-hover:opacity-100 opacity-70`}></div>
                
                {/* Badge */}
                <div className={`relative px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold backdrop-blur-md transition-all duration-300 border ${
                  theme === 'dark' 
                    ? 'bg-gray-900/98 text-blue-400 border-blue-500/40' 
                    : 'bg-white/98 text-blue-600 border-blue-400/40'
                } shadow-xl group-hover:scale-110`}>
                  <span className="flex items-center gap-1">
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                    <span className="font-mono tracking-tight">{scrollProgress}%</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo with animated glow */}
        <div 
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer group relative" 
          onClick={() => scrollToSection('home')}
        >
          <div className="relative">
            <div className={`absolute inset-0 rounded-lg blur-lg transition-opacity duration-300 ${
              theme === 'dark' ? 'bg-blue-500/30' : 'bg-blue-400/30'
            } group-hover:opacity-100 opacity-0`}></div>
            <div className={`relative w-11 h-11 flex items-center justify-center rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
              theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
            } shadow-lg`}>
              <img 
                src="/vim.svg" 
                alt="Logo" 
                className="w-7 h-7 object-cover brightness-0 invert"
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <span className={`font-bold text-lg block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Portfolio
            </span>
            <div className="flex items-center gap-1">
              <Sparkles size={10} className="text-yellow-400 animate-pulse" />
              <span className="text-[10px] font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Creative Developer
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation with modern design */}
        <div className="hidden lg:flex items-center gap-2 bg-opacity-50 backdrop-blur-sm rounded-full px-2 py-2" style={{
          background: theme === 'dark' 
            ? 'linear-gradient(145deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6))' 
            : 'linear-gradient(145deg, rgba(249, 250, 251, 0.6), rgba(243, 244, 246, 0.6))',
          border: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)'}`
        }}>
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 group"
              style={{
                color: activeSection === item.id 
                  ? theme === 'dark' ? '#60a5fa' : '#2563eb'
                  : theme === 'dark' ? '#d1d5db' : '#4b5563',
                transitionDelay: `${index * 30}ms`
              }}
            >
              {/* Active indicator */}
              {activeSection === item.id && (
                <span 
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
                      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
                    boxShadow: theme === 'dark' 
                      ? '0 0 20px rgba(59, 130, 246, 0.3)' 
                      : '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}
                ></span>
              )}
              
              {/* Hover indicator */}
              {hoveredItem === item.id && activeSection !== item.id && (
                <span 
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'rgba(75, 85, 99, 0.5)'
                      : 'rgba(229, 231, 235, 0.5)'
                  }}
                ></span>
              )}
              
              <span className="relative z-10 flex items-center gap-2">
                {item.label}
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle with animated icon */}
          <button
            onClick={toggleTheme}
            className={`relative p-3 rounded-full transition-all duration-300 group overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-yellow-400 hover:from-gray-600 hover:to-gray-700' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
            }`}
          >
            <div className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 ${
              theme === 'dark' ? 'bg-yellow-400/20' : 'bg-blue-400/20'
            } group-hover:opacity-100 opacity-0`}></div>
            <div className="relative transition-transform duration-300 group-hover:rotate-180">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
          </button>

          {/* Contact Button with gradient */}
          <a
            href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-sm text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              Let's Talk
            </div>
          </a>

          {/* Mobile Menu Button with animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden transition-all duration-300 flex-shrink-0 p-2.5 rounded-full ${
              isOpen 
                ? theme === 'dark' ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'
                : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation with slide animation */}
      <div 
        className={`lg:hidden border-t backdrop-blur-xl overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'}`}
      >
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-left px-5 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium overflow-hidden group ${
                activeSection === item.id
                  ? theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400' 
                    : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
                animation: isOpen ? `slideInLeft 0.5s ease-out ${index * 0.05}s both` : 'none'
              }}
            >
              {activeSection === item.id && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></span>
              )}
              <span className="flex items-center justify-between">
                {item.label}
                {activeSection === item.id && (
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                )}
              </span>
            </button>
          ))}
          <a
            href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group mt-4"
            style={{
              animation: isOpen ? `slideInLeft 0.5s ease-out ${navItems.length * 0.05}s both` : 'none'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-full text-center px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-sm text-white transition-all duration-300 group-hover:scale-[1.02]">
              Let's Talk
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}

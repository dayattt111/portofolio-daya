import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/articles', label: 'Articles' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/skills', label: 'Skills' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900/80 backdrop-blur-xl shadow-2xl' 
          : 'bg-white/80 backdrop-blur-xl shadow-2xl'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo with animated glow */}
        <Link 
          to="/"
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer group relative"
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
        </Link>

        {/* Desktop Navigation with modern design */}
        <div className="hidden lg:flex items-center gap-2 bg-opacity-50 backdrop-blur-sm rounded-full px-2 py-2" style={{
          background: theme === 'dark' 
            ? 'linear-gradient(145deg, rgba(31, 41, 55, 0.6), rgba(17, 24, 39, 0.6))' 
            : 'linear-gradient(145deg, rgba(249, 250, 251, 0.6), rgba(243, 244, 246, 0.6))',
          border: `1px solid ${theme === 'dark' ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.3)'}`
        }}>
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setIsOpen(false)}
              className="relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 group"
              style={{
                color: isActive(item.path)
                  ? theme === 'dark' ? '#60a5fa' : '#2563eb'
                  : theme === 'dark' ? '#d1d5db' : '#4b5563',
                transitionDelay: `${index * 30}ms`
              }}
            >
              {/* Active indicator */}
              {isActive(item.path) && (
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
              {hoveredItem === item.path && !isActive(item.path) && (
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
                {isActive(item.path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                )}
              </span>
            </Link>
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
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`relative text-left px-5 py-3.5 rounded-xl transition-all duration-300 text-sm font-medium overflow-hidden group ${
                isActive(item.path)
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
              {isActive(item.path) && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></span>
              )}
              <span className="flex items-center justify-between">
                {item.label}
                {isActive(item.path) && (
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
                )}
              </span>
            </Link>
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

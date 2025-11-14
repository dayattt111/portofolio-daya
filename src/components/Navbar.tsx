import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['home', 'about', 'experience', 'projects', 'certificates', 'community', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: '[HOME]' },
    { id: 'about', label: '[ABOUT]' },
    { id: 'experience', label: '[EXPERIENCE]' },
    { id: 'projects', label: '[PROJECTS]' },
    { id: 'certificates', label: '[CERTS]' },
    { id: 'community', label: '[COMMUNITY]' },
    { id: 'skills', label: '[SKILLS]' },
    { id: 'contact', label: '[CONTACT]' },
  ];

  return (
    <>
      <nav className={`navbar-retro glass-effect transition-all duration-300 sticky top-0 z-50 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 md:w-10 h-9 md:h-10 bg-neon-cyan border-2 border-neon-cyan flex items-center justify-center animate-pulse">
              <span className="text-retro-darker font-pixel text-xs">▶</span>
            </div>
            <span className="font-pixel text-sm md:text-lg text-neon-cyan hidden sm:block">PORTFOLIO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link-retro text-sm xl:text-base ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <a
            href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn hidden md:block text-xs py-2 px-3"
          >
            CONTACT
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-neon-cyan hover:text-neon-pink transition-colors flex-shrink-0"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-retro-dark/95 border-t-2 border-neon-pink max-h-96 overflow-y-auto">
            <div className="flex flex-col gap-1 p-3 md:p-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-2 md:py-3 transition-all border-l-4 text-sm ${
                    activeSection === item.id
                      ? 'border-l-neon-yellow text-neon-yellow'
                      : 'border-l-neon-cyan text-neon-cyan hover:border-l-neon-pink hover:text-neon-pink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn mt-3 md:mt-4 w-full text-center text-xs py-2"
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Scanline Effect */}
      <div className="scanline-overlay"></div>
    </>
  );
}

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
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
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
    { id: 'projects', label: '[PROJECTS]' },
    { id: 'skills', label: '[SKILLS]' },
    { id: 'contact', label: '[CONTACT]' },
  ];

  return (
    <>
      <nav className={`navbar-retro transition-all duration-300 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-neon-cyan border-2 border-neon-cyan flex items-center justify-center">
              <span className="text-retro-darker font-pixel text-xs">▶</span>
            </div>
            <span className="font-pixel text-lg text-neon-cyan hidden sm:block">CODER</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link-retro ${activeSection === item.id ? 'active' : ''}`}
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
            className="pixel-btn hidden md:block text-xs"
          >
            CONTACT
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neon-cyan hover:text-neon-pink transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-retro-dark/95 border-t-2 border-neon-pink">
            <div className="flex flex-col gap-2 p-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-4 py-3 transition-all border-l-4 ${
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
                className="pixel-btn mt-4 w-full text-center text-xs"
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

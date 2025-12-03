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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'community', label: 'Community' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar-modern transition-all duration-300 ${isScrolled ? 'shadow-soft-lg' : 'shadow-soft'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md overflow-hidden transition-transform group-hover:scale-110">
            <img 
              src="/images/logo.svg" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-lg text-gray-800 hidden sm:block">Portfolio</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link-modern px-4 py-2 rounded-lg transition-all ${
                activeSection === item.id ? 'active bg-blue-50' : ''
              }`}
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
          className="modern-btn hidden md:block text-sm py-2 px-6"
        >
          <span>Contact</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors flex-shrink-0 p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-soft max-h-96 overflow-y-auto">
          <div className="flex flex-col gap-1 p-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
              target="_blank"
              rel="noopener noreferrer"
              className="modern-btn mt-4 w-full text-center text-sm py-3"
            >
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

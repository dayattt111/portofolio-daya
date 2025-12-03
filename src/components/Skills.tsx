import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const skills = [
  { name: 'React & TypeScript', level: 95 },
  { name: 'Node.js & Express', level: 90 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Database Management', level: 85 }
];

const technologies = [
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
  { name: 'TypeScript', icon: '📘', color: 'from-blue-400 to-blue-600' },
  { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500' },
  { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-700' },
  { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-orange-600' },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600' },
  { name: 'GraphQL', icon: '◇', color: 'from-pink-500 to-purple-600' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
  { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900' },
  { name: 'Tailwind', icon: '🎨', color: 'from-cyan-400 to-blue-500' },
  { name: 'Firebase', icon: '🔥', color: 'from-yellow-500 to-orange-600' },
  { name: 'Git', icon: '📦', color: 'from-red-500 to-orange-500' },
  { name: 'Figma', icon: '🎯', color: 'from-purple-500 to-pink-500' },
  { name: 'Laravel', icon: '🔴', color: 'from-red-400 to-red-600' }
];

export default function Skills() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => (prev + 1) % technologies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 2;
      scrollRef.current.scrollLeft = (scrollPosition * 150) % scrollWidth;
    }
  }, [scrollPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/6282197855715?text=${message}`, '_blank');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="skills" ref={sectionRef} className={`py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Skills & Contact
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Skills Progress */}
          <div className={`lg:col-span-2 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {skills.map((skill, index) => (
              <div key={skill.name} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-sm text-blue-500">{skill.level}%</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                    style={{ width: isVisible ? `${skill.level}%` : '0%', transitionDelay: `${index * 0.1}s` }}
                  />
                </div>
              </div>
            ))}
            
            {/* Tech Stack Carousel */}
            <div className="pt-6">
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Tech Stack
              </h3>
              <div className="relative overflow-hidden rounded-xl">
                {/* Gradient Overlays */}
                <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
                <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-gray-900 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`} />
                
                {/* Scrolling Container */}
                <div 
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-hidden py-4 scroll-smooth"
                >
                  {/* Double the technologies for infinite scroll effect */}
                  {[...technologies, ...technologies].map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className={`flex-shrink-0 w-32 p-4 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                      style={{
                        animation: `slide 30s linear infinite`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{tech.icon}</div>
                        <div className={`text-xs font-medium bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                          {tech.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Quick Links */}
          <div className={`space-y-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <a href="https://wa.me/6282197855715" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-3 p-3 rounded-lg hover:scale-105 transition-transform ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <MessageCircle className="w-5 h-5 text-green-500" />
              <div className="text-sm">
                <p className="font-medium">WhatsApp</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>082197855715</p>
              </div>
            </a>
            
            <a href="mailto:hidayatbaru0304@gmail.com"
               className={`flex items-center gap-3 p-3 rounded-lg hover:scale-105 transition-transform ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <Mail className="w-5 h-5 text-blue-500" />
              <div className="text-sm">
                <p className="font-medium">Email</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>hidayatbaru0304@gmail.com</p>
              </div>
            </a>

            <a href="https://github.com/dayattt111" target="_blank" rel="noopener noreferrer"
               className={`flex items-center gap-3 p-3 rounded-lg hover:scale-105 transition-transform ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <Github className="w-5 h-5 text-purple-500" />
              <div className="text-sm">
                <p className="font-medium">GitHub</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>dayattt111</p>
              </div>
            </a>

            <a href="http://www.linkedin.com/in/muhammad-amin-hidayat" target="_blank" rel="noopener noreferrer"
               className={`flex items-center gap-3 p-3 rounded-lg hover:scale-105 transition-transform ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <Linkedin className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <p className="font-medium">LinkedIn</p>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>muhammad-amin-hidayat</p>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact" className={`max-w-2xl mx-auto p-6 rounded-xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className="text-xl font-bold mb-4 text-center">Send Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={3}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none transition ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

import { Code, Zap, Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <section ref={sectionRef} id="about" className={`py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title-gradient text-3xl md:text-4xl">
            About Me
          </h2>
          <p className={`mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Professional skills and expertise</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Skills */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className={`modern-card h-full group ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="modern-card-content">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Development</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Full-stack expertise in React, TypeScript, Node.js, and modern web technologies.
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Frontend</span>
                    <span className="text-blue-600 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Design */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className={`modern-card h-full group ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="modern-card-content">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>UI/UX Design</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Creating beautiful, intuitive interfaces with modern design principles.
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Design</span>
                    <span className="text-purple-600 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Performance */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
            <div className={`modern-card h-full group ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="modern-card-content">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Performance</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Optimized, scalable solutions with attention to detail and best practices.
                </p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Optimization</span>
                    <span className="text-pink-600 font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

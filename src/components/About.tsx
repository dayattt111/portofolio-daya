import { Code, Zap, Palette, Award, Users, Rocket, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        setScrollY(scrollProgress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const achievements = [
    { icon: <Award className="w-6 h-6" />, value: '5+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
    { icon: <Users className="w-6 h-6" />, value: '50+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500' },
    { icon: <Rocket className="w-6 h-6" />, value: '100+', label: 'Projects Done', color: 'from-orange-500 to-red-500' },
    { icon: <Star className="w-6 h-6" />, value: '15+', label: 'Certifications', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <section ref={sectionRef} id="about" className={`py-20 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`}
          style={{ transform: `translateY(${scrollY * 100}px) scale(${1 + scrollY * 0.3})` }}
        />
        <div 
          className={`absolute bottom-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'}`}
          style={{ transform: `translateY(${-scrollY * 80}px) scale(${1 + scrollY * 0.2})` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title with Subtitle */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className={`text-sm font-semibold px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              WHO I AM
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Passionate developer with expertise in building scalable web applications and creating memorable user experiences
          </p>
        </div>

        {/* Stats Grid - Animated */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-500 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-gray-50'}`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 transform transition-transform group-hover:rotate-12`}>
                {item.icon}
              </div>
              <div className={`text-3xl font-bold mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Enhanced Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Development - Enhanced */}
          <div 
            className={`transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ transitionDelay: '0.4s' }}
          >
            <div className={`relative p-8 rounded-2xl h-full group overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Full-Stack Development
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expert in building scalable web applications with React, TypeScript, Node.js, and modern frameworks. Specialized in creating performant, maintainable code.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Frontend</span>
                      <span className="text-blue-500 font-semibold">95%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 shadow-lg shadow-blue-500/50"
                        style={{ width: isVisible ? '95%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Backend</span>
                      <span className="text-purple-500 font-semibold">90%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000 delay-200 shadow-lg shadow-purple-500/50"
                        style={{ width: isVisible ? '90%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: UI/UX Design - Enhanced */}
          <div 
            className={`transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ transitionDelay: '0.6s' }}
          >
            <div className={`relative p-8 rounded-2xl h-full group overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-br from-purple-50 to-pink-50'} border ${theme === 'dark' ? 'border-purple-700/50' : 'border-purple-200'}`}>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl group-hover:-rotate-6 transition-transform duration-300 shadow-lg">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  UI/UX Design
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Crafting beautiful, intuitive user interfaces with Figma, Adobe XD. Focus on user-centered design and accessibility standards.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>UI Design</span>
                      <span className="text-purple-500 font-semibold">92%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1000 delay-400 shadow-lg shadow-purple-500/50"
                        style={{ width: isVisible ? '92%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>UX Research</span>
                      <span className="text-pink-500 font-semibold">88%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-rose-600 h-2 rounded-full transition-all duration-1000 delay-600 shadow-lg shadow-pink-500/50"
                        style={{ width: isVisible ? '88%' : '0%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Performance & Quality - Enhanced */}
          <div 
            className={`transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ transitionDelay: '0.8s' }}
          >
            <div className={`relative p-8 rounded-2xl h-full group overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30' : 'bg-gradient-to-br from-orange-50 to-red-50'} border ${theme === 'dark' ? 'border-orange-700/50' : 'border-orange-200'}`}>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-500/20 to-red-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Performance & Quality
                </h3>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Delivering optimized, scalable solutions with clean code architecture. Committed to web vitals and best practices.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Code Quality</span>
                      <span className="text-orange-500 font-semibold">96%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-1000 delay-800 shadow-lg shadow-orange-500/50"
                        style={{ width: isVisible ? '96%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Optimization</span>
                      <span className="text-red-500 font-semibold">94%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="bg-gradient-to-r from-red-500 to-rose-600 h-2 rounded-full transition-all duration-1000 delay-1000 shadow-lg shadow-red-500/50"
                        style={{ width: isVisible ? '94%' : '0%' }}
                      />
                    </div>
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

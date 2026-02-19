import { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Code2, Palette, MessageCircle, Linkedin, Instagram, BookOpen, FileText, Code } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['rgba(59, 130, 246, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(236, 72, 153, 0.6)'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`pt-20 pb-12 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 via-white to-purple-50'}`}>
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />

      {/* Gradient Orbs */}
      <div className={`absolute top-20 left-10 w-96 h-96 ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float`}></div>
      <div className={`absolute top-40 right-10 w-96 h-96 ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float`} style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center w-full">
          {/* Left Section - Text Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up text-center lg:text-left">
            {/* Animated Icon */}
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
              <div className="relative group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-soft-lg animate-float cursor-pointer hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}>Creative</div>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-soft-lg animate-float cursor-pointer hover:scale-110 transition-transform group" style={{ animationDelay: '0.2s' }}>
                <Code2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}>Developer</div>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-soft-lg animate-float cursor-pointer hover:scale-110 transition-transform group" style={{ animationDelay: '0.4s' }}>
                <Palette className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}>Designer</div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-up stagger-2">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Muh. Amin Hidayat</span>
                </h1>
                <div className="flex items-center gap-3 mt-3 justify-center lg:justify-start">
                  <a href="https://www.linkedin.com/in/muhammad-amin-hidayat" target="_blank" rel="noopener noreferrer" 
                     className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-blue-600 text-gray-300 hover:text-white' 
                         : 'bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white'
                     }`} title="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://www.kaggle.com/muhammadaminhidayat" target="_blank" rel="noopener noreferrer" 
                     className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-cyan-600 text-gray-300 hover:text-white' 
                         : 'bg-gray-100 hover:bg-cyan-600 text-gray-700 hover:text-white'
                     }`} title="Kaggle">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                    </svg>
                  </a>
                  <a href="https://scholar.google.com/citations?user=LRRALCsAAAAJ&hl=id" target="_blank" rel="noopener noreferrer" 
                     className={`p-1.5 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-red-600 text-gray-300 hover:text-white' 
                         : 'bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white'
                     }`} title="Google Scholar">
                    <BookOpen className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <h2 className={`text-lg sm:text-xl md:text-2xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Full Stack Developer & UI/UX Enthusiast
              </h2>
              <p className={`text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-lg mx-auto lg:mx-0`}>
                Crafting beautiful, functional web experiences with modern technologies. Passionate about clean code and intuitive design.
              </p>
              <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto lg:mx-0"></div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up stagger-3 justify-center lg:justify-start">
              <button
                onClick={scrollToContact}
                className="modern-btn text-sm sm:text-base py-3 sm:py-3 px-6 sm:px-8 w-full sm:w-auto touch-manipulation"
              >
                <span>Get in Touch</span>
              </button>
              <a
                href="https://wa.me/6288242763942?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn-outline text-sm sm:text-base py-3 sm:py-3 px-6 sm:px-8 w-full sm:w-auto touch-manipulation flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Connect:</span>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.linkedin.com/in/muhammad-amin-hidayat" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white'
                   }`} title="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://scholar.google.com/citations?user=youruser" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white'
                   }`} title="Google Scholar">
                  <BookOpen className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-pink-600 text-gray-700 hover:text-white'
                   }`} title="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.scribd.com/user/youruser" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-orange-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white'
                   }`} title="Scribd">
                  <FileText className="w-5 h-5" />
                </a>
                <a href="https://medium.com/@MuhammadAminHidayat" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-green-600 text-gray-700 hover:text-white'
                   }`} title="Medium">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>
                <a href="https://orcid.org/0000-0000-0000-0000" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-green-700 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-green-700 text-gray-700 hover:text-white'
                   }`} title="ORCID">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.053-1.666 4.053-3.722 0-2.025-1.694-3.722-4.053-3.722h-2.297z"/>
                  </svg>
                </a>
                <a href="https://www.kaggle.com/yourprofile" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-cyan-600 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-cyan-600 text-gray-700 hover:text-white'
                   }`} title="Kaggle">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
                  </svg>
                </a>
                <a href="https://developers.google.com/profile/u/yourprofile" target="_blank" rel="noopener noreferrer" 
                   className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                     theme === 'dark' 
                       ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white' 
                       : 'bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white'
                   }`} title="Google Dev Profile">
                  <Code className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Profile Image with 3D Animation */}
          <div 
            className="relative animate-fade-in-up stagger-2 perspective-1000 order-first lg:order-last mt-8 lg:mt-0"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
              const img = e.currentTarget.querySelector('.profile-3d') as HTMLElement;
              if (img) {
                img.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`;
              }
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('.profile-3d') as HTMLElement;
              if (img) {
                img.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              }
            }}
          >
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
              {/* Animated Rings - Hidden on mobile */}
              <div className="hidden sm:block absolute inset-0 animate-spin-slow">
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-500/30"></div>
              </div>
              <div className="hidden sm:block absolute inset-0 animate-spin-reverse">
                <div className="absolute inset-12 rounded-full border-2 border-dotted border-purple-500/30"></div>
              </div>

              {/* Floating Decoration Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-20 animate-float blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl opacity-20 animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
              
              {/* Profile Image Container with 3D Effect */}
              <div className="relative z-10">
                <div 
                  className="profile-3d aspect-square rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out"
                  style={{ 
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="absolute inset-0 animate-gradient-shift"></div>
                  <img 
                    src="/images/profile/day.png" 
                    alt="Muh. Amin Hidayat"
                    className="w-full h-full object-cover relative z-10"
                    style={{ transform: 'translateZ(20px)' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML += '<div class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-10"><span class="text-8xl font-bold text-white">AH</span></div>';
                    }}
                  />
                  
                  {/* 3D Overlay Layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" style={{ transform: 'translateZ(30px)' }}></div>
                </div>
              </div>

              {/* Floating Stats with Animation */}
              <div 
                className={`absolute top-8 sm:top-10 -left-4 sm:-left-6 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl animate-float border ${theme === 'dark' ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">5+</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Years</div>
              </div>
              
              <div 
                className={`absolute bottom-8 sm:bottom-10 -right-4 sm:-right-6 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl animate-float border ${theme === 'dark' ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'}`}
                style={{ animationDelay: '0.5s', transform: 'translateZ(50px)' }}
              >
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">50+</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
              </div>

              {/* Particle Effects - Hidden on small mobile */}
              <div className="hidden xs:block absolute top-1/4 left-0 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <div className="hidden xs:block absolute bottom-1/4 right-0 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-blue-500'}`} />
        </div>
      </div>
    </section>
  );
}

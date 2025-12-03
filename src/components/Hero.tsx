import { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Code2, Palette } from 'lucide-react';
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

    // Modern floating particles
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-[85vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Section - Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Animated Icon */}
            <div className="flex gap-3">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-soft-lg animate-float">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-soft-lg animate-float" style={{ animationDelay: '0.2s' }}>
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-soft-lg animate-float" style={{ animationDelay: '0.4s' }}>
                <Palette className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4 animate-fade-in-up stagger-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Muh. Amin Hidayat</span>
              </h1>
              <h2 className={`text-xl md:text-2xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Full Stack Developer & UI/UX Enthusiast
              </h2>
              <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-lg`}>
                Crafting beautiful, functional web experiences with modern technologies. Passionate about clean code and intuitive design.
              </p>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
              <button
                onClick={scrollToContact}
                className="modern-btn text-sm py-3 px-8"
              >
                <span>Get in Touch</span>
              </button>
              <a
                href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
                target="_blank"
                rel="noopener noreferrer"
                className="modern-btn-outline text-sm py-3 px-8"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right Section - Profile Image */}
          <div className="relative animate-fade-in-up stagger-2">
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating Decoration Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Profile Image Container */}
              <div className="relative z-10">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-soft-2xl border-4 border-white/10 backdrop-blur-sm bg-gradient-to-br from-blue-500/10 to-purple-600/10">
                  <img 
                    src="/images/profile/profile.jpg" 
                    alt="Muh. Amin Hidayat"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gradient jika gambar tidak ada
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"><span class="text-8xl font-bold text-white">AH</span></div>';
                    }}
                  />
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute top-10 -left-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft-xl animate-float">
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Years Exp</div>
              </div>
              
              <div className="absolute bottom-10 -right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-soft-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Projects</div>
              </div>
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

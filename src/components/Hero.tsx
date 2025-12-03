import { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Code2, Palette } from 'lucide-react';

export default function Hero() {
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
    <section id="home" className="hero-section pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-8 px-4 py-20 text-center">
        {/* Animated Icon */}
        <div className="mb-8 animate-fade-in-up">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-soft-lg animate-float">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center shadow-lg">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Palette className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-6 animate-fade-in-up stagger-2">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2">
              <span className="gradient-text">Welcome</span>
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
              Muh. Amin Hidayat
            </h2>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-medium text-gray-600">
              Portfolio Website
            </h3>
          </div>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto animate-fade-in-up stagger-3">
          Full Stack Developer | UI/UX Enthusiast | Creative Problem Solver
        </p>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-gray-700 text-base md:text-lg space-y-3 animate-fade-in-up stagger-4">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Crafting elegant digital experiences with modern technologies
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Building responsive and scalable web applications
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            Let's create something amazing together!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up stagger-5">
          <button
            onClick={scrollToContact}
            className="modern-btn"
          >
            <span>Contact Me</span>
          </button>
          <a
            href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
            target="_blank"
            rel="noopener noreferrer"
            className="modern-btn-outline"
          >
            WhatsApp
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">Scroll Down</span>
            <ChevronDown className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

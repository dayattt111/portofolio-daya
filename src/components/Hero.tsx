import { useEffect, useRef } from 'react';
import { ChevronDown, Zap } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Pixel grid background
    const drawPixelGrid = () => {
      const pixelSize = 40;
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += pixelSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animated particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }

    const particles: Particle[] = [];
    const colors = ['#00ff88', '#ff006e', '#b537f2', '#ffbe0b'];

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4 - 2,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      });
    };

    // Initial particles
    for (let i = 0; i < 30; i++) {
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 8, 18, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawPixelGrid();

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;

        if (p.life < 0) {
          particles.splice(i, 1);
          return;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;

        // Wrap around screen
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
      });

      // Add new particles occasionally
      frameCount++;
      if (frameCount % 5 === 0 && particles.length < 50) {
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

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
    <section id="home" className="hero-section pt-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-retro-dark/30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 md:gap-8 px-4 py-20 text-center">
        {/* Animated Icon */}
        <div className="mb-4 md:mb-8 animate-bounce">
          <div className="w-20 md:w-24 h-20 md:h-24 border-4 border-neon-cyan bg-retro-dark/50 flex items-center justify-center relative">
            <Zap className="w-10 md:w-12 h-10 md:h-12 text-neon-cyan animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-pink border-2 border-neon-pink"></div>
          </div>
        </div>

        {/* Main Title */}
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel font-bold text-neon-cyan mb-2 animate-pulse">
              Welcome
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-pixel font-bold text-neon-pink mb-4">
              Muh. Amin Hidayat
            </h2>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-retro text-neon-yellow">
              Portfolio Website
            </h3>
          </div>
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple"></div>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-2xl mx-auto text-sm md:text-base">
          [ FULL STACK DEVELOPER | UI/UX ENTHUSIAST | 8-BIT PIXEL ART ]
        </p>

        {/* Description */}
        <div className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base space-y-2 font-retro">
          <p className="text-neon-cyan">
            &gt; Crafting digital experiences with vintage vibes
          </p>
          <p className="text-neon-purple">
            &gt; Building modern web apps with retro aesthetic
          </p>
          <p className="text-neon-yellow">
            &gt; Let's create something awesome together!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
          <button
            onClick={scrollToContact}
            className="pixel-btn"
          >
            CONTACT ME
          </button>
          <a
            href="https://wa.me/6282197855715?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn-outline"
          >
            WHATSAPP
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-neon-cyan" />
        </div>
      </div>
    </section>
  );
}

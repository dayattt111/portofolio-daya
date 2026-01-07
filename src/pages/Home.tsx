import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles, Code2, Palette, MessageCircle, Award, Users, Rocket } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Home() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    for (let i = 0; i < 30; i++) {
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

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const featuredProjects = [
    {
      id: 1,
      title: 'Company Profile',
      description: 'Professional company profile website with modern design and responsive layout.',
      color: '#00ff88',
      stack: ['Next.Js', 'React', 'TypeScript', 'Tailwind CSS'],
      image: '/images/projects/DataCCProject.png'
    },
    {
      id: 2,
      title: 'Organize New DCC Website',
      description: 'New Website DCC with modern design and responsive layout.',
      color: '#ffbe0b',
      stack: ['React JS', 'Next Js', 'Firebase', 'Three JS'],
      image: '/images/projects/newDCC.png'
    },
    {
      id: 3,
      title: 'Laundry Apps',
      description: 'Laundry management app with real-time order tracking.',
      color: '#ff006e',
      stack: ['Laravel', 'React', 'Oracle','Tailwind CSS'],
      image: '/images/projects/laundryApp.png'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section - 2 Columns Layout */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-1">
              <div className="relative group w-full max-w-md">
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse`} />
                <div className="relative flex justify-center">
                  <img 
                    src="/images/profile/day.png" 
                    alt="Daya Sakti Profile" 
                    className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Profile Info & About */}
            <div className="flex flex-col justify-center order-2 lg:order-2 text-center lg:text-left space-y-6">
              <div className="animate-fade-in-up space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className={`text-sm md:text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                    Welcome to my portfolio
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient leading-tight">
                  Hi, I'm Daya Sakti
                </h1>

                <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    <span className="font-medium text-sm">Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30">
                    <Palette className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                    <span className="font-medium text-sm">UI/UX Enthusiast</span>
                  </div>
                </div>

                <p className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Passionate developer crafting modern web experiences with clean code and beautiful design. 
                  Specializing in React, TypeScript, and full-stack development.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-xl mx-auto lg:mx-0">
                  {[
                    { icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, value: '5+', label: 'Years Exp', color: 'from-blue-500 to-cyan-500' },
                    { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, value: '50+', label: 'Clients', color: 'from-purple-500 to-pink-500' },
                    { icon: <Rocket className="w-4 h-4 md:w-5 md:h-5" />, value: '100+', label: 'Projects', color: 'from-orange-500 to-red-500' },
                    { icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5" />, value: '15+', label: 'Certificates', color: 'from-yellow-500 to-orange-500' }
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`p-4 md:p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
                          : 'bg-white/80 border-gray-200 hover:bg-white'
                      }`}
                    >
                      <div className={`flex items-center gap-2 mb-2 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`}>
                        {stat.icon}
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs md:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons - 2 columns on mobile */}
                <div className="grid grid-cols-2 lg:flex gap-3 md:gap-4 justify-center lg:justify-start max-w-xl mx-auto lg:mx-0">
                  <Link 
                    to="/projects"
                    className="col-span-2 lg:col-span-1 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center text-sm md:text-base"
                  >
                    View My Work
                  </Link>
                  <a 
                    href="mailto:dayagani17@gmail.com"
                    className={`col-span-2 lg:col-span-1 px-6 md:px-8 py-3 md:py-4 border-2 ${theme === 'dark' ? 'border-white/30 hover:bg-white/10' : 'border-gray-900/30 hover:bg-gray-900/10'} font-semibold rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base`}
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Contact Me
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Me Section - Singkat */}
      <section ref={sectionRef} className={`py-16 md:py-20 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              A glimpse into my journey and achievements
            </p>
          </div>

          <div className="text-center">
            <Link 
              to="/about"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 ${
                theme === 'dark' 
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' 
                  : 'border-blue-500 text-blue-500 hover:bg-blue-50'
              } font-semibold transition-all duration-300 hover:scale-105`}
            >
              Learn More About Me
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className={`py-16 md:py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className={`text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              My best work showcased
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white border-gray-200'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-sm rounded-full ${
                          theme === 'dark' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Projects
              <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

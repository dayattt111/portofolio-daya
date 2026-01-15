import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles, Code2, Palette, MessageCircle, Award, Users, Rocket, Github } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Cache untuk GitHub data
const CACHE_KEY = 'github_contributions_dayattt111';
const CACHE_DURATION = 1000 * 60 * 60; // 1 coud

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function Home() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [graphVisible, setGraphVisible] = useState(false);

  // Calculate total contributions
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  // Fetch GitHub contributions dengan cache
  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Check cache terlebih dahulu
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setContributions(data);
            setLoading(false);
            return;
          }
        }

        // Fetch dari GitHub API
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/dayattt111?y=last`
        );
        const result = await response.json();
        
        // Convert data ke format yang kita butuhkan
        const contributionData: ContributionDay[] = [];
        result.contributions.forEach((contribution: any) => {
          contributionData.push({
            date: contribution.date,
            count: contribution.count,
            level: contribution.level
          });
        });

        // Simpan ke cache
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: contributionData, timestamp: Date.now() })
        );

        setContributions(contributionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fallback ke data dummy jika error
        const dummyData = Array.from({ length: 365 }, (_, i) => ({
          date: new Date(Date.now() - (365 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10),
          level: Math.floor(Math.random() * 5)
        }));
        setContributions(dummyData);
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setGraphVisible(true), 300);
        }
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

    for (let i = 0; i < 15; i++) {
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
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-24">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 z-0" />

        <div className="relative z-10 max-w-7xl mt-5 px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-10 xl:gap-12 items-start lg:items-center">
            
            {/* Left Column - Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-1">
              <div className="relative group w-full flex justify-center lg:justify-end max-w-[280px] sm:max-w-[320px] lg:max-w-[350px]">
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse`} />
                <div className="relative flex justify-center w-full">
                  <img 
                    src="/images/profile/pp.png" 
                    // src="/images/profile/dayat1.jpg" 
                    alt="Muhammad Amin Hidayat Profile" 
                    className="relative w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: '2048/3070', maxHeight: '450px' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Profile Info & About */}
            <div className="flex flex-col justify-center order-2 lg:order-2 text-center lg:text-left space-y-3">
              <div className="animate-fade-in-up space-y-3">
                <div className="space-y-1"> {/* Container untuk mengatur jarak antar baris */}
                    <span className="block text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Hi, I'm
                    </span>
                    <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient leading-tight">
                        Muhammad Amin Hidayat
                    </h1>
                </div>
                
                {/* Social Links - Icon Only */}
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <a href="https://www.linkedin.com/in/muhammad-amin-hidayat" target="_blank" rel="noopener noreferrer" 
                     className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50' 
                         : 'bg-white/80 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                     }`} 
                     title="LinkedIn">
                    <img src="/images/sosial-media/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                  <a href="https://www.kaggle.com/muhammadaminhidayat" target="_blank" rel="noopener noreferrer" 
                     className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-cyan-600/20 border border-gray-700/50 hover:border-cyan-500/50' 
                         : 'bg-white/80 hover:bg-cyan-50 border border-gray-200 hover:border-cyan-300'
                     }`} 
                     title="Kaggle">
                    <img src="/images/sosial-media/Kaggle_logo.png" alt="Kaggle" className="w-5 h-5 object-contain" />
                  </a>
                  <a href="https://scholar.google.com/citations?user=LRRALCsAAAAJ&hl=id" target="_blank" rel="noopener noreferrer" 
                     className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                       theme === 'dark' 
                         ? 'bg-gray-800/50 hover:bg-red-600/20 border border-gray-700/50 hover:border-red-500/50' 
                         : 'bg-white/80 hover:bg-red-50 border border-gray-200 hover:border-red-300'
                     }`} 
                     title="Google Scholar">
                    <img src="/images/sosial-media/Google Scholar.svg" alt="Google Scholar" className="w-5 h-5" />
                  </a>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-xs">Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30">
                    <Palette className="w-4 h-4 text-purple-400" />
                    <span className="font-medium text-xs">Cloud Eunthiast</span>
                  </div>
                </div>

                <p className={`text-xs text-justify md:text-sm lg:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Undergraduate student at <b><i>Universitas Dipa Makassar</i></b> and a passionate programmer with a strong focus on <b>Full-Stack Web Development</b>, <b>Computer Networking</b>, and <b>Technical communication</b>. I actively build <i>web-based applications</i>, explore modern <i>technologies</i>, and develop problem-solving skills through real projects and collaborative environments. I am also a member of <b><i>Dipanegara Computer Club</i></b>, where I engage in IT discussions, knowledge sharing, and continuous skill development in <b>programming</b> and <b>networking</b>.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 max-w-xl mx-auto lg:mx-0">
                  {[
                    { icon: <Award className="w-3 h-3" />, value: '5+', label: 'Years Exp', color: 'from-blue-500 to-cyan-500' },
                    { icon: <Users className="w-3 h-3" />, value: '50+', label: 'Clients', color: 'from-purple-500 to-pink-500' },
                    { icon: <Rocket className="w-3 h-3" />, value: '100+', label: 'Projects', color: 'from-orange-500 to-red-500' },
                    { icon: <Sparkles className="w-3 h-3" />, value: '15+', label: 'Certificates', color: 'from-yellow-500 to-orange-500' }
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 md:p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70' 
                          : 'bg-white/80 border-gray-200 hover:bg-white'
                      }`}
                    >
                      <div className={`flex items-center gap-1.5 mb-1 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`}>
                        {stat.icon}
                      </div>
                      <div className={`text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons - 2 columns on mobile */}
                <div className="grid grid-cols-2 lg:flex gap-2 justify-center lg:justify-start max-w-xl mx-auto lg:mx-0">
                  <a
                  href="public/cv/CV-Muhammad-Amin-Hidayat.pdf"
                  className="
                    relative overflow-hidden
                    col-span-2 lg:col-span-1
                    px-5 py-2.5
                    bg-gradient-to-r from-blue-500 to-purple-500
                    text-white font-semibold rounded-full
                    transition-all duration-300
                    hover:shadow-2xl hover:scale-105
                    active:after:animate-ping
                    after:absolute after:w-10 after:h-10
                    after:bg-white/30 after:rounded-full
                    after:top-1/2 after:left-1/2
                    after:-translate-x-1/2 after:-translate-y-1/2
                    after:opacity-0 active:after:opacity-100
                    text-center text-xs md:text-sm
                  "
                >
                  Download CV
                </a>
                  <a 
                    href="mailto:hidayatbaru0304@gmail.com"
                    className={`col-span-2 lg:col-span-1 px-5 py-2.5 border-2 ${theme === 'dark' ? 'border-white/30 hover:bg-white/10' : 'border-gray-900/30 hover:bg-gray-900/10'} font-semibold rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm`}
                  >
                    <MessageCircle className="w-4 h-4" />
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

          {/* GitHub Contribution Graph */}
          <div className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ${theme === 'dark' ? 'shadow-purple-500/20' : 'shadow-purple-500/30'}`}>
                  <Github className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  GitHub Activity
                </h3>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time contribution graph from <a href="https://github.com/dayattt111" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:text-blue-600 transition-colors">@dayattt111</a>
              </p>
            </div>

            <div className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-800/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl border-gray-700/50 shadow-2xl' 
                : 'bg-gradient-to-br from-white via-gray-50 to-white border-gray-200 shadow-xl'
            }`}>
              {/* Total Contributions */}
              {!loading && (
                <div className={`mb-4 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {totalContributions.toLocaleString()} contributions in the last year
                </div>
              )}

              {/* Activity Grid - Custom Fast Implementation */}
          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${
                    theme === 'dark' ? 'border-purple-500' : 'border-purple-600'
                  }`}></div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Loading activity...
                  </p>
                </div>
              </div>
            ) : (
              /* Container Utama yang Full Width */
              <div className="w-full overflow-x-auto custom-scrollbar pb-4">
                <div className="flex flex-col w-full min-w-[800px]">
                  
                  {/* Row 1: Label Bulan */}
                  <div className="flex mb-2 ml-8"> {/* ml-8 untuk memberi ruang bagi label hari di kiri */}
                    {Array.from({ length: 53 }).map((_, weekIndex) => {
                      const weekDate = new Date(Date.now() - (52 - weekIndex) * 7 * 24 * 60 * 60 * 1000);
                      const month = weekDate.getMonth();
                      const prevWeekDate = weekIndex > 0 ? new Date(Date.now() - (52 - (weekIndex - 1)) * 7 * 24 * 60 * 60 * 1000) : null;
                      const isNewMonth = !prevWeekDate || month !== prevWeekDate.getMonth();

                      return (
                        <div key={weekIndex} className="flex-1 text-[10px]">
                          {isNewMonth && (
                            <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>
                              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Row 2: Label Hari + Grid Utama */}
                  <div className="flex w-full gap-2">
                    
                    {/* Kolom Label Hari */}
                    <div className="flex flex-col justify-between text-[10px] w-6 py-1 h-[100px]">
                      <div className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>Mon</div>
                      <div className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>Wed</div>
                      <div className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>Fri</div>
                    </div>

                    {/* Grid Kontribusi - Full Width */}
                    <div className="flex flex-1 justify-between gap-[3px]">
                      {Array.from({ length: 53 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px] flex-1">
                          {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const dataIndex = weekIndex * 7 + dayIndex;
                            const contribution = contributions[dataIndex] || { level: 0, count: 0, date: '' };
                            const delay = (6 - dayIndex) * 30 + weekIndex * 1.5;
                            
                            const colors = theme === 'dark' 
                              ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                              : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
                            
                            return (
                              <div
                                key={dayIndex}
                                className="aspect-square w-full rounded-[2px] transition-all duration-200 hover:scale-125 cursor-pointer origin-center"
                                style={{
                                  backgroundColor: colors[contribution.level] || colors[0],
                                  animation: graphVisible ? `nodeSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms forwards` : 'none',
                                  opacity: 0,
                                  transform: 'translateY(10px)'
                                }}
                                title={`${contribution.count} contributions on ${contribution.date}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Legend (Opsional) */}
                  <div className="flex items-center justify-end gap-1 mt-3 text-[10px]">
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>Less</span>
                    {[0, 1, 2, 3, 4].map(lvl => (
                      <div 
                        key={lvl} 
                        className="w-3 h-3 rounded-[2px]" 
                        style={{ 
                          backgroundColor: (theme === 'dark' 
                            ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                            : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'])[lvl] 
                        }} 
                      />
                    ))}
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>More</span>
                  </div>

                </div>
              </div>
            )}
          </div>
              
              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-3 justify-center items-center text-xs">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Less</span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3, 4].map((level) => {
                      const colors = theme === 'dark' 
                        ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                        : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
                      
                      return (
                        <div
                          key={level}
                          className="w-3 h-3 rounded-sm transition-transform hover:scale-125 cursor-pointer"
                          style={{ backgroundColor: colors[level] }}
                        />
                      );
                    })}
                  </div>
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>More</span>
                </div>
              </div>
            </div>

            {/* Optimized Keyframe Animations */}
            <style>{`
              @keyframes nodeSlideUp {
                0% {
                  opacity: 0;
                  transform: translateY(10px) scale(0.8);
                }
                60% {
                  transform: translateY(-2px) scale(1.05);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>
          </div>

          <div className="text-center mt-8">
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

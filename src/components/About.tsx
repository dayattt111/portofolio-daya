import { Code, Zap, Palette, Award, Users, Rocket, Star, Activity, Linkedin, Instagram, BookOpen, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useEffect, useRef, useState, useCallback } from 'react';

// Cache untuk GitHub data
const CACHE_KEY = 'github_contributions_dayattt111';
const CACHE_DURATION = 1000 * 60 * 60; // 1 jam

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function About() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [graphVisible, setGraphVisible] = useState(false);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

  // Terminal typing animation states
  const [typedCommand, setTypedCommand] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingDone, setTypingDone] = useState(false);
  const commandText = 'whoami';
  const resultText = 'Muhammad Amin Hidayat';
  const [typedResult, setTypedResult] = useState('');
  const typingStarted = useRef(false);

  // Fastfetch states
  const [typedCommand2, setTypedCommand2] = useState('');
  const [typingDone2, setTypingDone2] = useState(false);
  const [showFastfetch, setShowFastfetch] = useState(false);
  const commandText2 = 'fastfetch';
  const [cursorPhase, setCursorPhase] = useState<'cmd1' | 'cmd2' | 'done'>('cmd1');

  // Terminal typing effect
  const startTyping = useCallback(() => {
    if (typingStarted.current) return;
    typingStarted.current = true;

    let i = 0;
    const typeCommand = () => {
      if (i < commandText.length) {
        setTypedCommand(commandText.slice(0, i + 1));
        i++;
        setTimeout(typeCommand, 100 + Math.random() * 80);
      } else {
        // Pause after command typed, then show result
        setTimeout(() => {
          setTypingDone(true);
          setShowResult(true);
          let j = 0;
          const typeResult = () => {
            if (j < resultText.length) {
              setTypedResult(resultText.slice(0, j + 1));
              j++;
              setTimeout(typeResult, 50 + Math.random() * 40);
            } else {
              // After whoami result done, start typing fastfetch
              setCursorPhase('cmd2');
              setTimeout(() => {
                let k = 0;
                const typeCmd2 = () => {
                  if (k < commandText2.length) {
                    setTypedCommand2(commandText2.slice(0, k + 1));
                    k++;
                    setTimeout(typeCmd2, 100 + Math.random() * 80);
                  } else {
                    setTimeout(() => {
                      setTypingDone2(true);
                      setShowFastfetch(true);
                      setCursorPhase('done');
                    }, 500);
                  }
                };
                setTimeout(typeCmd2, 400);
              }, 800);
            }
          };
          setTimeout(typeResult, 200);
        }, 600);
      }
    };
    setTimeout(typeCommand, 800);
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

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
          startTyping();
        }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Terminal Whoami Animation */}
        <div className={`mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl border ${
            theme === 'dark' 
              ? 'border-gray-700 shadow-black/40' 
              : 'border-gray-300 shadow-gray-400/30'
          }`}>
            {/* Terminal Title Bar */}
            <div className={`flex items-center gap-2 px-4 py-2.5 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className={`text-xs font-medium ml-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                terminal — bash
              </span>
            </div>
            
            {/* Terminal Body */}
            <div className={`px-5 py-5 font-mono text-xs sm:text-sm md:text-base ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-gray-950'
            } overflow-x-auto`}>
              {/* Command 1: whoami */}
              <div className="flex items-center flex-wrap">
                <span className="text-green-400 font-bold">Hikaruu</span>
                <span className="text-gray-500">@</span>
                <span className="text-purple-400 font-bold">Developer</span>
                <span className="text-gray-500 mx-1.5">~</span>
                <span className="text-yellow-400 mr-2">$</span>
                <span className="text-white">{typedCommand}</span>
                {cursorPhase === 'cmd1' && !typingDone && (
                  <span className={`inline-block w-2.5 h-5 ml-0.5 ${
                    cursorVisible ? 'bg-green-400' : 'bg-transparent'
                  } transition-colors duration-100`}></span>
                )}
              </div>
              
              {/* Result 1: name */}
              {showResult && (
                <div className="mt-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {typedResult}
                  </span>
                  {cursorPhase === 'cmd1' && typedResult.length < resultText.length && (
                    <span className={`inline-block w-2.5 h-7 ml-0.5 align-middle ${
                      cursorVisible ? 'bg-green-400' : 'bg-transparent'
                    } transition-colors duration-100`}></span>
                  )}
                </div>
              )}

              {/* Command 2: fastfetch */}
              {typedResult === resultText && (
                <div className="flex items-center mt-3 flex-wrap">
                  <span className="text-green-400 font-bold">Hikaruu</span>
                  <span className="text-gray-500">@</span>
                  <span className="text-purple-400 font-bold">Developer</span>
                  <span className="text-gray-500 mx-1.5">~</span>
                  <span className="text-yellow-400 mr-2">$</span>
                  <span className="text-white">{typedCommand2}</span>
                  {cursorPhase === 'cmd2' && !typingDone2 && (
                    <span className={`inline-block w-2.5 h-5 ml-0.5 ${
                      cursorVisible ? 'bg-green-400' : 'bg-transparent'
                    } transition-colors duration-100`}></span>
                  )}
                </div>
              )}

              {/* Fastfetch Output */}
              {showFastfetch && (
                <div className="mt-3 flex gap-4 sm:gap-6 items-start">
                  {/* Kali Linux ASCII Art */}
                  <pre className="text-blue-400 text-[8px] sm:text-[10px] md:text-xs leading-tight select-none shrink-0" style={{ fontFamily: 'monospace' }}>{`
  ......                        
  .;okOOOkdc,.                  
  .,lkOOOOOOOOOOOl.              
  .;oOOOOOOOOOOOOOOOo.            
  cdOOOOOOOOOOOOOOOOOOd.          
 .dOOOOOOOOOOOOOOOOOOOOOc         
 lOOOOOOOOOOOOOOOOOOOOOOOo.       
 .OOOOOOOOOOOOOOOOOOOOOOOOOO;      
 :OOOOOOOOOOOOOc..oOOOOOOOOO.     
 cOOOOOOOOOOOo.    .oOOOOOOOO     
 :OOOOOOOOOOO.       lOOOOOOOOl   
 oOOOOOOOOOOc         cOOOOOOOO.  
     .:oOOOOOo          oOOOOOOO; 
        .dOOOOo.         :OOOOOO; 
          cOOOOOo.        lOOOOO; 
           oOOOOOOo.      :OOOOO: 
            .oOOOOOOo.    .OOOOOo 
              cOOOOOOOo.  cOOOOOo 
              .oOOOOOOOOodOOOOOOo 
               .oOOOOOOOOOOOOOOo  
                 oOOOOOOOOOOOOo.  
                  oOOOOOOOOOo.    
                   .oOOOOOo.      
                     .oOo.        
                       .          `}</pre>

                  {/* System Info */}
                  <div className="text-[10px] sm:text-xs md:text-sm leading-relaxed sm:leading-loose min-w-0">
                    <div><span className="text-blue-400 font-bold">Hikaruu</span><span className="text-gray-500">@</span><span className="text-blue-400 font-bold">Developer</span></div>
                    <div className="text-gray-600">──────────────────</div>
                    <div><span className="text-blue-400 font-bold">OS</span><span className="text-gray-500">: </span><span className="text-gray-300">Kali GNU/Linux Rolling x86_64</span></div>
                    <div><span className="text-blue-400 font-bold">Host</span><span className="text-gray-500">: </span><span className="text-gray-300">Portfolio v2.0</span></div>
                    <div><span className="text-blue-400 font-bold">Kernel</span><span className="text-gray-500">: </span><span className="text-gray-300">6.1.0-kali9-amd64</span></div>
                    <div><span className="text-blue-400 font-bold">Uptime</span><span className="text-gray-500">: </span><span className="text-gray-300">∞ (always coding)</span></div>
                    <div><span className="text-blue-400 font-bold">Shell</span><span className="text-gray-500">: </span><span className="text-gray-300">zsh 5.9</span></div>
                    <div><span className="text-blue-400 font-bold">DE</span><span className="text-gray-500">: </span><span className="text-gray-300">React + TypeScript</span></div>
                    <div><span className="text-blue-400 font-bold">Theme</span><span className="text-gray-500">: </span><span className="text-gray-300">Tailwind CSS [Dark]</span></div>
                    <div><span className="text-blue-400 font-bold">Terminal</span><span className="text-gray-500">: </span><span className="text-gray-300">VS Code Integrated</span></div>
                    <div><span className="text-blue-400 font-bold">Languages</span><span className="text-gray-500">: </span><span className="text-gray-300">TS, JS, PHP, Python</span></div>
                    <div><span className="text-blue-400 font-bold">Frameworks</span><span className="text-gray-500">: </span><span className="text-gray-300">React, Laravel, Next.js</span></div>
                    <div className="mt-2 flex gap-1">
                      {['bg-black','bg-red-600','bg-green-500','bg-yellow-500','bg-blue-500','bg-purple-500','bg-cyan-400','bg-white'].map((c, i) => (
                        <div key={i} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${c}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Final prompt */}
              {showFastfetch && (
                <div className="flex items-center mt-3">
                  <span className="text-green-400 font-bold">Hikaruu</span>
                  <span className="text-gray-500">@</span>
                  <span className="text-purple-400 font-bold">Developer</span>
                  <span className="text-gray-500 mx-1.5">~</span>
                  <span className="text-yellow-400 mr-2">$</span>
                  <span className={`inline-block w-2.5 h-5 ml-0.5 ${
                    cursorVisible ? 'bg-green-400' : 'bg-transparent'
                  } transition-colors duration-100`}></span>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle below terminal */}
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4 sm:px-0 text-center mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Passionate developer with expertise in building scalable web applications and creating memorable user experiences
          </p>
        </div>

        {/* Activity Graph - Simple Animated */}
        <div className={`mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg ${theme === 'dark' ? 'shadow-purple-500/20' : 'shadow-purple-500/30'}`}>
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Coding Activity
              </h3>
            </div>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Year of consistent development
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

        {/* Social Links Section */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Connect With Me</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white'
               }`}>
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="https://scholar.google.com/citations?user=youruser" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white'
               }`}>
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Scholar</span>
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-pink-600 text-gray-700 hover:text-white'
               }`}>
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a href="https://www.scribd.com/user/youruser" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-orange-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white'
               }`}>
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Scribd</span>
            </a>
            <a href="https://medium.com/@yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-green-600 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <span className="text-sm font-medium">Medium</span>
            </a>
            <a href="https://orcid.org/0000-0000-0000-0000" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-green-700 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-green-700 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.053-1.666 4.053-3.722 0-2.025-1.694-3.722-4.053-3.722h-2.297z"/>
              </svg>
              <span className="text-sm font-medium">ORCID</span>
            </a>
            <a href="https://www.kaggle.com/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-cyan-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-cyan-600 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
              </svg>
              <span className="text-sm font-medium">Kaggle</span>
            </a>
            <a href="https://developers.google.com/profile/u/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white'
               }`}>
              <Code className="w-5 h-5" />
              <span className="text-sm font-medium">Google Dev</span>
            </a>
          </div>
        </div>

        {/* Social Links Section */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Connect With Me</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-blue-600 text-gray-700 hover:text-white'
               }`}>
              <Linkedin className="w-5 h-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
            <a href="https://scholar.google.com/citations?user=youruser" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white'
               }`}>
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Scholar</span>
            </a>
            <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-pink-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-pink-600 text-gray-700 hover:text-white'
               }`}>
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a href="https://www.scribd.com/user/youruser" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-orange-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-orange-600 text-gray-700 hover:text-white'
               }`}>
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Scribd</span>
            </a>
            <a href="https://medium.com/@yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-green-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-green-600 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <span className="text-sm font-medium">Medium</span>
            </a>
            <a href="https://orcid.org/0000-0000-0000-0000" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-green-700 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-green-700 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 4.053-1.666 4.053-3.722 0-2.025-1.694-3.722-4.053-3.722h-2.297z"/>
              </svg>
              <span className="text-sm font-medium">ORCID</span>
            </a>
            <a href="https://www.kaggle.com/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-cyan-600 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-cyan-600 text-gray-700 hover:text-white'
               }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.358"/>
              </svg>
              <span className="text-sm font-medium">Kaggle</span>
            </a>
            <a href="https://developers.google.com/profile/u/yourprofile" target="_blank" rel="noopener noreferrer" 
               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                 theme === 'dark' 
                   ? 'bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white' 
                   : 'bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white'
               }`}>
              <Code className="w-5 h-5" />
              <span className="text-sm font-medium">Google Dev</span>
            </a>
          </div>
        </div>

        {/* Stats Grid - Animated */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer touch-manipulation ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70' : 'bg-gray-50 hover:bg-gray-100'}`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 sm:mb-4 transform transition-transform group-hover:rotate-12`}>
                {item.icon}
              </div>
              <div className={`text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                {item.value}
              </div>
              <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Enhanced Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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

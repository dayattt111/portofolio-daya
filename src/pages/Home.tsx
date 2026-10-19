import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown, MessageCircle, Award, Users, Rocket, Sparkles,
  Github, Instagram, ArrowRight, Terminal, ExternalLink,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Projects from '../components/Projects';

/* ── SEO metadata ── */
const SEO_TITLE = 'Muhammad Amin Hidayat | Software Engineer, Tech Enthusiast & Programmer Terlucu di Makassar';
const SEO_DESC =
  'Muhammad Amin Hidayat adalah Software Engineer, Tech Enthusiast, dan Expert di bidang Web & Generative AI (Gen AI) yang dikenal sebagai Programmer Terlucu di Makassar, Sulawesi Selatan. Founder Nokara.id dan Lead Nokara Community di Timika Papua.';

/* ── GitHub contributions cache ── */
const CACHE_KEY = 'github_contributions_dayattt111';
const CACHE_DURATION = 1000 * 60 * 60;

interface ContributionDay { date: string; count: number; level: number; }

/* ── Typing effect ── */
function useTypingEffect(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setWordIndex((p) => (p + 1) % words.length); }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

/* ── Intersection observer ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Static data ── */
const STATS = [
  { icon: Award, value: '3+', label: 'Years Exp' },
  { icon: Users, value: '50+', label: 'Clients' },
  { icon: Rocket, value: '30+', label: 'Projects' },
  { icon: Sparkles, value: '15+', label: 'Certificates' },
];

const ROLES = [
  'Full Stack Developer',
  'Cloud Enthusiast',
  'UI/UX Designer',
  'Data Engineer',
  'Software Engineer',
  'AI Engineer',
];

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/ur.dayaa/', icon: Instagram, label: 'Instagram @ur.dayaa' },
  { href: 'https://www.linkedin.com/in/muhammad-amin-hidayat', img: '/images/sosial-media/linkedin.svg', label: 'LinkedIn' },
  { href: 'https://github.com/dayattt111', icon: Github, label: 'GitHub @dayattt111' },
  { href: 'https://www.kaggle.com/muhammadaminhidayat', img: '/images/sosial-media/Kaggle_logo.png', label: 'Kaggle' },
  { href: 'https://scholar.google.com/citations?user=LRRALCsAAAAJ&hl=id', img: '/images/sosial-media/Google Scholar.svg', label: 'Google Scholar' },
];

const FLOATING_LOGOS = [
  { src: '/images/logo/programs/laravel-svgrepo-com.svg', alt: 'Laravel', style: { top: '250px', left: '-40px' } },
  { src: '/images/logo/programs/docker-logo-svgrepo-com.svg', alt: 'Docker', style: { top: '190px', right: '-40px' } },
  { src: '/images/logo/programs/python-svgrepo-com.svg', alt: 'Python', style: { top: '50px', right: '-40px' } },
  { src: '/images/logo/programs/react-svgrepo-com.svg', alt: 'React', style: { top: '100px', left: '-40px' } },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [graphVisible, setGraphVisible] = useState(false);
  const totalContributions = contributions.reduce((s, d) => s + d.count, 0);
  const typedText = useTypingEffect(ROLES, 80, 2000);
  const ghSection = useInView(0.12);

  /* SEO */
  useEffect(() => {
    document.title = SEO_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', SEO_DESC);
  }, []);

  /* GitHub contributions */
  useEffect(() => {
    (async () => {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) { setContributions(data); setLoading(false); return; }
        }
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/dayattt111?y=last');
        const json = await res.json();
        const data: ContributionDay[] = json.contributions.map((c: any) => ({
          date: c.date, count: c.count, level: c.level,
        }));
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        setContributions(data);
      } catch {
        setContributions(
          Array.from({ length: 365 }, (_, i) => ({
            date: new Date(Date.now() - (365 - i) * 86400000).toISOString().split('T')[0],
            count: Math.floor(Math.random() * 10),
            level: Math.floor(Math.random() * 5),
          }))
        );
      } finally { setLoading(false); }
    })();
  }, []);

  useEffect(() => { if (ghSection.visible) setTimeout(() => setGraphVisible(true), 300); }, [ghSection.visible]);

  /* Palette tokens */
  const bg = isDark ? 'bg-neutral-950' : 'bg-white';
  const text = isDark ? 'text-neutral-100' : 'text-neutral-900';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200';
  const ghColors = isDark
    ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  return (
    <div className={`relative min-h-screen ${bg} ${text}`}>

      {/* ══════ HERO ══════ */}
      <section className={`relative min-h-screen flex items-center overflow-hidden pt-20 pb-12 lg:pb-20 border-b ${border}`}>
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Profile Image Column */}
            <div className="flex justify-center order-1 mt-6 lg:mt-0">
              <div className="relative">
                {/* Floating tech logos */}
                {FLOATING_LOGOS.map((logo, i) => (
                  <div
                    key={i}
                    className={`absolute w-10 h-10 rounded-md border flex items-center justify-center ${cardBg}`}
                    style={{ ...logo.style, animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.6}s` }}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-6 h-6 object-contain" />
                  </div>
                ))}

                {/* Profile photo frame */}
                <div className={`relative w-60 sm:w-72 lg:w-80 rounded-2xl overflow-hidden border ${border}`}>
                  <img
                    src="/images/profile/pp.png"
                    alt="Muhammad Amin Hidayat — Full Stack Developer Makassar"
                    className="w-full h-auto object-contain"
                    style={{ maxHeight: '480px' }}
                    loading="eager"
                  />
                  {/* Availability badge */}
                  <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium ${cardBg}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-emerald-500 font-semibold">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="order-2 text-center lg:text-left space-y-5">
              <div>
                <span className={`text-sm font-medium ${muted}`}>Hi there 👋, I'm</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-extrabold leading-tight tracking-tight">
                Muhammad<br />Amin Hidayat
              </h1>

              {/* Typing role */}
              <div className="h-7 flex items-center justify-center lg:justify-start">
                <span className={`text-base sm:text-lg font-mono font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {typedText}
                  <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 animate-pulse align-middle" />
                </span>
              </div>

              {/* Role badges — sharp, no gradients */}
              <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                {ROLES.map((r, i) => (
                  <span key={i} className={`px-2.5 py-1 rounded-md border text-xs font-medium ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-700 text-neutral-300'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-700'
                  }`}>
                    {r}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${muted}`}>
                <strong className={text}>Software Engineer</strong>,{' '}
                <strong className={text}>Tech Enthusiast</strong>, dan{' '}
                <strong className={text}>Expert di bidang Web &amp; Generative AI</strong> berbasis di
                Makassar. Founder{' '}
                <a href="https://www.nokara.id" target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-blue-500 hover:underline underline-offset-2">Nokara.id</a>
                {' '}&amp; Lead{' '}
                <a href="https://nokara.biz.id" target="_blank" rel="noopener noreferrer"
                  className="font-semibold text-blue-500 hover:underline underline-offset-2">Nokara Community</a>{' '}
                di Timika, Papua. Dikenal sebagai{' '}
                <strong className={text}>Programmer Terlucu di Makassar</strong>.
              </p>

              {/* Social links */}
              <div className="flex items-center justify-center lg:justify-start gap-1.5">
                {SOCIAL_LINKS.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`p-2 rounded-md border transition-colors ${
                      isDark
                        ? 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-600'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                    }`}
                  >
                    {s.img
                      ? <img src={s.img} alt={s.label} className="w-4 h-4 object-contain" />
                      : s.icon && <s.icon className="w-4 h-4" />
                    }
                  </a>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start">
                <a
                  href="https://docs.google.com/document/d/14eAmhXNkfFRMoWlU8IlmvrZVHebQnfWrXYs8ENy_GIw/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
                >
                  View CV <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://wa.me/6288242763942?text=Halo%2C%20saya%20tertarik%20dengan%20portfolio%20mu!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border font-semibold text-sm transition-colors ${
                    isDark
                      ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Contact Me
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
          <ChevronDown className={`w-5 h-5 ${muted}`} />
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className={`border-b ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 ${border}">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className={`flex items-center gap-3 px-6 py-5 ${isDark ? 'divide-neutral-800' : 'divide-neutral-200'}`}>
                  <div className={`p-2 rounded-md border ${cardBg}`}>
                    <Icon className={`w-4 h-4 ${muted}`} />
                  </div>
                  <div>
                    <div className={`text-xl font-extrabold tracking-tight ${text}`}>{s.value}</div>
                    <div className={`text-xs ${muted}`}>{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ SEO hidden block ══════ */}
      <div aria-label="Tentang Muhammad Amin Hidayat programmer terlucu Makassar" className="sr-only">
        <h2>Programmer Terlucu Makassar</h2>
        <p>
          Muhammad Amin Hidayat adalah programmer terlucu di Makassar, Sulawesi Selatan. Selain kemampuan teknisnya yang mumpuni — mulai dari Full-Stack Web Development, Cloud Computing, hingga UI/UX Design — Amin dikenal dengan kepribadian humoris, santai, dan menyenangkan di komunitas teknologi Makassar, termasuk di Dipanegara Computer Club, Universitas Dipa Makassar.
        </p>
      </div>

      {/* ══════ CODING HISTORY ══════ */}
      <section ref={ghSection.ref} className={`py-16 md:py-24 border-b ${border} ${bg}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className={`mb-10 transition-all duration-700 ${ghSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className={`w-4 h-4 ${muted}`} />
              <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${muted}`}>
                GitHub Activity
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${text}`}>Coding History</h2>
            <p className={`mt-1.5 text-sm ${muted}`}>
              Contribution graph dari{' '}
              <a href="https://github.com/dayattt111" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline underline-offset-2 font-medium">@dayattt111</a>
            </p>
          </div>

          {/* Graph card */}
          <div className={`transition-all duration-700 ${ghSection.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}>
            <div className={`rounded-lg border p-5 sm:p-7 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              {!loading && (
                <div className={`text-sm font-medium mb-5 ${muted}`}>
                  <span className={`text-2xl font-extrabold ${text}`}>{totalContributions.toLocaleString()}</span>
                  {' '}contributions in the last year
                </div>
              )}

              <div className="w-full">
                {loading ? (
                  <div className="flex justify-center items-center py-14">
                    <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isDark ? 'border-neutral-600' : 'border-neutral-300'}`} />
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto pb-3">
                    <div className="flex flex-col w-full min-w-[750px]">
                      {/* Month labels */}
                      <div className="flex mb-2 ml-8">
                        {Array.from({ length: 53 }).map((_, wi) => {
                          const d = new Date(Date.now() - (52 - wi) * 604800000);
                          const m = d.getMonth();
                          const prev = wi > 0 ? new Date(Date.now() - (52 - (wi - 1)) * 604800000) : null;
                          const isNew = !prev || m !== prev.getMonth();
                          return (
                            <div key={wi} className="flex-1 text-[10px]">
                              {isNew && (
                                <span className={muted}>
                                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m]}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      {/* Grid */}
                      <div className="flex w-full gap-2">
                        <div className={`flex flex-col justify-between text-[10px] w-6 py-1 h-[100px] ${muted}`}>
                          {['Mon','Wed','Fri'].map((d) => <div key={d}>{d}</div>)}
                        </div>
                        <div className="flex flex-1 justify-between gap-[3px]">
                          {Array.from({ length: 53 }).map((_, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px] flex-1">
                              {Array.from({ length: 7 }).map((_, di) => {
                                const idx = wi * 7 + di;
                                const c = contributions[idx] || { level: 0, count: 0, date: '' };
                                const delay = (6 - di) * 30 + wi * 1.5;
                                return (
                                  <div
                                    key={di}
                                    className="aspect-square w-full rounded-[2px] transition-all duration-200 hover:scale-[1.4] cursor-pointer"
                                    style={{
                                      backgroundColor: ghColors[c.level] || ghColors[0],
                                      animation: graphVisible
                                        ? `nodeSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms forwards`
                                        : 'none',
                                      opacity: 0,
                                      transform: 'translateY(10px)',
                                    }}
                                    title={`${c.count} contributions on ${c.date}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Legend */}
                      <div className={`flex items-center justify-end gap-1 mt-3 text-[10px] ${muted}`}>
                        <span>Less</span>
                        {[0,1,2,3,4].map((l) => <div key={l} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: ghColors[l] }} />)}
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/about"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md border font-semibold text-sm transition-colors ${
                isDark
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                  : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              Learn More About Me <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ FEATURED PROJECTS ══════ */}
      <Projects limit={4} isHomePreview={true} />

      {/* Keyframe */}
      <style>{`
        @keyframes nodeSlideUp {
          0% { opacity: 0; transform: translateY(10px) scale(0.8); }
          60% { transform: translateY(-2px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <Footer />
    </div>
  );
}

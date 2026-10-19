import { useEffect, useRef, useState } from 'react';
import {
  MessageCircle, Award, Users, Rocket, Sparkles,
  Github, Instagram, Terminal, ExternalLink,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
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
  const text = isDark ? 'text-neutral-100' : 'text-neutral-900';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200';
  const ghColors = isDark
    ? ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
    : ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

  return (
    <div className={`space-y-16 lg:space-y-20 ${text}`}>

      {/* ══════ INTRO BIO & HERO (RIGHT COLUMN HEADER) ══════ */}
      <section className="space-y-8">
        {/* Meta badges: Location & Availability */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Location Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
            isDark ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300' : 'border-neutral-200 bg-neutral-50 text-neutral-700'
          }`}>
            <MapPin size={12} className="text-rose-500" />
            <span>Makassar, Indonesia</span>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium border ${
            isDark ? 'border-neutral-800 bg-neutral-900/60 text-emerald-400' : 'border-neutral-200 bg-neutral-50 text-emerald-600'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for projects</span>
          </div>
        </div>

        {/* H1 Heading (Protected SEO & GEO requirement) */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Muhammad Amin Hidayat
          </h1>

          {/* Dynamic role subtitle */}
          <div className="h-6 flex items-center">
            <span className={`text-base sm:text-lg font-mono font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {typedText}
              <span className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* Intro Editorial Bio */}
        <p className={`text-base sm:text-lg leading-relaxed ${muted}`}>
          <strong className={text}>Software Engineer</strong>,{' '}
          <strong className={text}>Tech Enthusiast</strong>, dan{' '}
          <strong className={text}>Expert di bidang Web &amp; Generative AI (Gen AI)</strong> berbasis di{' '}
          <span className={isDark ? 'text-neutral-200 font-medium' : 'text-neutral-800 font-medium'}>
            Makassar, Indonesia
          </span>
          . Founder{' '}
          <a
            href="https://www.nokara.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-2 font-medium"
          >
            Nokara.id
          </a>{' '}
          &amp; Lead{' '}
          <a
            href="https://nokara.biz.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-2 font-medium"
          >
            Nokara Community
          </a>{' '}
          di Timika, Papua. Di komunitas teknologi lokal dikenal dengan julukan{' '}
          <strong className={text}>Programmer Terlucu di Makassar</strong>.
        </p>

        {/* Action Buttons & Socials */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="https://docs.google.com/document/d/14eAmhXNkfFRMoWlU8IlmvrZVHebQnfWrXYs8ENy_GIw/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-xs"
          >
            <span>View CV</span>
            <ExternalLink size={13} />
          </a>

          <a
            href="https://wa.me/6288242763942?text=Halo%20Amin%2C%20saya%20tertarik%20dengan%20portfolio%20kamu!"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${
              isDark
                ? 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'
                : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50'
            }`}
          >
            <MessageCircle size={14} className="text-emerald-500" />
            <span>Contact Me</span>
          </a>

          <div className="flex items-center gap-1 pl-1">
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                aria-label={s.label}
                className={`p-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {s.img ? (
                  <img src={s.img} alt={s.label} className="w-3.5 h-3.5 object-contain" />
                ) : (
                  s.icon && <s.icon className="w-3.5 h-3.5" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Roles & Expertise Badges */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-mono uppercase tracking-wider text-neutral-500">Core Disciplines</p>
          <div className="flex flex-wrap gap-1.5">
            {ROLES.map((role, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium ${
                  isDark
                    ? 'border-neutral-800 bg-neutral-900/50 text-neutral-300'
                    : 'border-neutral-200 bg-neutral-100/70 text-neutral-700'
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ STATS HIGHLIGHTS ══════ */}
      <section className={`py-6 border-y ${border}`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${cardBg}`}>
                  <Icon className={`w-4 h-4 ${muted}`} />
                </div>
                <div>
                  <div className={`text-xl font-bold tracking-tight ${text}`}>{s.value}</div>
                  <div className={`text-xs ${muted}`}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════ SEO HIDDEN BLOCK (Accessible & indexed) ══════ */}
      <div aria-label="Tentang Muhammad Amin Hidayat programmer terlucu Makassar" className="sr-only">
        <h2>Programmer Terlucu Makassar</h2>
        <p>
          Muhammad Amin Hidayat adalah programmer terlucu di Makassar, Sulawesi Selatan. Selain kemampuan teknisnya yang mumpuni — mulai dari Full-Stack Web Development, Cloud Computing, hingga UI/UX Design — Amin dikenal dengan kepribadian humoris, santai, dan menyenangkan di komunitas teknologi Makassar, termasuk di Dipanegara Computer Club, Universitas Dipa Makassar.
        </p>
      </div>

      {/* ══════ CODING HISTORY (GITHUB ACTIVITY) ══════ */}
      <section ref={ghSection.ref} className="space-y-4">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 transition-all duration-700 ${
          ghSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-1">
              <Terminal size={12} />
              <span>GitHub Commit Ledger</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Coding History</h2>
          </div>
          <a
            href="https://github.com/dayattt111"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline font-mono inline-flex items-center gap-1"
          >
            <span>@dayattt111</span>
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Activity Card */}
        <div className={`rounded-xl border p-5 sm:p-6 transition-all duration-700 ${cardBg} ${
          ghSection.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        }`}>
          {!loading && (
            <div className={`text-xs font-medium mb-4 ${muted}`}>
              <span className={`text-lg font-bold ${text}`}>{totalContributions.toLocaleString()}</span>
              {' '}contributions in the last year
            </div>
          )}

          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${
                  isDark ? 'border-neutral-700' : 'border-neutral-300'
                }`} />
              </div>
            ) : (
              <div className="w-full overflow-x-auto pb-2 scrollbar-none">
                <div className="flex flex-col w-full min-w-[680px]">
                  {/* Month labels */}
                  <div className="flex mb-1.5 ml-7">
                    {Array.from({ length: 53 }).map((_, wi) => {
                      const d = new Date(Date.now() - (52 - wi) * 604800000);
                      const m = d.getMonth();
                      const prev = wi > 0 ? new Date(Date.now() - (52 - (wi - 1)) * 604800000) : null;
                      const isNew = !prev || m !== prev.getMonth();
                      return (
                        <div key={wi} className="flex-1 text-[9px]">
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
                    <div className={`flex flex-col justify-between text-[9px] w-5 py-0.5 h-[84px] ${muted}`}>
                      {['Mon','Wed','Fri'].map((d) => <div key={d}>{d}</div>)}
                    </div>
                    <div className="flex flex-1 justify-between gap-[2.5px]">
                      {Array.from({ length: 53 }).map((_, wi) => (
                        <div key={wi} className="flex flex-col gap-[2.5px] flex-1">
                          {Array.from({ length: 7 }).map((_, di) => {
                            const idx = wi * 7 + di;
                            const c = contributions[idx] || { level: 0, count: 0, date: '' };
                            const delay = (6 - di) * 20 + wi * 1;
                            return (
                              <div
                                key={di}
                                className="aspect-square w-full rounded-[1.5px] transition-transform duration-150 hover:scale-125 cursor-pointer"
                                style={{
                                  backgroundColor: ghColors[c.level] || ghColors[0],
                                  animation: graphVisible
                                    ? `nodeSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms forwards`
                                    : 'none',
                                  opacity: 0,
                                  transform: 'translateY(6px)',
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
                  <div className={`flex items-center justify-end gap-1 mt-2 text-[10px] ${muted}`}>
                    <span>Less</span>
                    {[0,1,2,3,4].map((l) => (
                      <div key={l} className="w-2.5 h-2.5 rounded-[1.5px]" style={{ backgroundColor: ghColors[l] }} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════ FEATURED PROJECTS ══════ */}
      <section className="space-y-4">
        <Projects limit={4} isHomePreview={true} />
      </section>

      {/* ══════ FOOTER ══════ */}
      <Footer />

      {/* Keyframe animation */}
      <style>{`
        @keyframes nodeSlideUp {
          0% { opacity: 0; transform: translateY(6px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

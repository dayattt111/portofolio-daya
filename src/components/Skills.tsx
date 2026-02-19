import { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, Send, Sparkles, Globe, Terminal, Smartphone, Braces, Cloud, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// ─── SVG logo helper ───
const L = '/images/logo/programs';
const logo = (file: string) => `${L}/${file}`;

// ─── All skills flattened for the grid ───
const allSkills = [
  { name: 'React.js', level: 95, svg: logo('react-svgrepo-com.svg'), category: 'Frontend', glow: '#61dafb' },
  { name: 'TypeScript', level: 92, svg: logo('typescript-logo-svgrepo-com.svg'), category: 'Frontend', glow: '#3178c6' },
  { name: 'JavaScript', level: 95, svg: logo('javascript-svgrepo-com.svg'), category: 'Frontend', glow: '#f7df1e' },
  { name: 'Tailwind CSS', level: 95, svg: logo('tailwind-svgrepo-com.svg'), category: 'Frontend', glow: '#06b6d4' },
  { name: 'Laravel', level: 85, svg: logo('laravel-svgrepo-com.svg'), category: 'Backend', glow: '#ff2d20' },
  { name: 'Python', level: 80, svg: logo('python-svgrepo-com.svg'), category: 'Backend', glow: '#3776ab' },
  { name: 'MySQL', level: 88, svg: logo('mysql-logo-svgrepo-com.svg'), category: 'Database', glow: '#00758f' },
  { name: 'PostgreSQL', level: 82, svg: logo('postgresql-svgrepo-com.svg'), category: 'Database', glow: '#336791' },
  { name: 'Firebase', level: 80, svg: logo('firebase-svgrepo-com.svg'), category: 'Cloud', glow: '#ffca28' },
  { name: 'Docker', level: 75, svg: logo('docker-logo-svgrepo-com.svg'), category: 'DevOps', glow: '#2496ed' },
  { name: 'Figma', level: 88, svg: logo('figma-svgrepo-com.svg'), category: 'Design', glow: '#a259ff' },
  { name: 'GitHub', level: 92, svg: logo('github-142-svgrepo-com.svg'), category: 'Tools', glow: '#8b5cf6' },
  { name: 'Gmail', level: 90, svg: logo('gmail-svgrepo-com.svg'), category: 'Tools', glow: '#ea4335' },
];


// ─── Experience items ───
const experiences = [
  { year: '2023 — Now', role: 'Full-Stack Developer', where: 'Freelance & Projects', desc: 'Membangun aplikasi web modern dengan React, Laravel, dan cloud services.' },
  { year: '2024 — Now', role: 'UI / UX Designer', where: 'Freelance', desc: 'Mendesain antarmuka yang intuitif dan user-friendly dengan Figma.' },
  { year: '2023 — Now', role: 'Open Source Contributor', where: 'GitHub', desc: 'Berkontribusi pada proyek open-source dan membangun tools untuk komunitas developer.' },
];

// ─── Intersection observer hook ───
function useInView(threshold = 0.12) {
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

// ─── 3-D tilt card hook ───
function useTilt() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.04, 1.04, 1.04)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current; if (!el) return;
    el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  }, []);

  return { cardRef, handleMouseMove, handleMouseLeave };
}

// ─── Single skill card with 3-D tilt ───
function SkillCard({ skill, index, visible, theme }: { skill: typeof allSkills[0]; index: number; visible: boolean; theme: string }) {
  const { cardRef, handleMouseMove, handleMouseLeave } = useTilt();
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (skill.level / 100) * circ;

  // Each card flies in from a unique direction based on its index
  const directions = [
    { x: -60, y: -40 },  { x: 0, y: -60 },  { x: 60, y: -40 },
    { x: -80, y: 0 },    { x: 80, y: 0 },    { x: -60, y: 40 },
    { x: 0, y: 60 },     { x: 60, y: 40 },   { x: -40, y: -60 },
    { x: 40, y: -60 },   { x: -40, y: 60 },  { x: 40, y: 60 },
    { x: 0, y: -80 },
  ];
  const dir = directions[index % directions.length];
  const delay = index * 70;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-card-wrapper"
      style={{
        transition: `transform 0.15s ease-out, opacity 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms, translate 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms, filter 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : `${dir.x}px ${dir.y}px`,
        filter: visible ? 'blur(0)' : 'blur(8px)',
        willChange: 'transform, opacity, translate, filter',
      }}
    >
      <div className={`relative h-full p-5 rounded-2xl border overflow-hidden group cursor-default
        ${theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/40 hover:border-gray-600/70'
          : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg'
        }`}
      >
        {/* Glow blob on hover */}
        <div
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ background: skill.glow }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-3">
          {/* Circular progress ring + logo */}
          <div className="relative w-[96px] h-[96px] flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r={radius} fill="none" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} strokeWidth="4" />
              <circle
                cx="48" cy="48" r={radius} fill="none"
                stroke={skill.glow}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={visible ? offset : circ}
                className="transition-all duration-[1.4s] ease-out"
                style={{ transitionDelay: `${delay + 300}ms` }}
              />
            </svg>
            <img
              src={skill.svg}
              alt={skill.name}
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h3>
            <span className="text-xs font-medium mt-0.5 block" style={{ color: skill.glow }}>{skill.level}%</span>
          </div>

          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${theme === 'dark' ? 'bg-gray-700/60 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            {skill.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════ MAIN COMPONENT ═══════════
export default function Skills() {
  const { theme } = useTheme();
  const heroSection = useInView(0.1);
  const skillsSection = useInView(0.05);
  const expSection = useInView(0.1);
  const contactSection = useInView(0.1);
  const templateSection = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', project: '', budget: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo, saya ${formData.name}.%0AEmail: ${formData.email}%0AProyek: ${formData.project}%0ABudget: ${formData.budget}%0APesan: ${formData.message}`;
    window.open(`https://wa.me/6282197855715?text=${msg}`, '_blank');
    setFormData({ name: '', email: '', project: '', budget: '', message: '' });
  };

  return (
    <div className={`transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* ═══════════ HERO HEADER ═══════════ */}
      <section ref={heroSection.ref} className="py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'}`} />
          <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'}`} />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center transition-all duration-700 ${heroSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 text-xs font-semibold tracking-wider uppercase ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
              <Sparkles className="w-3.5 h-3.5" /> Skills & Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Teknologi dan tools yang saya kuasai untuk membangun solusi digital yang modern, scalable, dan berkualitas tinggi
            </p>
          </div>
        </div>
      </section>



      {/* ═══════════ SKILLS GRID ═══════════ */}
      <section ref={skillsSection.ref} className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} visible={skillsSection.visible} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE TIMELINE ═══════════ */}
      <section ref={expSection.ref} className={`py-14 sm:py-20 ${theme === 'dark' ? 'bg-gray-800/20' : 'bg-gray-50/60'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${expSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="relative pl-12 sm:pl-16"
                  style={{
                    transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${i * 150}ms, translate 0.6s cubic-bezier(.22,1,.36,1) ${i * 150}ms`,
                    opacity: expSection.visible ? 1 : 0,
                    translate: expSection.visible ? '0 0' : '0 30px',
                  }}
                >
                  {/* Dot */}
                  <div className={`absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900 border-emerald-400' : 'bg-white border-emerald-500'}`} />
                  {/* Pulse ring */}
                  <div className="absolute left-1.5 sm:left-3.5 top-0.5 w-5 h-5 rounded-full animate-ping opacity-20" style={{ background: '#34d399' }} />

                  <div className={`p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.01] ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700/40 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}`}>
                    <span className={`text-xs font-mono mb-1 block ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{exp.year}</span>
                    <h3 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{exp.where}</span>
                    <p className={`text-sm mt-2 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HIRE ME / CONTACT ═══════════ */}
      <section ref={contactSection.ref} className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 md:mb-14 transition-all duration-700 ${contactSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 text-xs font-semibold tracking-wider uppercase ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-600'}`}>
              <MessageCircle className="w-3.5 h-3.5" /> Let's Work Together
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Ajukan Kerja Sama
            </h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Tertarik menggunakan jasa saya? Kirim pengajuan proyek Anda dan mari kita wujudkan bersama!
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-6 md:gap-8 transition-all duration-700 ${contactSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Left — Contact Info */}
            <div className="space-y-4">
              {/* Services */}
              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200 shadow-md'}`}>
                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Layanan Saya</h3>
                <div className="space-y-3">
                  {[
                    { icon: <Globe className="w-4 h-4" />, label: 'Web Development', desc: 'Website & Aplikasi Web', gradient: 'from-blue-500 to-cyan-500' },
                    { icon: <Smartphone className="w-4 h-4" />, label: 'UI/UX Design', desc: 'Desain Antarmuka Modern', gradient: 'from-purple-500 to-pink-500' },
                    { icon: <Braces className="w-4 h-4" />, label: 'API Development', desc: 'REST & GraphQL APIs', gradient: 'from-orange-500 to-red-500' },
                    { icon: <Cloud className="w-4 h-4" />, label: 'Cloud & DevOps', desc: 'Deploy & Infrastructure', gradient: 'from-emerald-500 to-teal-500' },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-gray-700/40 hover:bg-gray-700/60' : 'bg-gray-50 hover:bg-gray-100'}`}>
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white shrink-0`}>{s.icon}</div>
                      <div>
                        <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{s.label}</div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200 shadow-md'}`}>
                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Kontak Langsung</h3>
                <div className="space-y-2">
                  {[
                    { href: 'https://wa.me/6282197855715', icon: <MessageCircle className="w-4 h-4 text-green-500" />, label: 'WhatsApp', value: '082197855715' },
                    { href: 'mailto:hidayatbaru0304@gmail.com', svg: logo('gmail-svgrepo-com.svg'), label: 'Email', value: 'hidayatbaru0304@gmail.com' },
                    { href: 'https://github.com/dayattt111', svg: logo('github-142-svgrepo-com.svg'), label: 'GitHub', value: 'dayattt111' },
                    { href: 'https://www.linkedin.com/in/muhammad-amin-hidayat', svg: '/images/logo/sosial-media/linkedin-svgrepo-com.svg', label: 'LinkedIn', value: 'muhammad-amin-hidayat' },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] ${theme === 'dark' ? 'hover:bg-gray-700/40' : 'hover:bg-gray-50'}`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        {'svg' in c && c.svg ? <img src={c.svg} alt={c.label} className="w-4 h-4 object-contain" /> : ('icon' in c ? c.icon : null)}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{c.label}</div>
                        <div className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200 shadow-md'}`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
              <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Kirim Pengajuan Proyek
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Nama Lengkap</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" required
                      className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none transition text-sm ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" required
                      className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none transition text-sm ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Jenis Proyek</label>
                    <select value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} required
                      className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none transition text-sm ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                      <option value="">Pilih jenis proyek</option>
                      <option value="Website">Website / Web App</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="API Development">API Development</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Company Profile">Company Profile</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Estimasi Budget</label>
                    <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none transition text-sm ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                      <option value="">Pilih budget</option>
                      <option value="< 1 Juta">&lt; Rp 1 Juta</option>
                      <option value="1 - 3 Juta">Rp 1 - 3 Juta</option>
                      <option value="3 - 5 Juta">Rp 3 - 5 Juta</option>
                      <option value="5 - 10 Juta">Rp 5 - 10 Juta</option>
                      <option value="> 10 Juta">&gt; Rp 10 Juta</option>
                      <option value="Diskusi">Diskusi Lebih Lanjut</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Detail Proyek</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Ceritakan tentang proyek yang ingin Anda buat..." rows={4} required
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-purple-500 outline-none resize-none transition text-sm ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`} />
                </div>
                <button type="submit" className="w-full group px-6 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Kirim via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PORTFOLIO TEMPLATE CTA ═══════════ */}
      <section ref={templateSection.ref} className="py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative p-8 sm:p-10 md:p-12 rounded-2xl border overflow-hidden text-center transition-all duration-700 ${templateSection.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white border-gray-200 shadow-xl'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="relative z-10">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 text-xs font-semibold tracking-wider uppercase ${theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                <Star className="w-3.5 h-3.5" /> Open Source
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tertarik Membuat Portfolio Sendiri?
              </h3>
              <p className={`text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Website portfolio ini bersifat <strong>open-source</strong>! Anda bisa menggunakan template ini sebagai dasar untuk membangun portfolio pribadi Anda sendiri.
              </p>

              <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl mb-6 font-mono text-sm ${theme === 'dark' ? 'bg-gray-900/80 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                <Terminal className="w-4 h-4 text-green-500 shrink-0" />
                <code className="truncate">git clone https://github.com/dayattt111/portofolio-daya.git</code>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://github.com/dayattt111/portofolio-daya" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 text-sm">
                  <img src={logo('github-142-svgrepo-com.svg')} alt="GitHub" className="w-4 h-4 invert" /> View on GitHub
                </a>
                <a href="https://github.com/dayattt111/portofolio-daya/stargazers" target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 border-2 font-semibold rounded-xl hover:scale-105 transition-all duration-300 text-sm ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  <Star className="w-4 h-4 text-yellow-500" /> Give a Star
                </a>
              </div>

              <p className={`text-xs mt-5 flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                Built with
                <img src={logo('react-svgrepo-com.svg')} alt="React" className="w-3.5 h-3.5 inline" />
                <img src={logo('typescript-logo-svgrepo-com.svg')} alt="TypeScript" className="w-3.5 h-3.5 inline" />
                <img src={logo('tailwind-svgrepo-com.svg')} alt="Tailwind" className="w-3.5 h-3.5 inline" />
                &amp; Vite
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Inline CSS for marquee + skill card ═══ */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .skill-card-wrapper {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}

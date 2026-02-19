import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle, Send, ArrowRight, Sparkles, Code2, Globe, Database, Palette, Server, Terminal, Smartphone, Braces, GitBranch, Cloud, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// ─── Skill categories ───
const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React.js', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 92, icon: '📘' },
      { name: 'Next.js', level: 90, icon: '▲' },
      { name: 'Tailwind CSS', level: 95, icon: '🎨' },
      { name: 'HTML/CSS', level: 98, icon: '🌐' },
    ]
  },
  {
    title: 'Backend Development',
    icon: <Server className="w-5 h-5" />,
    gradient: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'Laravel', level: 85, icon: '🔴' },
      { name: 'PHP', level: 85, icon: '🐘' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'Express.js', level: 87, icon: '⚡' },
    ]
  },
  {
    title: 'Database & Cloud',
    icon: <Database className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'MySQL', level: 88, icon: '🐬' },
      { name: 'PostgreSQL', level: 82, icon: '🐘' },
      { name: 'Supabase', level: 85, icon: '⚡' },
      { name: 'Firebase', level: 80, icon: '🔥' },
      { name: 'Google Cloud', level: 78, icon: '☁️' },
    ]
  },
  {
    title: 'Tools & Design',
    icon: <Palette className="w-5 h-5" />,
    gradient: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Figma', level: 88, icon: '🎯' },
      { name: 'Git & GitHub', level: 92, icon: '📦' },
      { name: 'Docker', level: 75, icon: '🐳' },
      { name: 'VS Code', level: 95, icon: '💻' },
      { name: 'Linux', level: 82, icon: '🐧' },
    ]
  },
];

// ─── Tech marquee items ───
const techMarquee = [
  { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-600' },
  { name: 'TypeScript', icon: '📘', color: 'from-blue-400 to-blue-600' },
  { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Next.js', icon: '▲', color: 'from-gray-600 to-gray-800' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-green-600' },
  { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500' },
  { name: 'Laravel', icon: '🔴', color: 'from-red-400 to-red-600' },
  { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-700' },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700' },
  { name: 'Tailwind', icon: '🎨', color: 'from-cyan-400 to-blue-500' },
  { name: 'Firebase', icon: '🔥', color: 'from-yellow-500 to-orange-600' },
  { name: 'Git', icon: '📦', color: 'from-red-500 to-orange-500' },
  { name: 'Figma', icon: '🎯', color: 'from-purple-500 to-pink-500' },
  { name: 'Supabase', icon: '⚡', color: 'from-emerald-400 to-emerald-600' },
  { name: 'Three.js', icon: '🎲', color: 'from-gray-400 to-gray-600' },
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

export default function Skills() {
  const { theme } = useTheme();
  const heroSection = useInView(0.1);
  const skillsSection = useInView(0.08);
  const contactSection = useInView(0.1);
  const templateSection = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', project: '', budget: '', message: '' });
  const [activeCategory, setActiveCategory] = useState(0);

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

      {/* ═══════════ TECH MARQUEE ═══════════ */}
      <section className={`py-4 border-y overflow-hidden ${theme === 'dark' ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-50/80 border-gray-100'}`}>
        <div className="relative">
          <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none ${theme === 'dark' ? 'bg-gradient-to-l from-gray-900 to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'}`} />
          <div className="flex animate-marquee">
            {[...techMarquee, ...techMarquee].map((tech, i) => (
              <div key={i} className={`flex-shrink-0 flex items-center gap-2 mx-4 px-4 py-2 rounded-lg transition-all hover:scale-105 ${theme === 'dark' ? 'bg-gray-800/60' : 'bg-white/80'}`}>
                <span className="text-lg">{tech.icon}</span>
                <span className={`text-xs font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent whitespace-nowrap`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HIRE ME / CONTACT ═══════════ */}
      <section ref={contactSection.ref} className={`py-14 sm:py-20 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50/80'}`}>
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
                    { href: 'mailto:hidayatbaru0304@gmail.com', icon: <Mail className="w-4 h-4 text-blue-500" />, label: 'Email', value: 'hidayatbaru0304@gmail.com' },
                    { href: 'https://github.com/dayattt111', icon: <Github className="w-4 h-4 text-purple-500" />, label: 'GitHub', value: 'dayattt111' },
                    { href: 'https://www.linkedin.com/in/muhammad-amin-hidayat', icon: <Linkedin className="w-4 h-4 text-blue-600" />, label: 'LinkedIn', value: 'muhammad-amin-hidayat' },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] ${theme === 'dark' ? 'hover:bg-gray-700/40' : 'hover:bg-gray-50'}`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>{c.icon}</div>
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
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500`} />
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
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500`} />

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
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
                <a href="https://github.com/dayattt111/portofolio-daya/stargazers" target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 border-2 font-semibold rounded-xl hover:scale-105 transition-all duration-300 text-sm ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-white/5' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  <Star className="w-4 h-4 text-yellow-500" /> Give a Star
                </a>
              </div>

              <p className={`text-xs mt-5 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                Built with React, TypeScript, Tailwind CSS &amp; Vite
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee CSS */}
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
      `}</style>
    </div>
  );
}

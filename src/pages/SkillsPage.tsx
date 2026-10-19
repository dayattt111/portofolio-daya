import { useEffect } from 'react';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function SkillsPage() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = 'Skills & Services — Muhammad Amin Hidayat | Full Stack Developer Makassar';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lihat keahlian dan layanan Muhammad Amin Hidayat — Web Development, UI/UX Design, API Development. Ajukan kerja sama proyek sekarang.');
  }, []);

  return (
    <div className={`min-h-screen pt-14 lg:pt-0 ${theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'}`}>
      <Skills />
      <Footer />
    </div>
  );
}

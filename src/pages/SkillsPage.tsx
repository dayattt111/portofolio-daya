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
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Skills />
      <Footer />
    </div>
  );
}

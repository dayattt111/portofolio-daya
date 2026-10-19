import { useEffect } from 'react';
import Skills from '../components/Skills';
import Footer from '../components/Footer';

export default function SkillsPage() {

  useEffect(() => {
    document.title = 'Skills & Services — Muhammad Amin Hidayat | Full Stack Developer Makassar';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Lihat keahlian dan layanan Muhammad Amin Hidayat — Web Development, UI/UX Design, API Development. Ajukan kerja sama proyek sekarang.');
  }, []);

  return (
    <div className="space-y-12">
      <Skills />
      <Footer />
    </div>
  );
}

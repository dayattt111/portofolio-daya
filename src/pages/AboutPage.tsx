import { useEffect } from 'react';
import About from '../components/About';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();

  // SEO meta for About page
  useEffect(() => {
    document.title = 'Tentang Muhammad Amin Hidayat — Programmer & Full Stack Developer Makassar';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Profil lengkap Muhammad Amin Hidayat, programmer muda berbakat dan Full Stack Developer dari Makassar, Sulawesi Selatan. Mahasiswa Universitas Dipa Makassar, anggota Dipanegara Computer Club. Ahli React, TypeScript, Next.js, Cloud Computing, dan UI/UX Design.');
  }, []);
  
  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <About />
      <Footer />
    </div>
  );
}

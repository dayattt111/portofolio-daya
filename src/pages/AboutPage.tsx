import { useEffect } from 'react';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {

  // SEO meta for About page
  useEffect(() => {
    document.title = 'Tentang Muhammad Amin Hidayat — Programmer & Full Stack Developer Makassar';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Profil lengkap Muhammad Amin Hidayat, programmer muda berbakat dan Full Stack Developer dari Makassar, Sulawesi Selatan. Mahasiswa Universitas Dipa Makassar, anggota Dipanegara Computer Club. Ahli React, TypeScript, Next.js, Cloud Computing, dan UI/UX Design.');
  }, []);
  
  return (
    <div className="space-y-12">
      <About />
      <Footer />
    </div>
  );
}

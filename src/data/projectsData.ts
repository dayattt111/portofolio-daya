export interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
  status: string;
  category: 'Web App' | 'Full Stack' | 'System & Network' | 'AI / Data';
  stack: string[];
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Lontara-Lang: Bahasa Pemrograman Aksara Bugis',
    description: 'Bahasa pemrograman edukatif berbasis logika bahasa Bugis dan aksara Lontara Unicode. Mengintegrasikan parser/compiler, online playground, dan dokumentasi digital untuk pelestarian budaya Nusantara di era modern.',
    year: '2025',
    status: 'Active',
    category: 'AI / Data',
    stack: ['TypeScript', 'Compiler / AST', 'Unicode Lontara', 'React', 'Tailwind CSS'],
    image: '/project-assets/lontara-lang.jpeg',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-amber-500 via-rose-500 to-red-600'
  },
  {
    id: 2,
    title: 'D-Verse: Developer Universe GreenTech Hackathon',
    description: 'Portal resmi event teknologi bertema GreenTech yang menggabungkan seminar nasional dan kompetisi hackathon inovasi digital oleh Dipanegara Computer Club dan PNUP.',
    year: '2025',
    status: 'Production',
    category: 'Full Stack',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Vercel'],
    image: '/project-assets/dverse.jpeg',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-emerald-400 via-teal-500 to-cyan-600'
  },
  {
    id: 3,
    title: 'Stand Up Indo Timika Community Platform',
    description: 'Wadah kreativitas dan komedi tunggal terbesar di Kabupaten Mimika, Papua. Dilengkapi sistem reservasi tiket event, jadwal open mic, profil komika, dan manajemen komunitas.',
    year: '2025',
    status: 'Active',
    category: 'Web App',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Node.js'],
    image: '/project-assets/standup-indo-timika.jpeg',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-orange-500 via-amber-500 to-yellow-500'
  },
  {
    id: 4,
    title: 'Website Komunitas Dicoding UNDIPA (DCN)',
    description: 'Portal komunitas resmi Dicoding UNDIPA dengan manajemen event, sistem forum anggota, leaderboard sertifikasi, dan showcase talenta digital.',
    year: '2025',
    status: 'Active',
    category: 'Web App',
    stack: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/project-assets/dcn.jpeg',
    demoUrl: 'https://github.com/dayattt111/dcn_undipa.git',
    repoUrl: 'https://github.com/dayattt111/dcn_undipa.git',
    featured: true,
    color: 'from-rose-500 to-orange-500'
  },
  {
    id: 5,
    title: 'Organisasi Portal Website DCC',
    description: 'Website resmi Dipanegara Computer Club dengan dashboard administrasi anggota, berita komunitas, pendaftaran diklat, dan arsip kegiatan organisasi IT.',
    year: '2024',
    status: 'Production',
    category: 'Full Stack',
    stack: ['Next.js', 'React', 'MySQL', 'Firebase', 'Tailwind CSS'],
    image: '/project-assets/dcc-mockup.png',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-violet-500 via-purple-500 to-indigo-600'
  },
  {
    id: 6,
    title: 'DipaTalent UNDIPA: Sistem Ranking Beasiswa (Metode SAW)',
    description: 'Platform terpadu untuk pendataan dan verifikasi prestasi mahasiswa Universitas Dipa Makassar dengan fitur perankingan objektif mengadopsi algoritma Simple Additive Weighting (SAW).',
    year: '2025',
    status: 'Active',
    category: 'Full Stack',
    stack: ['React', 'Next.js', 'Algoritma SAW', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    image: '/project-assets/dipatalent-saw.jpeg',
    demoUrl: 'https://github.com/dayattt111/project_dipaTalent.git',
    repoUrl: 'https://github.com/dayattt111/project_dipaTalent.git',
    featured: true,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 7,
    title: 'Getwash Laundry Management System',
    description: 'Aplikasi manajemen operasional laundry komprehensif dengan pencatatan transaksi real-time, tracking status cucian pelanggan, dan laporan neraca keuangan.',
    year: '2024',
    status: 'Completed',
    category: 'Full Stack',
    stack: ['Laravel', 'React', 'Oracle DB', 'Tailwind CSS', 'Docker'],
    image: '/project-assets/getwash-mockup.png',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 8,
    title: 'PetShop NTI E-Commerce & Prediksi Penjualan',
    description: 'Platform e-commerce perlengkapan hewan peliharaan di Makassar dengan modul prediksi penjualan dan peramalan inventaris menggunakan algoritma regresi linear.',
    year: '2024',
    status: 'Completed',
    category: 'AI / Data',
    stack: ['Python', 'PHP', 'Next.js', 'PostgreSQL', 'Scikit-Learn'],
    image: '/project-assets/pet-NTI.jpeg',
    demoUrl: 'https://github.com/dayattt111/petshop-php-native.git',
    repoUrl: 'https://github.com/dayattt111/petshop-php-native.git',
    featured: false,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 9,
    title: 'Sistem Monitoring Keuangan Analitik & Arus Kas',
    description: 'Aplikasi visualisasi data dan monitoring arus kas keuangan dengan algoritma analitik peramalan tren pengeluaran dan laporan neraca interaktif.',
    year: '2024',
    status: 'Completed',
    category: 'AI / Data',
    stack: ['React', 'Next.js', 'Vite', 'Supabase', 'TypeScript', 'Chart.js'],
    image: '/project-assets/analitik-keunangan.jpeg',
    demoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    repoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    featured: false,
    color: 'from-amber-500 to-emerald-500'
  },
  {
    id: 10,
    title: 'Sistem Reservasi Tiket Teman Bus',
    description: 'Sistem informasi reservasi tiket bus antarkota dengan pemilihan kursi interaktif, jadwal rute real-time, dan konfirmasi tiket instan.',
    year: '2024',
    status: 'Completed',
    category: 'Web App',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    image: '/project-assets/teman-bus.jpeg',
    demoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    repoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    featured: false,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 11,
    title: 'Company Profile DataCC',
    description: 'Aplikasi web profil perusahaan modern dengan sistem rendering performa tinggi, layout responsif, dan showcase layanan teknologi.',
    year: '2025',
    status: 'Production',
    category: 'Full Stack',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Prisma ORM'],
    image: '/images/projects/DataCCProject.png',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: false,
    color: 'from-emerald-500 to-cyan-500'
  },
  {
    id: 12,
    title: 'Portfolio Website DevDaya V2',
    description: 'Web portofolio engineering pribadi dengan arsitektur dashboard sidebar, Schema.org SEO lokal, integrasi Medium RSS feed, dan performa tinggi.',
    year: '2025',
    status: 'Live',
    category: 'Web App',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: '/images/projects/portov2.png',
    demoUrl: 'https://devdaya.my.id/',
    repoUrl: 'https://github.com/dayattt111/portofolio-daya',
    featured: false,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 13,
    title: 'Web Portfolio V1 (Legacy)',
    description: 'Iterasi awal website portofolio pribadi berbasis React dan Vite yang menjadi fondasi dokumentasi karya awal.',
    year: '2023',
    status: 'Archived',
    category: 'Web App',
    stack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    image: '/images/projects/portoProject.png',
    demoUrl: 'https://github.com/dayattt111/portofolio-daya',
    repoUrl: 'https://github.com/dayattt111/portofolio-daya',
    featured: false,
    color: 'from-blue-600 to-indigo-600'
  },
  {
    id: 14,
    title: 'Organisasi Website DCC (Sistem Awal)',
    description: 'Versi perdana portal website Dipanegara Computer Club dengan sistem pengelolaan data berbasis Laravel dan Bootstrap.',
    year: '2023',
    status: 'Archived',
    category: 'System & Network',
    stack: ['Laravel', 'MySQL', 'Bootstrap', 'Chart.js', 'Axios'],
    image: '/images/projects/oldDCC.png',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: false,
    color: 'from-teal-500 to-emerald-500'
  }
];

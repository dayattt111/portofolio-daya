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
    title: 'Company Profile DataCC',
    description: 'Aplikasi web profil perusahaan modern dengan sistem rendering performa tinggi, layout responsif, dan showcase layanan teknologi.',
    year: '2025',
    status: 'Production',
    category: 'Full Stack',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Prisma ORM'],
    image: '/images/projects/DataCCProject.png',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-emerald-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Website Komunitas Dicoding UNDIPA (DCN)',
    description: 'Portal komunitas resmi Dicoding UNDIPA dengan manajemen event, sistem forum anggota, dan showcase talenta digital.',
    year: '2025',
    status: 'Active',
    category: 'Web App',
    stack: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    image: '/images/projects/dcn.png',
    demoUrl: 'https://github.com/dayattt111/dcn_undipa.git',
    repoUrl: 'https://github.com/dayattt111/dcn_undipa.git',
    featured: true,
    color: 'from-rose-500 to-orange-500'
  },
  {
    id: 3,
    title: 'Organisasi Portal Website DCC',
    description: 'Website resmi Dipanegara Computer Club dengan dashboard administrasi anggota, berita komunitas, dan arsip kegiatan organisasi.',
    year: '2024',
    status: 'Production',
    category: 'Full Stack',
    stack: ['Next.js', 'React', 'MySQL', 'Firebase', 'Tailwind CSS'],
    image: '/images/projects/webdcc.png',
    demoUrl: 'https://github.com/dayattt111',
    repoUrl: 'https://github.com/dayattt111',
    featured: true,
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 4,
    title: 'Portfolio Website DevDaya V2',
    description: 'Web portofolio engineering pribadi yang mengintegrasikan automated Medium RSS feed, Schema.org SEO lokal, dan performa tinggi.',
    year: '2025',
    status: 'Live',
    category: 'Web App',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: '/images/projects/portov2.png',
    demoUrl: 'https://devdaya.my.id/',
    repoUrl: 'https://github.com/dayattt111/portofolio-daya',
    featured: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 5,
    title: 'Laundry Management Apps',
    description: 'Aplikasi manajemen operasional laundry komprehensif dengan pencatatan transaksi real-time, status cucian, dan laporan keuangan.',
    year: '2024',
    status: 'Completed',
    category: 'Full Stack',
    stack: ['Laravel', 'React', 'Oracle DB', 'Tailwind CSS', 'Docker'],
    image: '/images/projects/laundryApp.png',
    repoUrl: 'https://github.com/dayattt111',
    featured: false,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 6,
    title: 'PetShop E-Commerce & Regresi Linear',
    description: 'Platform e-commerce perlengkapan hewan peliharaan yang dilengkapi modul prediksi penjualan menggunakan model regresi linear.',
    year: '2024',
    status: 'Completed',
    category: 'AI / Data',
    stack: ['PHP', 'Next.js', 'Python', 'PostgreSQL', 'Prisma'],
    image: '/images/projects/petShop.png',
    demoUrl: 'https://github.com/dayattt111/petshop-php-native.git',
    repoUrl: 'https://github.com/dayattt111/petshop-php-native.git',
    featured: false,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 7,
    title: 'Sistem Manajemen Prestasi DipaTalent UNDIPA',
    description: 'Platform pendataan dan verifikasi prestasi mahasiswa Universitas Dipa Makassar dengan fitur analitik pencapaian akademik & non-akademik.',
    year: '2025',
    status: 'Active',
    category: 'Full Stack',
    stack: ['React', 'Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    image: '/images/projects/dipaTalent.png',
    demoUrl: 'https://github.com/dayattt111/project_dipaTalent.git',
    repoUrl: 'https://github.com/dayattt111/project_dipaTalent.git',
    featured: false,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 8,
    title: 'Sistem Monitoring Keuangan Analitik',
    description: 'Aplikasi visualisasi data dan monitoring arus kas keuangan dengan algoritma analitik regresi linear untuk peramalan tren pengeluaran.',
    year: '2024',
    status: 'Completed',
    category: 'AI / Data',
    stack: ['React', 'Next.js', 'Vite', 'Supabase', 'TypeScript'],
    image: '/images/projects/monitoringFinance.png',
    demoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    repoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    featured: false,
    color: 'from-amber-500 to-emerald-500'
  },
  {
    id: 9,
    title: 'Sistem Informasi Booking Teman Bus',
    description: 'Sistem informasi reservasi tiket bus antarkota dengan pemilihan kursi interaktif, jadwal rute real-time, dan konfirmasi pembayaran.',
    year: '2024',
    status: 'Completed',
    category: 'Web App',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    image: '/images/projects/temanBus.png',
    demoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    repoUrl: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    featured: false,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 10,
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
    id: 11,
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

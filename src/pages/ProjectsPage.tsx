import { useState, useEffect } from 'react';
import { ExternalLink, Github, Terminal, FolderGit2, Search } from 'lucide-react';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { PROJECTS } from '../data/projectsData';
import ProjectStack from '../components/ProjectStack';

type CategoryFilter = 'Semua' | 'Full Stack' | 'Web App' | 'AI / Data' | 'System & Network';
const CATEGORIES: CategoryFilter[] = ['Semua', 'Full Stack', 'Web App', 'AI / Data', 'System & Network'];

const CATEGORY_STYLES: Record<string, string> = {
  'Full Stack':       'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
  'Web App':          'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
  'AI / Data':        'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400',
  'System & Network': 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
};

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua');
  const [query, setQuery] = useState('');

  /* Token aliases */
  const bg = isDark ? 'bg-neutral-950' : 'bg-neutral-50';
  const text = isDark ? 'text-white' : 'text-neutral-900';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';
  const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = isDark
    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
    : 'bg-white border-neutral-200 hover:border-neutral-300';
  const inputBg = isDark
    ? 'bg-neutral-900 border-neutral-700 text-neutral-200 placeholder:text-neutral-600 focus:border-blue-500'
    : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-blue-500';

  /* Filter logic */
  const filtered = PROJECTS.filter((p) => {
    const matchCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchQ = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQ;
  });

  /* SEO */
  useEffect(() => {
    const origTitle = document.title;
    document.title = 'Katalog Proyek & Solusi Web | Muhammad Amin Hidayat — Software Engineer Makassar';

    const metaDesc = document.querySelector('meta[name="description"]');
    const origDesc = metaDesc?.getAttribute('content') ?? '';
    metaDesc?.setAttribute('content',
      'Katalog lengkap proyek rekayasa web, aplikasi full stack, dashboard analitik, dan solusi AI oleh Muhammad Amin Hidayat — Software Engineer & Programmer Terlucu di Makassar.'
    );

    /* Schema.org */
    const scriptId = 'projects-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Katalog Proyek Rekayasa Perangkat Lunak oleh Muhammad Amin Hidayat',
      description: 'Portofolio lengkap aplikasi web, cloud computing, dan solusi AI yang dibangun oleh Muhammad Amin Hidayat.',
      url: 'https://devdaya.my.id/projects',
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((project, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          applicationCategory: project.category === 'AI / Data' ? 'DeveloperApplication' : 'WebApplication',
          operatingSystem: 'Web / Linux / Cloud',
          image: `https://devdaya.my.id${project.image}`,
          url: project.demoUrl || project.repoUrl || 'https://devdaya.my.id/projects',
          creator: {
            '@type': 'Person',
            '@id': 'https://devdaya.my.id/#person',
            name: 'Muhammad Amin Hidayat',
            url: 'https://devdaya.my.id',
          },
        },
      })),
    });

    return () => {
      document.title = origTitle;
      if (metaDesc && origDesc) metaDesc.setAttribute('content', origDesc);
      document.getElementById(scriptId)?.remove();
    };
  }, []);

  return (
    <div className={`min-h-screen pt-20 lg:pt-0 transition-colors duration-200 ${bg} ${text}`}>

      {/* ── Page header ── */}
      <section className={`border-b ${border} ${isDark ? 'bg-neutral-950' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest mb-2 font-semibold ${muted}`}>
                <Terminal size={12} />
                <span>Project Index // Full Archive</span>
              </div>
              <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${text}`}>
                Katalog Proyek &amp; Solusi Perangkat Lunak
              </h1>
              <p className={`mt-2 text-sm sm:text-base leading-relaxed ${muted}`}>
                Koleksi lengkap aplikasi web, sistem informasi enterprise, modul data science, dan infrastruktur cloud yang dikembangkan oleh{' '}
                <strong className={isDark ? 'text-neutral-200' : 'text-neutral-700'}>Muhammad Amin Hidayat</strong>.
              </p>
            </div>

            {/* Repo counter */}
            <div className={`flex items-center gap-2 font-mono text-[11px] px-3 py-2 border rounded-md shrink-0 ${
              isDark ? 'border-neutral-700 bg-neutral-900 text-neutral-400' : 'border-neutral-200 bg-neutral-50 text-neutral-600'
            }`}>
              <FolderGit2 size={13} className="text-blue-500" />
              <div>
                <div className="font-semibold">STATUS: ONLINE</div>
                <div>{filtered.length} / {PROJECTS.length} REPOSITORIES</div>
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`} />
              <input
                type="text"
                placeholder="Cari proyek atau tech stack..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-sm rounded-md border outline-none focus-visible:ring-1 focus-visible:ring-blue-500 transition-colors ${inputBg}`}
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-md border transition-colors ${
                      isActive
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : isDark
                          ? 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className={`text-center py-20 ${muted}`}>
            <FolderGit2 size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Tidak ada proyek yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, idx) => (
              <article
                key={project.id}
                className={`group flex flex-col rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${cardBg}`}
              >
                {/* Accent bar */}
                <div className={`h-0.5 w-full rounded-t-lg bg-gradient-to-r ${project.color}`} />

                {/* Meta */}
                <div className={`flex items-center justify-between px-3.5 py-2 border-b text-[10px] font-mono ${border} ${muted}`}>
                  <span>REF_{String(idx + 1).padStart(2, '0')} // {project.year}</span>
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                  <img
                    src={project.image}
                    alt={`Screenshot antarmuka ${project.title} oleh Muhammad Amin Hidayat`}
                    width="640"
                    height="360"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className={`absolute top-2 right-2 px-2 py-0.5 rounded border text-[10px] font-mono font-semibold backdrop-blur-sm ${
                    CATEGORY_STYLES[project.category] ?? 'bg-neutral-500/10 text-neutral-600 border-neutral-300'
                  }`}>
                    {project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h2 className={`text-sm font-bold tracking-tight mb-1 transition-colors group-hover:text-blue-500 ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {project.title}
                    </h2>
                    <p className={`text-xs leading-relaxed ${muted}`}>{project.description}</p>
                  </div>

                  <div>
                    <div className="mb-3">
                      <ProjectStack stack={project.stack} limit={4} />
                    </div>
                    <div className={`flex items-center gap-1.5 pt-3 border-t ${border}`}>
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live Demo ${project.title}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors"
                        >
                          Live Demo <ExternalLink size={10} />
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Source Code ${project.title}`}
                          className={`flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-md border text-[11px] font-semibold transition-colors ${
                            isDark
                              ? 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                          }`}
                        >
                          <Github size={11} /> Source Code
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

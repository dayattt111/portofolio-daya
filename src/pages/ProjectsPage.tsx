import { useState, useEffect } from 'react';
import { ExternalLink, Github, Terminal, FolderGit2 } from 'lucide-react';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { PROJECTS, Project } from '../data/projectsData';
import ProjectStack from '../components/ProjectStack';

type CategoryFilter = 'Semua' | 'Full Stack' | 'Web App' | 'AI / Data' | 'System & Network';

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua');

  const categories: CategoryFilter[] = ['Semua', 'Full Stack', 'Web App', 'AI / Data', 'System & Network'];

  const filteredProjects = selectedCategory === 'Semua'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  // SEO & Schema.org Structured Data Injection
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Katalog Proyek & Solusi Web | Muhammad Amin Hidayat — Software Engineer Makassar';

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Katalog lengkap proyek rekayasa web, aplikasi full stack, dashboard analitik, dan solusi AI oleh Muhammad Amin Hidayat — Software Engineer & Programmer Terlucu di Makassar.'
      );
    }

    // Dynamic Schema.org ItemList for SoftwareApplication
    const scriptId = 'projects-schema-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': 'Katalog Proyek Rekayasa Perangkat Lunak oleh Muhammad Amin Hidayat',
      'description': 'Portofolio lengkap aplikasi web, cloud computing, dan solusi AI yang dibangun oleh Muhammad Amin Hidayat.',
      'url': 'https://devdaya.my.id/projects',
      'numberOfItems': PROJECTS.length,
      'itemListElement': PROJECTS.map((project, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': project.title,
          'description': project.description,
          'applicationCategory': project.category === 'AI / Data' ? 'DeveloperApplication' : 'WebApplication',
          'operatingSystem': 'Web / Linux / Cloud',
          'image': `https://devdaya.my.id${project.image}`,
          'url': project.demoUrl || project.repoUrl || 'https://devdaya.my.id/projects',
          'creator': {
            '@type': 'Person',
            '@id': 'https://devdaya.my.id/#person',
            'name': 'Muhammad Amin Hidayat',
            'url': 'https://devdaya.my.id'
          }
        }
      }))
    };

    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Full Stack':
        return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40';
      case 'Web App':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40';
      case 'AI / Data':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40';
      case 'System & Network':
        return 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40';
      default:
        return 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className={`min-h-screen pt-24 sm:pt-28 transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Editorial Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3 font-semibold">
              <Terminal size={14} />
              <span>Project Index // Full Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Katalog Proyek &amp; Solusi Perangkat Lunak
            </h1>
            <p className={`mt-3 text-base sm:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Koleksi lengkap aplikasi web, sistem informasi enterprise, modul data science, dan infrastruktur cloud yang dikembangkan secara presisi oleh <strong>Muhammad Amin Hidayat</strong>.
            </p>
          </div>

          <div className="font-mono text-xs text-blue-600 dark:text-blue-400 border border-blue-500/30 p-3.5 bg-blue-500/10 rounded-none shrink-0 font-semibold space-y-1">
            <div>STATUS: ONLINE</div>
            <div>SHOWN: {filteredProjects.length} / {PROJECTS.length} REPOSITORIES</div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 mr-2 flex items-center gap-1.5 font-semibold">
            <FolderGit2 size={13} />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-none px-3.5 py-1.5 text-xs font-mono font-bold border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-md shadow-blue-500/20'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-blue-400 hover:text-blue-400'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600 shadow-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Symmetrical Grid Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group rounded-none flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gray-800/80 border-gray-700 hover:border-blue-500/60 hover:shadow-blue-500/10' 
                  : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-500/10'
              }`}
            >
              {/* Colorful Accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.color} opacity-90 group-hover:opacity-100 transition-opacity`} />

              {/* Header Card Meta */}
              <div className={`flex items-center justify-between gap-2 px-4 py-2.5 border-b ${
                theme === 'dark' ? 'bg-gray-900/60 border-gray-700/70' : 'bg-gray-50 border-gray-200'
              }`}>
                <span className="font-mono text-xs font-semibold text-blue-500 dark:text-blue-400">
                  REF_{String(idx + 1).padStart(2, '0')} // {project.year}
                </span>
                <span className="rounded-none px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
                  {project.status}
                </span>
              </div>

              {/* Locked Aspect Video Thumbnail */}
              <div className="aspect-video w-full overflow-hidden border-b border-gray-200 dark:border-gray-700/70 bg-gray-100 dark:bg-gray-900 relative group/thumb">
                <img
                  src={project.image}
                  alt={`Screenshot antarmuka ${project.title} oleh Muhammad Amin Hidayat`}
                  width="640"
                  height="360"
                  loading="lazy"
                  className="rounded-none w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                />
                <div className={`rounded-none absolute top-2 right-2 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest font-bold border backdrop-blur-sm ${getCategoryBadgeClass(project.category)}`}>
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className={`text-lg font-bold tracking-tight mb-2 transition-colors ${
                    theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {project.title}
                  </h2>
                  <p className={`text-sm leading-relaxed mb-4 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Component */}
                  <div className="mb-5">
                    <ProjectStack stack={project.stack} limit={4} />
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700/60">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Lihat demo project ${project.title} oleh Muhammad Amin Hidayat`}
                        aria-label={`Live Demo ${project.title}`}
                        className="rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={13} />
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Lihat kode sumber repository ${project.title} oleh Muhammad Amin Hidayat di GitHub`}
                        aria-label={`Source Code ${project.title}`}
                        className={`rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-bold border transition-all ${
                          theme === 'dark' 
                            ? 'border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400' 
                            : 'border-blue-500/40 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-500'
                        }`}
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

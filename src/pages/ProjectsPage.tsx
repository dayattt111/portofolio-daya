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

  return (
    <div className={`min-h-screen pt-24 sm:pt-28 transition-colors duration-200 ${
      theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'
    }`}>
      
      {/* Editorial Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3">
              <Terminal size={14} />
              <span>Project Index // Full Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Katalog Proyek &amp; Solusi Perangkat Lunak
            </h1>
            <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Koleksi lengkap aplikasi web, sistem informasi enterprise, modul data science, dan infrastruktur cloud yang dikembangkan secara presisi oleh <strong>Muhammad Amin Hidayat</strong>.
            </p>
          </div>

          <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-none shrink-0">
            <div>STATUS: ONLINE</div>
            <div>SHOWN: {filteredProjects.length} / {PROJECTS.length} REPOSITORIES</div>
          </div>
        </div>

        {/* Flat Category Filter Bar */}
        <div className="mt-8 flex flex-wrap gap-2 items-center">
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mr-2 flex items-center gap-1.5">
            <FolderGit2 size={13} />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-none px-3.5 py-1.5 text-xs font-mono font-medium border transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                    : 'bg-transparent text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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
              className="rounded-none flex flex-col border border-neutral-200 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-900/20 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              {/* Header Card Meta */}
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/80">
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  REF_{String(idx + 1).padStart(2, '0')} // {project.year}
                </span>
                <span className="rounded-none px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800">
                  {project.status}
                </span>
              </div>

              {/* Locked Aspect Video Thumbnail */}
              <div className="aspect-video w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 relative">
                <img
                  src={project.image}
                  alt={`Screenshot antarmuka ${project.title} oleh Muhammad Amin Hidayat`}
                  width="640"
                  height="360"
                  loading="lazy"
                  className="rounded-none w-full h-full object-cover"
                />
                <div className="rounded-none absolute top-2 right-2 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-neutral-900/90 text-white dark:bg-white dark:text-neutral-900 border border-neutral-700">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Component */}
                  <div className="mb-5">
                    <ProjectStack stack={project.stack} limit={4} />
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Lihat demo project ${project.title} oleh Muhammad Amin Hidayat`}
                        aria-label={`Live Demo ${project.title}`}
                        className="rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium border border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
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
                        className="rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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

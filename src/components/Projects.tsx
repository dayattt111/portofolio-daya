import { ExternalLink, Github, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { PROJECTS, Project } from '../data/projectsData';
import ProjectStack from './ProjectStack';

interface ProjectsProps {
  limit?: number;
  isHomePreview?: boolean;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Full Stack':       'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
  'Web App':          'bg-blue-500/10 text-blue-600 border-blue-500/30',
  'AI / Data':        'bg-purple-500/10 text-purple-600 border-purple-500/30',
  'System & Network': 'bg-amber-500/10 text-amber-600 border-amber-500/30',
};

export default function Projects({ limit = 6, isHomePreview = true }: ProjectsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const featured: Project[] = PROJECTS.filter((p) => p.featured).slice(0, limit);

  const border = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const cardBg = isDark
    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
    : 'bg-white border-neutral-200 hover:border-neutral-300';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <section id="featured-projects" className="space-y-6 pt-4">
      <div>

        {/* Section header */}
        <div className={`mb-10 pb-6 border-b flex flex-col md:flex-row md:items-end justify-between gap-4 ${border}`}>
          <div>
            <div className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest mb-2 font-semibold ${muted}`}>
              <Code2 size={12} />
              <span>Selected Works // 01</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Featured Projects
            </h2>
            <p className={`mt-1.5 text-sm ${muted} max-w-2xl`}>
              Karya terpilih yang dirancang dengan performa tinggi, UI presisi, dan arsitektur web modern oleh{' '}
              <strong className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>Muhammad Amin Hidayat</strong>.
            </p>
          </div>

          <div className={`hidden md:flex items-center gap-1.5 font-mono text-[11px] px-3 py-1.5 border rounded-md ${
            isDark
              ? 'border-neutral-700 bg-neutral-900 text-neutral-400'
              : 'border-neutral-200 bg-white text-neutral-600'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {PROJECTS.length} REPOSITORIES
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {featured.map((project, idx) => (
            <article
              key={project.id}
              className={`group flex flex-col rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${cardBg}`}
            >
              {/* Top accent bar */}
              <div className={`h-0.5 w-full rounded-t-lg bg-gradient-to-r ${project.color}`} />

              {/* Card meta */}
              <div className={`flex items-center justify-between px-4 py-2 border-b text-[10px] font-mono ${border} ${muted}`}>
                <span>REF_{String(idx + 1).padStart(2, '0')} &bull; {project.year}</span>
                <span className={`px-1.5 py-0.5 rounded border font-semibold ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
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
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className={`text-base font-bold tracking-tight mb-1.5 transition-colors group-hover:text-blue-500 ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${muted}`}>{project.description}</p>
                </div>

                <div>
                  <div className="mb-4">
                    <ProjectStack stack={project.stack} limit={4} />
                  </div>
                  <div className={`flex items-center gap-2 pt-4 border-t ${border}`}>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Demo ${project.title}`}
                        aria-label={`Live Demo ${project.title}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                      >
                        Live Demo <ExternalLink size={11} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Source ${project.title}`}
                        aria-label={`Source Code ${project.title}`}
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border text-xs font-semibold transition-colors ${
                          isDark
                            ? 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <Github size={12} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to full projects */}
        {isHomePreview && (
          <div className={`mt-10 text-center border-t pt-8 ${border}`}>
            <Link
              to="/projects"
              title="Buka katalog lengkap proyek Muhammad Amin Hidayat"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md border font-semibold text-sm transition-colors ${
                isDark
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
                  : 'border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50'
              }`}
            >
              Lihat Semua Proyek ({PROJECTS.length}) <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import { ExternalLink, Github, ArrowRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { PROJECTS, Project } from '../data/projectsData';
import ProjectStack from './ProjectStack';

interface ProjectsProps {
  limit?: number;
  isHomePreview?: boolean;
}

export default function Projects({ limit = 4, isHomePreview = true }: ProjectsProps) {
  const { theme } = useTheme();

  const featuredProjects: Project[] = PROJECTS.filter((p) => p.featured).slice(0, limit);

  return (
    <section 
      id="featured-projects" 
      className={`py-16 sm:py-20 transition-colors duration-200 ${
        theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              <Code2 size={14} />
              <span>Selected Works // 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Featured Engineering Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Karya terpilih yang dirancang dengan arsitektur bersih, performa tinggi, dan standar rekayasa web modern oleh Muhammad Amin Hidayat.
            </p>
          </div>

          <div className="hidden md:block font-mono text-xs text-neutral-500 dark:text-neutral-400">
            [TOTAL: {PROJECTS.length} REPOSITORIES]
          </div>
        </div>

        {/* Structural Sharp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-none flex flex-col border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-900/30 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              {/* Header Card Meta */}
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/80">
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  REF_{String(idx + 1).padStart(2, '0')} &bull; {project.year}
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
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                    {project.title}
                  </h3>
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
                    {project.demoUrl && (
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
                    )}
                    {project.repoUrl && (
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Navigation CTA to /projects */}
        {isHomePreview && (
          <div className="mt-12 text-center border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <Link
              to="/projects"
              title="Buka katalog lengkap seluruh proyek oleh Muhammad Amin Hidayat"
              className="rounded-none inline-flex items-center gap-2.5 px-6 py-3 text-sm font-mono font-semibold border border-neutral-400 dark:border-neutral-600 bg-transparent text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <span>Lihat Semua Proyek ({PROJECTS.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

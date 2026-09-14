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
    <section 
      id="featured-projects" 
      className={`py-16 sm:py-24 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900/60 text-white' : 'bg-gray-50/80 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-2 font-semibold">
              <Code2 size={14} />
              <span>Selected Works // 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className={`mt-3 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl leading-relaxed`}>
              Karya terpilih yang dirancang dengan performa tinggi, UI presisi, dan arsitektur web modern oleh Muhammad Amin Hidayat.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-none font-semibold">
            [TOTAL: {PROJECTS.length} REPOSITORIES]
          </div>
        </div>

        {/* Structural Sharp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredProjects.map((project, idx) => (
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
                  REF_{String(idx + 1).padStart(2, '0')} &bull; {project.year}
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
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl font-bold tracking-tight mb-2 transition-colors ${
                    theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {project.title}
                  </h3>
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
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Lihat demo project ${project.title} oleh Muhammad Amin Hidayat`}
                        aria-label={`Live Demo ${project.title}`}
                        className="rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
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
                        className={`rounded-none flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold border transition-all ${
                          theme === 'dark' 
                            ? 'border-blue-500/40 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-400' 
                            : 'border-blue-500/40 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-500'
                        }`}
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
          <div className="mt-12 text-center border-t border-gray-200 dark:border-gray-800 pt-8">
            <Link
              to="/projects"
              title="Buka katalog lengkap seluruh proyek oleh Muhammad Amin Hidayat"
              className="rounded-none inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-mono font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-95 shadow-xl shadow-blue-500/25 hover:scale-105 transition-all duration-300"
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

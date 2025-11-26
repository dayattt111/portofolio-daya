import { ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import ProjectStack from './ProjectStack';

interface Project {
  id: number;
  title: string;
  description: string;
  rating: number;
  color: string;
  stack: string[];
  link?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Company Profile',
    description: 'professional company profile website with modern design and responsive layout.',
    rating: 5,
    color: '#00ff88',
    stack: ['Next.Js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    link: 'https://github.com/dayattt111',
    image: '/images/projects/DataCCProject.png'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Retro-themed portfolio with 8-bit aesthetics and modern functionality.',
    rating: 5,
    color: '#ff006e',
    stack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    link: 'https://github.com/dayattt111/portofolio-daya',
    image: '/images/projects/portoProject.png'
  },
  {
    id: 3,
    title: 'Organize Website DCC',
    description: 'Website DCC',
    rating: 4,
    color: '#b537f2',
    stack: ['Laravel', 'MySql', 'Chart.js', 'Bootstrap', 'Axios'],
    link: 'dcc-dp.com',
    image: '/images/projects/oldDCC.png'
  },
  {
    id: 4,
    title: 'Organize New DCC Webiste',
    description: 'New Website DCC with modern design and responsive layout.',
    rating: 5,
    color: '#ffbe0b',
    stack: ['React JS', 'Next Js', 'Firebase', 'Mysql', 'Three JS'],
    link: '#',
    image: '/images/projects/newDCC.png'
  },
  {
    id: 5,
    title: 'Laundry Apps',
    description: 'Laundry management app with real-time order tracking and automated notifications.',
    rating: 5,
    color: '#ff006e',
    stack: ['Laravel', 'React', 'Oracle','Tailwind CSS', 'Docker'],
    link: '#',
    image: '/images/projects/laundryApp.png'
  },
  {
    id: 6,
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support and social features.',
    rating: 5,
    color: '#00a3ff',
    stack: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL', 'Vercel'],
    link: '#',
    image: '/images/projects/project-6.svg'
  }
];

export default function Projects() {
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="section-retro">
        <div className="max-w-7xl mx-auto px-4">
          <div className="scroll-animate mb-16">
            <h2 className="section-title">
              [ FEATURED PROJECTS ]
            </h2>
            <p className="text-center text-gray-400 font-retro text-sm md:text-base mt-4">
              &gt; Click any project to explore the complete tech stack
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setIsStackOpen(true);
                }}
                className="scroll-animate text-left transform-gpu hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="retro-card-dark h-full group relative overflow-hidden">
                  {/* Background glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: project.color }}
                  ></div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="aspect-video bg-retro-dark border-2 mb-4 flex items-center justify-center overflow-hidden relative">
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ backgroundColor: project.color }}
                      ></div>
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="relative z-10 flex items-center justify-center">
                          <div className="text-4xl">■</div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-pixel font-bold mb-3" style={{ color: project.color }}>
                      {project.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed font-retro text-sm flex-grow">
                      {project.description}
                    </p>

                    {/* Rating - Pixel Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 border ${
                            i < project.rating
                              ? 'bg-neon-yellow border-neon-yellow'
                              : 'border-gray-600'
                          }`}
                        ></div>
                      ))}
                    </div>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-pixel border"
                          style={{
                            borderColor: project.color,
                            color: project.color,
                            backgroundColor: `${project.color}15`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 2 && (
                        <span className="px-2 py-1 text-xs font-pixel text-gray-400">
                          +{project.stack.length - 2}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-pixel" style={{ color: project.color }}>
                      <span>VIEW STACK</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'PROJECTS', value: '50+' },
              { label: 'CLIENTS', value: '100+' },
              { label: 'COMPLETION', value: '99%' },
              { label: 'SATISFACTION', value: '100%' }
            ].map((stat, i) => (
              <div key={i} className="scroll-animate" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className="retro-card text-center">
                  <div className="text-3xl md:text-4xl font-pixel font-bold text-neon-cyan mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs font-pixel text-gray-300">
                    [ {stat.label} ]
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectStack
        project={selectedProject}
        isOpen={isStackOpen}
        onClose={() => {
          setIsStackOpen(false);
          setSelectedProject(null);
        }}
      />
    </>
  );
}

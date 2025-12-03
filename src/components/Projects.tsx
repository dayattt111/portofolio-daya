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
      <section id="projects" className="section-modern bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="scroll-animate mb-16 text-center animate-fade-in-up">
            <h2 className="section-title-gradient">
              Featured Projects
            </h2>
            <p className="text-center text-gray-600 text-lg mt-4">
              Click any project to explore the complete tech stack
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
                className="scroll-animate text-left animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="modern-card h-full group">
                  <div className="modern-card-content h-full flex flex-col">
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className="text-4xl text-gray-400">■</div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                      {project.description}
                    </p>

                    {/* Rating - Modern Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < project.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-300 text-gray-300'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 2 && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          +{project.stack.length - 2}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <span>View Stack</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: 'Projects', value: '50+', color: 'from-blue-500 to-blue-600' },
              { label: 'Clients', value: '100+', color: 'from-purple-500 to-purple-600' },
              { label: 'Completion', value: '99%', color: 'from-pink-500 to-pink-600' },
              { label: 'Satisfaction', value: '100%', color: 'from-blue-500 to-blue-600' }
            ].map((stat, i) => (
              <div key={i} className="scroll-animate animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                <div className="modern-card text-center">
                  <div className="modern-card-content">
                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </div>
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

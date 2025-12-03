import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import ProjectStack from './ProjectStack';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className={`py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="scroll-animate mb-12 text-center animate-fade-in-up">
            <h2 className="section-title-gradient text-3xl md:text-4xl">
              Projects
            </h2>
            <p className={`mt-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Selected works and applications
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
                <div className={`modern-card h-full group ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="modern-card-content h-full flex flex-col">
                    {/* Project Image */}
                    <div className={`aspect-video rounded-xl mb-3 flex items-center justify-center overflow-hidden relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center">
                          <div className={`text-4xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>■</div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {project.title}
                    </h3>

                    <p className={`text-sm mb-3 leading-relaxed flex-grow ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    {/* Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.stack.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 2 && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                          +{project.stack.length - 2}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
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

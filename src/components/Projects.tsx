import { ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
    stack: ['Next.Js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Prisma ORM'],
    link: 'https://github.com/dayattt111',
    image: '/images/projects/DataCCProject.png'
  }
  ,
  {
    id: 2,
    title: 'Organize New DCC Website',
    description: 'New Website DCC with modern design and responsive layout.',
    rating: 5,
    color: '#ff006e',
    stack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    link: 'https://github.com/dayattt111/portofolio-daya',
    image: '/images/projects/portoProject.png'
  }
  ,
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
    image: '/images/projects/webdcc.png'
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
    title: 'petShop Website Regresi Linear',
    description: 'E-commerce site for pet supplies with user reviews and secure checkout.',
    rating: 5,
    color: '#00a3ff',
    stack: ['Next.js', 'Vite', 'Prisma', 'PostgreSQL', 'Vercel'],
    link: 'https://github.com/dayattt111/petshop-php-native.git',
    image: '/images/projects/petShop.png'
  }
  ,
  {
    id: 7,
    title: 'website Portofolio V2',
    description: 'Redesign portfolio website with enhanced UX and interactive project showcases.',
    rating: 5,
    color: '#de0dbf',
    stack: ['React js', 'Vite', 'Suppabase', 'TypeScript', 'Tailwinds CSS', 'Vercel'],
    link: 'https://www.devdaya.my.id/',
    image: '/images/projects/portov2.png'
  }
  ,
  {
    id: 8,
    title: 'Website Community Network Dicoding UNDIPA',
    description: 'Community website for Dicoding UNDIPA with event management and member forums.',
    rating: 5,
    color: '#0dde6b',
    stack: ['React js', 'Next Js', 'Vite', 'Suppabase', 'TypeScript', 'Tailwinds CSS', 'Vercel'],
    link: 'https://github.com/dayattt111/dcn_undipa.git',
    image: '/images/projects/dcn.png'
  }
  ,
  {
    id: 9,
    title: 'Website Manajemen Prestasi Dipatalent di UNDIPA',
    description: 'Prestasi management website for Dipatalent at UNDIPA with achievement tracking and reporting features.',
    rating: 5,
    color: '#de5a0d',
    stack: ['React js', 'Next Js', 'Vite', 'Suppabase', 'TypeScript', 'Tailwinds CSS', 'Vercel'],
    link: 'https://github.com/dayattt111/project_dipaTalent.git',
    image: '/images/projects/dipaTalent.png'
  }
  ,
  {
    id: 10,
    title: 'Sistem Informasi Monitoring Keungangan Methode Regresi Linear ',
    description: 'Sistem informasi untuk monitoring keuangan dengan fitur pelaporan dan analisis data.',
    rating: 5,
    color: '#2c02fb',
    stack: ['React js', 'Next Js', 'Vite', 'Suppabase', 'TypeScript', 'Tailwinds CSS', 'Vercel'],
    link: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    image: '/images/projects/monitoringFinance.png'
  }
  ,
  {
    id: 11,
    title: 'Sistem Informasi Teman Bus,  Booking dan Pembayaran Bus ',
    description: 'Sistem informasi untuk monitoring keuangan dengan fitur pelaporan dan analisis data.',
    rating: 5,
    color: '#2c02fb',
    stack: ['React js', 'Next Js', 'Vite', 'Suppabase', 'TypeScript', 'Tailwinds CSS', 'Vercel'],
    link: 'https://github.com/dayattt111/sisfoAnalitikKeuangan.git',
    image: '/images/projects/temanBus.png'
  }
];

export default function Projects() {
  const { theme } = useTheme();
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className={`py-20 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`mb-10 sm:mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="section-title-gradient text-3xl sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <p className={`mt-2 sm:mt-3 text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Selected works and applications
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setIsStackOpen(true);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`text-left transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className={`relative h-full group overflow-hidden rounded-2xl transition-all duration-500 ${hoveredIndex === index ? 'scale-105 shadow-2xl' : 'scale-100'} ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30" />
                  </div>

                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Project Image with Overlay */}
                    <div className={`aspect-video rounded-xl mb-4 overflow-hidden relative group ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
                      {project.image ? (
                        <>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className={`text-4xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>■</div>
                        </div>
                      )}
                      
                      {/* Floating Badge */}
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg transform group-hover:scale-110 transition-transform">
                        NEW
                      </div>
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

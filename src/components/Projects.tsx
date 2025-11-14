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
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Dashboard Platform',
    description: 'Modern analytics dashboard with real-time data visualization and AI-powered insights.',
    rating: 5,
    color: '#00ff88',
    stack: ['React', 'TypeScript', 'TensorFlow.js', 'Chart.js', 'PostgreSQL'],
    link: '#'
  },
  {
    id: 2,
    title: 'E-Commerce Engine',
    description: 'High-performance shopping platform with seamless checkout and inventory management.',
    rating: 5,
    color: '#ff006e',
    stack: ['Next.js', 'Stripe', 'Supabase', 'Tailwind', 'Redis'],
    link: '#'
  },
  {
    id: 3,
    title: 'Social Media Hub',
    description: 'Next-gen social platform with real-time messaging and content sharing features.',
    rating: 5,
    color: '#b537f2',
    stack: ['Node.js', 'WebSocket', 'MongoDB', 'AWS', 'GraphQL'],
    link: '#'
  },
  {
    id: 4,
    title: 'Crypto Trading App',
    description: 'Secure cryptocurrency trading platform with live market data and portfolio tracking.',
    rating: 4,
    color: '#ffbe0b',
    stack: ['Vue.js', 'Web3.js', 'Ethers.js', 'Docker', 'AWS Lambda'],
    link: '#'
  },
  {
    id: 5,
    title: 'Fitness Tracker Pro',
    description: 'Comprehensive health and fitness application with workout planning and progress tracking.',
    rating: 5,
    color: '#00ff88',
    stack: ['React Native', 'Firebase', 'Health Kit API', 'Redux', 'Expo'],
    link: '#'
  },
  {
    id: 6,
    title: 'Smart Home Controller',
    description: 'IoT platform for managing smart home devices with automation and voice control.',
    rating: 4,
    color: '#ff006e',
    stack: ['Python', 'FastAPI', 'MQTT', 'OpenAI', 'Raspberry Pi'],
    link: '#'
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
                    {/* Project Icon */}
                    <div className="aspect-video bg-retro-dark border-2 mb-4 flex items-center justify-center overflow-hidden relative">
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ backgroundColor: project.color }}
                      ></div>
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="text-4xl">■</div>
                      </div>
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

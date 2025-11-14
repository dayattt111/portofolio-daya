import { Star } from 'lucide-react';
import { useState } from 'react';
import ProjectStack from './ProjectStack';

interface Project {
  id: number;
  title: string;
  description: string;
  rating: number;
  color: string;
  stack: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Dashboard Platform',
    description: 'Modern analytics dashboard with real-time data visualization and AI-powered insights.',
    rating: 5,
    color: '#00E5FF',
    stack: ['React', 'TypeScript', 'TensorFlow.js', 'Chart.js', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'E-Commerce Engine',
    description: 'High-performance shopping platform with seamless checkout and inventory management.',
    rating: 5,
    color: '#00C3FF',
    stack: ['Next.js', 'Stripe', 'Supabase', 'Tailwind', 'Redis']
  },
  {
    id: 3,
    title: 'Social Media Hub',
    description: 'Next-gen social platform with real-time messaging and content sharing features.',
    rating: 5,
    color: '#00A3FF',
    stack: ['Node.js', 'WebSocket', 'MongoDB', 'AWS', 'GraphQL']
  },
  {
    id: 4,
    title: 'Crypto Trading App',
    description: 'Secure cryptocurrency trading platform with live market data and portfolio tracking.',
    rating: 4,
    color: '#0083FF',
    stack: ['Vue.js', 'Web3.js', 'Ethers.js', 'Docker', 'AWS Lambda']
  },
  {
    id: 5,
    title: 'Fitness Tracker Pro',
    description: 'Comprehensive health and fitness application with workout planning and progress tracking.',
    rating: 5,
    color: '#0063FF',
    stack: ['React Native', 'Firebase', 'Health Kit API', 'Redux', 'Expo']
  },
  {
    id: 6,
    title: 'Smart Home Controller',
    description: 'IoT platform for managing smart home devices with automation and voice control.',
    rating: 4,
    color: '#0043FF',
    stack: ['Python', 'FastAPI', 'MQTT', 'OpenAI', 'Raspberry Pi']
  }
];

export default function Projects() {
  const [isStackOpen, setIsStackOpen] = useState(false);

  return (
    <>
      <section className="py-24 px-4 bg-[#0B0F1A] relative">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-animate">
            <h2 className="text-5xl font-bold mb-4 text-center neon-text">
              Featured Projects
            </h2>
            <p className="text-center text-gray-400 mb-16 text-lg">
              Click any project to explore the complete tech stack
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setIsStackOpen(true)}
                className="project-card scroll-animate text-left transform-gpu"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-card-glow" style={{ background: `radial-gradient(circle at center, ${project.color}15, transparent)` }}></div>

                <div className="relative z-10">
                  <div className="aspect-video bg-gradient-to-br from-[#0B0F1A] to-[#151922] rounded-lg mb-4 flex items-center justify-center border border-[#00E5FF]/20 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full" style={{
                        background: `radial-gradient(circle at center, ${project.color}, transparent)`,
                        boxShadow: `0 0 40px ${project.color}80`
                      }}></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < project.rating
                            ? 'fill-[#00E5FF] text-[#00E5FF]'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded text-xs font-medium border"
                        style={{
                          borderColor: project.color,
                          color: project.color,
                          background: `${project.color}15`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-400">
                        +{project.stack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProjectStack
        projects={projects}
        isOpen={isStackOpen}
        onClose={() => setIsStackOpen(false)}
      />
    </>
  );
}

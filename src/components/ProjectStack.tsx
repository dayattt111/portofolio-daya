import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface StackProject {
  id: number;
  title: string;
  description: string;
  rating: number;
  color: string;
  stack: string[];
  link?: string;
}

interface ProjectStackProps {
  project: StackProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectStack({ project, isOpen, onClose }: ProjectStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-retro-dark/90 backdrop-blur-md p-4">
      <div ref={containerRef} className="w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-neon-cyan hover:text-neon-pink transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Main Card */}
        <div className="retro-card-dark p-8">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-3xl font-pixel font-bold mb-2" style={{ color: project.color }}>
              {project.title}
            </h3>
            <div className="h-1 w-32" style={{ backgroundColor: project.color }}></div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-8 leading-relaxed font-retro">
            {project.description}
          </p>

          {/* Rating */}
          <div className="mb-8">
            <p className="text-neon-cyan font-pixel text-sm mb-3">RATING</p>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 border-2 transition-all ${
                    i < project.rating
                      ? 'bg-neon-yellow border-neon-yellow'
                      : 'border-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <p className="text-neon-pink font-pixel text-sm mb-4">TECH STACK</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-3 border-2 text-center font-retro text-sm transition-all hover:scale-105"
                  style={{
                    borderColor: project.color,
                    color: project.color,
                    backgroundColor: `${project.color}10`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-8 border-t-2 border-gray-700">
            <button
              onClick={onClose}
              className="pixel-btn flex-1"
            >
              CLOSE
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-outline flex-1 text-center"
              >
                VISIT
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

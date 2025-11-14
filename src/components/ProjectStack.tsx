import { useState, useRef, useEffect } from 'react';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

interface StackProject {
  id: number;
  title: string;
  description: string;
  rating: number;
  color: string;
  stack: string[];
}

interface ProjectStackProps {
  projects: StackProject[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectStack({ projects, isOpen, onClose }: ProjectStackProps) {
  const [stackIndex, setStackIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setStackIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setStackIndex((prev) => (prev + 1) % projects.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowUp') handlePrev();
      if (e.key === 'ArrowDown') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProject = projects[stackIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05060B]/80 backdrop-blur-sm">
      <div ref={containerRef} className="w-full max-w-2xl mx-4 relative">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-gray-400 hover:text-[#00E5FF] transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative h-96 perspective">
          {projects.map((project, index) => {
            const offset = index - stackIndex;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            const rotation = offset * 15;
            const translateY = offset * 30;
            const scale = 1 - Math.abs(offset) * 0.1;
            const opacity = 1 - Math.abs(offset) * 0.3;
            const zIndex = projects.length - Math.abs(offset);

            return (
              <div
                key={project.id}
                className="absolute w-full transition-all duration-500 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${rotation}deg) translateY(${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: offset === 0 ? 'auto' : 'none',
                }}
              >
                <div
                  className="p-8 rounded-2xl border-2 h-full flex flex-col justify-between"
                  style={{
                    background: `linear-gradient(135deg, rgba(11, 15, 26, 0.95), rgba(21, 25, 34, 0.95))`,
                    borderColor: project.color,
                    boxShadow: `0 0 30px ${project.color}40`,
                  }}
                >
                  <div>
                    <div className="text-sm font-semibold mb-2" style={{ color: project.color }}>
                      {stackIndex + 1} / {projects.length}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-3 font-semibold">TECH STACK</p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium border"
                            style={{
                              borderColor: project.color,
                              color: project.color,
                              background: `${project.color}15`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: i < project.rating ? '24px' : '16px',
                            background: i < project.rating ? project.color : '#ffffff20',
                            boxShadow: i < project.rating ? `0 0 10px ${project.color}` : 'none',
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-12">
          <button
            onClick={handlePrev}
            className="group p-3 rounded-lg border border-[#00E5FF]/30 hover:border-[#00E5FF] transition-all hover:bg-[#00E5FF]/10"
          >
            <ChevronUp className="w-6 h-6 text-[#00E5FF]" />
          </button>

          <div className="text-center text-gray-400 text-sm">
            Use arrow keys to navigate • Press ESC to close
          </div>

          <button
            onClick={handleNext}
            className="group p-3 rounded-lg border border-[#00E5FF]/30 hover:border-[#00E5FF] transition-all hover:bg-[#00E5FF]/10"
          >
            <ChevronDown className="w-6 h-6 text-[#00E5FF]" />
          </button>
        </div>

        <div className="mt-8 flex gap-2 justify-center">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setStackIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === stackIndex
                  ? 'w-6 bg-[#00E5FF]'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

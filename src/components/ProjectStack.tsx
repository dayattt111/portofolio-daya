import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      <div ref={containerRef} className="w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute -top-12 right-0 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
        >
          <X className="w-8 h-8" />
        </button>

        {/* Main Card */}
        <div className={`rounded-xl p-8 shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="mb-6">
            <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {project.title}
            </h3>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>

          {/* Description */}
          <p className={`mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-8">
            <p className={`text-sm font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Tech Stack</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.stack.map((tech) => (
                <div
                  key={tech}
                  className={`px-4 py-2 rounded-lg text-center text-sm font-medium transition-all hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex gap-4 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={onClose}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Close
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                Visit Project
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

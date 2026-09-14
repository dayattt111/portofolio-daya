export interface ProjectStackProps {
  stack: string[];
  limit?: number;
  className?: string;
}

export default function ProjectStack({ stack, limit, className = '' }: ProjectStackProps) {
  const displayedStack = limit ? stack.slice(0, limit) : stack;
  const remaining = limit && stack.length > limit ? stack.length - limit : 0;

  return (
    <div className={`flex flex-wrap gap-1.5 items-center ${className}`}>
      {displayedStack.map((tech) => (
        <span
          key={tech}
          className="rounded-none px-2.5 py-0.5 text-xs font-mono font-medium border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:border-blue-500/60 hover:bg-blue-500/20 transition-colors"
        >
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded-none px-1.5 py-0.5 text-xs font-mono font-medium border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300">
          +{remaining}
        </span>
      )}
    </div>
  );
}

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
          className="rounded-none px-2 py-0.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded-none px-1.5 py-0.5 text-xs font-mono border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400">
          +{remaining}
        </span>
      )}
    </div>
  );
}

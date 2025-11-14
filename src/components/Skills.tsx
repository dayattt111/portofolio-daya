import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'React & TypeScript', level: 95 },
  { name: 'Node.js & Express', level: 90 },
  { name: 'UI/UX Design', level: 88 },
  { name: 'Database Management', level: 85 },
  { name: 'Cloud Architecture', level: 82 },
  { name: '3D & Animation', level: 78 }
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="scroll-animate">
          <h2 className="text-5xl font-bold mb-16 text-center neon-text">
            Technical Skills
          </h2>
        </div>

        <div className="space-y-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-[#00E5FF]">{skill.level}%</span>
              </div>

              <div className="h-3 bg-[#0B0F1A] rounded-full overflow-hidden border border-[#00E5FF]/20">
                <div
                  className="h-full neon-progress transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {['JavaScript', 'Python', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'GraphQL', 'WebGL'].map((tech, index) => (
            <div
              key={tech}
              className="cyber-badge scroll-animate"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

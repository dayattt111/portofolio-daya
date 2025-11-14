import { useEffect, useRef, useState } from 'react';

const skills = [
  { name: 'React & TypeScript', level: 95, color: '#00ff88' },
  { name: 'Node.js & Express', level: 90, color: '#ff006e' },
  { name: 'UI/UX Design', level: 88, color: '#b537f2' },
  { name: 'Database Management', level: 85, color: '#ffbe0b' },
  { name: 'Cloud Architecture', level: 82, color: '#00ff88' },
  { name: '3D & Animation', level: 78, color: '#ff006e' }
];

const technologies = [
  'JavaScript', 'Python', 'Docker', 'AWS', 
  'PostgreSQL', 'Redis', 'GraphQL', 'WebGL',
  'React Native', 'Firebase', 'MongoDB', 'Vue.js'
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
    <section id="skills" ref={sectionRef} className="section-retro">
      <div className="max-w-6xl mx-auto px-4">
        <div className="scroll-animate mb-16">
          <h2 className="section-title">
            [ TECHNICAL SKILLS ]
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="retro-card-dark">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-pixel text-sm" style={{ color: skill.color }}>
                    {skill.name}
                  </span>
                  <span className="font-pixel text-sm" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-4 bg-retro-dark border-2 border-gray-700 overflow-hidden relative">
                  <div
                    className="h-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: isVisible ? `${skill.level}%` : '0%',
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}, inset 0 0 10px ${skill.color}20`,
                      transitionDelay: `${index * 0.1}s`
                    }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,.1) 2px, rgba(255,255,255,.1) 4px)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="scroll-animate">
          <h3 className="text-2xl font-pixel mb-8 text-neon-pink">[ TECH STACK ]</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div
                key={tech}
                className="retro-card hover:scale-105 transition-transform scroll-animate text-center"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="font-retro text-sm text-neon-cyan">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {[
            { label: 'LANGUAGES', value: '8+' },
            { label: 'FRAMEWORKS', value: '12+' },
            { label: 'TOOLS', value: '20+' }
          ].map((stat, i) => (
            <div key={i} className="scroll-animate" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
              <div className="retro-card-dark text-center">
                <div className="text-3xl font-pixel font-bold text-neon-yellow mb-2">
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
  );
}

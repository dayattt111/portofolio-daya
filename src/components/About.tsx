import { User, Code, Zap } from 'lucide-react';

export default function About() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="scroll-animate">
          <h2 className="text-5xl font-bold mb-16 text-center neon-text">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="cyber-card scroll-animate" style={{ animationDelay: '0.1s' }}>
            <div className="cyber-card-glow"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-[#00E5FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-gray-400 leading-relaxed">
                Passionate developer with a love for creating beautiful,
                functional digital experiences that push the boundaries of modern web design.
              </p>
            </div>
          </div>

          <div className="cyber-card scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="cyber-card-glow"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Code className="w-10 h-10 text-[#00E5FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <p className="text-gray-400 leading-relaxed">
                Specializing in full-stack development, UI/UX design,
                and creating seamless user experiences with cutting-edge technologies.
              </p>
            </div>
          </div>

          <div className="cyber-card scroll-animate" style={{ animationDelay: '0.3s' }}>
            <div className="cyber-card-glow"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Zap className="w-10 h-10 text-[#00E5FF]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">My Approach</h3>
              <p className="text-gray-400 leading-relaxed">
                Performance-driven development with attention to detail,
                ensuring every project is optimized, accessible, and visually stunning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Code, Zap, Palette } from 'lucide-react';
// import { Image } from 'next/image';

export default function About() {
  return (
    <section id="about" className="section-retro">
      <div className="max-w-6xl mx-auto px-4">
        <div className="scroll-animate mb-16">
          <h2 className="section-title">
            [ ABOUT ME ]
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left - Profile */}
          <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
            <div className="retro-card">
              <div className="aspect-square bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 border-4 border-neon-cyan mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/profile/dayat.jpg" 
                  alt="Muh. Amin Hidayat" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-pixel font-bold text-neon-cyan mb-4">WHO I AM</h3>
              <p className="text-gray-300 font-retro leading-relaxed">
                &gt; Passionate developer crafting beautiful and functional digital experiences with a love for retro aesthetics and modern technology.
              </p>
            </div>
          </div>

          {/* Right - Quick Stats */}
          <div className="space-y-6">
            <div className="scroll-animate" style={{ animationDelay: '0.15s' }}>
              <div className="retro-card-dark">
                <h4 className="text-lg font-pixel text-neon-pink mb-4">EXPERIENCE</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neon-cyan font-retro">Frontend Development</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-neon-cyan border border-neon-cyan"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-purple font-retro">Backend Development</span>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-neon-purple border border-neon-purple"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-yellow font-retro">UI/UX Design</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-neon-yellow border border-neon-yellow"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-cyan font-retro">Problem Solving</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-neon-cyan border border-neon-cyan"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-animate" style={{ animationDelay: '0.2s' }}>
              <div className="retro-card">
                <h4 className="text-lg font-pixel text-neon-cyan mb-4">ACHIEVEMENTS</h4>
                <ul className="space-y-2 font-retro text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-neon-pink">▶</span>
                    <span>&gt; 50+ Projects Completed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-purple">▶</span>
                    <span>&gt; 100+ Happy Clients</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-yellow">▶</span>
                    <span>&gt; 5+ Years Experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-cyan">▶</span>
                    <span>&gt; Award Winning Designer</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: What I Do */}
          <div className="scroll-animate" style={{ animationDelay: '0.1s' }}>
            <div className="retro-card-dark h-full hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-neon-cyan/20 border-2 border-neon-cyan">
                <Code className="w-8 h-8 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-pixel font-bold mb-4 text-neon-cyan">WHAT I DO</h3>
              <p className="text-gray-300 leading-relaxed font-retro text-sm">
                &gt; Full-stack development with expertise in React, TypeScript, and modern web technologies. Specializing in creating beautiful, performant, and accessible user interfaces.
              </p>
            </div>
          </div>

          {/* Card 2: My Approach */}
          <div className="scroll-animate" style={{ animationDelay: '0.2s' }}>
            <div className="retro-card-dark h-full hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-neon-pink/20 border-2 border-neon-pink">
                <Zap className="w-8 h-8 text-neon-pink" />
              </div>
              <h3 className="text-xl font-pixel font-bold mb-4 text-neon-pink">MY APPROACH</h3>
              <p className="text-gray-300 leading-relaxed font-retro text-sm">
                &gt; Performance-driven development with attention to detail. Every project is optimized, accessible, and visually stunning with a touch of retro aesthetics.
              </p>
            </div>
          </div>

          {/* Card 3: Design Philosophy */}
          <div className="scroll-animate" style={{ animationDelay: '0.3s' }}>
            <div className="retro-card-dark h-full hover:scale-105 transition-transform">
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-neon-purple/20 border-2 border-neon-purple">
                <Palette className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-xl font-pixel font-bold mb-4 text-neon-purple">DESIGN PHILOSOPHY</h3>
              <p className="text-gray-300 leading-relaxed font-retro text-sm">
                &gt; Retro vibes meets modern UI/UX. Blending vintage pixel art aesthetics with contemporary design principles to create unique and memorable digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

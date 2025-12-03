import { Code, Zap, Palette } from 'lucide-react';
// import { Image } from 'next/image';

export default function About() {
  return (
    <section id="about" className="section-modern bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="scroll-animate mb-16 text-center">
          <h2 className="section-title-gradient animate-fade-in-up">
            About Me
          </h2>
          <p className="text-gray-600 mt-4 text-lg">Get to know more about my skills and experience</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left - Profile */}
          <div className="scroll-animate animate-fade-in-up stagger-1">
            <div className="modern-card">
              <div className="modern-card-content">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden group">
                  <img 
                    src="/images/profile/dayat.jpg" 
                    alt="Muh. Amin Hidayat" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Who I Am</h3>
                <p className="text-gray-600 leading-relaxed">
                  Passionate developer crafting beautiful and functional digital experiences. I combine creativity with technical expertise to build modern, responsive web applications.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Quick Stats */}
          <div className="space-y-6">
            <div className="scroll-animate animate-fade-in-up stagger-2">
              <div className="modern-card">
                <div className="modern-card-content">
                  <h4 className="text-xl font-bold text-gray-800 mb-6">Skills Level</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">Frontend Development</span>
                        <span className="text-blue-600 font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">Backend Development</span>
                        <span className="text-purple-600 font-semibold">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">UI/UX Design</span>
                        <span className="text-pink-600 font-semibold">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">Problem Solving</span>
                        <span className="text-blue-600 font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-animate animate-fade-in-up stagger-3">
              <div className="modern-card bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="modern-card-content">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Achievements</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>50+ Projects Completed</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>100+ Happy Clients</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span>5+ Years Experience</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Award Winning Designer</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Column Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: What I Do */}
          <div className="scroll-animate animate-fade-in-up stagger-4">
            <div className="modern-card h-full group">
              <div className="modern-card-content">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">What I Do</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Full-stack development with expertise in React, TypeScript, and modern web technologies. Specializing in creating beautiful, performant, and accessible user interfaces.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: My Approach */}
          <div className="scroll-animate animate-fade-in-up stagger-5">
            <div className="modern-card h-full group">
              <div className="modern-card-content">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">My Approach</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Performance-driven development with attention to detail. Every project is optimized, accessible, and visually stunning with clean, modern design principles.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Design Philosophy */}
          <div className="scroll-animate animate-fade-in-up stagger-6">
            <div className="modern-card h-full group">
              <div className="modern-card-content">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Design Philosophy</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Modern aesthetics meets functional design. Blending clean UI with contemporary design principles to create unique and memorable digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

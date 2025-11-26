import { Calendar, MapPin, Award } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc',
    period: '2022 - Present',
    location: 'Remote',
    description: 'Leading frontend development with React and TypeScript, mentoring junior developers, and architecting scalable UI components.',
    achievements: [
      'Increased app performance by 40%',
      'Led migration to modern architecture',
      'Mentored 5+ junior developers'
    ],
    color: '#00ff88'
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co',
    period: '2020 - 2022',
    location: 'Jakarta, Indonesia',
    description: 'Developed end-to-end web applications with React, Node.js, and PostgreSQL. Implemented CI/CD pipelines.',
    achievements: [
      'Built 10+ production applications',
      'Reduced API response time by 50%',
      'Implemented automated testing'
    ],
    color: '#ff006e'
  },
  {
    title: 'Frontend Developer',
    company: 'StartUp Ventures',
    period: '2019 - 2020',
    location: 'Bandung, Indonesia',
    description: 'Created responsive web interfaces and real-time dashboard applications. Focused on UI/UX optimization.',
    achievements: [
      'Designed 15+ UI/UX mockups',
      'Implemented real-time features',
      'Improved SEO score by 60%'
    ],
    color: '#b537f2'
  },
  {
    title: 'Junior Developer',
    company: 'Web Agency Asia',
    period: '2018 - 2019',
    location: 'Surabaya, Indonesia',
    description: 'Started career building websites with HTML, CSS, JavaScript. Learned backend fundamentals.',
    achievements: [
      'Completed 20+ client projects',
      'Achieved 95% code review score',
      'Won Best Junior Developer Award'
    ],
    color: '#ffbe0b'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-retro py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="scroll-animate mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            [ WORK EXPERIENCE ]
          </h2>
          <p className="text-center text-gray-400 font-retro text-xs md:text-base mt-3 md:mt-4">
            &gt; From junior to senior, building amazing things
          </p>
        </div>

        {/* Timeline */}
        <div className="relative px-2 md:px-0">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-pink to-neon-purple"></div>

          <div className="space-y-6 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`scroll-animate ${index % 2 === 0 ? 'md:pr-1/2 md:mr-1/2' : 'md:pl-1/2 md:ml-1/2'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div 
                  className="retro-card-dark hover:shadow-2xl transition-all group"
                  style={{
                    borderLeftWidth: '4px',
                    borderLeftColor: exp.color,
                    background: `linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(10, 26, 46, 0.6) 100%)`
                  }}
                >
                  {/* Timeline Dot */}
                  <div 
                    className="hidden md:block absolute -left-4 top-6 w-5 h-5 rounded-full border-4 border-retro-dark"
                    style={{ backgroundColor: exp.color }}
                  ></div>

                  {/* Header */}
                  <div className="mb-3 md:mb-4">
                    <h3 className="text-xl md:text-2xl font-pixel font-bold mb-2" style={{ color: exp.color }}>
                      {exp.title}
                    </h3>
                    <p className="font-retro text-gray-300 text-xs md:text-sm">
                      {exp.company}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm font-retro">
                    <div className="flex items-center gap-2 text-neon-cyan">
                      <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="hidden sm:inline">{exp.period}</span>
                      <span className="sm:hidden">{exp.period.split(' - ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neon-pink">
                      <MapPin className="w-3 md:w-4 h-3 md:h-4" />
                      <span className="hidden sm:inline">{exp.location}</span>
                      <span className="sm:hidden">{exp.location.split(',')[0]}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed font-retro text-xs md:text-sm">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <p className="font-pixel text-xs uppercase text-neon-yellow">Key Achievements:</p>
                    <ul className="space-y-1 md:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 font-retro text-xs md:text-sm">
                          <Award className="w-3 md:w-4 h-3 md:h-4 mt-1 flex-shrink-0" style={{ color: exp.color }} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-20">
          {[
            { label: 'YEARS EXP', value: '6+' },
            { label: 'PROJECTS', value: '50+' },
            { label: 'CLIENTS', value: '100+' },
            { label: 'AWARDS', value: '8' }
          ].map((stat, i) => (
            <div key={i} className="scroll-animate" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
              <div className="retro-card text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-pixel font-bold text-neon-cyan mb-2">
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

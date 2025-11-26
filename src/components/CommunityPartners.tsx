import { Link as LinkIcon, Award } from 'lucide-react';
import { useState } from 'react';

interface Partner {
  name: string;
  description: string;
  logo: string;
  role: string;
  year: string;
  link: string;
  color: string;
}

const partners: Partner[] = [
  {
    name: 'React Community ID',
    description: 'Active member and contributor to React ecosystem in Indonesia',
    logo: '⚛️',
    role: 'Core Member',
    year: '2021-Present',
    link: '#',
    color: '#00ff88'
  },
  {
    name: 'Dev.to Community',
    description: 'Technical writer and mentor, 10k+ followers',
    logo: '📝',
    role: 'Top Writer',
    year: '2020-Present',
    link: '#',
    color: '#ff006e'
  },
  {
    name: 'JavaScript Meetup Jakarta',
    description: 'Regular speaker and event organizer',
    logo: '🎤',
    role: 'Speaker & Organizer',
    year: '2019-Present',
    link: '#',
    color: '#b537f2'
  },
  {
    name: 'Open Source Foundation',
    description: 'Maintainer of popular open source projects',
    logo: '🔓',
    role: 'Project Maintainer',
    year: '2020-Present',
    link: '#',
    color: '#ffbe0b'
  },
  {
    name: 'Tech Startup Accelerator',
    description: 'Mentor for 20+ startups, helped secure $2M+ funding',
    logo: '🚀',
    role: 'Technical Mentor',
    year: '2021-Present',
    link: '#',
    color: '#00a3ff'
  },
  {
    name: 'Women in Tech',
    description: 'Advocate for diversity and inclusion in tech',
    logo: '👩‍💻',
    role: 'Supporter',
    year: '2020-Present',
    link: '#',
    color: '#ff69b4'
  }
];

export default function CommunityPartners() {
  const [showAll, setShowAll] = useState(false);
  const displayedPartners = showAll ? partners : partners.slice(0, 3);
  
  return (
    <section id="community" className="section-retro py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="scroll-animate mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            [ COMMUNITY & PARTNERSHIPS ]
          </h2>
          <p className="text-center text-gray-400 font-retro text-xs md:text-base mt-3 md:mt-4">
            &gt; Building and contributing to amazing communities
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {displayedPartners.map((partner, index) => (
            <div
              key={index}
              className="scroll-animate group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className="retro-card-dark h-full flex flex-col hover:scale-105 transition-transform cursor-pointer"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: partner.color,
                  background: `linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(10, 26, 46, 0.6) 100%)`
                }}
              >
                {/* Logo & Badge */}
                <div className="mb-4 md:mb-6 flex items-start justify-between">
                  <div className="text-4xl md:text-5xl">{partner.logo}</div>
                  <div 
                    className="px-2 py-1 rounded text-xs font-pixel border"
                    style={{
                      borderColor: partner.color,
                      color: partner.color,
                      backgroundColor: `${partner.color}15`
                    }}
                  >
                    {partner.role}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-pixel font-bold mb-2" style={{ color: partner.color }}>
                  {partner.name}
                </h3>
                <p className="text-gray-300 font-retro text-xs md:text-sm mb-4 md:mb-6 flex-grow">
                  {partner.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-2 text-gray-400 font-retro text-xs mb-4 md:mb-6">
                  <Award className="w-3 md:w-4 h-3 md:h-4" />
                  {partner.year}
                </div>

                {/* Link Button */}
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-current rounded transition-all hover:shadow-lg text-xs md:text-sm font-pixel"
                  style={{ color: partner.color }}
                >
                  <LinkIcon className="w-3 md:w-4 h-3 md:h-4" />
                  VISIT
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Show Less Button */}
        <div className="text-center mt-8 md:mt-12 scroll-animate flex flex-col items-center gap-6 mb-12 md:mb-16">
          <button
            onClick={() => setShowAll(!showAll)}
            className="pixel-btn px-6 py-3 text-xs md:text-base hover:shadow-lg transition-shadow"
            style={{
              backgroundColor: showAll ? '#ff006e' : '#00ff88',
              color: '#050812'
            }}
          >
            {showAll ? '▲ SHOW LESS PARTNERS ▲' : `▼ SHOW MORE PARTNERS (${partners.length - 3} more) ▼`}
          </button>
          <p className="font-retro text-gray-400 text-xs md:text-sm">
            &gt; {partners.length} partnerships • {showAll ? 'all' : '3'} displayed
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-16">
          {[
            { icon: '👥', label: 'COMMUNITY MEMBERS', value: '50K+' },
            { icon: '📢', label: 'TALKS GIVEN', value: '25+' },
            { icon: '🤝', label: 'MENTEES', value: '100+' },
            { icon: '💡', label: 'PROJECTS LED', value: '12' }
          ].map((stat, i) => (
            <div key={i} className="scroll-animate" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
              <div className="retro-card text-center">
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
                <div className="text-xs font-pixel text-gray-300 mb-2">[ {stat.label} ]</div>
                <div className="text-xl md:text-2xl font-pixel font-bold text-neon-cyan">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="scroll-animate">
          <div className="retro-card glass-effect text-center py-8 md:py-12 px-4 md:px-8">
            <h3 className="text-xl md:text-2xl font-pixel font-bold text-neon-pink mb-3 md:mb-4">
              JOIN THE COMMUNITY!
            </h3>
            <p className="text-gray-300 font-retro text-xs md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
              &gt; Whether you're a beginner or expert, there's a place for you. Let's build amazing things together!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="pixel-btn text-xs md:text-base py-2 md:py-3">
                JOIN DISCORD
              </button>
              <a
                href="https://wa.me/6282197855715?text=Hi%2C%20I%20want%20to%20connect%20with%20your%20community!"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn-outline text-center text-xs md:text-base py-2 md:py-3"
              >
                MESSAGE ME
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  color: string;
  icon: string;
}

// Static certificate data
const certificates: Certificate[] = [
  {
    title: 'Advanced React Developer',
    issuer: 'Udacity',
    date: 'March 2023',
    credentialId: 'UDAC-2023-001',
    credentialUrl: '#',
    skills: ['React', 'Redux', 'Testing'],
    color: '#00ff88',
    icon: '⚛️'
  },
  {
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: 'January 2023',
    credentialId: 'COUR-2023-045',
    credentialUrl: '#',
    skills: ['MERN Stack', 'DevOps', 'Database'],
    color: '#ff006e',
    icon: '🔧'
  },
  {
    title: 'TypeScript Professional',
    issuer: 'Microsoft Learn',
    date: 'September 2022',
    credentialId: 'MSFT-2022-112',
    credentialUrl: '#',
    skills: ['TypeScript', 'OOP', 'Advanced Types'],
    color: '#b537f2',
    icon: '📘'
  },
  {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon AWS',
    date: 'July 2022',
    credentialId: 'AWS-2022-SAA',
    credentialUrl: '#',
    skills: ['Cloud Architecture', 'AWS Services', 'Security'],
    color: '#ffbe0b',
    icon: '☁️'
  },
  {
    title: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    date: 'May 2022',
    credentialId: 'GCP-2022-PRO',
    credentialUrl: '#',
    skills: ['GCP', 'BigQuery', 'Kubernetes'],
    color: '#00a3ff',
    icon: '🌩️'
  },
  {
    title: 'UI/UX Design Certification',
    issuer: 'Interaction Design Foundation',
    date: 'February 2022',
    credentialId: 'IDF-2022-UI',
    credentialUrl: '#',
    skills: ['Design Thinking', 'Prototyping', 'User Research'],
    color: '#00ff88',
    icon: '🎨'
  }
];

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [fadeState, setFadeState] = useState('fade-in');

  const currentCert = certificates[currentIndex];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
      setFadeState('fade-in');
    }, 300);
  };

  const handlePrev = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
      setFadeState('fade-in');
    }, 300);
  };

  const goToSlide = (index: number) => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeState('fade-in');
    }, 300);
  };

  return (
    <section id="certificates" className="section-retro py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-4">
        <div className="scroll-animate mb-12 md:mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            [ CERTIFICATIONS ]
          </h2>
          <p className="text-center text-gray-400 font-retro text-xs md:text-base mt-3 md:mt-4">
            &gt; Continuous learning &amp; professional development
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto mb-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-retro-dark border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-retro-dark transition-all duration-300 flex items-center justify-center group"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-retro-dark border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-retro-dark transition-all duration-300 flex items-center justify-center group"
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
          </button>

          {/* Certificate Card */}
          <div 
            className={`transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
          >
            <div 
              className="retro-card-dark p-6 md:p-10"
              style={{
                borderColor: currentCert.color,
                borderWidth: '4px',
                background: `linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(10, 26, 46, 0.85) 100%)`
              }}
            >
              {/* Icon & Title */}
              <div className="text-center mb-8">
                <div className="text-6xl md:text-8xl mb-6 animate-float">
                  {currentCert.icon}
                </div>
                <h3 
                  className="text-2xl md:text-4xl font-pixel font-bold mb-3"
                  style={{ color: currentCert.color }}
                >
                  {currentCert.title}
                </h3>
                <p className="text-gray-300 font-retro text-sm md:text-lg mb-6">
                  Issued by <span style={{ color: currentCert.color }}>{currentCert.issuer}</span>
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Left: Credential Info */}
                <div 
                  className="border-l-4 pl-6"
                  style={{ borderColor: currentCert.color }}
                >
                  <p className="font-pixel text-xs mb-4" style={{ color: currentCert.color }}>
                    ❯ CREDENTIAL DETAILS
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 font-retro text-xs mb-1">Issued Date:</p>
                      <div className="flex items-center gap-2 text-gray-200 font-retro text-sm">
                        <Calendar className="w-4 h-4" />
                        {currentCert.date}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 font-retro text-xs mb-1">Credential ID:</p>
                      <p className="text-gray-200 font-mono text-sm break-all">{currentCert.credentialId}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Skills */}
                <div>
                  <p className="font-pixel text-xs mb-4" style={{ color: currentCert.color }}>
                    ◆ SKILLS COVERED
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentCert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 text-xs md:text-sm font-retro border rounded hover:shadow-lg transition-shadow"
                        style={{
                          borderColor: currentCert.color,
                          color: currentCert.color,
                          backgroundColor: `${currentCert.color}10`
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verify Button */}
              <div className="text-center">
                <a
                  href={currentCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 rounded transition-all hover:shadow-lg font-pixel text-sm"
                  style={{
                    borderColor: currentCert.color,
                    color: currentCert.color,
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = currentCert.color;
                    e.currentTarget.style.color = '#050812';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = currentCert.color;
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  VERIFY CERTIFICATE
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 h-3 bg-neon-cyan' 
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-400'
              }`}
              style={{
                backgroundColor: index === currentIndex ? currentCert.color : undefined
              }}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter & Status */}
        <div className="text-center">
          <p className="font-retro text-gray-400 text-xs md:text-sm mb-2">
            &gt; Certificate {currentIndex + 1} of {certificates.length}
          </p>
          <p className="font-retro text-gray-500 text-xs">
            {isAutoPlaying ? '● Auto-playing (hover to pause)' : '⏸ Paused'}
          </p>
        </div>
      </div>
    </section>
  );
}

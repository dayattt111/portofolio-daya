import { Award, Calendar, ExternalLink } from 'lucide-react';

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

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Flip Card Container */}
              <div className="flip-card h-full">
                <div className="flip-card-inner h-full">
                  {/* Front */}
                  <div className="flip-card-front">
                    <div 
                      className="retro-card h-full flex flex-col items-center justify-center text-center p-6 md:p-8 group"
                      style={{
                        borderColor: cert.color,
                        background: `linear-gradient(135deg, rgba(10, 14, 39, 0.9) 0%, rgba(10, 26, 46, 0.7) 100%)`
                      }}
                    >
                      <div className="text-5xl md:text-6xl mb-4 md:mb-6 transform group-hover:scale-110 transition-transform">
                        {cert.icon}
                      </div>
                      <h3 
                        className="text-lg md:text-2xl font-pixel font-bold mb-2"
                        style={{ color: cert.color }}
                      >
                        {cert.title}
                      </h3>
                      <p className="text-gray-300 font-retro text-xs md:text-sm mb-3 md:mb-4">
                        by {cert.issuer}
                      </p>
                      <div 
                        className="text-xs font-pixel px-3 py-2 rounded border"
                        style={{
                          borderColor: cert.color,
                          color: cert.color,
                          backgroundColor: `${cert.color}15`
                        }}
                      >
                        CLICK TO VIEW
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back">
                    <div 
                      className="retro-card-dark h-full flex flex-col justify-between p-6 md:p-8"
                      style={{
                        borderColor: cert.color,
                        background: `linear-gradient(135deg, rgba(10, 26, 46, 0.9) 0%, rgba(10, 14, 39, 0.7) 100%)`
                      }}
                    >
                      {/* Cert Details */}
                      <div>
                        <p className="font-pixel text-xs mb-3 md:mb-4" style={{ color: cert.color }}>
                          CREDENTIAL DETAILS
                        </p>
                        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                          <div>
                            <p className="text-gray-400 font-retro text-xs mb-1">Issued:</p>
                            <div className="flex items-center gap-2 text-gray-200 font-retro text-xs md:text-sm">
                              <Calendar className="w-3 h-3" />
                              {cert.date}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 font-retro text-xs mb-1">ID:</p>
                            <p className="text-gray-200 font-mono text-xs break-all">{cert.credentialId}</p>
                          </div>
                        </div>

                        {/* Skills */}
                        <p className="font-pixel text-xs mb-2 md:mb-3" style={{ color: cert.color }}>
                          SKILLS
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 text-xs font-retro border rounded whitespace-nowrap"
                              style={{
                                borderColor: cert.color,
                                color: cert.color,
                                backgroundColor: `${cert.color}10`
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Verify Button */}
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn-outline text-center text-xs flex items-center justify-center gap-2 mt-4"
                      >
                        <ExternalLink className="w-3 h-3" />
                        VERIFY
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Certs Hint */}
        <div className="text-center mt-12 md:mt-16 scroll-animate">
          <p className="font-retro text-gray-400 text-xs md:text-sm">
            &gt; Learning never stops... more certifications coming soon!
          </p>
        </div>
      </div>
    </section>
  );
}

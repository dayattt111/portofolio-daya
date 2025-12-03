import { Calendar, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import reactImg from '/images/certificates/PsertiCy.png';
import reactImg2 from '/images/certificates/PsertiNet.png';
import reactImg3 from '/images/certificates/Muhammad_Amin_Hidayat.png';
import reactImg4 from '/images/certificates/Sertifikat_AI_Nation_Makassar_Muhammad_Amin_Hidayat.png';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  color: string;
  icon: string;
  image: string;
}

// Data
const certificates: Certificate[] = [
  {
    title: 'Pemateri Cyber Security',
    issuer: 'Pandu Digital SMAN 1 Bone',
    date: 'November 2025',
    credentialId: '421/615/UPT.SMAN.01-BONE/XI/2025',
    credentialUrl: '#',
    skills: ['Malware Analyst', 'Digital Safety', 'Aware Data'],
    color: '#00ff88',
    icon: '⚛️',
    image: reactImg,
  },
  {
    title: 'Pemateri Fundamental Network Administrator',
    issuer: 'Pandu Digital SMAN 1 Bone',
    date: 'November 2025',
    credentialId: '421/615/UPT.SMAN.01-BONE/XI/2025',
    credentialUrl: '#',
    skills: ['Network', 'Topology Architecture', 'Administrator'],
    color: '#ff006e',
    icon: '🔧',
    image: reactImg2,
  },
  {
    title: 'Participations CyberSecurity IT Conference Makassar',
    issuer: 'Coconat Computer Club',
    date: 'November 2025',
    credentialId: 'MSFT-2022-112',
    credentialUrl: '#',
    skills: ['CTF', 'Cybersecurity', 'AI for Cybersecurity'],
    color: '#b537f2',
    icon: '📘',
    image: reactImg3,
  },
  {
    title: 'Participant Ai Talent Development Nation Makassar',
    issuer: 'Amazon AWS || Alibaaba || Google Cloud',
    date: 'November 2025',
    credentialId: '5072361716644257',
    credentialUrl: 'https://drive.google.com/file/d/1w10PYiKxpu2m5ObS7OBX28YUqWzHwMu6/view?usp=drive_link',
    skills: ['Cloud Architecture', 'AWS Services', 'Security'],
    color: '#ffbe0b',
    icon: '☁️',
    image: reactImg4,
  },
  // {
  //   title: 'Google Cloud Professional',
  //   issuer: 'Google Cloud',
  //   date: 'May 2022',
  //   credentialId: 'GCP-2022-PRO',
  //   credentialUrl: '#',
  //   skills: ['GCP', 'BigQuery', 'Kubernetes'],
  //   color: '#00a3ff',
  //   icon: '🌩️',
  //   image: '/images/certificates/gcp.png',
  // },
  // {
  //   title: 'UI/UX Design Certification',
  //   issuer: 'Interaction Design Foundation',
  //   date: 'February 2022',
  //   credentialId: 'IDF-2022-UI',
  //   credentialUrl: '#',
  //   skills: ['Design Thinking', 'Prototyping', 'User Research'],
  //   color: '#00ff88',
  //   icon: '🎨',
  //   image: '/images/certificates/uiux.png',
  // },
];

export default function Certificates() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [fadeState, setFadeState] = useState('fade-in');
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentCert = certificates[currentIndex];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
      setFadeState('fade-in');
    }, 250);
  };

  const handlePrev = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
      setFadeState('fade-in');
    }, 250);
  };

  const goToSlide = (index: number) => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex(index);
      setFadeState('fade-in');
    }, 250);
  };

  return (
    <section ref={sectionRef} id="certificates" className={`py-16 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">

        {/* TITLE */}
        <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Certifications</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Continuous learning & professional development</p>
        </div>

        {/* 3-Item Carousel Container */}
        <div
          className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 p-4 rounded-full shadow-xl z-20 transition-all hover:scale-110 group ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2`}
          >
            <ChevronLeft className={`w-6 h-6 transition-transform group-hover:-translate-x-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 p-4 rounded-full shadow-xl z-20 transition-all hover:scale-110 group ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2`}
          >
            <ChevronRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>

          {/* 3 Certificates Grid with Carousel Effect */}
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {[-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + certificates.length) % certificates.length;
              const cert = certificates[index];
              const isCenter = offset === 0;
              
              return (
                <div
                  key={`${index}-${offset}`}
                  className={`transition-all duration-500 ${
                    isCenter 
                      ? 'scale-100 opacity-100 z-10' 
                      : 'scale-90 opacity-60 blur-[2px]'
                  } ${fadeState === 'fade-in' ? 'translate-y-0' : 'translate-y-4'}`}
                >
                  <div 
                    className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                      isCenter ? 'ring-2 ring-blue-500 hover:scale-105' : 'hover:scale-95'
                    } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
                    onClick={() => isCenter && setShowModal(true)}
                  >
                    {/* Glow Effect on Center */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift" />
                    )}

                    <div className="relative z-10 p-4">
                      {/* Certificate Image */}
                      <div className={`aspect-[4/3] rounded-xl overflow-hidden mb-4 relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {isCenter && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </div>

                      {/* Certificate Info - Compact */}
                      <div className="text-center space-y-2">
                        <div className="text-2xl">{cert.icon}</div>
                        
                        <h3 className={`text-sm md:text-base font-bold line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          {cert.title}
                        </h3>

                        <p className={`text-xs line-clamp-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {cert.issuer}
                        </p>

                        <div className="flex items-center justify-center gap-2 text-xs">
                          <Calendar className="w-3 h-3 text-blue-500" />
                          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                            {cert.date}
                          </span>
                        </div>

                        {/* View Button - Only show on center */}
                        {isCenter && (
                          <button
                            className="mt-2 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1 mx-auto"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicators with Animation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg' 
                    : `w-3 h-3 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`
                }`}
              />
            ))}
          </div>

          {/* Auto Play Status */}
          <div className="text-center mt-6">
            <span className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
              {isAutoPlaying ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Auto-playing
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  Paused
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* MODAL with Enhanced Animation */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-[999] animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            className={`w-full max-w-5xl rounded-2xl p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl animate-scale-in ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift rounded-2xl" />

            {/* CLOSE BUTTON */}
            <button
              className={`absolute top-4 right-4 transition-all p-2 rounded-full z-10 hover:rotate-90 ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-red-500' : 'text-gray-500 hover:text-white hover:bg-red-500'}`}
              onClick={() => setShowModal(false)}
            >
              <X size={28} />
            </button>

            {/* MODAL CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* LEFT CONTENT */}
              <div>
                <div className="text-5xl mb-4 animate-bounce">{currentCert.icon}</div>
                
                <h2 className={`text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                  {currentCert.title}
                </h2>

                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Issued by <span className="font-semibold text-blue-500">{currentCert.issuer}</span>
                </p>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm mb-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Issued Date:</p>
                    <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      <Calendar className="w-5 h-5 text-blue-500" /> 
                      <span className="font-semibold">{currentCert.date}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <p className={`text-sm mb-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Credential ID:</p>
                    <p className={`font-mono text-sm px-3 py-2 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                      {currentCert.credentialId}
                    </p>
                  </div>

                  <div>
                    <p className={`text-sm mb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Skills Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all hover:scale-110 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'} shadow-lg`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={currentCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-2xl transition-all text-sm font-semibold group hover:scale-105"
                  >
                    <ExternalLink className="w-4 group-hover:rotate-45 transition-transform" />
                    <span>Verify Certificate</span>
                  </a>
                </div>
              </div>

              {/* RIGHT — IMAGE with Hover Effect */}
              <div className={`flex items-center justify-center rounded-xl p-4 overflow-hidden group ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <img
                  src={currentCert.image}
                  alt="Certificate"
                  className="rounded-lg w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Navigation Between Certificates in Modal */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className={`p-3 rounded-full transition-all hover:scale-110 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentIndex + 1} / {certificates.length}
              </span>
              
              <button
                onClick={handleNext}
                className={`p-3 rounded-full transition-all hover:scale-110 ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

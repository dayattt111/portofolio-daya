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

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 -ml-4 md:-ml-16 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2`}
          >
            <ChevronLeft className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-0 -mr-4 md:-mr-16 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all hover:scale-110 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'} border-2`}
          >
            <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
          </button>
          {/* Certificate Card */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-8 transition-opacity duration-300 ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
              
              {/* Certificate Image */}
              <div className={`w-full mb-6 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <img
                  src={currentCert.image}
                  alt={currentCert.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Certificate Info */}
              <div className="text-center">
                <div className="text-5xl mb-4">{currentCert.icon}</div>

                <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {currentCert.title}
                </h3>

                <p className={`mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Issued by {currentCert.issuer}</p>
                <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{currentCert.date}</p>

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                >
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex 
                  ? 'w-10 h-3 bg-gradient-to-r from-blue-500 to-purple-500' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto Play Status */}
        <p className="text-center text-gray-500 text-sm mt-4 font-medium">
          {isAutoPlaying ? '● Auto-playing' : '⏸ Paused'}
        </p>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-fade-in">
          <div className={`w-full max-w-5xl rounded-2xl p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl animate-scale-in ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>

            {/* CLOSE BUTTON */}
            <button
              className={`absolute top-4 right-4 transition-colors p-2 rounded-full ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setShowModal(false)}
            >
              <X size={28} />
            </button>

            {/* MODAL CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* LEFT CONTENT */}
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {currentCert.title}
                </h2>

                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Issued by <span className="font-semibold text-blue-500">{currentCert.issuer}</span>
                </p>

                <div className="text-gray-700 space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-2 font-medium">Issued Date:</p>
                    <div className="flex items-center gap-2 text-gray-800">
                      <Calendar className="w-5 h-5 text-blue-500" /> {currentCert.date}
                    </div>
                  </div>

                  <div>
                    <p className={`text-sm mb-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Credential ID:</p>
                    <p className={`font-mono text-sm px-3 py-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>{currentCert.credentialId}</p>
                  </div>

                  <div>
                    <p className={`text-sm mb-2 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={currentCert.credentialUrl}
                    target="_blank"
                    className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                  >
                    <ExternalLink className="w-4" />
                    <span>Verify Certificate</span>
                  </a>
                </div>
              </div>

              {/* RIGHT — IMAGE */}
              <div className={`flex items-center justify-center rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <img
                  src={currentCert.image}
                  alt="Certificate"
                  className="rounded-lg w-full object-contain"
                />
              </div>
            </div>

            {/* BACK BUTTON */}
            <div className="text-center mt-8">
              <button
                onClick={() => setShowModal(false)}
                className={`px-8 py-3 rounded-lg border-2 font-medium transition-all ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

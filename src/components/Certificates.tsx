import { Calendar, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [fadeState, setFadeState] = useState('fade-in');
  const [showModal, setShowModal] = useState(false);

  const currentCert = certificates[currentIndex];

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
    <section id="certificates" className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-4">

        {/* TITLE */}
        <div className="mb-12">
          <h2 className="section-title text-3xl md:text-5xl text-center">[ CERTIFICATIONS ]</h2>
          <p className="text-center text-gray-400 mt-2">Continuous learning & development</p>
        </div>

        {/* Carousel Outer Border */}
        <div
          className="relative max-w-3xl mx-auto p-6 rounded-xl"
          style={{ border: `4px solid ${currentCert.color}` }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 -ml-16 top-1/2 -translate-y-1/2 bg-black border p-3 text-white"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 -mr-16 top-1/2 -translate-y-1/2 bg-black border p-3 text-white"
          >
            <ChevronRight />
          </button>
{/* Gambar Sertifikat */}
<div className="w-full mb-4">
  <img
    src={currentCert.image}
    alt={currentCert.title}
    className="w-full h-auto object-contain rounded-lg"
  />
</div>


          {/* MAIN CARD (Simple) */}
          <div className={`transition-opacity ${fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center pb-4">
              {/* <div className="text-7xl mb-4">{currentCert.icon}</div> */}

              <h3
                className="text-2xl font-bold"
                style={{ color: currentCert.color }}
              >
                {currentCert.title}
              </h3>

              <p className="text-gray-400 mt-2">Issued by {currentCert.issuer}</p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-6 px-6 py-3 border rounded text-sm"
                style={{
                  color: currentCert.color,
                  borderColor: currentCert.color,
                }}
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex ? 'w-10 h-3' : 'w-3 h-3 bg-gray-600'
              } rounded`}
              style={{ backgroundColor: index === currentIndex ? currentCert.color : undefined }}
            />
          ))}
        </div>

        {/* Auto Play Status */}
        <p className="text-center text-gray-500 text-xs mt-3">
          {isAutoPlaying ? '● Auto-playing' : '⏸ Paused'}
        </p>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
          <div className="bg-[#0f1629] w-full max-w-5xl rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">

            {/* CLOSE BUTTON */}
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setShowModal(false)}
            >
              <X size={28} />
            </button>

            {/* MODAL CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEFT CONTENT */}
              <div>
                <h2
                  className="text-3xl font-bold mb-2"
                  style={{ color: currentCert.color }}
                >
                  {currentCert.title}
                </h2>

                <p className="text-gray-300 mb-4">
                  Issued by <span style={{ color: currentCert.color }}>{currentCert.issuer}</span>
                </p>

                <div className="text-gray-200 space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Issued Date:</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4" /> {currentCert.date}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Credential ID:</p>
                    <p className="font-mono">{currentCert.credentialId}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 border rounded text-xs"
                          style={{
                            borderColor: currentCert.color,
                            color: currentCert.color,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={currentCert.credentialUrl}
                    target="_blank"
                    className="inline-flex items-center mt-4 px-4 py-2 border rounded"
                    style={{ borderColor: currentCert.color, color: currentCert.color }}
                  >
                    <ExternalLink className="w-4 mr-2" />
                    Verify Certificate
                  </a>
                </div>
              </div>

              {/* RIGHT — IMAGE */}
              <div className="flex items-center justify-center">
                <img
                  src={currentCert.image}
                  alt="Certificate"
                  className="rounded-lg shadow-lg w-full object-contain"
                />
              </div>
            </div>

            {/* BACK BUTTON */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 text-white border border-gray-500 rounded"
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

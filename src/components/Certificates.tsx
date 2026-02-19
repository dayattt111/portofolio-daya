import { Calendar, ExternalLink, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import reactImg from '/images/certificates/PsertiCy.png';
import reactImg2 from '/images/certificates/PsertiNet.png';
import reactImg3 from '/images/certificates/Muhammad_Amin_Hidayat.png';
import reactImg4 from '/images/certificates/Sertifikat_AI_Nation_Makassar_Muhammad_Amin_Hidayat.png';
import reactImg5 from '/images/certificates/Screenshot 2026-02-19 173120.png';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  accent: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    title: 'Pemateri Cyber Security',
    issuer: 'Pandu Digital SMAN 1 Bone',
    date: 'November 2025',
    credentialId: '421/615/UPT.SMAN.01-BONE/XI/2025',
    credentialUrl: '#',
    skills: ['Malware Analyst', 'Digital Safety', 'Aware Data'],
    accent: 'from-emerald-500 to-cyan-500',
    image: reactImg,
  },
  {
    title: 'Pemateri Fundamental Network Administrator',
    issuer: 'Pandu Digital SMAN 1 Bone',
    date: 'November 2025',
    credentialId: '421/615/UPT.SMAN.01-BONE/XI/2025',
    credentialUrl: '#',
    skills: ['Network', 'Topology Architecture', 'Administrator'],
    accent: 'from-rose-500 to-orange-500',
    image: reactImg2,
  },
  {
    title: 'Participations CyberSecurity IT Conference Makassar',
    issuer: 'Coconat Computer Club',
    date: 'November 2025',
    credentialId: 'MSFT-2022-112',
    credentialUrl: '#',
    skills: ['CTF', 'Cybersecurity', 'AI for Cybersecurity'],
    accent: 'from-violet-500 to-purple-500',
    image: reactImg3,
  },
  {
    title: 'Participant AI Talent Development Nation Makassar',
    issuer: 'Amazon AWS || Alibaba || Google Cloud',
    date: 'November 2025',
    credentialId: '5072361716644257',
    credentialUrl: 'https://drive.google.com/file/d/1w10PYiKxpu2m5ObS7OBX28YUqWzHwMu6/view?usp=drive_link',
    skills: ['Cloud Architecture', 'AWS Services', 'Security'],
    accent: 'from-amber-500 to-yellow-500',
    image: reactImg4,
  },
  {
    title: 'Dicoding AI Engineer Entry Level',
    issuer: 'Dicoding || AI || Engineer',
    date: 'February 2026',
    credentialId: '0LZ0Y33E3X65',
    credentialUrl: 'https://www.dicoding.com/certificates/0LZ0Y33E3X65',
    skills: ['Cloud Architecture', 'AWS Services', 'Security'],
    accent: 'from-amber-500 to-blue-500',
    image: reactImg5,
  },
];

// Grid span classes — same bento layout as before
const gridSpans = [
  'md:col-span-2 md:row-span-2', // 0 — large featured
  'md:col-span-1 md:row-span-1', // 1 — small
  'md:col-span-1 md:row-span-1', // 2 — small
  'md:col-span-2 md:row-span-1', // 3 — wide
];

export default function Certificates() {
  const { theme } = useTheme();
  const [order, setOrder] = useState<number[]>(certificates.map((_, i) => i));
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Entrance animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCert = selectedCert !== null ? certificates[selectedCert] : null;

  // FIFO cycle: front (slot 0) goes to back (slot 3), others shift forward
  const cycleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPhase('exit');

    // After exit animation, reorder & enter
    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setPhase('enter');

      // After enter animation completes
      setTimeout(() => {
        setPhase('idle');
        setIsAnimating(false);
      }, 400);
    }, 400);
  }, [isAnimating]);

  // Reverse cycle
  const cyclePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPhase('exit');

    setTimeout(() => {
      setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
      setPhase('enter');

      setTimeout(() => {
        setPhase('idle');
        setIsAnimating(false);
      }, 400);
    }, 400);
  }, [isAnimating]);

  // Auto-play
  useEffect(() => {
    if (isPaused || selectedCert !== null) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(cycleNext, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [cycleNext, isPaused, selectedCert]);

  // Modal nav
  const handleModalPrev = () => {
    setSelectedCert((prev) =>
      prev !== null ? (prev - 1 + certificates.length) % certificates.length : 0
    );
  };
  const handleModalNext = () => {
    setSelectedCert((prev) =>
      prev !== null ? (prev + 1) % certificates.length : 0
    );
  };

  // Animation class per grid slot
  const getAnimClass = (slotIndex: number) => {
    if (phase === 'exit') {
      // slot 0 (featured) flies out; others fade slightly
      if (slotIndex === 0) return 'scale-90 opacity-0 -translate-y-6 rotate-[-3deg]';
      return 'scale-95 opacity-50';
    }
    if (phase === 'enter') {
      return 'scale-100 opacity-100 translate-y-0 rotate-0';
    }
    return 'scale-100 opacity-100 translate-y-0 rotate-0';
  };

  // Scatter-in style per bento slot
  const getSlotEntryStyle = (slotIndex: number): React.CSSProperties => {
    const dirs = [
      { x: -50, y: -30, r: -5 },
      { x: 40, y: -45, r: 4 },
      { x: 55, y: 20, r: 6 },
      { x: -40, y: 35, r: -4 },
    ];
    const d = dirs[slotIndex % dirs.length];
    const delay = 200 + slotIndex * 100;
    return {
      transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, filter 0.6s ease ${delay}ms`,
      opacity: isVisible ? 1 : 0,
      transform: isVisible
        ? 'translate3d(0,0,0) rotate(0deg) scale(1)'
        : `translate3d(${d.x}px,${d.y}px,0) rotate(${d.r}deg) scale(0.85)`,
      filter: isVisible ? 'blur(0px)' : 'blur(6px)',
    };
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className={`py-16 sm:py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-3 mb-3">
            <Award className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-sm font-medium tracking-widest uppercase ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              Certifications
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Professional Credentials
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
            <p className={`text-base sm:text-lg max-w-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Continuous learning & professional development journey.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={cyclePrev}
                disabled={isAnimating}
                className={`p-2.5 rounded-full transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 disabled:opacity-30'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {certificates.map((cert, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                      order[0] === i
                        ? `w-6 h-2 bg-gradient-to-r ${cert.accent}`
                        : `w-2 h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={cycleNext}
                disabled={isAnimating}
                className={`p-2.5 rounded-full transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 disabled:opacity-30'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[260px] gap-4 sm:gap-5">
          {order.map((certIndex, slotIndex) => {
            const cert = certificates[certIndex];
            const animClass = getAnimClass(slotIndex);

            return (
              <div
                key={`slot-${slotIndex}-cert-${certIndex}`}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${gridSpans[slotIndex] || ''} ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 border border-gray-700/50 hover:border-gray-600'
                    : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl'
                } transition-all duration-400 ease-out hover:-translate-y-1 ${animClass}`}
                style={{ transitionDuration: '400ms', ...getSlotEntryStyle(slotIndex) }}
                onClick={() => setSelectedCert(certIndex)}
              >
                {/* Accent gradient bar top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.accent} opacity-60 group-hover:opacity-100 transition-opacity z-10`} />

                {/* Card content — adaptive layout per slot */}
                {slotIndex === 0 ? (
                  /* Large featured card — slot 0 */
                  <div className="h-full flex flex-col">
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent'
                          : 'bg-gradient-to-t from-white via-white/70 to-transparent'
                      }`} />
                      {/* Info overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {cert.skills.map((skill, i) => (
                            <span key={i} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r ${cert.accent} text-white`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                        <h3 className={`text-lg sm:text-xl font-bold mb-1.5 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{cert.issuer}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slotIndex === 3 ? (
                  /* Wide bottom card — slot 3 */
                  <div className="h-full flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-2/5 h-48 sm:h-full overflow-hidden shrink-0">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {cert.skills.map((skill, i) => (
                          <span key={i} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r ${cert.accent} text-white`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold mb-1.5 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {cert.title}
                      </h3>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{cert.issuer}</span>
                      <span className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{cert.date}</span>
                      <div className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} group-hover:gap-2.5 transition-all`}>
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Certificate
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Regular small cards — slots 1 & 2 */
                  <div className="h-full flex flex-col">
                    <div className="relative h-36 sm:h-40 overflow-hidden shrink-0">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-t from-gray-800 to-transparent opacity-80'
                          : 'bg-gradient-to-t from-white to-transparent opacity-60'
                      }`} />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-end">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {cert.skills.slice(0, 2).map((skill, i) => (
                          <span key={i} className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r ${cert.accent} text-white`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                      <h3 className={`text-sm font-bold leading-snug line-clamp-2 mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {cert.title}
                      </h3>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover arrow indicator */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-700'
                }`}>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {currentCert && selectedCert !== null && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[999]"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className={`w-full max-w-4xl rounded-2xl p-5 sm:p-8 relative overflow-y-auto max-h-[92vh] shadow-2xl ${
              theme === 'dark'
                ? 'bg-gray-900 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentCert.accent} rounded-t-2xl`} />

            {/* Close */}
            <button
              className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors ${
                theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCert(null)}
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4">
              {/* Left — Info */}
              <div className="flex flex-col justify-center">
                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {currentCert.title}
                </h2>

                <p className={`mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Issued by <span className="font-semibold">{currentCert.issuer}</span>
                </p>

                <div className="space-y-4">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Issued Date</p>
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{currentCert.date}</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Credential ID</p>
                    <p className={`font-mono text-xs sm:text-sm break-all ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {currentCert.credentialId}
                    </p>
                  </div>

                  <div>
                    <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${currentCert.accent} text-white`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {currentCert.credentialUrl !== '#' && (
                    <a
                      href={currentCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 mt-4 bg-gradient-to-r ${currentCert.accent} text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-shadow`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>

              {/* Right — Image */}
              <div className={`flex items-center justify-center rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <img
                  src={currentCert.image}
                  alt={currentCert.title}
                  className="w-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className={`flex items-center justify-center gap-4 mt-6 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <button onClick={handleModalPrev} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className={`text-sm font-medium tabular-nums ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                {selectedCert + 1} / {certificates.length}
              </span>
              <button onClick={handleModalNext} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

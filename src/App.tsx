import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PanelLeftOpen } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { useTheme } from './contexts/ThemeContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));

// Loading component
function PageLoader() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`py-20 flex items-center justify-center ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
      <div className="flex flex-col items-center gap-3">
        <div className={`w-8 h-8 border-2 rounded-full animate-spin ${
          isDark ? 'border-neutral-800 border-t-neutral-200' : 'border-neutral-200 border-t-neutral-800'
        }`} />
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'} antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200`}>

        {/* ── MAIN CONTAINER (MEMBAGI KOLOM KE LAYOUT UTAMA TANPA Z-INDEX OVERLAY) ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
          <div
            className={`grid grid-cols-1 ${
              isSidebarOpen
                ? 'lg:grid-cols-[280px_1fr] gap-8 lg:gap-14'
                : 'max-w-4xl mx-auto'
            } items-start transition-all duration-300 ease-in-out`}
          >
            {/* ── KOLOM KIRI: SIDEBAR KHUSUS (STICKY SAAT SCROLL, NO Z-INDEX OVERLAY) ── */}
            {isSidebarOpen && (
              <aside className="w-full lg:sticky lg:top-10 self-start">
                <Sidebar onToggle={() => setIsSidebarOpen(false)} />
              </aside>
            )}

            {/* ── KOLOM KANAN: MAIN CONTENT ── */}
            <main className="min-w-0 w-full">
              {/* Tombol In-Flow untuk Membuka Kembali Sidebar (Muncul saat Sidebar Ditutup) */}
              {!isSidebarOpen && (
                <div className="mb-6">
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-95 ${
                      isDark
                        ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 shadow-xs'
                    }`}
                    title="Buka kembali sidebar"
                    aria-label="Buka kembali sidebar"
                  >
                    <PanelLeftOpen size={15} className="text-blue-500" />
                    <span>Buka Sidebar</span>
                  </button>
                </div>
              )}

              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;

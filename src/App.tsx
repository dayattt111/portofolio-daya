import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PanelRightOpen } from 'lucide-react';
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
      <div className={`min-h-screen ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'} antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200 relative`}>

        {/* Floating Toggle Button (Tampil saat sidebar ditutup) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`fixed top-8 right-6 lg:right-10 z-40 flex items-center gap-2 px-3.5 py-2 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 ${
              isDark
                ? 'border-neutral-800 bg-neutral-900/90 text-neutral-200 hover:bg-neutral-800 hover:border-neutral-700'
                : 'border-neutral-200 bg-white/95 text-neutral-800 hover:bg-neutral-50 shadow-neutral-200/50'
            }`}
            title="Buka Sidebar"
            aria-label="Buka Sidebar"
          >
            <PanelRightOpen size={16} className="text-blue-500" />
            <span className="text-xs font-semibold">Sidebar</span>
          </button>
        )}

        {/* Centered Main Layout Container */}
        <div className={`mx-auto px-6 py-12 lg:py-20 transition-all duration-300 ${
          isSidebarOpen ? 'max-w-6xl' : 'max-w-4xl'
        }`}>
          <div className={`grid grid-cols-1 ${
            isSidebarOpen ? 'lg:grid-cols-[1fr_260px] gap-12 lg:gap-16' : ''
          } items-start`}>

            {/* Main Content (Kolom Kiri di Desktop) */}
            <main className="min-w-0 order-2 lg:order-1">
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

            {/* Sidebar (Kolom Kanan di Desktop, Tetap Sticky saat Scroll) */}
            {isSidebarOpen && (
              <div className="order-1 lg:order-2 w-full">
                <Sidebar
                  isOpen={isSidebarOpen}
                  onToggle={() => setIsSidebarOpen(false)}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

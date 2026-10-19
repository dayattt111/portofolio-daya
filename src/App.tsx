import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'} antialiased selection:bg-neutral-800 selection:text-white transition-colors duration-200`}>
        {/* Centered Main Layout Container */}
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">
            <Sidebar />
            <main className="min-w-0">
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

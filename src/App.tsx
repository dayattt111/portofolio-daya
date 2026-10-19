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
  
  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Loading...
        </p>
      </div>
    </div>
  );
}

function App() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Router>
      <div className={`min-h-screen ${isDark ? 'dark bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'}`}>
        <Sidebar />
        <div className="lg:pl-64 xl:pl-[260px] flex flex-col min-h-screen">
          <main className="flex-1">
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
    </Router>
  );
}

export default App;

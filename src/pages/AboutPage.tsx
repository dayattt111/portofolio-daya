import About from '../components/About';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function AboutPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <About />
      <Footer />
    </div>
  );
}

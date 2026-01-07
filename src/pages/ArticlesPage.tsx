import Articles from '../components/Articles';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function ArticlesPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Articles />
      <Footer />
    </div>
  );
}

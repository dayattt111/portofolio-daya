import Certificates from '../components/Certificates';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function CertificatesPage() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen pt-14 lg:pt-0 ${theme === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'}`}>
      <Certificates />
      <Footer />
    </div>
  );
}

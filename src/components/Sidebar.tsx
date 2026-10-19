import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  FolderGit2, 
  BookOpen, 
  Award, 
  Code2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  ChevronRight,
  Terminal,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  badgeColor?: string;
}

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/about', label: 'About Me', icon: User },
    { path: '/projects', label: 'Projects', icon: FolderGit2, badge: '30+', badgeColor: 'from-blue-500 to-cyan-500' },
    { path: '/articles', label: 'Articles', icon: BookOpen, badge: 'Medium', badgeColor: 'from-emerald-500 to-teal-500' },
    { path: '/certificates', label: 'Certificates', icon: Award, badge: '15+', badgeColor: 'from-purple-500 to-pink-500' },
    { path: '/skills', label: 'Skills & Stack', icon: Code2 },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ═══════════ MOBILE TOP HEADER (Bar for screens < lg) ═══════════ */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-40 h-16 px-4 flex items-center justify-between border-b backdrop-blur-xl transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-900/90 border-gray-800 text-white' 
            : 'bg-white/90 border-gray-200 text-gray-900'
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-md">
              <img 
                src="/images/profile/pp.png" 
                alt="Muhammad Amin Hidayat" 
                className="w-full h-full object-cover rounded-[10px]"
                onError={(e) => { (e.target as HTMLImageElement).src = '/profil.svg'; }}
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
              <span>Muhammad Amin H.</span>
            </div>
            <span className="text-[11px] font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Quick theme toggle on mobile top bar */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-2 rounded-xl transition-all duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Hamburger Menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className={`p-2 rounded-xl transition-all duration-200 ${
              isOpen
                ? theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                : theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ═══════════ BACKDROP OVERLAY (Mobile only) ═══════════ */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* ═══════════ MAIN SIDEBAR (Desktop fixed left, Mobile off-canvas slide) ═══════════ */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 xl:w-72 flex flex-col justify-between border-r transition-all duration-300 ease-in-out ${
          theme === 'dark'
            ? 'bg-gray-900/95 border-gray-800/80 text-gray-200'
            : 'bg-white/95 border-gray-200 text-gray-800'
        } backdrop-blur-2xl ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand & Profile Card */}
        <div className="p-4 sm:p-5 flex-shrink-0">
          {/* Logo / Header Branding */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr from-blue-600 to-purple-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className={`font-black text-base tracking-wider block uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  DevDaya<span className="text-blue-500">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold block -mt-0.5">
                  OS • Portfolio
                </span>
              </div>
            </Link>

            {/* Mobile close button inside drawer */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Profile Card (Dashboard Style) */}
          <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gradient-to-b from-gray-800/80 to-gray-800/40 border-gray-700/60 shadow-lg' 
              : 'bg-gradient-to-b from-gray-50 to-white border-gray-200/90 shadow-sm'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-blue-500/30 bg-gradient-to-tr from-blue-500 to-purple-600 p-0.5 shadow-md">
                  <img 
                    src="/images/profile/pp.png" 
                    alt="Muhammad Amin Hidayat" 
                    className="w-full h-full object-cover rounded-[10px]"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/profil.svg'; }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-gray-900"></span>
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className={`font-bold text-sm truncate leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Amin Hidayat
                </h2>
                <p className="text-[11px] font-medium text-blue-500 truncate mt-0.5">
                  Software Engineer
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 truncate mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="truncate">Open for Collab</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Navigation Menu */}
        <div className="flex-1 px-3 sm:px-4 overflow-y-auto py-1 space-y-6 scrollbar-thin">
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Navigation
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-semibold">
                v2.4
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      active
                        ? theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/15 to-transparent text-white font-semibold'
                          : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold shadow-sm'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                  >
                    {/* Active Accent Bar on Left */}
                    {active && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full shadow-sm shadow-blue-500/50"></span>
                    )}

                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        active
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-sm'
                          : theme === 'dark'
                            ? 'text-gray-400 group-hover:text-blue-400 group-hover:bg-gray-800'
                            : 'text-gray-500 group-hover:text-blue-600 group-hover:bg-white'
                      }`}>
                        <IconComponent size={17} />
                      </div>
                      <span className="truncate text-sm">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${item.badgeColor || 'from-blue-500 to-purple-600'} shadow-xs`}>
                          {item.badge}
                        </span>
                      )}
                      {active ? (
                        <ChevronRight size={14} className="text-blue-500" />
                      ) : (
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Info / Entity Card */}
          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            theme === 'dark'
              ? 'bg-gray-800/30 border-gray-800 text-gray-400'
              : 'bg-gray-50/80 border-gray-200/80 text-gray-600'
          }`}>
            <div className="flex items-center gap-2 font-bold mb-1.5 text-gray-300 dark:text-gray-200">
              <Sparkles size={13} className="text-yellow-400" />
              <span>Founder &amp; Community</span>
            </div>
            <p className="text-[11px]">
              Founder <a href="https://www.nokara.id" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500 hover:underline">Nokara.id</a> &amp; Lead <a href="https://nokara.biz.id" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-500 hover:underline">Nokara Community</a> di Timika Papua.
            </p>
          </div>
        </div>

        {/* Bottom: Contact CTA & Footer Controls */}
        <div className={`p-4 border-t flex-shrink-0 space-y-3 ${
          theme === 'dark' ? 'border-gray-800/80 bg-gray-900/60' : 'border-gray-200/80 bg-gray-50/50'
        }`}>
          {/* Quick Contact CTA */}
          <a
            href="https://wa.me/6288242763942?text=Halo%20Amin%2C%20saya%20melihat%20portofolio%20dashboard%20kamu!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <MessageCircle size={15} />
            <span>Chat via WhatsApp</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>

          {/* Social Links Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              {[
                { href: 'https://github.com/dayattt111', icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/muhammad-amin-hidayat', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://www.instagram.com/ur.dayaa/', icon: Instagram, label: 'Instagram' },
              ].map((s, i) => {
                const SocialIcon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/80'
                    }`}
                  >
                    <SocialIcon size={16} />
                  </a>
                );
              })}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-xs'
              }`}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} />
                  <span className="text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon size={13} />
                  <span className="text-[11px]">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

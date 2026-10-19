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
  Terminal,
  Circle,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/about', label: 'About Me', icon: User },
  { path: '/projects', label: 'Projects', icon: FolderGit2, badge: '14' },
  { path: '/articles', label: 'Articles', icon: BookOpen, badge: 'Blog' },
  { path: '/certificates', label: 'Certificates', icon: Award, badge: '15+' },
  { path: '/skills', label: 'Skills & Stack', icon: Code2 },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/dayattt111', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/muhammad-amin-hidayat', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/ur.dayaa/', icon: Instagram, label: 'Instagram' },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDark = theme === 'dark';

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  /* ── Shared class tokens ── */
  const sidebar = isDark
    ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
    : 'bg-white border-neutral-200 text-neutral-800';

  const navLinkBase =
    'group relative flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150';

  const navLinkActive = isDark
    ? 'bg-neutral-800 text-white'
    : 'bg-neutral-100 text-neutral-900';

  const navLinkIdle = isDark
    ? 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/60'
    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100';

  const divider = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const mutedText = isDark ? 'text-neutral-500' : 'text-neutral-500';

  return (
    <>
      {/* ── MOBILE TOP BAR ── */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-40 h-14 px-4 flex items-center justify-between border-b transition-colors duration-200 ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center border ${
            isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-100 border-neutral-300'
          }`}>
            <Terminal className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <span className={`font-bold text-sm tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            DevDaya<span className="text-blue-500">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-md border transition-colors ${
              isDark
                ? 'border-neutral-700 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            className={`p-2 rounded-md border transition-colors ${
              isDark
                ? 'border-neutral-700 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                : 'border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* ── BACKDROP ── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          aria-hidden="true"
        />
      )}

      {/* ── MAIN SIDEBAR ── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 xl:w-[260px] flex flex-col border-r transition-transform duration-200 ease-in-out ${sidebar} ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* ── BRAND ── */}
        <div className={`flex items-center justify-between px-4 h-14 border-b flex-shrink-0 ${divider}`}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center border transition-colors ${
              isDark
                ? 'bg-neutral-900 border-neutral-700 group-hover:border-neutral-600'
                : 'bg-neutral-100 border-neutral-300 group-hover:border-neutral-400'
            }`}>
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div>
              <span className={`font-bold text-sm tracking-tight block ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                DevDaya<span className="text-blue-500">.</span>
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-widest block -mt-0.5 ${mutedText}`}>
                Portfolio OS v2
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className={`lg:hidden p-1.5 rounded-md transition-colors ${
              isDark ? 'text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800' : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
            aria-label="Close sidebar"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── PROFILE CARD ── */}
        <div className={`px-3 py-3 border-b flex-shrink-0 ${divider}`}>
          <div className={`flex items-center gap-3 p-2.5 rounded-md border ${
            isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="relative flex-shrink-0">
              <div className={`w-9 h-9 rounded-md overflow-hidden border ${isDark ? 'border-neutral-700' : 'border-neutral-300'}`}>
                <img
                  src="/images/profile/pp.png"
                  alt="Muhammad Amin Hidayat"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/profil.svg'; }}
                />
              </div>
              {/* Online status dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className={`relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 ${isDark ? 'border-neutral-950' : 'border-white'}`} />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`font-semibold text-sm truncate leading-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Amin Hidayat
              </p>
              <p className={`text-[11px] truncate ${mutedText}`}>Software Engineer</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Circle size={6} className="fill-emerald-500 text-emerald-500 flex-shrink-0" />
                <span className="text-[10px] text-emerald-500 font-medium">Open for Collab</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAV ── */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <p className={`px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest ${mutedText}`}>
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${navLinkBase} ${active ? navLinkActive : navLinkIdle}`}
              >
                {/* Active accent */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-500 rounded-r-full" />
                )}
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon size={15} className={active ? (isDark ? 'text-white' : 'text-neutral-900') : mutedText} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${
                    active
                      ? isDark
                        ? 'bg-neutral-700 border-neutral-600 text-neutral-300'
                        : 'bg-neutral-200 border-neutral-300 text-neutral-700'
                      : isDark
                        ? 'bg-neutral-900 border-neutral-700 text-neutral-500'
                        : 'bg-neutral-100 border-neutral-200 text-neutral-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── INFO CARD ── */}
        <div className={`px-3 py-3 border-t ${divider}`}>
          <div className={`p-3 rounded-md border text-[11px] leading-relaxed ${
            isDark ? 'bg-neutral-900/40 border-neutral-800 text-neutral-500' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
          }`}>
            <p className={`font-semibold text-xs mb-1 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Founder & Community
            </p>
            <p>
              Founder{' '}
              <a href="https://www.nokara.id" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium">Nokara.id</a>
              {' '}&amp; Lead{' '}
              <a href="https://nokara.biz.id" target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium">Nokara Community</a>
              {' '}Timika, Papua.
            </p>
          </div>
        </div>

        {/* ── BOTTOM ACTIONS ── */}
        <div className={`px-3 pb-4 border-t flex-shrink-0 pt-3 space-y-2.5 ${divider}`}>
          {/* CTA */}
          <a
            href="https://wa.me/6288242763942?text=Halo%20Amin%2C%20saya%20melihat%20portfolio%20kamu!"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-xs font-semibold transition-colors ${
              isDark
                ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500'
                : 'bg-blue-600 border-blue-700 text-white hover:bg-blue-700'
            }`}
          >
            <MessageCircle size={13} />
            <span>Chat via WhatsApp</span>
            <ExternalLink size={11} className="opacity-70 ml-auto" />
          </a>

          {/* Social + Theme */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              {SOCIAL_LINKS.map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`p-2 rounded-md border transition-colors ${
                      isDark
                        ? 'border-transparent text-neutral-500 hover:text-neutral-100 hover:bg-neutral-800 hover:border-neutral-700'
                        : 'border-transparent text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-200'
                    }`}
                  >
                    <SIcon size={14} />
                  </a>
                );
              })}
            </div>

            <button
              onClick={toggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                isDark
                  ? 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {isDark ? <><Sun size={12} /><span>Light</span></> : <><Moon size={12} /><span>Dark</span></>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

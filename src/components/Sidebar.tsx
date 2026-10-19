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
  MessageCircle,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/about', label: 'About', icon: User },
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
  const location = useLocation();
  const isDark = theme === 'dark';

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  /* Style tokens */
  const navLinkActive = isDark
    ? 'bg-neutral-900 text-neutral-100'
    : 'bg-neutral-100 text-neutral-900';

  const navLinkIdle = isDark
    ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100';

  return (
    <aside className="w-full lg:sticky lg:top-12 space-y-8">
      {/* ── PROFILE HEADER ── */}
      <div className="space-y-4">
        {/* Avatar Profil Bundar */}
        <div className="relative inline-block">
          <img
            src="/images/profile/pp.png"
            alt="Muhammad Amin Hidayat"
            className={`rounded-full w-24 h-24 object-cover border ${
              isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/profil.svg';
            }}
          />
          {/* Active online indicator */}
          <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span
              className={`relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 ${
                isDark ? 'border-neutral-950' : 'border-white'
              }`}
            />
          </span>
        </div>

        {/* Nama & Handle + Verification Badge */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h2 className={`font-bold text-lg tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Amin Hidayat
            </h2>
            <CheckCircle2
              size={15}
              className="text-blue-500 fill-blue-500/10 shrink-0"
              aria-label="Verified Profile"
            />
          </div>
          <p className="text-xs font-mono text-neutral-500">@dayattt111</p>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'} pt-0.5`}>
            Software Engineer &amp; Gen AI Specialist
          </p>
        </div>

        {/* Quick Switcher / Utilities Toggle */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={toggleTheme}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
              isDark
                ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700'
                : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={12} className="text-amber-400" /> : <Moon size={12} className="text-blue-500" />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <div
            className={`inline-flex items-center rounded-md border p-0.5 text-xs ${
              isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'
            }`}
          >
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-white text-neutral-900 shadow-xs'
              }`}
            >
              ID
            </span>
            <span className="px-2 py-0.5 text-[11px] text-neutral-500">
              EN
            </span>
          </div>
        </div>
      </div>

      {/* ── VERTICAL NAVIGATION ── */}
      <nav className="flex flex-wrap lg:flex-col gap-1" aria-label="Main Navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? navLinkActive : navLinkIdle
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className={active ? (isDark ? 'text-white' : 'text-neutral-900') : 'text-neutral-500'} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                    active
                      ? isDark
                        ? 'border-neutral-700 bg-neutral-800 text-neutral-300'
                        : 'border-neutral-300 bg-white text-neutral-700'
                      : isDark
                        ? 'border-neutral-800 bg-neutral-900 text-neutral-500'
                        : 'border-neutral-200 bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── CONNECT & SOCIAL ── */}
      <div className="space-y-3 pt-2">
        {/* WhatsApp Quick Action */}
        <a
          href="https://wa.me/6288242763942?text=Halo%20Amin%2C%20saya%20melihat%20portfolio%20kamu!"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
            isDark
              ? 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageCircle size={14} className="text-emerald-500" />
            <span>Chat via WhatsApp</span>
          </div>
          <ExternalLink size={12} className="text-neutral-500" />
        </a>

        {/* Social Icons */}
        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map((s) => {
            const SIcon = s.icon;
            return (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                aria-label={s.label}
                className={`p-2 rounded-lg text-neutral-500 transition-colors ${
                  isDark
                    ? 'hover:text-neutral-200 hover:bg-neutral-900'
                    : 'hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <SIcon size={15} />
              </a>
            );
          })}
        </div>
      </div>

      {/* ── COPYRIGHT FOOTER ── */}
      <div className="pt-4 border-t border-neutral-800/40">
        <p className="text-xs text-neutral-500 leading-relaxed">
          &copy; {new Date().getFullYear()} Muhammad Amin Hidayat.
          <br />
          Makassar, Indonesia.
        </p>
      </div>
    </aside>
  );
}

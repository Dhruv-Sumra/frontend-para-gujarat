import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Athletes', path: '/athletes' },
  { name: 'Sports', path: '/sports' },
  { name: 'Events', path: '/events' },
  { name: 'News', path: '/news' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Register Player', path: '/register' },
];

const themes = [
  { label: 'Light', value: 'theme-light' },
  { label: 'Orange', value: 'theme-orange' },
  { label: 'Blue', value: 'theme-blue' },
  { label: 'Dark', value: 'theme-dark' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'theme-light');
  const [scrolled, setScrolled] = useState(false);
  // Add a state to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add effect to lock body scroll when menuOpen is true
  useEffect(() => {
    if (menuOpen && windowWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen, windowWidth]);

  // Define theme-based styles for the mobile menu
  const mobileMenuBg = theme === 'theme-dark' ? '#233A5E' : theme === 'theme-orange' ? '#FFF3E0' : theme === 'theme-blue' ? '#E3F2FD' : '#fff';
  const mobileMenuText = theme === 'theme-dark' ? '#fff' : theme === 'theme-blue' ? '#0D47A1' : '#000080';
  const mobileMenuActiveBg = theme === 'theme-dark' ? '#FF9933' : theme === 'theme-blue' ? '#90CAF9' : '#FF9933';
  const mobileMenuActiveText = theme === 'theme-dark' ? '#233A5E' : theme === 'theme-blue' ? '#0D47A1' : '#fff';

  return (
    <header
      style={{
        background: (menuOpen && windowWidth <= 768)
          ? '#FFF3E0'
          : (theme === 'theme-dark'
              ? 'rgba(35, 58, 94, 0.90)'
              : 'rgba(255,255,255,0.7)'),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--card-border)',
        boxShadow: scrolled ? '0 4px 24px 0 rgba(0,0,0,0.10)' : '0 2px 8px 0 rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s, background 0.3s',
        zIndex: 50,
      }}
      className="sticky top-0 w-full"
    >
      <nav className="container mx-auto px-6 lg:px-12 flex items-center h-auto min-h-[4rem]" role="navigation" aria-label="Main navigation">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md group"
          tabIndex={0}
        >
          <img
            className="h-12 w-auto "
            src="/logo.png"
            alt="PSAG Logo - Para Sports Association of Gujarat"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))' }}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight leading-tight transition-colors duration-200 group-hover:text-[var(--accent)] group-focus:text-[var(--accent)]"
              style={{ color: theme === 'theme-dark' ? '#fff' : 'var(--primary)' }}
            >PSAG</span>
            <span className="text-xs tracking-wide leading-tight"
              style={{ color: theme === 'theme-dark' ? '#fff' : 'var(--primary)', opacity: 0.8 }}
            >Para Sports Association of Gujarat</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex flex-1 justify-center items-center space-x-2" role="menubar">
          {navItems.map(item => (
            <li key={item.name} role="none" className="relative">
              <Link
                to={item.path}
                className={`px-2 py-2 font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2`}
                style={{
                  color: theme === 'theme-dark' ? '#fff' : (location.pathname === item.path ? 'var(--accent)' : 'var(--primary)'),
                }}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                role="menuitem"
              >
                <span className="relative z-10">
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-0.5 w-full h-0.5 rounded transition-all duration-300 ${location.pathname === item.path ? 'bg-[var(--accent)] scale-x-100' : 'bg-[var(--accent)] scale-x-0 group-hover:scale-x-100'}`}
                    style={{
                      transition: 'transform 0.3s',
                      transformOrigin: 'left',
                      borderBottom: 'none',
                    }}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Theme Switcher and Donate Button (Desktop) */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <div className="relative">
            <label htmlFor="theme-select" className="sr-only">Change theme</label>
            <div className="relative">
              <select
                id="theme-select"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                className="appearance-none w-32 py-2 pl-3 pr-8 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-sm font-semibold shadow transition-all duration-150 cursor-pointer"
                style={{
                  color: theme === 'theme-dark' ? '#fff' : 'var(--primary)',
                }}
                aria-label="Change theme"
              >
                {themes.map(t => (
                  <option
                    key={t.value}
                    value={t.value}
                    style={{
                      color: theme === 'theme-dark' ? '#fff' : 'var(--primary)',
                      background: 'var(--card)'
                    }}
                  >
                    {t.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true"
                style={{ color: (theme === 'theme-dark' || theme === 'theme-blue') ? '#fff' : 'var(--primary)' }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
          <Link
            to="/donate"
            className="font-bold py-1 px-4 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-all duration-150 text-sm"
            style={{ background: 'var(--accent)', color: '#fff' }}
            aria-label="Donate to support para-athletes"
          >
            Donate
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          aria-label={menuOpen ? 'Close main menu' : 'Open main menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span className="sr-only">{menuOpen ? 'Close main menu' : 'Open main menu'}</span>
          {menuOpen ? (
            <svg className="h-7 w-7" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full z-50 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: mobileMenuBg }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <img className="h-8 w-auto" src="/logo.png" alt="PSAG Logo" />
              <span className="text-lg font-bold" style={{ color: mobileMenuText }}>PSAG</span>
            </Link>
            <button
              className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-7 w-7" style={{ color: mobileMenuText }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-stretch px-4 py-6 space-y-2" role="menu" style={{ background: mobileMenuBg }}>
            {navItems.map(item => (
              <li key={item.name} role="none">
                <Link
                  to={item.path}
                  className={`block px-3 py-3 rounded-lg font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2`}
                  style={{
                    color: location.pathname === item.path ? mobileMenuActiveText : mobileMenuText,
                    background: location.pathname === item.path ? mobileMenuActiveBg : 'transparent',
                    textAlign: 'left',
                  }}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="mt-4" role="none">
              <Link
                to="/donate"
                className="w-full font-bold py-3 px-4 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 transition-all duration-150 text-base text-center block"
                style={{ background: mobileMenuActiveBg, color: mobileMenuActiveText }}
                aria-label="Donate to support para-athletes"
                onClick={() => setMenuOpen(false)}
              >
                Donate
              </Link>
            </li>
            <li className="mt-4" role="none">
              <div className="relative">
                <label htmlFor="theme-select-mobile" className="sr-only">Change theme</label>
                <select
                  id="theme-select-mobile"
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  className="block w-full py-2 px-2 rounded-md border border-gray-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 text-base shadow-sm"
                  style={{
                    background: mobileMenuBg,
                    color: mobileMenuText,
                    borderColor: 'var(--card-border)'
                  }}
                  aria-label="Change theme"
                >
                  {themes.map(t => (
                    <option
                      key={t.value}
                      value={t.value}
                      style={{
                        color: mobileMenuText,
                        background: mobileMenuBg
                      }}
                    >
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
} 
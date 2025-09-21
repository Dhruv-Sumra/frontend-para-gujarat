import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'aboutUs', path: '/about' },
  { key: 'athletes', path: '/athletes' },
  { key: 'sports', path: '/sports' },
  { key: 'events', path: '/events' },
  { key: 'news', path: '/news' },
  { key: 'gallery', path: '/gallery' },
  { key: 'contactUs', path: '/contact' },
  { key: 'registerPlayer', path: '/register' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    document.body.style.overflow = !menuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
        style={{ borderBottom: scrolled ? '1px solid #ddd' : 'none' }}
      >
        <nav className="container mx-auto px-2">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1 transition-transform duration-200 hover:scale-105"
              onClick={closeMenu}
              aria-label="PSAG Home"
            >
              <img
                className="h-10 w-auto lg:h-12"
                src="/logo.png"
                alt="PSAG Logo"
              />
              <div className="hidden sm:block">
                <div className="text-lg lg:text-xl font-bold text-orange-600">
                  PSAG
                </div>
                <div className="text-xs lg:text-sm text-gray-600 opacity-80">
                  Para Sports Association of Gujarat
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`px-2 py-1 text-sm font-medium transition-colors hover:text-orange-600 ${
                    location.pathname === item.path
                      ? 'text-orange-600'
                      : 'text-gray-700'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer pr-8"
                >
                  <option value="en">English</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="hi">हिंदी</option>
                </select>
                <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <Link
                to="/donate"
                className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors"
              >
                {t('donate')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded text-gray-700 hover:text-orange-600 hover:bg-orange-50"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">
                {menuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              <img className="h-8 w-auto" src="/logo.png" alt="PSAG Logo" />
              <span className="text-lg font-semibold text-orange-600">PSAG</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={closeMenu}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-500'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-3">
            {/* Language Selector */}
            <div>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="en">English</option>
                <option value="gu">ગુજરાતી</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
            
            <Link
              to="/donate"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-base font-medium rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-transform duration-200 hover:scale-105"
            >
              {t('donateNow')}
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-12" />
    </>
  );
}

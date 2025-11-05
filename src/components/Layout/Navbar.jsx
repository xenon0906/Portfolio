import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '../../hooks';
import ThemeToggle from '../UI/ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise, let Link component handle navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg">
      {/* Scroll Progress Bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={handleLogoClick}>
            <motion.div
              className="text-2xl font-extrabold text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <motion.div
                  className={`text-base font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mt-1"
                      layoutId="navbar-indicator"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-charcoal/10 dark:hover:bg-off-white/10 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <motion.div
                      className={`block py-3 text-lg font-semibold transition-colors ${
                        location.pathname === link.path
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                      whileHover={{ x: 8 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

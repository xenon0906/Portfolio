"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex
          glass rounded-full px-6 py-3 shadow-2xl transition-all duration-300
          ${scrolled ? 'backdrop-blur-xl' : ''}`}
      >
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-all duration-300
                ${pathname === link.href
                  ? 'text-[var(--accent-primary)]'
                  : 'opacity-60 hover:opacity-100'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 md:hidden">
        <div className={`px-4 py-3 flex items-center justify-between transition-all duration-300
          ${scrolled ? 'glass' : ''}`}>

          {/* Left: Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 glass rounded-lg"
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {mounted && (
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </motion.div>
            )}
          </motion.button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-5">
            <div className="text-2xl font-black gradient-text">
              SK
            </div>
          </Link>

          {/* Right: Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 glass rounded-lg"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden glass border-t border-[var(--grid-color)]"
            >
              <div className="py-4 px-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 text-base font-medium rounded-xl transition-colors
                      ${pathname === link.href
                        ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                        : 'opacity-60 hover:opacity-100 hover:bg-[var(--grid-color)]'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

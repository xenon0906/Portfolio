"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Use View Transitions API for Liquid Wipe effect
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      setTheme(newTheme);
    }
  };

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass animate-pulse hidden md:block" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 p-3 glass rounded-full shadow-lg
                 hover:scale-110 transition-transform focus:outline-none
                 focus:ring-2 focus:ring-[var(--accent-primary)] hidden md:flex"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
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
    </motion.button>
  );
}

// Named export
export { ThemeToggle };

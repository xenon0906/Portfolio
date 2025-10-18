import React from 'react';
import { ThemeProvider } from './utils/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-off-white dark:bg-charcoal transition-colors duration-300 smooth-scroll">
        <Navbar />

        <main>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </main>

        <footer className="py-8 px-4 text-center text-charcoal/60 dark:text-off-white/60 border-t border-charcoal/10 dark:border-off-white/10">
          <p>
            &copy; {new Date().getFullYear()} Auto-updating Portfolio. Built with React + Vite.
          </p>
          <p className="text-sm mt-2">
            Syncs with GitHub every 5 minutes • Last updated: {new Date().toLocaleDateString()}
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Github, Linkedin } from 'lucide-react';
import { ThemeProvider } from './utils/ThemeContext';
import Navbar from './components/Layout/Navbar';
import PageLoader from './components/UI/PageLoader';
import ScrollToTop from './components/UI/ScrollToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-off-white dark:bg-charcoal transition-colors duration-300 smooth-scroll">
          <Navbar />

          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>

          <footer className="py-12 px-4 text-center relative overflow-hidden">
            <div className="section-divider mb-8" />

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-6">
                <p className="text-2xl font-bold text-gradient mb-4">Let's Connect</p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <a
                    href="https://github.com/xenon0906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-effect rounded-xl hover:scale-110 transition-transform text-slate-700 dark:text-slate-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/syd090605"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-effect rounded-xl hover:scale-110 transition-transform text-slate-700 dark:text-slate-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                &copy; {new Date().getFullYear()} Siddhanth Kunwar. Built with React + Vite.
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
        <SpeedInsights />
      </Router>
    </ThemeProvider>
  );
}

export default App;

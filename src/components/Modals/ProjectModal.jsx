import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Star, GitFork, Calendar, Code } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const languageColor = LANGUAGE_COLORS[project.language] || '#6366f1';

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-6 flex items-start justify-between z-10">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                      {project.name}
                    </h2>
                    {project.isRecentlyUpdated && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-full border border-emerald-500/30">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {project.description || 'No description available'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Stars</span>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{project.stargazers_count}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-5 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <GitFork className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Forks</span>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{project.forks_count}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 rounded-2xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Language</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: languageColor, boxShadow: `0 0 10px ${languageColor}40` }}
                      />
                      <p className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{project.language || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 p-5 rounded-2xl border border-violet-200 dark:border-violet-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-violet-500" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Updated</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {formatDistanceToNow(new Date(project.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                {/* Topics/Tags */}
                {project.topics && project.topics.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Technologies & Topics</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-bold rounded-xl border border-indigo-200 dark:border-indigo-700"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">About This Project</h3>
                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.description || 'This project doesn\'t have a detailed description yet. Check out the GitHub repository to learn more about what it does and how it works.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-indigo-500/50 transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-6 h-6" />
                    View on GitHub
                  </motion.a>

                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-lg rounded-2xl shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="w-6 h-6" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

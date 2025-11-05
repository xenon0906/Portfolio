import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

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
  Jupyter: '#DA5B0B',
};

const GitHubRepoCard = ({ repo, index }) => {
  const primaryLanguage = repo.language;
  const languageColor = LANGUAGE_COLORS[primaryLanguage] || '#6366f1';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="relative bg-white dark:bg-slate-800 p-7 rounded-2xl h-full flex flex-col group hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:-translate-y-1">
        {/* Project Name */}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {repo.name}
        </h3>

        {/* Language Badge */}
        <div className="flex-grow mb-6">
          {primaryLanguage && (
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm">
              <div
                className="w-3.5 h-3.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: languageColor,
                  boxShadow: `0 0 12px ${languageColor}80, 0 0 20px ${languageColor}40`
                }}
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {primaryLanguage}
              </span>
            </div>
          )}
        </div>

        {/* View on GitHub Button */}
        <motion.a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all font-bold text-sm w-full shadow-lg hover:shadow-xl border-2 border-slate-700 dark:border-slate-500"
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Github className="w-5 h-5" />
          <span>View on GitHub</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default GitHubRepoCard;

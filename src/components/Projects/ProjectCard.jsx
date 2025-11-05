import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github } from 'lucide-react';
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

const ProjectCard = React.memo(({ repo }) => {
  const isRecent = repo.isRecentlyUpdated;
  const primaryLanguage = repo.language;
  const languageColor = LANGUAGE_COLORS[primaryLanguage] || '#6366f1';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl h-full flex flex-col group hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

        {/* Project Name & Live Badge */}
        <div className="relative z-10 mb-4">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {repo.name}
          </h3>

          {repo.homepage && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full border border-emerald-500/50 dark:border-emerald-400/50">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                <div className="absolute w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Live</span>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="relative z-10 flex-grow mb-4">
          {primaryLanguage && (
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700/50 rounded-xl w-fit">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColor, boxShadow: `0 0 10px ${languageColor}80` }}
              />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{primaryLanguage}</span>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="relative z-10 flex gap-3 mt-auto pt-4 border-t-2 border-slate-200 dark:border-slate-700">
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all font-bold text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </motion.a>

          {repo.homepage && (
            <motion.a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export { ProjectCard };
export default ProjectCard;

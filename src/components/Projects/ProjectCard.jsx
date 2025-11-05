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
    <motion.div variants={cardVariants}>
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.2}
        glareColor="#6366f1"
        glarePosition="all"
        glareBorderRadius="1rem"
        className="h-full"
      >
        <div className="relative glass-effect p-7 rounded-3xl h-full flex flex-col group hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border-2 border-transparent hover:border-indigo-500/30 overflow-hidden">
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between mb-5 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-gradient transition-all duration-300">
                  {repo.name}
                </h3>
                {isRecent && (
                  <span className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-400/30 to-green-400/30 dark:from-emerald-500/30 dark:to-green-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/50 dark:border-emerald-400/50 shadow-lg shadow-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              {isRecent && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </span>
              )}
            </div>
          </div>

          {/* Technologies/Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2 mb-5 flex-grow">
              {repo.topics.slice(0, 3).map((topic, index) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-xs font-semibold rounded-lg text-indigo-700 dark:text-purple-300 border border-indigo-200 dark:border-slate-500 hover:scale-105 transition-transform shadow-sm h-fit"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between pt-5 mt-auto border-t-2 border-slate-200 dark:border-slate-700 group-hover:border-indigo-500/30 transition-colors">
            {/* Language */}
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              {primaryLanguage && (
                <div className="flex items-center gap-1.5 group/lang">
                  <div
                    className="w-3 h-3 rounded-full shadow-md group-hover/lang:scale-125 transition-transform"
                    style={{ backgroundColor: languageColor, boxShadow: `0 0 12px ${languageColor}60` }}
                  />
                  <span className="font-semibold">{primaryLanguage}</span>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex gap-2">
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white rounded-xl transition-all bg-slate-100 dark:bg-slate-700 shadow-md"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              {repo.homepage && (
                <motion.a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl transition-all bg-slate-100 dark:bg-slate-700 shadow-md"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export { ProjectCard };
export default ProjectCard;

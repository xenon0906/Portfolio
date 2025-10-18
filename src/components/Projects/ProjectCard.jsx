import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Star, GitFork, ExternalLink, Github } from 'lucide-react';
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

export const ProjectCard = ({ repo }) => {
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
        <div className="glass-effect p-6 rounded-2xl h-full flex flex-col group hover:border-indigo-accent/50 transition-all duration-300">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-charcoal dark:text-off-white group-hover:text-gradient transition-colors">
                  {repo.name}
                </h3>
                {isRecent && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-emerald/20 text-emerald text-xs font-medium rounded-full">
                    <div className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              {isRecent && (
                <span className="text-xs text-charcoal/60 dark:text-off-white/60">
                  Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-charcoal/70 dark:text-off-white/70 text-sm mb-4 flex-1 line-clamp-3">
            {repo.description || 'No description available.'}
          </p>

          {/* Technologies/Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-charcoal/10 dark:bg-off-white/10 text-xs rounded-full text-charcoal/80 dark:text-off-white/80"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 dark:border-off-white/10">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-charcoal/60 dark:text-off-white/60">
              {primaryLanguage && (
                <div className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColor }}
                  />
                  <span>{primaryLanguage}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks_count}</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-2">
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-charcoal/10 dark:hover:bg-off-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              {repo.homepage && (
                <motion.a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-charcoal/10 dark:hover:bg-off-white/10 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
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
};

export default ProjectCard;

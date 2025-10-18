import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useAutoUpdateGitHub } from '../../hooks';
import ProjectCard from './ProjectCard';

export const Projects = () => {
  const { repos, isLoading, isRefreshing, refresh, getTimeSinceSync } = useAutoUpdateGitHub();
  const [filter, setFilter] = useState('all');

  // Get top 6 projects
  const topProjects = repos?.slice(0, 6) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-accent/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal dark:text-off-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-charcoal/70 dark:text-off-white/70 max-w-2xl mx-auto">
            Auto-updated from GitHub every 5 minutes. Projects are ranked by stars, forks, and recent activity.
          </p>

          {/* Sync Status */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-charcoal/60 dark:text-off-white/60">
              <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
              <span>Last synced: {getTimeSinceSync()}</span>
            </div>

            <motion.button
              onClick={refresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-charcoal/10 dark:bg-off-white/10 rounded-full hover:bg-indigo-accent hover:text-white transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-effect p-6 rounded-2xl animate-pulse">
                <div className="h-6 bg-charcoal/10 dark:bg-off-white/10 rounded mb-4" />
                <div className="h-16 bg-charcoal/10 dark:bg-off-white/10 rounded mb-4" />
                <div className="h-4 bg-charcoal/10 dark:bg-off-white/10 rounded mb-2" />
                <div className="h-4 bg-charcoal/10 dark:bg-off-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {topProjects.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        )}

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/xenon0906?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-accent to-emerald text-white font-semibold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

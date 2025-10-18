import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useAutoUpdateGitHub } from '../../hooks';
import ProjectCard from './ProjectCard';
import ProjectModal from '../Modals/ProjectModal';

export const Projects = () => {
  const { repos, isLoading, isRefreshing, refresh, getTimeSinceSync } = useAutoUpdateGitHub();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get top 6 projects
  const topProjects = repos?.slice(0, 6) || [];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

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
    <section id="projects" className="py-32 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Auto-updated from GitHub every 5 minutes. Projects are ranked by stars, forks, and recent activity.
          </p>

          {/* Sync Status */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Last synced: {getTimeSinceSync()}</span>
            </div>

            <motion.button
              onClick={refresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-semibold">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
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
              <div key={repo.id} onClick={() => handleProjectClick(repo)} className="cursor-pointer">
                <ProjectCard repo={repo} />
              </div>
            ))}
          </motion.div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/xenon0906?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-indigo-500/50 bg-[length:200%_auto]"
            whileHover={{ scale: 1.05, backgroundPosition: 'right center' }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects on GitHub
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

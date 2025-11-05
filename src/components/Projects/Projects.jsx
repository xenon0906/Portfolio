import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink, Github } from 'lucide-react';
import { useAutoUpdateGitHub } from '../../hooks';
import FeaturedProjectCard from './FeaturedProjectCard';
import GitHubRepoCard from './GitHubRepoCard';

// Featured Projects Data
const FEATURED_PROJECTS = [
  {
    title: 'FundChain',
    description: 'A modern, transparent, and secure blockchain-powered crowdfunding platform built on Ethereum. Create campaigns, contribute funds, and vote on spending decisions with complete transparency.',
    image: '/projects/fundchain.png',
    liveUrl: 'https://fundcloud.vercel.app/',
    githubUrl: 'https://github.com/xenon0906/FundChain',
    tech: ['Blockchain', 'Ethereum', 'React', 'Solidity', 'Web3'],
  },
  {
    title: 'BlockVote',
    description: 'Blockchain-based polling platform on Ethereum Sepolia. Secure, transparent, and tamper-proof voting system powered by smart contracts.',
    image: '/projects/blockvote.png',
    liveUrl: 'https://blockvoteapp.vercel.app/',
    githubUrl: 'https://github.com/xenon0906/BlockVote',
    tech: ['Blockchain', 'Ethereum', 'Smart Contracts', 'React'],
  },
  {
    title: 'DeepFind AI',
    description: 'AI-Powered Semantic Search Engine with Multi-API Aggregation. Search PDFs, articles, and web content with AI-powered relevance scoring and intelligent ranking.',
    image: '/projects/deepfind.png',
    liveUrl: 'https://deepfindai.vercel.app/',
    githubUrl: 'https://github.com/xenon0906/DeepFind-AI',
    tech: ['AI', 'Machine Learning', 'Next.js', 'Semantic Search', 'APIs'],
  },
];

// Specific GitHub repos to show
const GITHUB_REPOS_TO_SHOW = [
  'Bus-Station',
  'ThunderBird',
  'Fashion-MNIST-Classification-with-TensorFlow',
  'ClimaScope',
  'Encrypter-Decrypter',
  'Theme-Change-Static-',
];

export const Projects = () => {
  const { repos, isLoading, isRefreshing, refresh } = useAutoUpdateGitHub();

  // Filter repos to show only specified ones
  const filteredRepos = useMemo(() => {
    if (!repos || repos.length === 0) return [];

    return repos
      .filter(repo => GITHUB_REPOS_TO_SHOW.includes(repo.name))
      .slice(0, 6); // Ensure max 6
  }, [repos]);

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
    <section id="projects" className="py-16 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-16" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Blockchain, AI, and full-stack applications showcasing my expertise
          </p>
        </motion.div>

        {/* Featured Projects - Top 3 with Screenshots */}
        <div className="space-y-12 mb-28">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider my-16" />

        {/* GitHub Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
            More <span className="text-gradient">Projects</span>
          </h3>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Explore additional projects from my GitHub portfolio
          </p>

          {/* Sync Status */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="relative flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${!isLoading && repos?.length > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div className={`absolute w-3 h-3 rounded-full ${!isLoading && repos?.length > 0 ? 'bg-emerald-500' : 'bg-red-500'} animate-ping`} />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {!isLoading && repos?.length > 0 ? 'Connected to GitHub' : 'Connecting...'}
              </span>
            </div>

            <motion.button
              onClick={refresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* GitHub Repos Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl animate-pulse h-48 border-2 border-slate-200 dark:border-slate-700">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-3/4" />
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-1/2" />
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full" />
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
            {filteredRepos.map((repo, index) => (
              <GitHubRepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </motion.div>
        )}

        {/* View All Repositories */}
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
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-slate-500/50 bg-[length:200%_auto] border-2 border-slate-700 dark:border-slate-500"
            whileHover={{ scale: 1.05, backgroundPosition: 'right center' }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            <span>View All Repositories</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ExternalLink, Star, GitFork, Code2, RefreshCw, CheckCircle2, Github } from 'lucide-react';
import useGitHub from '@/hooks/useGitHub';

// Dynamic imports
const ActiveBackground = dynamic(
  () => import('@/components/ui/ActiveBackground'),
  { ssr: false }
);

const ContributionChart = dynamic(
  () => import('@/components/ui/ContributionChart'),
  { ssr: false }
);

const GitHubStats = dynamic(
  () => import('@/components/ui/GitHubStats'),
  { ssr: false }
);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};

// Featured Projects Data
const featuredProjects = [
  {
    title: "FundChain",
    description: "A modern, transparent, and secure blockchain-powered crowdfunding platform built on Ethereum. Create campaigns, contribute funds, and vote on spending decisions with complete transparency.",
    tags: ["Blockchain", "Ethereum", "React", "Solidity", "Web3"],
    github: "https://github.com/xenon0906/FundChain",
    live: "https://fundcloud.vercel.app/",
    image: "/projects/fundchain.png",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "BlockVote",
    description: "Blockchain-based polling platform on Ethereum Sepolia. Secure, transparent, and tamper-proof voting system powered by smart contracts.",
    tags: ["Blockchain", "Ethereum", "Smart Contracts", "React"],
    github: "https://github.com/xenon0906/BlockVote",
    live: "https://blockvoteapp.vercel.app/",
    image: "/projects/blockvote.png",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "DeepFind AI",
    description: "AI-Powered Semantic Search Engine with Multi-API Aggregation. Search PDFs, articles, and web content with AI-powered relevance scoring and intelligent ranking.",
    tags: ["AI", "Machine Learning", "Next.js", "Semantic Search", "APIs"],
    github: "https://github.com/xenon0906/DeepFind-AI",
    live: "https://deepfindai.vercel.app/",
    image: "/projects/deepfind.png",
    color: "from-orange-500 to-red-600"
  },
];

// Language color mapping
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  C: '#555555',
  'Jupyter Notebook': '#DA5B0B',
  CSS: '#563d7c',
  HTML: '#e34c26',
};

function ProjectCardSkeleton() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="h-8 w-8 bg-gray-700 rounded" />
        <div className="h-4 w-4 bg-gray-700 rounded" />
      </div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-700 rounded w-full mb-4" />
      <div className="flex gap-2">
        <div className="h-4 w-16 bg-gray-700 rounded" />
        <div className="h-4 w-16 bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { repos, stats, languages, isLoading, isRefreshing, refresh } = useGitHub();

  // Get other repos (excluding featured project names)
  const featuredNames = ['FundChain', 'BlockVote', 'DeepFind-AI', 'DeepFind'];
  const otherProjects = repos
    .filter(repo => !featuredNames.includes(repo.name))
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6);

  return (
    <div className="min-h-screen relative">
      <ActiveBackground />
      <Navbar />
      <ThemeToggle />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">
              A collection of my work in blockchain, AI, and web development.
              Each project represents my passion for building innovative solutions.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8">
            Featured Work
          </motion.h2>

          <div className="space-y-8 mb-20">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="glass-card overflow-hidden group"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className={`h-64 md:h-auto min-h-[300px] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="opacity-70 mb-6 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-white font-medium hover:opacity-90 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub Stats Section */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                GitHub <span className="gradient-text">Stats</span>
              </h2>
              <div className="flex items-center gap-4">
                {repos.length > 0 && (
                  <span className="text-xs opacity-50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Connected
                  </span>
                )}
                <button
                  onClick={refresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-full glass hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <GitHubStats stats={stats} isLoading={isLoading} />
          </motion.div>

          {/* Contribution Chart */}
          <motion.div variants={fadeInUp} className="mb-12">
            <ContributionChart />
          </motion.div>

          {/* Language Distribution */}
          {languages.length > 0 && (
            <motion.div variants={fadeInUp} className="glass-card p-6 mb-12">
              <h3 className="font-bold text-lg mb-4">Language Distribution</h3>
              <div className="flex flex-wrap gap-4">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColors[lang.name] || 'var(--accent-primary)' }}
                    />
                    <span className="text-sm">{lang.name}</span>
                    <span className="text-xs opacity-50">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Projects Grid */}
          <motion.h2 variants={fadeInUp} className="text-2xl font-bold mb-8">
            Other Projects
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)
            ) : otherProjects.length > 0 ? (
              otherProjects.map((project) => (
                <motion.a
                  key={project.id}
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-150"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Code2 className="w-8 h-8 opacity-50 group-hover:text-[var(--accent-primary)] transition-colors" />
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm opacity-70 mb-4 line-clamp-2">
                    {project.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.language && (
                        <>
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: languageColors[project.language] || '#888' }}
                          />
                          <span className="text-xs opacity-70">{project.language}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs opacity-50">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {project.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {project.forks_count}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <p className="col-span-full text-center opacity-70">No other projects found.</p>
            )}
          </div>

          {/* GitHub CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <a
              href="https://github.com/xenon0906"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass
                       hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

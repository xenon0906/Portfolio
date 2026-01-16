"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, Users, FolderGit2 } from 'lucide-react';
import CountUp from 'react-countup';

function StatCard({ icon, value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="glass-card p-4 text-center"
    >
      <div className="text-[var(--accent-primary)] mb-2 flex justify-center">
        {icon}
      </div>
      <div className="text-2xl font-bold gradient-text">
        <CountUp end={value || 0} duration={2.5} />
      </div>
      <div className="text-xs opacity-70 mt-1">{label}</div>
    </motion.div>
  );
}

export default function GitHubStats({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-4 animate-pulse">
            <div className="h-6 w-6 mx-auto bg-gray-700 rounded mb-2" />
            <div className="h-8 bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={<FolderGit2 className="w-6 h-6" />}
        value={stats?.totalRepos}
        label="Repositories"
        delay={0.1}
      />
      <StatCard
        icon={<Star className="w-6 h-6" />}
        value={stats?.totalStars}
        label="Total Stars"
        delay={0.2}
      />
      <StatCard
        icon={<GitFork className="w-6 h-6" />}
        value={stats?.totalForks}
        label="Total Forks"
        delay={0.3}
      />
      <StatCard
        icon={<Users className="w-6 h-6" />}
        value={stats?.followers}
        label="Followers"
        delay={0.4}
      />
    </div>
  );
}

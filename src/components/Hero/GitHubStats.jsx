import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Star, GitFork, Users, BookOpen } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    className="glass-effect p-6 rounded-2xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 100 }}
    whileHover={{ scale: 1.05, y: -5 }}
  >
    <div className="flex items-center justify-center mb-3">
      <div className="p-3 bg-gradient-to-r from-indigo-accent to-emerald rounded-full">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="text-3xl font-bold text-charcoal dark:text-off-white mb-2">
      <CountUp end={value || 0} duration={2.5} delay={delay} />
    </div>
    <div className="text-sm text-charcoal/60 dark:text-off-white/60 font-medium">
      {label}
    </div>
  </motion.div>
);

export const GitHubStats = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-effect p-6 rounded-2xl animate-pulse">
            <div className="h-12 bg-charcoal/10 dark:bg-off-white/10 rounded mb-3" />
            <div className="h-8 bg-charcoal/10 dark:bg-off-white/10 rounded mb-2" />
            <div className="h-4 bg-charcoal/10 dark:bg-off-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      <StatCard
        icon={BookOpen}
        label="Repositories"
        value={stats?.totalRepos || 0}
        delay={0.4}
      />
      <StatCard
        icon={Star}
        label="Total Stars"
        value={stats?.totalStars || 0}
        delay={0.5}
      />
      <StatCard
        icon={GitFork}
        label="Total Forks"
        value={stats?.totalForks || 0}
        delay={0.6}
      />
      <StatCard
        icon={Users}
        label="Followers"
        value={stats?.followers || 0}
        delay={0.7}
      />
    </div>
  );
};

export default GitHubStats;

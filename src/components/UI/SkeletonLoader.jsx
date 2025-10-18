import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = ({ className = '' }) => (
  <div className={`glass-effect p-6 rounded-2xl border border-slate-200 dark:border-slate-700 ${className}`}>
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-3/4" />
      <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded" />
        <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-5/6" />
      </div>
    </div>
  </div>
);

export const SkeletonStat = () => (
  <motion.div
    className="glass-effect p-8 rounded-3xl border border-slate-200 dark:border-slate-700"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="animate-pulse space-y-3">
      <div className="h-12 w-12 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-xl mx-auto" />
      <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-20 mx-auto" />
      <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-24 mx-auto" />
    </div>
  </motion.div>
);

export const SkeletonAvatar = () => (
  <div className="relative w-36 h-36 mx-auto mb-8">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 rounded-full animate-pulse" />
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`h-3 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded animate-pulse`}
        style={{ width: `${100 - i * 10}%` }}
      />
    ))}
  </div>
);

export default { SkeletonCard, SkeletonStat, SkeletonAvatar, SkeletonText };

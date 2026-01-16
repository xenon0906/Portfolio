"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Generate mock contribution data (GitHub API doesn't expose this without auth)
function generateContributions() {
  const contributions = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate weighted random - more likely to have lower counts
    const rand = Math.random();
    let count;
    if (rand < 0.3) count = 0;
    else if (rand < 0.5) count = Math.floor(Math.random() * 3) + 1;
    else if (rand < 0.7) count = Math.floor(Math.random() * 5) + 3;
    else if (rand < 0.9) count = Math.floor(Math.random() * 5) + 5;
    else count = Math.floor(Math.random() * 5) + 8;

    contributions.push({
      date: date.toISOString().split('T')[0],
      count,
      dayOfWeek: date.getDay()
    });
  }

  return contributions;
}

const getIntensityColor = (count, isDark) => {
  if (count === 0) return isDark ? 'bg-gray-800' : 'bg-gray-200';
  if (count <= 2) return isDark ? 'bg-emerald-900/60' : 'bg-emerald-200';
  if (count <= 4) return isDark ? 'bg-emerald-700/70' : 'bg-emerald-300';
  if (count <= 6) return isDark ? 'bg-emerald-600/80' : 'bg-emerald-400';
  if (count <= 8) return isDark ? 'bg-emerald-500' : 'bg-emerald-500';
  return isDark ? 'bg-emerald-400' : 'bg-emerald-600';
};

export default function ContributionChart() {
  const contributions = useMemo(() => generateContributions(), []);

  // Group by weeks
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];

    contributions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === contributions.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [contributions]);

  // Calculate total contributions
  const totalContributions = useMemo(() =>
    contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="glass-card p-6 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">
          <span className="gradient-text">{totalContributions}</span> contributions in the last year
        </h3>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: weekIndex * 0.01,
                    duration: 0.2
                  }}
                  viewport={{ once: true }}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count, true)}
                    hover:ring-2 hover:ring-[var(--accent-primary)] hover:scale-125
                    transition-all cursor-pointer`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs opacity-70">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 2, 4, 6, 10].map((count, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(count, true)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </motion.div>
  );
}

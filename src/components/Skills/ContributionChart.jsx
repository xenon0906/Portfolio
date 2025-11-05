import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContributionChart = ({ contributions = [] }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Generate last 365 days
  const contributionData = useMemo(() => {
    const today = new Date();
    const data = [];

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Random contribution count for demo (replace with real data)
      const count = Math.floor(Math.random() * 10);

      data.push({
        date: date.toISOString().split('T')[0],
        count: count,
        day: date.getDay(),
        week: Math.floor((364 - i) / 7),
      });
    }

    return data;
  }, []);

  // Group by weeks
  const weeks = useMemo(() => {
    const weekGroups = {};
    contributionData.forEach(day => {
      if (!weekGroups[day.week]) {
        weekGroups[day.week] = [];
      }
      weekGroups[day.week].push(day);
    });
    return Object.values(weekGroups);
  }, [contributionData]);

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-200 dark:bg-slate-700';
    if (count <= 2) return 'bg-emerald-400 dark:bg-emerald-500';
    if (count <= 5) return 'bg-emerald-500 dark:bg-emerald-400';
    if (count <= 8) return 'bg-emerald-600 dark:bg-emerald-300';
    return 'bg-emerald-700 dark:bg-emerald-200';
  };

  const getIntensity = (count) => {
    if (count === 0) return 'No contributions';
    if (count <= 2) return 'Low activity';
    if (count <= 5) return 'Medium activity';
    if (count <= 8) return 'High activity';
    return 'Very high activity';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          GitHub Activity
        </h3>
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
          Last 365 Days
        </span>
      </div>

      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Daily contribution pattern showing coding consistency and project activity
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-1.5 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = week.find(d => d.day === dayIndex);
                const count = day?.count || 0;

                return (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: weekIndex * 0.005 + dayIndex * 0.002,
                      duration: 0.2
                    }}
                    className={`w-3.5 h-3.5 rounded ${getColor(count)} transition-all hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-400 hover:scale-150 cursor-pointer shadow-sm`}
                    title={day ? `${day.date}: ${count} contributions - ${getIntensity(count)}` : ''}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mt-6 text-sm">
        <span className="font-bold text-slate-600 dark:text-slate-400">Less</span>
        <div className="flex gap-1.5">
          <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600" />
          <div className="w-4 h-4 rounded bg-emerald-400 dark:bg-emerald-500 border border-emerald-500 dark:border-emerald-400" />
          <div className="w-4 h-4 rounded bg-emerald-500 dark:bg-emerald-400 border border-emerald-600 dark:border-emerald-300" />
          <div className="w-4 h-4 rounded bg-emerald-600 dark:bg-emerald-300 border border-emerald-700 dark:border-emerald-200" />
          <div className="w-4 h-4 rounded bg-emerald-700 dark:bg-emerald-200 border border-emerald-800 dark:border-emerald-100" />
        </div>
        <span className="font-bold text-slate-600 dark:text-slate-400">More</span>
      </div>
    </motion.div>
  );
};

export default ContributionChart;

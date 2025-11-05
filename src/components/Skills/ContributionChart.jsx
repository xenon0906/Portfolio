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
    if (count === 0) return 'bg-slate-200 dark:bg-slate-800';
    if (count <= 2) return 'bg-emerald-300 dark:bg-emerald-900';
    if (count <= 5) return 'bg-emerald-400 dark:bg-emerald-700';
    if (count <= 8) return 'bg-emerald-500 dark:bg-emerald-600';
    return 'bg-emerald-600 dark:bg-emerald-500';
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
      className="glass-effect p-8 rounded-3xl"
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        Contribution Activity
      </h3>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = week.find(d => d.day === dayIndex);
                const count = day?.count || 0;

                return (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      delay: weekIndex * 0.01 + dayIndex * 0.005,
                      duration: 0.2
                    }}
                    className={`w-3 h-3 rounded-sm ${getColor(count)} transition-all hover:ring-2 hover:ring-indigo-500 hover:scale-125 cursor-pointer`}
                    title={day ? `${day.date}: ${count} contributions - ${getIntensity(count)}` : ''}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-6 text-sm text-slate-600 dark:text-slate-400">
        <span className="font-medium">Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-800" />
          <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-600" />
          <div className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-500" />
        </div>
        <span className="font-medium">More</span>
      </div>
    </motion.div>
  );
};

export default ContributionChart;

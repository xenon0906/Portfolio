import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAutoUpdateGitHub } from '../../hooks';

const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

const SkillBar = ({ language, percentage, color, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
          />
          <span className="font-bold text-lg text-slate-800 dark:text-slate-100">
            {language}
          </span>
        </div>
        <span className="text-base font-semibold text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full">
          {percentage}%
        </span>
      </div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { languages, isLoading } = useAutoUpdateGitHub();

  return (
    <section id="skills" className="py-32 px-4 relative">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Based on code analysis across all GitHub repositories
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-charcoal/10 dark:bg-off-white/10 rounded mb-2" />
                <div className="h-3 bg-charcoal/10 dark:bg-off-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-effect p-10 md:p-12 rounded-3xl">
            {languages?.map((lang, index) => (
              <SkillBar
                key={lang.language}
                language={lang.language}
                percentage={parseFloat(lang.percentage)}
                color={LANGUAGE_COLORS[lang.language] || '#6366f1'}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;

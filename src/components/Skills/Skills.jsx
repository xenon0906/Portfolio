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
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-charcoal dark:text-off-white">
            {language}
          </span>
        </div>
        <span className="text-sm text-charcoal/60 dark:text-off-white/60">
          {percentage}%
        </span>
      </div>
      <div className="h-3 bg-charcoal/10 dark:bg-off-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { languages, isLoading } = useAutoUpdateGitHub();

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal dark:text-off-white">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-charcoal/70 dark:text-off-white/70">
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
          <div className="glass-effect p-8 rounded-2xl">
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

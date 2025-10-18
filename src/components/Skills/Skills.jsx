import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAutoUpdateGitHub } from '../../hooks';
import { Code2, Cloud, Database, Cpu, Wrench, Palette } from 'lucide-react';

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

const TECH_CATEGORIES = {
  languages: {
    title: 'Languages',
    icon: Code2,
    color: 'from-indigo-600 to-purple-600',
    skills: ['C', 'Rust', 'Python', 'JavaScript', 'TypeScript', 'Solidity'],
  },
  cloud: {
    title: 'Cloud & Platform',
    icon: Cloud,
    color: 'from-blue-600 to-cyan-600',
    skills: ['AWS', 'Firebase', 'Google Cloud', 'Vercel', 'Twilio'],
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    icon: Cpu,
    color: 'from-emerald-600 to-teal-600',
    skills: ['React', 'Next.js', 'Angular', 'Web3.js', 'PyTorch', 'TensorFlow', 'Keras'],
  },
  databases: {
    title: 'Databases & Tools',
    icon: Database,
    color: 'from-purple-600 to-pink-600',
    skills: ['MongoDB', 'NumPy', 'Pandas', 'scikit-learn'],
  },
  tools: {
    title: 'Development Tools',
    icon: Wrench,
    color: 'from-orange-600 to-red-600',
    skills: ['Docker', 'GitHub', 'GitLab', 'Postman', 'Yarn', 'Power BI'],
  },
  design: {
    title: 'Design & UI',
    icon: Palette,
    color: 'from-pink-600 to-rose-600',
    skills: ['Figma', 'Framer'],
  },
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

const SkillCategory = ({ category, data, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Icon = data.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 bg-gradient-to-br ${data.color} rounded-xl shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {data.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {data.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:scale-105 transition-all"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { languages, isLoading } = useAutoUpdateGitHub();

  return (
    <section id="skills" className="py-16 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-16" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A comprehensive overview of technologies, frameworks, and tools I work with across development, cloud, and data science
          </p>
        </motion.div>

        {/* Tech Stack Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {Object.entries(TECH_CATEGORIES).map(([key, data], index) => (
            <SkillCategory key={key} category={key} data={data} index={index} />
          ))}
        </div>

        {/* Language Distribution from GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-slate-900 dark:text-slate-100">
            Code Distribution <span className="text-gradient">by Language</span>
          </h3>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-10">
            Real-time analysis from GitHub repositories
          </p>

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
            <div className="glass-effect p-10 md:p-12 rounded-3xl max-w-5xl mx-auto">
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
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

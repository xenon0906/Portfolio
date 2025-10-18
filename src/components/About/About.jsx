import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Server, Blocks, Globe, Shield } from 'lucide-react';

const topSkills = [
  {
    name: 'Machine Learning',
    icon: Brain,
    color: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Data Structures',
    icon: Blocks,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    name: 'Systems Programming',
    icon: Server,
    color: 'from-emerald-600 to-teal-600',
  },
  {
    name: 'Blockchain',
    icon: Code,
    color: 'from-orange-600 to-red-600',
  },
  {
    name: 'Web Development',
    icon: Globe,
    color: 'from-indigo-600 to-purple-600',
  },
];

const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-effect p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all"
    >
      <div className={`inline-block p-4 bg-gradient-to-br ${skill.color} rounded-xl mb-4 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
        {skill.name}
      </h3>
    </motion.div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-32 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
                Hello! I'm <span className="text-gradient">Siddhanth</span>
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              A second-year B.Tech student with a passion for technology and programming.
              I'm always eager to learn and contribute to the tech community.
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Let's connect and explore new opportunities! I thrive on solving complex problems,
              building innovative solutions, and collaborating with like-minded individuals to
              create meaningful impact through technology.
            </p>

            <motion.div
              className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
                Currently Learning
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Pursuing B.Tech in Information Technology at Sharda University with a Minor in AI at IIT Ropar,
                exploring advanced machine learning techniques and their real-world applications.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl font-extrabold text-gradient mb-2">6+</div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Experiences</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl font-extrabold text-gradient mb-2">2+</div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Years Coding</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl font-extrabold text-gradient mb-2">15+</div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Skills</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center border border-slate-200 dark:border-slate-700"
            >
              <div className="text-4xl font-extrabold text-gradient mb-2">100%</div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Dedicated</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Top Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
            Top <span className="text-gradient">Skills</span>
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Core competencies I've developed through learning and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

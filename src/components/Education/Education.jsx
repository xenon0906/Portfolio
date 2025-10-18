import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

const education = [
  {
    id: 1,
    degree: 'Bachelor of Technology - BTech',
    field: 'Information Technology',
    institution: 'Sharda University',
    period: 'Aug 2023 - Jun 2027',
    duration: 'Expected Jun 2027',
    current: true,
    skills: ['C (Programming Language)', 'Data Structures', 'Python (Programming Language)', 'Operating Systems', 'Computer Architecture'],
    achievements: ['IdeSurge 2024', 'TECHNOKRATS 4.0'],
  },
  {
    id: 2,
    degree: 'Minor',
    field: 'Artificial Intelligence',
    institution: 'Indian Institute of Technology, Ropar',
    period: 'Aug 2024 - May 2025',
    duration: 'Expected May 2025',
    current: true,
    skills: ['Artificial Intelligence (AI)', 'Machine Learning'],
    achievements: [],
  },
  {
    id: 3,
    degree: 'High School',
    field: 'PCM+PE',
    institution: 'Sarvottam International School - India',
    period: 'Mar 2018 - Apr 2023',
    duration: '5 years',
    current: false,
    skills: ['Leadership', 'Physics', 'Mathematics', 'Chemistry', 'Sports', 'Physical Education', 'Event Management', 'Quiz', 'Music', 'Social Sciences', 'English'],
    achievements: ['Quiz Certificate - Azadi ka Amrit Mahotsav Quiz organised by Ramakrishna Mission'],
  },
  {
    id: 4,
    degree: 'Middle School',
    field: 'General Education',
    institution: 'Mount Carmel School',
    period: 'Mar 2013 - Mar 2018',
    duration: '5 years',
    current: false,
    skills: ['Science', 'Sports', 'Social Sciences', 'Music', 'English'],
    achievements: [],
  },
  {
    id: 5,
    degree: 'Elementary School',
    field: 'Primary Education',
    institution: 'Basava International School',
    period: 'Mar 2008 - Mar 2013',
    duration: '5 years',
    current: false,
    skills: ['Hindi', 'Music', 'Elementary Education', 'Note Taking', 'English'],
    achievements: [],
  },
];

const EducationCard = React.memo(({ edu, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-8 w-4 h-4 rounded-full shadow-lg md:left-1/2 md:-translate-x-1/2 z-10 ${
        edu.current
          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 animate-pulse'
          : 'bg-gradient-to-br from-indigo-600 to-purple-600'
      }`} />

      {/* Timeline line */}
      {index !== education.length - 1 && (
        <div className="absolute left-2 top-12 w-0.5 h-full bg-gradient-to-b from-indigo-500/50 to-purple-500/20 md:left-1/2 md:-translate-x-1/2" />
      )}

      <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
        {/* Left side (odd) or Right side (even) */}
        <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
          <motion.div
            className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Current badge */}
            {edu.current && (
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold">
                  Current
                </span>
              </div>
            )}

            {/* Header */}
            <div className={`mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
              <div className="flex items-start gap-3 mb-2">
                <div className={`p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {edu.degree}
                  </h3>
                  <p className="text-lg font-semibold text-gradient">
                    {edu.field}
                  </p>
                </div>
              </div>

              <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {edu.institution}
              </p>
            </div>

            {/* Period */}
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{edu.period}</span>
              {edu.duration && <span className="text-slate-400">· {edu.duration}</span>}
            </div>

            {/* Achievements */}
            {edu.achievements && edu.achievements.length > 0 && (
              <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Achievements:</p>
                </div>
                <div className="space-y-1">
                  {edu.achievements.map((achievement, idx) => (
                    <p key={idx} className="text-sm text-slate-600 dark:text-slate-400">
                      • {achievement}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {edu.skills && edu.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Skills Learned:</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {edu.skills.slice(0, 8).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {edu.skills.length > 8 && (
                    <span className="px-2 py-1 text-slate-500 dark:text-slate-500 text-xs">
                      +{edu.skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

EducationCard.displayName = 'EducationCard';

export const Education = () => {
  return (
    <section id="education" className="py-32 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Academic journey and continuous learning path
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

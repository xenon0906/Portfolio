import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: 'Member',
    company: 'E-Cell Sharda',
    type: 'Part-time',
    period: 'Dec 2024 - Present',
    duration: '11 mos',
    location: null,
    skills: [],
    description: null,
  },
  {
    id: 2,
    role: 'Indigo Squad Member',
    company: 'Mood Indigo IIT Bombay',
    type: 'Part-time',
    period: 'Oct 2024 - Present',
    duration: '1 yr 1 mo',
    location: 'Mumbai, Maharashtra, India',
    locationType: 'Hybrid',
    badge: 'MI-SID-1100',
    skills: [],
    description: null,
  },
  {
    id: 3,
    role: 'Minor in AI',
    company: 'Indian Institute of Technology, Ropar',
    type: 'Trainee',
    period: 'Aug 2024 - Present',
    duration: '1 yr 3 mos',
    location: 'Ropar',
    locationType: 'Hybrid',
    skills: [],
    description: null,
  },
  {
    id: 4,
    role: 'Web Developer',
    company: 'Shivay Webtech',
    type: 'Internship',
    period: 'Jun 2024 - Jul 2024',
    duration: '2 mos',
    location: 'Noida, Uttar Pradesh, India',
    locationType: 'On-site',
    skills: ['Search Engine Optimization (SEO)', 'Web Development', 'JavaScript', 'Management', 'HTML/CSS Validation', 'E-Commerce', 'HTML', 'Git', 'Cascading Style Sheets (CSS)'],
    description: null,
  },
  {
    id: 5,
    role: 'Writer',
    company: 'Knowt',
    type: 'Part-time',
    period: 'Dec 2023 - May 2024',
    duration: '6 mos',
    location: 'United States',
    locationType: 'Remote',
    skills: ['Web Content Writing', 'Note Taking', 'Content Creation'],
    description: null,
  },
  {
    id: 6,
    role: 'Volunteer',
    company: "India's International Movement to Unite Nations",
    type: 'Internship',
    period: 'Jun 2023 - Feb 2024',
    duration: '9 mos',
    location: 'India',
    locationType: null,
    skills: ['Volunteer Engagement', 'Graphic Design', 'Management', 'Canva', 'Charity Work', 'Leadership', 'Volunteering', 'Communication', 'Event Management', 'Content Creation', 'Community Service'],
    description: null,
  },
];

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-8 w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full shadow-lg md:left-1/2 md:-translate-x-1/2 z-10" />

      {/* Timeline line */}
      {index !== experiences.length - 1 && (
        <div className="absolute left-2 top-12 w-0.5 h-full bg-gradient-to-b from-indigo-500/50 to-purple-500/20 md:left-1/2 md:-translate-x-1/2" />
      )}

      <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-8">
        {/* Left side (odd) or Right side (even) */}
        <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
          <motion.div
            className="glass-effect p-6 rounded-2xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {experience.role}
                </h3>
                <p className="text-lg font-semibold text-gradient mb-2">
                  {experience.company}
                </p>
                <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-3">
                  {experience.type}
                </div>
              </div>
            </div>

            {experience.badge && (
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-semibold">
                  {experience.badge}
                </span>
              </div>
            )}

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{experience.period} · {experience.duration}</span>
              </div>

              {experience.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {experience.location}
                    {experience.locationType && ` · ${experience.locationType}`}
                  </span>
                </div>
              )}
            </div>

            {experience.skills && experience.skills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-32 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Professional experiences that shaped my career and skills
          </p>
        </motion.div>

        <div className="relative space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

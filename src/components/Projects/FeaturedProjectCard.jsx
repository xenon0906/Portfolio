import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const FeaturedProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400">
        {/* Screenshot */}
        <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold">
                  <div class="text-center">
                    <div class="text-4xl mb-2">🖼️</div>
                    <div>Screenshot Coming Soon</div>
                    <div class="text-sm mt-2 text-slate-400">Add ${project.image}</div>
                  </div>
                </div>
              `;
            }}
          />
          {/* Multi-layer gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-700" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Title with gradient on hover */}
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Tech Stack with improved styling */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-200 rounded-xl text-sm font-bold border-2 border-indigo-200 dark:border-indigo-700/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500"
              whileHover={{ scale: 1.03, y: -3, backgroundPosition: 'right center' }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-lg">Visit Live Site</span>
            </motion.a>

            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all font-bold shadow-xl hover:shadow-2xl hover:shadow-slate-500/50 border-2 border-slate-700 dark:border-slate-500"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-6 h-6" />
                <span className="text-lg">Code</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Featured Badge with animation */}
        <div className="absolute top-6 right-6 z-10">
          <motion.div
            className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white rounded-full font-bold text-sm shadow-2xl flex items-center gap-2 border-2 border-white dark:border-slate-800"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              ⭐
            </motion.span>
            <span>Featured</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;

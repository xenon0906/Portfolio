import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl hover:shadow-indigo-500/40 transition-all duration-500 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400">
        {/* Screenshot with enhanced animations */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
          <motion.img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            initial={{ scale: 1, filter: 'brightness(1)' }}
            whileHover={{
              scale: 1.15,
              filter: 'brightness(1.1)',
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
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
          {/* Multi-layer gradient overlays with staggered animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0"
            whileHover={{
              background: 'linear-gradient(to bottom right, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))'
            }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
          {/* Animated shine effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0"
            initial={{ x: '-100%', rotate: 15 }}
            whileHover={{
              x: '100%',
              opacity: [0, 0.3, 0],
              transition: { duration: 1.2, ease: 'easeInOut' }
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
          />
        </div>

        {/* Content - Mobile Optimized */}
        <div className="p-5 sm:p-6 md:p-8 lg:p-10">
          {/* Title with gradient on hover */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 sm:mb-4 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>

          {/* Description - Responsive text size */}
          <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-7 md:mb-8 leading-relaxed text-base sm:text-lg">
            {project.description}
          </p>

          {/* Tech Stack with improved styling and mobile optimization */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 mb-6 sm:mb-7 md:mb-8">
            {project.tech.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border-2 border-indigo-200 dark:border-indigo-700/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Live Site Button - Full Width, Mobile Optimized */}
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] text-white rounded-xl sm:rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 w-full text-base sm:text-lg"
            whileHover={{ scale: 1.03, y: -3, backgroundPosition: 'right center' }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Visit Live Site</span>
          </motion.a>
        </div>

        {/* Featured Badge with animation - Mobile Optimized */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10">
          <motion.div
            className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white rounded-full font-bold text-xs sm:text-sm shadow-2xl flex items-center gap-1.5 sm:gap-2 border-2 border-white dark:border-slate-800"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.span
              className="text-base sm:text-lg"
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

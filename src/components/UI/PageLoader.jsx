import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-charcoal"
    >
      <div className="relative">
        {/* Animated gradient circle */}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner circle */}
        <motion.div
          className="absolute inset-2 rounded-full bg-white dark:bg-charcoal"
          animate={{
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-semibold text-gradient">Loading...</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PageLoader;

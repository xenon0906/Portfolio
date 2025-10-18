import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useAutoUpdateGitHub } from '../../hooks';
import GitHubStats from './GitHubStats';

export const Hero = () => {
  const { profile, stats, isLoading } = useAutoUpdateGitHub();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-mesh opacity-10 dark:opacity-5" />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-indigo-accent/20 rounded-full"
            initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar */}
        {!isLoading && profile && (
          <motion.div variants={itemVariants} className="mb-8">
            <motion.img
              src={profile.avatar_url}
              alt={profile.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-accent shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>
        )}

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 text-charcoal dark:text-off-white"
        >
          {!isLoading && profile ? profile.name : 'Loading...'}
        </motion.h1>

        {/* Typewriter effect for roles */}
        <motion.div variants={itemVariants} className="mb-6">
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'Open Source Contributor',
              2000,
              'Problem Solver',
              2000,
              'Tech Enthusiast',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            className="text-2xl md:text-3xl text-gradient font-semibold"
            repeat={Infinity}
          />
        </motion.div>

        {/* Bio */}
        {!isLoading && profile && (
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-charcoal/70 dark:text-off-white/70 max-w-2xl mx-auto mb-6"
          >
            {profile.bio || 'Building amazing things with code.'}
          </motion.p>
        )}

        {/* Location */}
        {!isLoading && profile?.location && (
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8 text-charcoal/60 dark:text-off-white/60">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </motion.div>
        )}

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center mb-12">
          <motion.a
            href={`https://github.com/xenon0906`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-charcoal/10 dark:bg-off-white/10 rounded-full hover:bg-indigo-accent hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a
            href={`https://linkedin.com/in/syd090605`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-charcoal/10 dark:bg-off-white/10 rounded-full hover:bg-indigo-accent hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="#contact"
            className="p-3 bg-charcoal/10 dark:bg-off-white/10 rounded-full hover:bg-indigo-accent hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* GitHub Stats Cards */}
        <GitHubStats stats={stats} isLoading={isLoading} />

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-12">
          <motion.a
            href="#projects"
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-accent to-emerald text-white font-semibold rounded-full shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

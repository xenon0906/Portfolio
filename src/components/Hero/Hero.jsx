import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, MapPin, Link2 } from 'lucide-react';
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
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden py-32 px-4">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-mesh opacity-30 dark:opacity-15" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border-2 border-indigo-accent/30 rounded-full backdrop-blur-sm"
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

        {/* Name - Clickable to Linktree */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-extrabold mb-6"
        >
          <a
            href="https://linktr.ee/siddhanthkunwar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-100 dark:via-purple-200 dark:to-slate-100 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-600 dark:hover:from-indigo-400 dark:hover:via-purple-400 dark:hover:to-indigo-400 transition-all duration-300 cursor-pointer"
          >
            Siddhanth Kunwar
          </a>
        </motion.h1>

        {/* Typewriter effect for roles */}
        <motion.div variants={itemVariants} className="mb-8">
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
            className="text-3xl md:text-4xl text-gradient font-bold"
            repeat={Infinity}
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Building amazing things with code. Passionate about technology and innovation.
        </motion.p>

        {/* Location */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-12 text-slate-500 dark:text-slate-400 text-lg">
          <MapPin className="w-5 h-5" />
          <span>Greater Noida, India</span>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex gap-6 justify-center mb-16">
          <motion.a
            href={`https://github.com/xenon0906`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-7 h-7" />
          </motion.a>
          <motion.a
            href={`https://linkedin.com/in/syd090605`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="w-7 h-7" />
          </motion.a>
          <motion.a
            href="https://linktr.ee/siddhanthkunwar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link2 className="w-7 h-7" />
          </motion.a>
          <motion.a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/contact';
            }}
            className="p-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white transition-all shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-7 h-7" />
          </motion.a>
        </motion.div>


        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-16">
          <motion.a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/projects';
            }}
            className="group relative inline-block px-12 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/50 bg-[length:200%_auto] transition-all overflow-hidden shine-effect cursor-pointer"
            whileHover={{ scale: 1.05, backgroundPosition: 'right center' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Preloader from '@/components/ui/Preloader';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  ArrowRight, Code2, ExternalLink, Github, Linkedin, Mail,
  GraduationCap, MapPin, Calendar, TreePine, Briefcase,
  Globe, FlaskConical, TrendingUp, Cloud, Palette, Shield
} from 'lucide-react';

// Dynamic imports
const ActiveBackground = dynamic(
  () => import('@/components/ui/ActiveBackground'),
  { ssr: false, loading: () => <div className="fixed inset-0 bg-[var(--bg-color)]" /> }
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('portfolio_visited');
    if (!hasVisited) {
      setShowPreloader(true);
      sessionStorage.setItem('portfolio_visited', 'true');
    } else {
      // Skip preloader on subsequent visits
      setLoading(false);
    }
  }, []);

  const handleFinishLoading = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && showPreloader && <Preloader finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          className="min-h-screen selection:bg-[var(--accent-primary)]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveBackground />
          <Navbar />
          <ThemeToggle />

          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ServicesSection />
          <SkillsSection />
          <ContactSection />
        </motion.main>
      )}
    </>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black my-6 tracking-tight">
          SIDDHANTH <br />
          <span className="gradient-text">KUNWAR</span>
        </h1>

        <p className="max-w-xl mx-auto text-lg md:text-xl opacity-70 mb-10">
          Building amazing things with code.
          <br />
          Passionate about technology and innovation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="#github"
            className="px-8 py-4 bg-[var(--accent-primary)] text-white font-bold rounded-full
                     hover:scale-105 transition-transform inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work <ArrowRight size={20} />
          </motion.a>

          <div className="flex gap-3">
            <SocialBtn href="https://github.com/xenon0906" icon={<Github />} />
            <SocialBtn href="https://linkedin.com/in/syd090605" icon={<Linkedin />} />
            <SocialBtn href="https://linktr.ee/siddhanthkunwar" icon={<TreePine />} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============ ABOUT SECTION ============
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-16">
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} className="glass-card p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10">
                <MapPin className="w-6 h-6 text-[var(--accent-primary)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Greater Noida, India</h3>
                <p className="opacity-70 text-sm">Open to remote opportunities worldwide</p>
              </div>
            </div>
            <p className="opacity-70 leading-relaxed">
              I'm always eager to learn and contribute to the tech community, focusing on solving
              complex problems and building innovative solutions. Currently exploring advanced
              machine learning techniques and their real-world applications.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10">
                <GraduationCap className="w-6 h-6 text-[var(--accent-secondary)]" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Education</h3>
                <p className="opacity-70 text-sm">Information Technology Student</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-[var(--accent-primary)] pl-4">
                <h4 className="font-bold">B.Tech Information Technology</h4>
                <p className="opacity-70 text-sm flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> Aug 2023 - Jun 2027
                </p>
                <p className="opacity-70 text-sm">Sharda University</p>
              </div>
              <div className="border-l-2 border-[var(--accent-secondary)] pl-4">
                <h4 className="font-bold">Minor in Artificial Intelligence</h4>
                <p className="opacity-70 text-sm flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> Aug 2024 - May 2025
                </p>
                <p className="opacity-70 text-sm">IIT Ropar</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mt-8">
          {[
            { value: "6+", label: "Experiences" },
            { value: "2+", label: "Years Coding" },
            { value: "15+", label: "Skills" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm opacity-70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============ EXPERIENCE SECTION ============
function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: "Member",
      company: "E-Cell Sharda",
      period: "Dec 2024 - Present",
      type: "Part-time"
    },
    {
      role: "Indigo Squad Member",
      company: "Mood Indigo IIT Bombay",
      period: "Oct 2024 - Present",
      type: "Part-time",
      location: "Mumbai (Hybrid)"
    },
    {
      role: "Minor in AI",
      company: "IIT Ropar",
      period: "Aug 2024 - Present",
      type: "Trainee",
      location: "Ropar (Hybrid)"
    },
    {
      role: "Web Developer",
      company: "Shivay Webtech",
      period: "Jun 2024 - Jul 2024",
      type: "Internship",
      location: "Noida (On-site)"
    },
    {
      role: "Writer",
      company: "Knowt",
      period: "Dec 2023 - May 2024",
      type: "Part-time",
      location: "Remote"
    },
    {
      role: "Volunteer",
      company: "India's International Movement to Unite Nations",
      period: "Jun 2023 - Feb 2024",
      type: "Internship",
      location: "India"
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-16">
          My <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10">
                  <Briefcase className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <p className="text-[var(--accent-primary)] text-sm">{exp.company}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs opacity-70">
                    <span>{exp.period}</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span>{exp.type}</span>
                    {exp.location && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============ SERVICES SECTION ============
function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Web Development",
      desc: "Building responsive, modern web applications using React, JavaScript, and cutting-edge technologies."
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Software Testing",
      desc: "Comprehensive testing strategies to ensure your software is robust, reliable, and bug-free."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Business Analytics",
      desc: "Data-driven insights and analytics to help make informed business decisions."
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Management",
      desc: "Efficient cloud infrastructure setup, management, and optimization for scalability."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Web Design",
      desc: "Creating beautiful, user-friendly interfaces that provide exceptional user experiences."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity",
      desc: "Implementing security best practices to protect applications and data from threats."
    },
  ];

  return (
    <section id="services" className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-16">
          What I <span className="gradient-text">Do</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="glass-card p-8 hover:border-[var(--accent-primary)] transition-colors cursor-default"
            >
              <div className="text-[var(--accent-primary)] mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="opacity-70 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============ SKILLS SECTION ============
function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      name: "Languages",
      skills: ["C", "Rust", "Python", "JavaScript", "TypeScript", "Solidity"]
    },
    {
      name: "Cloud & Platform",
      skills: ["AWS", "Firebase", "Google Cloud", "Vercel", "Twilio"]
    },
    {
      name: "Frameworks",
      skills: ["React", "Next.js", "Angular", "Web3.js", "PyTorch", "TensorFlow"]
    },
    {
      name: "Databases & Tools",
      skills: ["MongoDB", "NumPy", "Pandas", "scikit-learn"]
    },
    {
      name: "Dev Tools",
      skills: ["Docker", "GitHub", "GitLab", "Postman", "Power BI"]
    },
    {
      name: "Design",
      skills: ["Figma", "Framer"]
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto relative z-10" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-16">
          My <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="glass-card p-6"
            >
              <h3 className="font-bold text-lg mb-4 text-[var(--accent-primary)]">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-sm rounded-full bg-[var(--bg-color)] border border-[var(--grid-color)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ============ CONTACT SECTION ============
function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contacts = [
    { icon: <Mail />, label: "Email", value: "siddhanthkunwar@gmail.com", href: "mailto:siddhanthkunwar@gmail.com" },
    { icon: <Github />, label: "GitHub", value: "@xenon0906", href: "https://github.com/xenon0906" },
    { icon: <Linkedin />, label: "LinkedIn", value: "Siddhanth Kunwar", href: "https://linkedin.com/in/syd090605" },
    { icon: <TreePine />, label: "Linktree", value: "All Links", href: "https://linktr.ee/siddhanthkunwar" },
  ];

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto relative z-10" ref={ref}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-6">
          Let's <span className="gradient-text">Connect</span>
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-center opacity-70 mb-12 max-w-md mx-auto">
          Have a project in mind? Let's build something extraordinary together.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((contact, i) => (
            <motion.a
              key={i}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 flex items-center gap-4 group"
            >
              <div className="p-3 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]
                            group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-colors">
                {contact.icon}
              </div>
              <div>
                <div className="text-xs opacity-50 uppercase tracking-wider">{contact.label}</div>
                <div className="font-medium">{contact.value}</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div variants={fadeInUp} className="mt-20 text-center">
          <p className="opacity-50 text-sm">Designed & Built by Siddhanth Kunwar</p>
          <p className="opacity-30 text-xs mt-2">2024 All rights reserved</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============ SOCIAL BUTTON ============
const SocialBtn = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 rounded-full glass hover:scale-110 transition-transform"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

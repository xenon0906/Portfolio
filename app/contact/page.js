"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Github, Linkedin, Mail, TreePine, ExternalLink, CheckCircle, RefreshCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import googleSheetsService from '@/services/GoogleSheetsService';
import Navbar from '@/components/ui/Navbar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Dynamic import for ActiveBackground
const ActiveBackground = dynamic(
  () => import('@/components/ui/ActiveBackground'),
  { ssr: false }
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      await googleSheetsService.submitForm(formData);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/xenon0906", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/syd090605", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:siddhanthkunwar@gmail.com", label: "Email" },
    { icon: <TreePine className="w-5 h-5" />, href: "https://linktr.ee/siddhanthkunwar", label: "Linktree" },
  ];

  const getInputClassName = (fieldName) => {
    const baseClasses = `w-full bg-[var(--bg-color)] border rounded-xl p-4 mt-2
                         outline-none transition-colors placeholder:opacity-50`;

    if (errors[fieldName]) {
      return `${baseClasses} border-red-500 focus:border-red-500`;
    }
    return `${baseClasses} border-[var(--grid-color)] focus:border-[var(--accent-primary)]`;
  };

  return (
    <div className="min-h-screen relative">
      <ActiveBackground />
      <Navbar />
      <ThemeToggle />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        {/* Left: Info */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            Let's <br />
            <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl opacity-70 mb-10 leading-relaxed">
            Have a project in mind? Let's build something extraordinary together.
          </p>

          <div className="flex flex-wrap gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass hover:scale-105 hover:-translate-y-1 transition-all duration-150 flex items-center gap-3 group"
              >
                <span className="text-[var(--accent-primary)]">{social.icon}</span>
                <span className="text-sm font-medium">{social.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form or Success State */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
          className="glass-card p-8"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }}
                  className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold mb-2"
                >
                  Message Sent!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg opacity-70 mb-8"
                >
                  I'll get back to you soon.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleReset}
                  className="px-6 py-3 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-medium rounded-xl
                           hover:bg-[var(--accent-primary)]/20 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              // Form State
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className={getInputClassName('name')}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className={getInputClassName('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project..."
                    disabled={isSubmitting}
                    className={`${getInputClassName('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--accent-primary)] text-white font-bold rounded-xl
                           hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 flex justify-center items-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail, TreePine, ExternalLink } from 'lucide-react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (googleSheetsService.isConfigured()) {
        await googleSheetsService.submitForm(formData);
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback to email
        googleSheetsService.fallbackSubmit(formData);
        toast.success('Opening email client...');
      }
    } catch (error) {
      // Fallback on error
      googleSheetsService.fallbackSubmit(formData);
      toast.success('Opening email client...');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socials = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/xenon0906", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com/in/syd090605", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:siddhanthkunwar@gmail.com", label: "Email" },
    { icon: <TreePine className="w-5 h-5" />, href: "https://linktr.ee/siddhanthkunwar", label: "Linktree" },
  ];

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
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
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
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass hover:scale-110 transition-transform flex items-center gap-3 group"
                whileHover={{ y: -5 }}
              >
                <span className="text-[var(--accent-primary)]">{social.icon}</span>
                <span className="text-sm font-medium">{social.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-[var(--bg-color)] border border-[var(--grid-color)] rounded-xl p-4 mt-2
                         outline-none focus:border-[var(--accent-primary)] transition-colors
                         placeholder:opacity-50"
              />
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
                required
                placeholder="your@email.com"
                className="w-full bg-[var(--bg-color)] border border-[var(--grid-color)] rounded-xl p-4 mt-2
                         outline-none focus:border-[var(--accent-primary)] transition-colors
                         placeholder:opacity-50"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-[var(--bg-color)] border border-[var(--grid-color)] rounded-xl p-4 mt-2
                         outline-none focus:border-[var(--accent-primary)] transition-colors resize-none
                         placeholder:opacity-50"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[var(--accent-primary)] text-white font-bold rounded-xl
                       hover:opacity-90 transition-opacity flex justify-center items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import googleSheetsService from '../../services/GoogleSheetsService';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await googleSheetsService.submitForm(formData);

      if (result.success) {
        toast.success(
          result.fallback
            ? 'Opening your email client...'
            : 'Message sent successfully! I\'ll get back to you soon.',
          {
            duration: 4000,
            position: 'bottom-center',
            icon: '✉️',
          }
        );
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again.', {
        duration: 4000,
        position: 'bottom-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 relative overflow-hidden">
      <Toaster />

      {/* Section divider top */}
      <div className="section-divider mb-16" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Have a project in mind? Let's work together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold mb-2 text-slate-800 dark:text-slate-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2 text-slate-800 dark:text-slate-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-2 text-slate-800 dark:text-slate-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-indigo-500/50 bg-[length:200%_auto] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.02, backgroundPosition: 'right center' }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-3xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
                Let's Connect
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://github.com/xenon0906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-500"
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900 dark:text-slate-100">GitHub</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">@xenon0906</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/syd090605"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-500"
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900 dark:text-slate-100">LinkedIn</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">syd090605</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700"
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900 dark:text-slate-100">Email</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Contact via form</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

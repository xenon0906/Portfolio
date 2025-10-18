import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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

    // Simulate form submission (replace with actual Google Forms or backend integration)
    setTimeout(() => {
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 4000,
        position: 'bottom-center',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <Toaster />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/5 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal dark:text-off-white">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-charcoal/70 dark:text-off-white/70">
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
                  className="block text-sm font-medium mb-2 text-charcoal dark:text-off-white"
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
                  className="w-full px-4 py-3 bg-charcoal/5 dark:bg-off-white/5 border border-charcoal/10 dark:border-off-white/10 rounded-lg focus:ring-2 focus:ring-indigo-accent focus:border-transparent outline-none transition-all text-charcoal dark:text-off-white"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-charcoal dark:text-off-white"
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
                  className="w-full px-4 py-3 bg-charcoal/5 dark:bg-off-white/5 border border-charcoal/10 dark:border-off-white/10 rounded-lg focus:ring-2 focus:ring-indigo-accent focus:border-transparent outline-none transition-all text-charcoal dark:text-off-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-charcoal dark:text-off-white"
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
                  className="w-full px-4 py-3 bg-charcoal/5 dark:bg-off-white/5 border border-charcoal/10 dark:border-off-white/10 rounded-lg focus:ring-2 focus:ring-indigo-accent focus:border-transparent outline-none transition-all resize-none text-charcoal dark:text-off-white"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-accent to-emerald text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
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
              <h3 className="text-2xl font-bold mb-6 text-charcoal dark:text-off-white">
                Let's Connect
              </h3>
              <p className="text-charcoal/70 dark:text-off-white/70 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://github.com/xenon0906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:border-indigo-accent/50 transition-all group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-gradient-to-r from-indigo-accent to-emerald rounded-lg">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal dark:text-off-white">GitHub</p>
                  <p className="text-sm text-charcoal/60 dark:text-off-white/60">@xenon0906</p>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/syd090605"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:border-indigo-accent/50 transition-all group"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-gradient-to-r from-indigo-accent to-emerald rounded-lg">
                  <Linkedin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal dark:text-off-white">LinkedIn</p>
                  <p className="text-sm text-charcoal/60 dark:text-off-white/60">syd090605</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-4 p-4 glass-effect rounded-lg"
                whileHover={{ x: 5 }}
              >
                <div className="p-3 bg-gradient-to-r from-indigo-accent to-emerald rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal dark:text-off-white">Email</p>
                  <p className="text-sm text-charcoal/60 dark:text-off-white/60">Contact via form</p>
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

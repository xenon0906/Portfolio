import React from 'react';
import { motion } from 'framer-motion';
import { Code, FlaskConical, TrendingUp, Cloud, Palette, Shield } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    icon: Code,
    description: 'Building responsive, modern web applications using React, JavaScript, and cutting-edge technologies.',
    color: 'from-blue-600 to-cyan-600',
    features: ['Responsive Design', 'Modern Frameworks', 'SEO Optimization', 'Performance Tuning'],
  },
  {
    id: 2,
    title: 'Software Testing',
    icon: FlaskConical,
    description: 'Comprehensive testing strategies to ensure your software is robust, reliable, and bug-free.',
    color: 'from-emerald-600 to-teal-600',
    features: ['Unit Testing', 'Integration Testing', 'Automated Testing', 'Quality Assurance'],
  },
  {
    id: 3,
    title: 'Business Analytics',
    icon: TrendingUp,
    description: 'Data-driven insights and analytics to help make informed business decisions.',
    color: 'from-purple-600 to-pink-600',
    features: ['Data Analysis', 'Reporting', 'Visualization', 'Strategic Insights'],
  },
  {
    id: 4,
    title: 'Cloud Management',
    icon: Cloud,
    description: 'Efficient cloud infrastructure setup, management, and optimization for scalability.',
    color: 'from-indigo-600 to-purple-600',
    features: ['Cloud Setup', 'Infrastructure', 'Scalability', 'Cost Optimization'],
  },
  {
    id: 5,
    title: 'Web Design',
    icon: Palette,
    description: 'Creating beautiful, user-friendly interfaces that provide exceptional user experiences.',
    color: 'from-orange-600 to-red-600',
    features: ['UI/UX Design', 'Prototyping', 'Brand Identity', 'User Research'],
  },
  {
    id: 6,
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Implementing security best practices to protect applications and data from threats.',
    color: 'from-red-600 to-rose-600',
    features: ['Security Audits', 'Threat Analysis', 'Best Practices', 'Secure Coding'],
  },
];

const ServiceCard = React.memo(({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass-effect p-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all group"
    >
      {/* Icon */}
      <motion.div
        className={`inline-block p-5 bg-gradient-to-br ${service.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-2xl transition-shadow`}
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <Icon className="w-10 h-10 text-white" />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      <div className="space-y-2">
        {service.features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + idx * 0.05 }}
            className="flex items-center gap-2"
          >
            <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`} />
            <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Hover effect border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity pointer-events-none`} />
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export const Services = () => {
  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden">
      {/* Section divider top */}
      <div className="section-divider mb-32" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-slate-100">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Comprehensive solutions to bring your ideas to life with quality and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-effect p-10 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-3xl mx-auto">
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
              Ready to work together?
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Let's discuss how I can help bring your project to life
            </p>
            <motion.a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/contact';
              }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-indigo-500/50 bg-[length:200%_auto] transition-all"
              whileHover={{ scale: 1.05, backgroundPosition: 'right center' }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

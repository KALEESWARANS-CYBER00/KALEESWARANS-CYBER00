'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Mail, Phone, Linkedin, Github, Terminal as TerminalIcon, Send, Globe } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'kaleeswaran.bcy24@rathinam.in', href: 'mailto:kaleeswaran.bcy24@rathinam.in' },
  { icon: Phone, label: 'Phone', value: '+91 6374892220', href: 'tel:+916374892220' },
  { icon: Linkedin, label: 'LinkedIn', value: 'kaleeswarans25', href: 'https://www.linkedin.com/in/kaleeswarans25/' },
  { icon: Github, label: 'GitHub', value: 'KALEESWARANS-CYBER00', href: 'https://github.com/KALEESWARANS-CYBER00' },
  { icon: Globe, label: 'TryHackMe', value: 'kalees', href: 'https://tryhackme.com/p/kalees' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Interested in security collaboration or looking to hire a SOC analyst? Let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card-bg/60 p-8 rounded-2xl border border-white/5 space-y-8">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 bg-cyber-green/10 rounded-xl flex items-center justify-center group-hover:bg-cyber-green/20 transition-colors">
                    <info.icon className="text-cyber-green w-6 h-6 border-cyan-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">{info.label}</p>
                    <p className="text-lg font-medium text-white group-hover:text-cyber-green transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <form className="bg-card-bg/60 p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-gray-400">NAME</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-bg/50 border border-white/10 rounded-lg p-3 outline-none focus:border-cyber-green transition-colors text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-mono text-gray-400">EMAIL</label>
                  <input 
                    type="email" 
                    className="w-full bg-dark-bg/50 border border-white/10 rounded-lg p-3 outline-none focus:border-cyber-green transition-colors text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400">MESSAGE</label>
                <textarea 
                  rows={4}
                  className="w-full bg-dark-bg/50 border border-white/10 rounded-lg p-3 outline-none focus:border-cyber-green transition-colors text-white resize-none"
                  placeholder="Type your message here..."
                />
              </div>
              <button className="w-full py-4 bg-cyber-green text-dark-bg font-bold rounded-lg hover:bg-cyber-green/90 transition-all flex items-center justify-center gap-2 group">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Establish Connection
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
          <TerminalIcon className="w-full h-full text-cyber-green" />
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Mail, Phone, Linkedin, Github, Send, Globe } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'kaleeswaran.bcy24@rathinam.in', href: 'mailto:kaleeswaran.bcy24@rathinam.in' },
  { icon: Phone, label: 'Phone', value: '+91 6374892220', href: 'tel:+916374892220' },
  { icon: Linkedin, label: 'LinkedIn', value: 'kaleeswarans25', href: 'https://www.linkedin.com/in/kaleeswarans25/' },
  { icon: Github, label: 'GitHub', value: 'KALEESWARANS-CYBER00', href: 'https://github.com/KALEESWARANS-CYBER00' },
  { icon: Globe, label: 'TryHackMe', value: 'kalees', href: 'https://tryhackme.com/p/kalees' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 lg:px-12 relative bg-[#0b0c0e] border-t border-[#c59b6d]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          badge="Direct Inquiries"
          title="Initiate Dialogue" 
          subtitle="Open for cybersecurity engineering roles, threat research collaborations, or technical consultation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-[#141211]/80 p-8 rounded-2xl border border-[#c59b6d]/20 space-y-6 shadow-lg">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 group p-2 rounded-xl hover:bg-[#1a1614] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#c59b6d]/10 rounded-xl flex items-center justify-center border border-[#c59b6d]/20 group-hover:bg-[#c59b6d]/20 group-hover:border-[#c59b6d]/40 transition-colors shrink-0">
                    <info.icon className="text-[#c59b6d] w-5 h-5 group-hover:text-[#dfb88e] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#a8a29e] uppercase tracking-widest font-mono mb-1">{info.label}</p>
                    <p className="text-base font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="bg-[#141211]/80 p-8 rounded-2xl border border-[#c59b6d]/20 space-y-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#a8a29e] uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#0b0c0e] border border-white/10 rounded-xl p-3.5 outline-none focus:border-[#c59b6d] transition-colors text-[#f7f4ee] font-light placeholder-[#a8a29e]/40"
                    placeholder="E.g. Alexander Vance"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#a8a29e] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-[#0b0c0e] border border-white/10 rounded-xl p-3.5 outline-none focus:border-[#c59b6d] transition-colors text-[#f7f4ee] font-light placeholder-[#a8a29e]/40"
                    placeholder="alex@organization.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#a8a29e] uppercase tracking-wider">Message Details</label>
                <textarea 
                  rows={4}
                  className="w-full bg-[#0b0c0e] border border-white/10 rounded-xl p-3.5 outline-none focus:border-[#c59b6d] transition-colors text-[#f7f4ee] font-light placeholder-[#a8a29e]/40 resize-none"
                  placeholder="Outline your project scope, inquiry, or engineering role..."
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[#c59b6d] text-[#0b0c0e] font-semibold rounded-xl hover:bg-[#dfb88e] transition-all flex items-center justify-center gap-2 group shadow-[0_4px_24px_rgba(197,155,109,0.25)]"
              >
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>Send Communication</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

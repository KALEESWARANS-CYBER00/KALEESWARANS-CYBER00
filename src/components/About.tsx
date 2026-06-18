'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Shield, Target, Cpu, Code } from 'lucide-react';

const stats = [
  { icon: Shield, label: 'Secured Systems', value: '15+' },
  { icon: Target, label: 'THM Streak', value: '114+' },
  { icon: Cpu, label: 'Solved Problems', value: '280+' },
  { icon: Code, label: 'Security Tools', value: '22' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative about-bg">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="A dedicated cybersecurity professional with a passion for understanding the intricacies of digital defense and offense."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Cybersecurity student specializing in network security, vulnerability assessment, threat detection, and incident response. Experienced in security labs, CTF challenges, and building practical security tools such as EDR systems and web security simulators.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Passionate about SOC operations, ethical hacking, and real-world attack simulation using industry tools like <span className="text-cyber-green">Nmap</span>, <span className="text-cyber-green">Wireshark</span>, <span className="text-cyber-green">Burp Suite</span>, <span className="text-cyber-green">Metasploit</span>, and Linux environments.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card-bg/50 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-cyber-green/30 transition-colors"
                >
                  <stat.icon className="w-8 h-8 text-cyber-green mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-2xl font-bold text-white mb-1 group-hover:text-cyber-green transition-colors">{stat.value}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cinematic Avatar Display (Matching Hero) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="hidden lg:block relative mt-12 lg:mt-0 w-full max-w-[480px] mx-auto"
          >
            {/* Avatar Glass Card */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_0_80px_rgba(6,182,212,0.15)] border border-white/10 group bg-slate-900/40 backdrop-blur-lg">

              <img
                src="/avatar.png"
                alt="Kaleeswaran S - Cybersecurity Analyst"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
              />

              {/* Tech overlays over the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl"></div>
            </div>

            {/* External decorative accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-cyan/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-green/10 rounded-full blur-[80px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

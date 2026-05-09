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
    <section id="about" className="py-24 px-6 relative">
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-dark-bg p-2 rounded-2xl border border-white/10 overflow-hidden aspect-square flex items-center justify-center">
                   <div className="w-full h-full bg-cyber-green/5 flex items-center justify-center rounded-xl overflow-hidden">
                      <img 
                        src="https://assets.leetcode.com/static_assets/others/lg2550.png" 
                        alt="KALEESWARAN S" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

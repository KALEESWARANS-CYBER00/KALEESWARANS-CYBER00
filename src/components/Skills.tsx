'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Network, PenTool, ShieldAlert, Code2, Terminal as TerminalIcon } from 'lucide-react';

const skillCategories = [
  {
    title: 'Network Security',
    icon: Network,
    skills: ['Nmap', 'Wireshark', 'TCP/IP', 'DNS', 'Subnetting'],
  },
  {
    title: 'Security Tools',
    icon: PenTool,
    skills: ['Burp Suite', 'Metasploit', 'Linux Security Tools', 'ZAP Proxy'],
  },
  {
    title: 'Security Domains',
    icon: ShieldAlert,
    skills: ['Threat Detection', 'Incident Response', 'Vuln Assessment', 'OWASP Top 10'],
  },
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'Bash', 'React', 'Spring Boot', 'SQL'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gradient-to-b from-transparent to-card-bg/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Technical Skills" 
          subtitle="Specialized in core cybersecurity domains and industry-standard security toolsets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card-bg/40 p-8 rounded-2xl border border-white/5 hover:border-cyber-green/30 transition-all group"
            >
              <div className="w-12 h-12 bg-cyber-green/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyber-green/20 transition-colors">
                <category.icon className="text-cyber-green w-6 h-6 border-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-6 text-white">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-400 font-mono text-sm">
                    <span className="w-1.5 h-1.5 bg-cyber-green rounded-full shadow-[0_0_5px_#10b981]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

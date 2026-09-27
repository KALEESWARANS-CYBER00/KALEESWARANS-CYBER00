'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Network, PenTool, ShieldAlert, Code2 } from 'lucide-react';

const skillCategories = [
  {
    title: 'Network Security',
    icon: Network,
    skills: ['Nmap', 'Wireshark', 'TCP/IP', 'DNS Architecture', 'Subnetting & Routing'],
  },
  {
    title: 'Security Toolsets',
    icon: PenTool,
    skills: ['Burp Suite Professional', 'Metasploit Framework', 'Linux Security Tooling', 'OWASP ZAP'],
  },
  {
    title: 'Security Domains',
    icon: ShieldAlert,
    skills: ['Threat Detection', 'Incident Response', 'Vulnerability Assessment', 'OWASP Top 10 Auditing'],
  },
  {
    title: 'Engineering & Code',
    icon: Code2,
    skills: ['Python Automation', 'Bash Scripting', 'React / Next.js', 'Spring Boot', 'SQL & Database Defense'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 lg:px-12 bg-[#0b0c0e] relative border-t border-[#c59b6d]/10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          badge="Technical Capability"
          title="Core Skills & Toolsets" 
          subtitle="Specialized competencies spanning network defense, offensive research, and security engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-14">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#141211]/80 p-8 rounded-2xl border border-[#c59b6d]/20 hover:border-[#c59b6d]/50 hover:bg-[#1a1614] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#c59b6d]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#c59b6d]/20 transition-colors">
                <category.icon className="text-[#c59b6d] w-6 h-6 group-hover:text-[#dfb88e] transition-colors" />
              </div>
              <h3 className="text-xl font-light text-[#f7f4ee] mb-6 tracking-tight">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-[#d5cec5] font-mono text-xs">
                    <span className="w-1.5 h-1.5 bg-[#c59b6d] rounded-full group-hover:bg-[#dfb88e] transition-colors" />
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

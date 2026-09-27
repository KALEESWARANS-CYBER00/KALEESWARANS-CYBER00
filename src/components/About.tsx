'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Shield, Target, Cpu, Code, ArrowUpRight, Terminal, Award, Lock, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Shield, label: 'Secured Systems', value: '15+', desc: 'Hardened network endpoints & cloud servers' },
  { icon: Target, label: 'THM Streak', value: '114+ Days', desc: 'Top 6% global TryHackMe rank' },
  { icon: Cpu, label: 'Solved Problems', value: '280+', desc: 'DSA, algorithmic & security challenges' },
  { icon: Code, label: 'Security Tools', value: '22', desc: 'Custom built Python & Bash utilities' },
];

const pillars = [
  {
    icon: Lock,
    title: 'Defensive Security & SOC',
    description: 'Expertise in log correlation, threat detection, incident triage, and implementing zero-trust security postures across Linux and cloud environments.',
  },
  {
    icon: Terminal,
    title: 'Threat Research & Exploitation',
    description: 'Rigorous penetration testing, OWASP Top 10 auditing, network packet dissection with Wireshark, and identifying attack vectors before adversaries do.',
  },
  {
    icon: ShieldCheck,
    title: 'Custom Tool Development',
    description: 'Engineering resilient, scalable security software—including offline EDR monitors, phishing simulators, and automated SQL injection scanners.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 relative bg-[#0b0c0e] border-t border-[#c59b6d]/15 overflow-hidden">
      {/* Subtle ambient warm glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#1a1614]/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge="Executive Profile"
          title="About Kaleeswaran"
          subtitle="A dedicated cybersecurity analyst, offensive researcher, and creative engineer architecting resilient systems to safeguard digital infrastructure."
        />

        {/* Narrative Section - Expansive Full-Width Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-[#f7f4ee] text-xl lg:text-2xl font-light leading-relaxed">
              Operating at the convergence of <span className="text-[#dfb88e] font-normal">threat analysis</span>, <span className="text-[#dfb88e] font-normal">infrastructure hardening</span>, and <span className="text-[#dfb88e] font-normal">strategic engineering</span>.
            </p>

            <p className="text-[#d5cec5] text-base lg:text-lg font-light leading-relaxed">
              Cybersecurity specialist with deep hands-on proficiency in network defense, automated vulnerability discovery, SOC operations, and active incident response. Proven track record across competitive CTF arenas, real-world attack simulation labs, and creating production-grade defensive tooling such as offline EDR platforms and adversary simulation suites.
            </p>

            <p className="text-[#a8a29e] text-base lg:text-lg font-light leading-relaxed">
              Committed to engineering tamper-resistant digital environments using industry standards including <span className="text-[#dfb88e]">Wireshark</span>, <span className="text-[#dfb88e]">Burp Suite</span>, <span className="text-[#dfb88e]">Nmap</span>, <span className="text-[#dfb88e]">Metasploit</span>, Linux kernel-level inspection, and automation in Python and Bash.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 bg-[#141211]/80 p-8 rounded-2xl border border-[#c59b6d]/25 backdrop-blur-md"
          >
            <div className="text-xs uppercase tracking-widest text-[#dfb88e] font-mono mb-3">Core Identity</div>
            <div className="text-2xl font-light text-[#f7f4ee] tracking-tight mb-4">
              Kaleeswaran S
            </div>
            <div className="space-y-3 text-sm text-[#d5cec5] font-light">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#a8a29e]">Specialization</span>
                <span className="text-[#dfb88e] font-mono">SOC & Threat Research</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#a8a29e]">Focus</span>
                <span className="text-[#f7f4ee] font-mono">Defensive Engineering</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#a8a29e]">Status</span>
                <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Analyst
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <a
                href="#projects"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c59b6d]/15 border border-[#c59b6d]/40 text-[#dfb88e] text-xs uppercase tracking-widest font-mono hover:bg-[#c59b6d] hover:text-[#0b0c0e] transition-all duration-300"
              >
                <span>Explore Technical Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Four Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#141211]/70 p-6 rounded-2xl border border-[#c59b6d]/20 flex flex-col group hover:border-[#c59b6d]/50 hover:bg-[#191513] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#c59b6d]/10 flex items-center justify-center mb-4 group-hover:bg-[#c59b6d]/20 transition-colors">
                <stat.icon className="w-5 h-5 text-[#c59b6d]" />
              </div>
              <span className="text-3xl font-light text-[#f7f4ee] mb-1 group-hover:text-[#dfb88e] transition-colors">{stat.value}</span>
              <span className="text-xs text-[#dfb88e] uppercase tracking-wider font-mono mb-2">{stat.label}</span>
              <p className="text-xs text-[#a8a29e] font-light leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Three Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="p-7 rounded-2xl border border-white/5 bg-[#12100f]/60 backdrop-blur-sm hover:border-[#c59b6d]/30 transition-all duration-300"
            >
              <pillar.icon className="w-6 h-6 text-[#c59b6d] mb-4" />
              <h3 className="text-lg font-medium text-[#f7f4ee] mb-2">{pillar.title}</h3>
              <p className="text-sm text-[#a8a29e] font-light leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

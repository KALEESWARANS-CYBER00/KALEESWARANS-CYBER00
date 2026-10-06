'use client';

import { useState } from 'react';
import { Shield, Terminal, Server, Sparkles, Mic, Award } from 'lucide-react';

const capabilities = [
  {
    id: 'offensive',
    category: 'OFFENSIVE SECURITY & RED TEAM',
    icon: Shield,
    summary: 'Adversary emulation, penetration testing, and vulnerability research.',
    items: [
      'Red Team Operations & Tactics',
      'Penetration Testing (Web/Network)',
      'Vulnerability & Bug Bounty Research',
      'Exploit Development',
      'Threat Detection & Security Monitoring',
      'OWASP Top 10 Auditing',
    ],
    tools: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 'Hydra', 'John the Ripper', 'SQLmap'],
  },
  {
    id: 'engineering',
    category: 'FULL-STACK & CLOUD ENGINEERING',
    icon: Server,
    summary: 'Production backend systems, defensive tooling, and cloud infrastructure security.',
    items: [
      'Full-Stack Software Engineering',
      'Cloud Security & Architecture',
      'Systems & Linux Tooling (Python, Java, Bash)',
      'Container Security & Docker Hardening',
      'Secure API Design & Auth Protocols',
      'Database Security & SQL Hardening',
    ],
    tools: ['Python', 'Java', 'Next.js', 'Node.js', 'Express', 'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Bash'],
  },
  {
    id: 'craft',
    category: 'CREATIVE SYSTEMS & CRAFT',
    icon: Sparkles,
    summary: 'High-fidelity visual systems, responsive interfaces, and intentional digital work.',
    items: [
      'Interactive Digital Systems',
      'Visual Systems & Identity',
      'User Interface Architecture',
      'Security Education Tooling',
      'Performance Optimization',
      'Motion Design & Typography',
    ],
    tools: ['TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'WebGL / Three.js', 'Accessibility (a11y)'],
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCapabilities =
    activeTab === 'all'
      ? capabilities
      : capabilities.filter((c) => c.id === activeTab);

  return (
    <section
      id="about"
      className="relative w-full bg-transparent border-t border-white/[0.07] overflow-hidden"
    >
      {/* ================================================================ */}
      {/* HERO-STYLE FULL-BLEED BACKGROUND LAYER WITH PRESENTATION PHOTO   */}
      {/* ================================================================ */}
      <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center">
        
        {/* Full-Bleed Background Image & Atmospheric Lighting */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
          {/* Ambient Warm Cyber Glow Behind Figure */}
          <div 
            className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[450px] lg:w-[600px] h-[450px] lg:h-[600px] bg-[#c59b6d]/[0.09] rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true" 
          />

          {/* Full-Height Presentation Photo Layer (Right Aligned, Hero-Style) */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[75%] lg:w-[50%] xl:w-[45%] h-full flex items-end justify-center lg:justify-end">
            <img
              src="/about-presentation.png"
              alt="Kaleeswaran S - Technical Presentation"
              className="w-auto h-[85%] sm:h-[90%] lg:h-[95%] max-w-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] filter contrast-[1.04]"
            />
          </div>

          {/* Desktop: Luminous Left-to-Right Gradient Veil (Guarantees 100% Text Readability) */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-[#09090b] via-[#09090b]/95 via-50% to-transparent pointer-events-none z-10" />

          {/* Mobile/Tablet: Atmospheric Top/Bottom Gradient Overlay */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/75 via-45% to-[#09090b] pointer-events-none z-10" />

          {/* Top and Bottom Seamless Atmospheric Edge Fades */}
          <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#09090b] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-28 bg-gradient-to-t from-[#09090b] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Content Stage Layer */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl flex flex-col items-start drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            
            {/* Eyebrow Status */}
            <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.2em] text-[#c59b6d] uppercase mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b6d] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c59b6d]" />
              </span>
              <span>ABOUT &amp; BACKGROUND</span>
            </div>

            {/* Large Editorial Headline */}
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-headline text-[#f7f4ee] leading-[0.98] sm:leading-[0.96] mb-6 sm:mb-8">
              <span className="block">I WORK AT THE</span>
              <span className="block text-[#c59b6d]">INTERSECTION OF</span>
              <span className="block">SECURITY AND</span>
              <span className="block text-[#dfb88e]">ENGINEERING.</span>
            </h2>

            {/* Concise Bio Content */}
            <div className="space-y-4 text-sm sm:text-base lg:text-lg text-[#d5cec5] font-light leading-relaxed mb-6 sm:mb-8">
              <p>
                I am Kaleeswaran S — a Red Team Security Specialist, Cloud Security Architect, and Full-Stack Software Engineer focused on understanding how systems fail, how adversaries operate, and how to engineer resilient software that withstands real-world threats.
              </p>
              <p className="text-[#a8a29e] text-xs sm:text-sm lg:text-base">
                Ranked in the top 4% globally on TryHackMe, my technical foundation spans vulnerability research, exploit development, bug bounty engagements, cloud infrastructure defense, and hands-on systems engineering in Python, Java, Bash, Next.js, and modern distributed environments. Rather than viewing security as an afterthought or a compliance checkbox, I treat security as an architectural discipline woven into every layer of software.
              </p>
            </div>

            {/* Speaker & Credentials Highlights Strip */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-[#dfb88e]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181513]/85 border border-[#c59b6d]/30 shadow-sm backdrop-blur-sm">
                <Mic className="w-3.5 h-3.5 text-[#c59b6d]" />
                <span>Technical Keynote Speaker</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181513]/85 border border-[#c59b6d]/30 shadow-sm backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-[#c59b6d]" />
                <span>DEF CON Group Coimbatore</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181513]/85 border border-[#c59b6d]/30 shadow-sm backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-[#c59b6d]" />
                <span>TryHackMe Top 4%</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* TECHNICAL COMPETENCIES / ARSENAL SECTION                        */}
      {/* ================================================================ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pb-20 sm:pb-32">
        <div className="pt-12 sm:pt-20 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14">
            <div>
              <div className="text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase mb-2">
                TECHNICAL ARSENAL &amp; CORE PROFICIENCIES
              </div>
              <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-[#f7f4ee]">
                Technical Competencies<span className="text-[#c59b6d]">.</span>
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#c59b6d] text-[#09090b] font-bold'
                    : 'bg-[#121316] text-[#a8a29e] hover:text-[#dfb88e] border border-white/5'
                }`}
              >
                ALL DISCIPLINES
              </button>
              {capabilities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === c.id
                      ? 'bg-[#c59b6d] text-[#09090b] font-bold'
                      : 'bg-[#121316] text-[#a8a29e] hover:text-[#dfb88e] border border-white/5'
                  }`}
                >
                  {c.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {filteredCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.category}
                  className="flex flex-col p-6 sm:p-8 bg-[#121316]/60 border border-white/[0.08] rounded-lg hover:border-[#c59b6d]/40 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                >
                  {/* Category Header */}
                  <div className="pb-4 mb-4 border-b border-white/10 flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-mono font-medium tracking-wider text-[#f7f4ee]">
                      {cap.category}
                    </h4>
                    <Icon className="w-4 h-4 text-[#c59b6d]" />
                  </div>

                  <p className="text-xs sm:text-sm font-light text-[#a8a29e] mb-6 leading-relaxed">
                    {cap.summary}
                  </p>

                  {/* Core Items */}
                  <ul className="space-y-2.5 mb-8">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs sm:text-sm font-light text-[#d5cec5] flex items-center gap-3 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]/60 group-hover:bg-[#dfb88e] transition-colors shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tools & Environment Badges */}
                  <div className="mt-auto pt-4 border-t border-white/5">
                    <div className="text-[10px] font-mono uppercase text-[#a8a29e] tracking-wider mb-2">
                      TOOLS &amp; STACK:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#d5cec5] border border-white/[0.05]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  category: string;
  year: string;
  github: string;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    id: 'redalert',
    name: 'RedAlert EDR',
    description: 'Offline Endpoint Detection & Response engine for host-level behavioral telemetry, anomalous process identification, and automated threat isolation on Linux.',
    category: 'Security Engineering',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/redalert-edr',
    tags: ['Python', 'Linux Kernel', 'Threat Detection', 'EDR'],
  },
  {
    id: 'clicktrap',
    name: 'ClickTrap',
    description: 'Adversary simulation and social engineering awareness platform demonstrating file camouflage, payload masquerading, and human vulnerability surfaces.',
    category: 'Defensive Security',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/clicktrap',
    tags: ['React', 'Social Engineering', 'Security Education'],
  },
  {
    id: 'sqli-report',
    name: 'SQLi-Report',
    description: 'Automated command-line vulnerability assessment tool conducting heuristic database injection analysis, blind verification, and structured reporting.',
    category: 'Offensive Research',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/sqli-report',
    tags: ['Python', 'Penetration Testing', 'OWASP Top 10'],
  },
  {
    id: 'dns-lab',
    name: 'DNS Lab',
    description: 'Containerized DNS testbed for investigating resolution poisoning, recursive query caching anomalies, and network packet telemetry.',
    category: 'Network Security',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/dns-lab',
    tags: ['Docker', 'Wireshark', 'DNSSEC', 'Networking'],
  },
  {
    id: 'authify',
    name: 'Authify',
    description: 'Hardened identity verification architecture implementing time-based OTP workflows, cryptographically signed JWT sessions, and rate-limited endpoints.',
    category: 'Full-Stack Security',
    year: '2024',
    github: 'https://github.com/KALEESWARANS-CYBER00/authify',
    tags: ['Node.js', 'Express', 'JWT', 'REST API'],
  },
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-16 sm:py-32 px-4 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
              SELECTED WORK<span className="text-[#c59b6d]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
            Security research, technology projects and digital systems I’ve built, explored and engineered.
          </p>
        </div>

        {/* Editorial Project Rows */}
        <div className="border-t border-white/10 divide-y divide-white/10">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-6 sm:py-10 transition-all duration-300 hover:bg-[#121316]/50 px-2 sm:px-6 -mx-2 sm:-mx-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                {/* Project Name & Category */}
                <div className="md:col-span-5">
                  <h3 className="text-xl sm:text-3xl font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors tracking-tight mb-1 flex items-center gap-3">
                    <span>{project.name}</span>
                  </h3>
                  <div className="text-xs font-mono text-[#c59b6d] tracking-wider uppercase">
                    {project.category}
                  </div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-5 text-xs sm:text-sm font-light text-[#d5cec5] leading-relaxed">
                  {project.description}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#a8a29e] border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Year & Arrow */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-6 text-right">
                  <span className="text-xs font-mono text-[#a8a29e]">{project.year}</span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-[#d5cec5] group-hover:border-[#dfb88e] group-hover:text-[#dfb88e] group-hover:translate-x-1.5 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Full Archive Link */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] sm:text-xs font-mono text-[#a8a29e]">
            ADDITIONAL EXPERIMENTAL REPOSITORIES ON GITHUB
          </span>
          <a
            href="https://github.com/KALEESWARANS-CYBER00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#dfb88e] hover:text-[#f7f4ee] transition-colors group"
          >
            <span>VIEW COMPLETE GITHUB PROFILE</span>
            <Github className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

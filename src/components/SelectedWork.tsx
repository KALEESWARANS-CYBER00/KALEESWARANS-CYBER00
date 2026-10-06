'use client';

import { useState, useMemo } from 'react';
import { ArrowUpRight, Github, Search, Filter, Cpu, ShieldAlert, Layers } from 'lucide-react';
import ProjectModal, { ProjectSpec } from '@/components/ProjectModal';

const projects: ProjectSpec[] = [
  {
    id: 'redalert',
    name: 'RedAlert EDR',
    description: 'Offline Endpoint Detection & Response engine for host-level behavioral telemetry, anomalous process identification, and automated threat isolation on Linux.',
    category: 'Security Engineering',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/redalert-edr',
    tags: ['Python', 'Linux Kernel', 'Threat Detection', 'EDR', 'eBPF'],
    threatVector: 'Linux kernel-level process anomalies, unauthorized privilege escalation, stealth persistence mechanisms, and anomalous socket connections.',
    architecture: [
      'Kernel behavioral telemetry & process tree monitoring',
      'Heuristic rule engine for rapid anomaly detection',
      'Automated process freeze and network isolation routine',
      'Lightweight offline telemetry logging without cloud dependence',
    ],
  },
  {
    id: 'clicktrap',
    name: 'ClickTrap',
    description: 'Adversary simulation and social engineering awareness platform demonstrating file camouflage, payload masquerading, and human vulnerability surfaces.',
    category: 'Defensive Security',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/clicktrap',
    tags: ['React', 'Social Engineering', 'Security Education', 'Simulation'],
    threatVector: 'Phishing techniques, double-extension file masquerading, spear-phishing payload simulation, and employee awareness telemetry.',
    architecture: [
      'Interactive adversary scenario simulation engine',
      'Dynamic payload masquerade and decoy file demonstrator',
      'Real-time behavioral training feedback & risk scoring',
      'Educational threat breakdown and defense recommendations',
    ],
  },
  {
    id: 'sqli-report',
    name: 'SQLi-Report',
    description: 'Automated command-line vulnerability assessment tool conducting heuristic database injection analysis, blind verification, and structured reporting.',
    category: 'Offensive Research',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/sqli-report',
    tags: ['Python', 'Penetration Testing', 'OWASP Top 10', 'CLI Scanner'],
    threatVector: 'Unsanitized user inputs, boolean-based blind SQLi, time-based blind SQLi, and union-based extraction vectors across relational DBMS.',
    architecture: [
      'Adaptive HTTP parameter crawling and payload fuzzing',
      'Differential response parsing & time-anomaly verification',
      'Automated vulnerability grading based on CVSS scoring',
      'Structured markdown and terminal audit report generator',
    ],
  },
  {
    id: 'dns-lab',
    name: 'DNS Lab',
    description: 'Containerized DNS testbed for investigating resolution poisoning, recursive query caching anomalies, and network packet telemetry.',
    category: 'Network Security',
    year: '2025',
    github: 'https://github.com/KALEESWARANS-CYBER00/dns-lab',
    tags: ['Docker', 'Wireshark', 'DNSSEC', 'Networking', 'Bind9'],
    threatVector: 'DNS cache poisoning, Kaminsky vulnerability replication, query spoofing, and man-in-the-middle recursive resolver attacks.',
    architecture: [
      'Multi-container isolated Bind9 recursive and authoritative DNS nodes',
      'PCAP packet telemetry capture & Wireshark protocol dissection',
      'DNSSEC cryptographic validation and integrity test suite',
      'Automated attack payload simulation and anomaly logger',
    ],
  },
  {
    id: 'authify',
    name: 'Authify',
    description: 'Hardened identity verification architecture implementing time-based OTP workflows, cryptographically signed JWT sessions, and rate-limited endpoints.',
    category: 'Full-Stack Security',
    year: '2024',
    github: 'https://github.com/KALEESWARANS-CYBER00/authify',
    tags: ['Node.js', 'Express', 'JWT', 'REST API', 'Argon2'],
    threatVector: 'Credential stuffing, session hijacking, replay attacks, brute-force token guessing, and timing attacks on cryptographic hashing.',
    architecture: [
      'Time-based One-Time Password (TOTP) state verification',
      'Cryptographically signed, rotating JWT session management',
      'Adaptive IP & user-based sliding window rate limiting',
      'Constant-time token validation and Argon2id password hashing',
    ],
  },
];

const categories = [
  'ALL',
  'Security Engineering',
  'Offensive Research',
  'Defensive Security',
  'Network Security',
  'Full-Stack Security',
];

export default function SelectedWork() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectSpec | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCat =
        selectedCategory === 'ALL' ||
        project.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="work"
      className="py-16 sm:py-32 px-4 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase mb-2">
              DISCIPLINED SYSTEMS & DEFENSIVE TOOLS
            </div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
              SELECTED WORK<span className="text-[#c59b6d]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
            Security research, technology projects and digital systems I’ve built, explored and engineered.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#c59b6d] text-[#09090b] font-bold shadow-[0_2px_10px_rgba(197,155,109,0.25)]'
                      : 'bg-[#121316] text-[#a8a29e] hover:text-[#dfb88e] border border-white/5 hover:border-[#c59b6d]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, threat, or name..."
              className="w-full bg-[#121316] border border-white/10 rounded px-3 pl-9 py-1.5 text-xs font-mono text-[#f7f4ee] placeholder-[#a8a29e]/50 outline-none focus:border-[#c59b6d] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a8a29e] hover:text-[#f7f4ee]"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Editorial Project Rows */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-[#a8a29e]">
              NO MATCHING PROJECTS FOUND IN THIS CATEGORY.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group py-6 sm:py-10 transition-all duration-300 hover:bg-[#121316]/50 px-2 sm:px-6 -mx-2 sm:-mx-6 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                  {/* Project Name & Category */}
                  <div className="md:col-span-4">
                    <h3 className="text-xl sm:text-3xl font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors tracking-tight mb-1 flex items-center gap-3">
                      <span>{project.name}</span>
                    </h3>
                    <div className="text-xs font-mono text-[#c59b6d] tracking-wider uppercase">
                      {project.category}
                    </div>
                  </div>

                  {/* Short Description & Tags */}
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

                  {/* Actions: Inspect Spec + GitHub Link */}
                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 sm:gap-4">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181513] border border-[#c59b6d]/30 text-[#dfb88e] hover:bg-[#c59b6d] hover:text-[#09090b] text-[11px] font-mono uppercase tracking-wider transition-all duration-300 font-semibold cursor-pointer"
                    >
                      <Cpu className="w-3 h-3" />
                      <span>INSPECT SPEC</span>
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-[#d5cec5] hover:border-[#dfb88e] hover:text-[#dfb88e] hover:translate-x-1 transition-all duration-300"
                      title="Open GitHub Repository"
                      aria-label={`Open GitHub repository for ${project.name}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* GitHub Full Archive Link */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] sm:text-xs font-mono text-[#a8a29e]">
            ADDITIONAL EXPERIMENTAL REPOSITORIES & REVERSE ENGINEERING AUDITS
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

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

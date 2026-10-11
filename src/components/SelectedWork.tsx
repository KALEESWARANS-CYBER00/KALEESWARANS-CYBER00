'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowUpRight, Github, Search, Cpu, ShieldAlert, Terminal, Layers } from 'lucide-react';
import ProjectModal, { ProjectSpec } from '@/components/ProjectModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

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

  // GSAP Horizontal Scrolling Gallery with ScrollTrigger Pinning
  useEffect(() => {
    if (!stageRef.current || !trackRef.current || filteredProjects.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 768px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { conditions } = context;
          if (!conditions?.motion) return;

          const stage = stageRef.current;
          const track = trackRef.current;
          if (!stage || !track) return;

          const panels = gsap.utils.toArray<HTMLElement>('.gallery-panel');

          // Fallback on mobile/touch: smooth vertical entrance without pinning
          if (!conditions?.desktop) {
            panels.forEach((p) => {
              gsap.from(p, {
                y: 35,
                autoAlpha: 0,
                duration: 0.8,
                scrollTrigger: {
                  trigger: p,
                  start: 'top 90%',
                  once: true,
                },
              });
            });
            return;
          }

          // Desktop: Pin vertical scroll and translate horizontal track
          const getScrollDist = () => Math.max(0, track.scrollWidth - stage.clientWidth);

          const horizontalTween = gsap.to(track, {
            x: () => -getScrollDist(),
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top 70px',
              end: () => `+=${getScrollDist()}`,
              pin: true,
              scrub: 0.85,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const total = filteredProjects.length;
                if (total > 0) {
                  const idx = Math.min(total - 1, Math.floor(self.progress * total));
                  setCurrentIndex(idx);
                }
              },
            },
          });

          // Bottom scrub progress bar
          if (progressRef.current) {
            gsap.fromTo(
              progressRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: stage,
                  start: 'top 70px',
                  end: () => `+=${getScrollDist()}`,
                  scrub: 0.85,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          // Subtle panel content reveal as each panel enters horizontal view
          panels.forEach((panel) => {
            const content = panel.querySelector('.panel-content');
            if (content) {
              gsap.from(content, {
                y: 18,
                opacity: 0.8,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontalTween,
                  start: 'left right',
                  end: 'center center',
                  scrub: true,
                },
              });
            }
          });
        },
        rootRef
      );
    }, rootRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="work"
      ref={rootRef}
      className="py-16 sm:py-24 bg-[#09090b] relative border-t border-white/[0.07] w-full overflow-hidden"
    >
      <div className="w-full">
        {/* Section Header (Preserved) */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8">
            <div>
              <div className="text-xs font-mono tracking-[0.25em] text-[#ef4444] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                DISCIPLINED SYSTEMS & DEFENSIVE TOOLS
              </div>
              <h2 className="text-3xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
                SELECTED WORK<span className="text-[#ef4444]">.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
              Security research, technology projects and digital systems I’ve built, explored and engineered.
            </p>
          </div>

          {/* Filter Controls & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all duration-150 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#ef4444] text-black font-bold shadow-[0_2px_8px_rgba(239,68,68,0.3)]'
                        : 'bg-[#121316] text-[#a8a29e] hover:text-white border border-white/10 hover:border-[#ef4444]/40'
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
                placeholder="Search stack, threat, name..."
                className="w-full bg-[#121316] border border-white/10 px-3 pl-9 py-1.5 text-xs font-mono text-[#f7f4ee] placeholder-[#a8a29e]/50 outline-none focus:border-[#ef4444] transition-colors"
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
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-14 py-20 text-center text-xs font-mono text-[#a8a29e] border border-white/10 bg-[#0d0e12]">
            NO MATCHING PROJECTS FOUND IN THIS CATEGORY.
          </div>
        ) : (
          /* ========================================================================= */
          /* GSAP Horizontal Scrolling Gallery Stage                                   */
          /* ========================================================================= */
          <div
            ref={stageRef}
            className="gallery-stage relative w-full overflow-hidden flex flex-col justify-center min-h-[580px] h-[calc(100vh-100px)] max-h-[820px]"
            aria-label="Horizontal projects showcase gallery"
          >
            {/* Horizontal Track */}
            <div
              ref={trackRef}
              className="gallery-track flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 w-full md:w-max px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16"
            >
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="gallery-panel flex-none w-full md:w-[86vw] lg:w-[78vw] max-w-[1140px] h-auto md:h-[68vh] min-h-[480px] max-h-[600px] bg-[#0c0d11] border border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between select-none"
                >
                  <div className="panel-content flex flex-col justify-between h-full">
                    {/* Top Identity Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#ef4444] uppercase bg-[#ef4444]/10 border border-[#ef4444]/30 px-2.5 py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                          SYS // 0{index + 1} OF 0{filteredProjects.length}
                        </span>
                        <span className="text-xs font-mono text-[#a8a29e] tracking-wider uppercase">
                          {project.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-[#a8a29e]">YEAR:</span>
                        <span className="px-2 py-0.5 bg-[#14161d] border border-white/10 text-white font-bold">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Main Dual-Column Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 my-auto py-2">
                      {/* Left Column: Project Identity, Description & Stack (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col justify-center">
                        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-[#d5cec5] font-light leading-relaxed mb-5 max-w-2xl">
                          {project.description}
                        </p>

                        {/* Technology Stack Tags */}
                        <div>
                          <div className="text-[10px] font-mono text-[#a8a29e] tracking-wider uppercase mb-2">
                            STACK & TELEMETRY:
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] sm:text-xs font-mono px-2.5 py-1 bg-[#14161d] text-white border border-white/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Threat Vector & Architecture Telemetry (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between bg-[#06070a] border border-white/10 p-5 sm:p-6">
                        {/* Threat Vector */}
                        <div className="mb-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#ef4444] uppercase tracking-wider mb-2">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>TARGET THREAT VECTOR</span>
                          </div>
                          <p className="text-xs font-mono text-[#cbd5e1] leading-relaxed">
                            {project.threatVector}
                          </p>
                        </div>

                        {/* Core Defense Architecture Steps */}
                        {project.architecture && project.architecture.length > 0 && (
                          <div className="border-t border-white/10 pt-3">
                            <div className="text-[10px] font-mono text-[#a8a29e] uppercase tracking-wider mb-2">
                              CORE DEFENSE ARCHITECTURE
                            </div>
                            <ul className="space-y-1.5">
                              {project.architecture.slice(0, 3).map((arch, i) => (
                                <li key={i} className="text-[11px] font-mono text-[#94a3b8] flex items-start gap-2">
                                  <span className="text-[#ef4444] mt-0.5">▸</span>
                                  <span className="line-clamp-1">{arch}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 mt-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#a8a29e]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-400">STATUS: PRODUCTION DEFENSE</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ef4444] text-black text-xs font-mono uppercase tracking-wider font-bold transition-all duration-150 hover:bg-white hover:text-black cursor-pointer shadow-[0_2px_10px_rgba(239,68,68,0.25)] active:scale-95"
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          <span>INSPECT SPEC</span>
                        </button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14161d] border border-white/15 text-white hover:border-[#ef4444] hover:text-[#ef4444] text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer"
                          title="Open GitHub Repository"
                          aria-label={`Open GitHub repository for ${project.name}`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">REPO</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Gallery Progress Status (Hidden on Mobile) */}
            <div className="gallery-status hidden md:flex items-center justify-between gap-6 px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 pt-5 mt-auto border-t border-white/10 bg-[#09090b]">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#a8a29e] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                <span>HORIZONTAL DEFENSE ARSENAL</span>
              </div>

              <div className="flex-1 max-w-md h-[2px] bg-white/10 overflow-hidden">
                <span
                  ref={progressRef}
                  className="block h-full bg-[#ef4444] origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>

              <div className="font-mono text-xs font-bold text-white tracking-widest">
                0{currentIndex + 1} — 0{filteredProjects.length}
              </div>
            </div>
          </div>
        )}

        {/* GitHub Full Archive Link (Preserved) */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] sm:text-xs font-mono text-[#a8a29e]">
            ADDITIONAL EXPERIMENTAL REPOSITORIES & REVERSE ENGINEERING AUDITS
          </span>
          <a
            href="https://github.com/KALEESWARANS-CYBER00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#ef4444] hover:text-white transition-colors group"
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

'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowUpRight, Github, Search } from 'lucide-react';
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
    status: 'Completed',
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
    status: 'Completed',
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
    status: 'Completed',
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
    status: 'Completed',
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
    status: 'Completed',
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

          panels.forEach((panel) => {
            const content = panel.querySelector('.panel-content');
            if (content) {
              gsap.from(content, {
                y: 18,
                opacity: 0.85,
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
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-8">
            <div>
              <div className="text-xs font-mono tracking-[0.25em] text-[#a1a1aa] uppercase mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                ENGINEERING CASE STUDIES & DEFENSIVE SYSTEMS
              </div>
              <h2 className="text-3xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
                SELECTED WORK<span className="text-red-500">.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
              Security research, technology projects and digital systems I’ve built, explored and engineered.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all duration-200 shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 text-[#f7f4ee] font-bold border border-red-500/50'
                        : 'bg-[#121316] text-[#a1a1aa] hover:text-[#f7f4ee] border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack, type, name..."
                className="w-full bg-[#121316] border border-white/10 rounded-sm px-3 pl-9 py-1.5 text-xs font-mono text-[#f7f4ee] placeholder-[#a1a1aa]/50 outline-none focus:border-red-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a1a1aa] hover:text-[#f7f4ee]"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-14 py-20 text-center text-xs font-mono text-[#a1a1aa] border border-white/10 bg-[#121316] rounded-sm">
            NO MATCHING PROJECTS FOUND IN THIS CATEGORY.
          </div>
        ) : (
          <div
            ref={stageRef}
            className="gallery-stage relative w-full overflow-hidden flex flex-col justify-center min-h-[580px] h-[calc(100vh-100px)] max-h-[820px]"
            aria-label="Horizontal projects showcase gallery"
          >
            <div
              ref={trackRef}
              className="gallery-track flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 lg:gap-10 w-full md:w-max px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16"
            >
              {filteredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="gallery-panel flex-none w-full md:w-[86vw] lg:w-[80vw] xl:w-[75vw] max-w-[1180px] bg-[#0c0d12] border border-white/10 rounded-sm p-6 sm:p-9 lg:p-12 flex flex-col justify-between select-none shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-colors duration-200 hover:border-white/20 group"
                >
                  <div className="panel-content flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                        <span className="text-red-500 font-bold">0{index + 1}</span>
                        <span className="text-white/20">/</span>
                        <span className="text-[#a1a1aa]">0{filteredProjects.length}</span>
                      </div>
                      {project.year && (
                        <div className="font-mono text-xs text-[#a1a1aa] tracking-wider uppercase">
                          <span>YEAR: </span>
                          <span className="text-[#f7f4ee] font-medium">{project.year}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f7f4ee] uppercase">
                        {project.name}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base lg:text-[17px] text-[#d4d4d8] font-light leading-relaxed max-w-4xl">
                        {project.description}
                      </p>
                    </div>

                    <div className="w-full">
                      {project.status && (
                        <div className="py-3.5 sm:py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-8">
                          <span className="w-32 sm:w-44 shrink-0 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                            STATUS
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span className="text-xs sm:text-sm font-mono text-[#f7f4ee] font-medium tracking-wide">
                              {project.status}
                            </span>
                          </div>
                        </div>
                      )}

                      {project.category && (
                        <div className="py-3.5 sm:py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-8">
                          <span className="w-32 sm:w-44 shrink-0 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                            SYSTEM / TYPE
                          </span>
                          <span className="text-xs sm:text-sm font-mono text-[#f7f4ee] font-medium tracking-wide">
                            {project.category}
                          </span>
                        </div>
                      )}

                      {project.tags && project.tags.length > 0 && (
                        <div className="py-3.5 sm:py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                          <span className="w-32 sm:w-44 shrink-0 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                            TECHNOLOGIES
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] sm:text-xs font-mono px-2.5 py-1 bg-white/[0.03] text-[#e4e4e7] border border-white/10 rounded-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="py-3.5 sm:py-4 border-t border-b border-white/10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                        <span className="w-32 sm:w-44 shrink-0 text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                          LINK
                        </span>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#f7f4ee] hover:text-red-400 transition-colors group"
                            aria-label={`Open repository for ${project.name}`}
                          >
                            <span>VIEW REPOSITORY</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setActiveModalProject(project)}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#a1a1aa] hover:text-[#f7f4ee] transition-colors cursor-pointer"
                          >
                            <span>CASE STUDY SPEC</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="gallery-status hidden md:flex items-center justify-between gap-6 px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 pt-5 mt-auto border-t border-white/10 bg-[#09090b]">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#a1a1aa] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>ENGINEERING CASE STUDIES</span>
              </div>

              <div className="flex-1 max-w-md h-[2px] bg-white/10 overflow-hidden rounded-full">
                <span
                  ref={progressRef}
                  className="block h-full bg-red-500 origin-left"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>

              <div className="font-mono text-xs font-medium text-[#f7f4ee] tracking-widest">
                <span className="text-red-500 font-bold">0{currentIndex + 1}</span>
                <span className="text-white/20 mx-1">/</span>
                <span className="text-[#a1a1aa]">0{filteredProjects.length}</span>
              </div>
            </div>
          </div>
        )}

        <div className="px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] sm:text-xs font-mono text-[#a1a1aa] tracking-wider uppercase">
            COMPLETE REPOSITORIES & OPEN-SOURCE ARCHIVE
          </span>
          <a
            href="https://github.com/KALEESWARANS-CYBER00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#f7f4ee] hover:text-red-400 transition-colors group"
          >
            <span>VIEW GITHUB PROFILE</span>
            <Github className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

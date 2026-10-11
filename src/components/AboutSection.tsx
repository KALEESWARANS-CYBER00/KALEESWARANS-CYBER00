'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import {
  Shield,
  ShieldCheck,
  Server,
  Mic,
  Award,
  Terminal,
  Wrench,
  Cloud,
  Database,
  Cpu,
  Code2,
  Layers,
  Crosshair,
  HardDrive,
  Network,
  Workflow,
  Activity,
  Radio,
} from 'lucide-react';
import SkillIcon from './SkillIcon';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Subsection {
  label: string;
  icon: any;
  skills: string[];
}

interface SkillCategory {
  id: string;
  category: string;
  filterGroup: 'security' | 'cloud' | 'engineering' | 'tools';
  icon: any;
  description: string;
  featured?: boolean;
  colSpan?: string;
  certification?: string;
  subsections?: Subsection[];
  skills?: string[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'cybersecurity',
    category: 'Cybersecurity',
    filterGroup: 'security',
    icon: Shield,
    featured: true,
    colSpan: 'md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2',
    description: 'Enterprise security posture, comprehensive threat assessment, and adversary defense.',
    subsections: [
      {
        label: 'Offensive Security & Red Teaming',
        icon: Crosshair,
        skills: [
          'Cybersecurity',
          'Offensive Security',
          'Red Teaming',
          'Penetration Testing (VAPT)',
          'Web Application Security',
          'API Security',
          'Network Security',
          'Cloud Security',
        ],
      },
      {
        label: 'Systems Defense & Threat Research',
        icon: ShieldCheck,
        skills: [
          'Active Directory Security',
          'Linux Security',
          'Windows Security',
          'Security Assessment',
          'Vulnerability Assessment',
          'Threat Modeling',
          'Security Testing',
          'Security Auditing',
          'Security Research',
        ],
      },
    ],
  },
  {
    id: 'offensive',
    category: 'Offensive Security & Red Teaming',
    filterGroup: 'security',
    icon: Crosshair,
    description: 'Adversary simulation, attack surface discovery, and tactical penetration testing.',
    skills: [
      'Red Teaming',
      'VAPT',
      'Penetration Testing',
      'Web Security',
      'API Security',
      'Network Security',
      'Active Directory Security',
      'Initial Access Techniques',
      'Lateral Movement',
      'Attack Surface Analysis',
      'Security Testing',
    ],
  },
  {
    id: 'exploit',
    category: 'Exploit Development',
    filterGroup: 'security',
    icon: Terminal,
    description: 'Vulnerability research, binary exploitation, reverse engineering, and payload engineering.',
    skills: [
      'Binary Exploitation',
      'Reverse Engineering',
      'Shellcode Development',
      'Payload Development',
      'Privilege Escalation',
      'Vulnerability Research',
      'Web Exploitation',
      'PoC Development',
      'Post-Exploitation',
      'Persistence Techniques',
      'Command & Control (C2)',
      'Security Automation',
      'CTF (Capture The Flag)',
    ],
  },
  {
    id: 'cloud',
    category: 'Cloud & AWS',
    filterGroup: 'cloud',
    icon: Cloud,
    featured: true,
    colSpan: 'md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2',
    description: 'Resilient cloud infrastructure, serverless architectures, and defense-in-depth on AWS.',
    certification: 'AWS Certified Cloud Practitioner — In Progress',
    subsections: [
      { label: 'Compute', icon: Cpu, skills: ['EC2', 'Lambda', 'ECS', 'EKS', 'ECR', 'Elastic Beanstalk', 'Auto Scaling'] },
      { label: 'Storage', icon: HardDrive, skills: ['S3', 'EBS', 'EFS', 'AWS Backup'] },
      { label: 'Database', icon: Database, skills: ['RDS', 'DynamoDB'] },
      { label: 'Networking', icon: Network, skills: ['VPC', 'Route 53', 'CloudFront', 'ELB (Elastic Load Balancing)'] },
      { label: 'Security', icon: Shield, skills: ['IAM', 'KMS', 'WAF', 'Shield', 'ACM', 'GuardDuty', 'Security Hub', 'Secrets Manager', 'Inspector', 'Trusted Advisor'] },
      { label: 'DevOps', icon: Workflow, skills: ['CodeBuild', 'CodeDeploy', 'CodePipeline', 'CodeCommit', 'CloudFormation'] },
      { label: 'Monitoring', icon: Activity, skills: ['CloudWatch', 'CloudTrail', 'Systems Manager', 'AWS Config'] },
      { label: 'Messaging', icon: Radio, skills: ['SQS', 'SNS', 'EventBridge', 'Step Functions', 'API Gateway'] },
    ],
  },
  {
    id: 'tools',
    category: 'Security Tools',
    filterGroup: 'tools',
    icon: Wrench,
    description: 'Industry-standard offensive toolkits, network protocol dissectors, and debuggers.',
    skills: [
      'Burp Suite',
      'Nmap',
      'Metasploit',
      'Wireshark',
      'Ghidra',
      'GDB',
      'pwndbg',
      'Hashcat',
      'John the Ripper',
      'Hydra',
      'sqlmap',
      'ffuf',
      'Gobuster',
      'Netcat',
      'Docker',
      'Git',
      'Linux',
      'Bash',
      'Python for Security',
    ],
  },
  {
    id: 'fullstack',
    category: 'Full-Stack Development',
    filterGroup: 'engineering',
    icon: Layers,
    description: 'Modern application development across frontend, backend, APIs, and microservices.',
    skills: [
      'Full-Stack Web Dev',
      'Java',
      'JavaScript',
      'TypeScript',
      'Python (Basic)',
      'React.js',
      'Node.js',
      'Express.js',
      'Spring Boot',
      'REST APIs',
      'Microservices',
      'HTML5',
      'CSS3',
      'OOP',
      'Data Structures & Algorithms',
    ],
  },
  {
    id: 'programming',
    category: 'Programming Languages',
    filterGroup: 'engineering',
    icon: Code2,
    description: 'Core compiled, systems, and scripting languages for engineering and automation.',
    skills: [
      'Java',
      'JavaScript',
      'TypeScript',
      'Python',
      'C',
      'C++',
      'Bash',
      'SQL',
    ],
  },
  {
    id: 'databases',
    category: 'Databases & Data Technologies',
    filterGroup: 'engineering',
    icon: Database,
    description: 'Relational DBMS, document stores, in-memory caching, and query optimization.',
    skills: [
      'MySQL',
      'MariaDB',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Database Design',
      'SQL',
      'NoSQL',
      'Database Optimization',
    ],
  },
  {
    id: 'messaging',
    category: 'Messaging & Distributed Systems',
    filterGroup: 'engineering',
    icon: Cpu,
    description: 'Event-driven architectures, distributed queuing, and scalable asynchronous processing.',
    skills: [
      'Apache Kafka',
      'Event-Driven Architecture',
      'Message Queues',
      'Distributed Systems',
      'Asynchronous Processing',
    ],
  },
  {
    id: 'devops',
    category: 'DevOps & Engineering',
    filterGroup: 'tools',
    icon: Server,
    description: 'Containerization, automated CI/CD pipelines, and secure cloud delivery.',
    skills: [
      'Git',
      'GitHub',
      'Docker',
      'CI/CD',
      'Linux',
      'REST APIs',
      'Microservices',
      'Containerization',
      'Infrastructure Fundamentals',
      'Cloud Deployment',
      'Application Security',
    ],
  },
];

const filterTabs = [
  { id: 'all', label: 'ALL SKILLS (10)', icon: Layers },
  { id: 'security', label: 'SECURITY & OFFENSIVE', icon: ShieldCheck },
  { id: 'cloud', label: 'CLOUD & AWS', icon: Cloud },
  { id: 'engineering', label: 'FULL-STACK & DATA', icon: Code2 },
  { id: 'tools', label: 'DEVOPS & TOOLS', icon: Wrench },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const storyPinContainerRef = useRef<HTMLDivElement>(null);
  const storyPinStageRef = useRef<HTMLDivElement>(null);
  
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);

  const bioP1Ref = useRef<HTMLParagraphElement>(null);
  const bioP2Ref = useRef<HTMLParagraphElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  const desktopPortraitWrapperRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const portraitImageWrapperRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLImageElement>(null);

  const mobilePortraitWrapperRef = useRef<HTMLDivElement>(null);
  const mobileImageWrapperRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);

  const arsenalContainerRef = useRef<HTMLDivElement>(null);
  const arsenalHeaderRef = useRef<HTMLDivElement>(null);
  const arsenalGridRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!portraitFrameRef.current || window.innerWidth < 1024) return;
    const rect = portraitFrameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 4.5,
      y: normX * 4.5,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =======================================================================
      // DESKTOP: PINNED GSAP SCROLL STORYTELLING ANIMATION (>= 1024px)
      // =======================================================================
      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion) {
          gsap.set(
            [
              line1Ref.current,
              line2Ref.current,
              line3Ref.current,
              line4Ref.current,
              bioP1Ref.current,
              bioP2Ref.current,
              portraitImageWrapperRef.current,
              desktopPortraitWrapperRef.current,
            ],
            { opacity: 1, y: 0, yPercent: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }
          );
          if (credentialsRef.current) {
            gsap.set(credentialsRef.current.children, { opacity: 1, y: 0, scale: 1 });
          }
          return;
        }

        if (storyPinContainerRef.current && storyPinStageRef.current) {
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: storyPinContainerRef.current,
              start: 'top top',
              end: '+=180%',
              pin: storyPinStageRef.current,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });

          // 1. Headline Masked Lines Reveal (0.00 -> 0.30)
          scrollTl.fromTo(
            [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.06,
              duration: 0.32,
              ease: 'power3.out',
            },
            0
          );

          // 2. Portrait Masked Clip-Path Reveal + Scale Zoom (0.08 -> 0.45)
          if (portraitImageWrapperRef.current) {
            scrollTl.fromTo(
              portraitImageWrapperRef.current,
              { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                duration: 0.4,
                ease: 'power2.inOut',
              },
              0.08
            );
          }

          if (portraitImageRef.current) {
            scrollTl.fromTo(
              portraitImageRef.current,
              { scale: 1.18 },
              { scale: 1.0, duration: 0.45, ease: 'power1.out' },
              0.08
            );
          }

          // 3. Biography Paragraphs Staggered Reveal (0.30 -> 0.65)
          scrollTl.fromTo(
            bioP1Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
            0.30
          );

          scrollTl.fromTo(
            bioP2Ref.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
            0.42
          );

          // Subtle spatial parallax on portrait during reading progression
          if (desktopPortraitWrapperRef.current) {
            scrollTl.fromTo(
              desktopPortraitWrapperRef.current,
              { y: 20 },
              { y: -20, duration: 0.8, ease: 'none' },
              0.2
            );
          }

          // 4. Credential Badges Pop In (0.55 -> 0.88)
          if (credentialsRef.current) {
            scrollTl.fromTo(
              credentialsRef.current.children,
              { opacity: 0, y: 20, scale: 0.92 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.08,
                duration: 0.28,
                ease: 'back.out(1.8)',
              },
              0.55
            );
          }
        }
      });

      // =======================================================================
      // MOBILE & TABLET: NATURAL SCROLLTRIGGER REVEALS (< 1024px)
      // =======================================================================
      mm.add('(max-width: 1023px)', () => {
        if (prefersReducedMotion) return;

        // Mobile Photo Reveal
        if (mobileImageWrapperRef.current) {
          gsap.fromTo(
            mobileImageWrapperRef.current,
            { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.3 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 0.9,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: mobilePortraitWrapperRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (mobileImageRef.current) {
          gsap.fromTo(
            mobileImageRef.current,
            { scale: 1.15 },
            {
              scale: 1.0,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mobilePortraitWrapperRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Headline Reveal
        if (line1Ref.current) {
          gsap.fromTo(
            [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: line1Ref.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Bio Reveal
        if (bioP1Ref.current) {
          gsap.fromTo(
            [bioP1Ref.current, bioP2Ref.current],
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.14,
              duration: 0.65,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bioP1Ref.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Credentials Reveal
        if (credentialsRef.current) {
          gsap.fromTo(
            credentialsRef.current.children,
            { opacity: 0, y: 16, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.55,
              ease: 'back.out(1.6)',
              scrollTrigger: {
                trigger: credentialsRef.current,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // =======================================================================
      // TECHNICAL ARSENAL SECTION SCROLL REVEALS (ALL SCREEN SIZES)
      // =======================================================================
      if (!prefersReducedMotion && arsenalHeaderRef.current) {
        gsap.fromTo(
          arsenalHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: arsenalHeaderRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (!prefersReducedMotion && arsenalGridRef.current) {
        gsap.fromTo(
          arsenalGridRef.current.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: arsenalGridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.filterGroup === activeTab);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-transparent border-t border-white/[0.07]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4.5rem_4.5rem]"
          style={{ maskImage: 'radial-gradient(ellipse 65% 55% at 50% 35%, #000 70%, transparent 100%)' }}
        />
        <div className="absolute top-1/4 right-[4%] w-[550px] lg:w-[800px] h-[550px] lg:h-[800px] bg-gradient-to-tr from-[#c59b6d]/[0.08] via-[#dfb88e]/[0.03] to-transparent rounded-full blur-[170px]" />
        <div className="absolute top-2/3 left-[-80px] w-[500px] h-[500px] bg-[#c59b6d]/[0.04] rounded-full blur-[150px]" />
      </div>

      <div ref={storyPinContainerRef} className="relative w-full">
        <div
          ref={storyPinStageRef}
          className="relative w-full px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 pt-16 sm:pt-24 lg:pt-0 pb-16 sm:pb-24 flex flex-col justify-center min-h-[auto] lg:h-[100svh]"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
            
            <div ref={mobilePortraitWrapperRef} className="lg:hidden w-full max-w-md mx-auto">
              <div className="relative p-3.5 rounded-3xl overflow-hidden border border-[#c59b6d]/30 bg-[#121316]/90 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                <div
                  ref={mobileImageWrapperRef}
                  className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 select-none"
                >
                  <img
                    ref={mobileImageRef}
                    src="/about-presentation.png"
                    alt="Kaleeswaran S - Technical Presentation"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 via-transparent via-50% to-[#09090b]/10 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              
              <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-headline text-[#f7f4ee] leading-[1.04] sm:leading-[0.98] mb-6 sm:mb-8">
                <span className="block overflow-hidden py-0.5">
                  <span ref={line1Ref} className="block text-[#f7f4ee]">
                    I WORK AT THE
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span ref={line2Ref} className="block text-[#c59b6d]">
                    INTERSECTION OF
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span ref={line3Ref} className="block text-[#f7f4ee]">
                    SECURITY AND
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span ref={line4Ref} className="block text-[#dfb88e]">
                    ENGINEERING.
                  </span>
                </span>
              </h2>

              <div className="space-y-6 sm:space-y-7 w-full max-w-3xl lg:max-w-none mb-7 sm:mb-9">
                <p
                  ref={bioP1Ref}
                  className="text-base sm:text-lg lg:text-[20px] xl:text-[21px] 2xl:text-[22px] text-[#f7f4ee] font-normal leading-[1.65] sm:leading-[1.7] lg:leading-[1.75] tracking-[-0.01em]"
                >
                  I am Kaleeswaran S — a Red Team Security Specialist, Cloud Security Architect, and Full-Stack Software Engineer focused on understanding how systems fail, how adversaries operate, and how to engineer resilient software that withstands real-world threats.
                </p>
                <p
                  ref={bioP2Ref}
                  className="text-sm sm:text-base lg:text-[17.5px] xl:text-[18px] 2xl:text-[18.5px] text-[#d5cec5] font-light leading-[1.7] sm:leading-[1.75] lg:leading-[1.75]"
                >
                  Ranked in the top 4% globally on TryHackMe, my technical foundation spans vulnerability research, exploit development, bug bounty engagements, cloud infrastructure defense, and hands-on systems engineering in Python, Java, Bash, Next.js, and modern distributed environments. Rather than viewing security as an afterthought or a compliance checkbox, I treat security as an architectural discipline woven into every layer of software.
                </p>
              </div>

              <div ref={credentialsRef} className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-mono text-[#dfb88e]">
                <div className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181513]/90 border border-[#c59b6d]/30 hover:border-[#dfb88e] hover:bg-[#201b17] transition-all duration-300 shadow-sm backdrop-blur-sm cursor-default hover:-translate-y-1">
                  <Mic className="w-3.5 h-3.5 text-[#c59b6d] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[#f7f4ee] text-[11px] sm:text-xs">Technical Keynote Speaker</span>
                </div>
                
                <div className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181513]/90 border border-[#c59b6d]/30 hover:border-[#dfb88e] hover:bg-[#201b17] transition-all duration-300 shadow-sm backdrop-blur-sm cursor-default hover:-translate-y-1">
                  <Shield className="w-3.5 h-3.5 text-[#c59b6d] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[#f7f4ee] text-[11px] sm:text-xs">DEF CON Group Coimbatore</span>
                </div>

                <div className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181513]/90 border border-[#c59b6d]/30 hover:border-[#dfb88e] hover:bg-[#201b17] transition-all duration-300 shadow-sm backdrop-blur-sm cursor-default hover:-translate-y-1">
                  <Award className="w-3.5 h-3.5 text-[#c59b6d] group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-[#f7f4ee] text-[11px] sm:text-xs">TryHackMe Top 4%</span>
                </div>
              </div>

            </div>

            <div
              ref={desktopPortraitWrapperRef}
              className="hidden lg:flex lg:col-span-5 xl:col-span-5 justify-center lg:justify-end items-center perspective-[1000px]"
            >
              <div className="relative w-full max-w-[430px] xl:max-w-[470px]">
                <div
                  ref={portraitFrameRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out',
                  }}
                  className="relative p-4 rounded-3xl overflow-hidden border border-[#c59b6d]/30 bg-[#121316]/90 shadow-[0_24px_60px_rgba(0,0,0,0.9)] backdrop-blur-md will-change-transform group"
                >
                  <div
                    ref={portraitImageWrapperRef}
                    className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 select-none"
                  >
                    <img
                      ref={portraitImageRef}
                      src="/about-presentation.png"
                      alt="Kaleeswaran S - Technical Presentation"
                      className="w-full h-full object-cover object-top filter contrast-[1.03]"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 via-transparent via-55% to-[#09090b]/10 pointer-events-none" />

                    {isHovered && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                        style={{
                          background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(197, 155, 109, 0.16), transparent 70%)`,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 3. TECHNICAL COMPETENCIES / SKILLS SECTION                       */}
      {/* ================================================================ */}
      <div
        id="skills"
        ref={arsenalContainerRef}
        className="w-full px-4 sm:px-8 md:px-12 lg:px-14 xl:px-16 2xl:px-20 pb-20 sm:pb-32"
      >
        <div className="pt-12 sm:pt-20 border-t border-white/10">
          <div ref={arsenalHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase mb-2">
                TECHNICAL CAPABILITIES &amp; SPECIALIZATIONS
              </div>
              <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-[#f7f4ee]">
                Technical Competencies<span className="text-[#c59b6d]">.</span>
              </h3>
            </div>

            {/* Quick Filter Tabs for Recruiters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {filterTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? 'bg-[#c59b6d] text-[#09090b] font-bold shadow-[0_2px_12px_rgba(197,155,109,0.3)]'
                        : 'bg-[#121316] text-[#a8a29e] hover:text-[#dfb88e] border border-white/5'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Category Grid: 3 cols on desktop, 2 on tablet, 1 on mobile */}
          <motion.div
            layout
            ref={arsenalGridRef}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [grid-auto-flow:dense] gap-5 sm:gap-6"
          >
            <AnimatePresence>
              {filteredCategories.map((cap) => {
                const Icon = cap.icon;
                const isCloud = cap.id === 'cloud';
                const isCyber = cap.id === 'cybersecurity';
                const isSpan2 = isCloud || isCyber;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    key={cap.id}
                    className={`flex flex-col p-5 sm:p-6 lg:p-6.5 rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.45)] group hover:-translate-y-1 ${
                      isSpan2
                        ? 'md:col-span-2 lg:col-span-2 bg-[#131418]/90 border border-[#c59b6d]/35 hover:border-[#c59b6d]/60'
                        : 'bg-[#121316]/75 border border-white/[0.08] hover:border-[#c59b6d]/45 hover:bg-[#15161a]/90'
                    }`}
                  >
                    {/* Top Bronze Signal Accent */}
                    <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#c59b6d] to-transparent rounded-full mb-3.5 group-hover:w-20 transition-all duration-300" />

                    {/* Category Header: Category headings 18–22px, Category icons proportionally larger */}
                    <div className="pb-3 mb-3 border-b border-white/10 flex items-center justify-between gap-3.5">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg sm:text-[21px] font-mono font-bold tracking-tight text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors leading-snug">
                          {cap.category}
                        </h4>
                      </div>
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#c59b6d]/15 border border-[#c59b6d]/30 flex items-center justify-center text-[#dfb88e] group-hover:bg-[#c59b6d] group-hover:text-[#09090b] transition-all duration-300 shrink-0">
                        <Icon className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* One-Line Description: 14–15px */}
                    <p className="text-[14px] sm:text-[14.5px] font-light text-[#d5cec5] mb-3.5 leading-relaxed">
                      {cap.description}
                    </p>

                    {/* AWS Certification Banner */}
                    {cap.certification && (
                      <div className="mb-3.5 p-3 sm:p-3.5 rounded-xl bg-[#c59b6d]/10 border border-[#c59b6d]/30 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#dfb88e] animate-pulse shrink-0" />
                          <span className="text-xs sm:text-sm font-mono font-bold text-[#f7f4ee]">
                            AWS Certified Cloud Practitioner
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-wider text-[#dfb88e] bg-[#c59b6d]/20 px-2.5 py-1 rounded border border-[#c59b6d]/40 font-semibold shrink-0">
                          IN PROGRESS
                        </span>
                      </div>
                    )}

                    {/* Grouped Subsections for Cloud & Cybersecurity */}
                    {cap.subsections ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-1">
                        {cap.subsections.map((sub) => {
                          const SubIcon = sub.icon || Cloud;
                          return (
                            <div
                              key={sub.label}
                              className="p-3.5 sm:p-4 rounded-xl bg-black/35 border border-white/[0.07] hover:border-[#c59b6d]/35 transition-colors"
                            >
                              <div className="text-xs sm:text-[12.5px] font-mono uppercase text-[#c59b6d] font-semibold tracking-wider mb-2.5 flex items-center gap-1.5">
                                <SubIcon className="w-4 h-4 text-[#c59b6d] shrink-0" />
                                <span>{sub.label}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {sub.skills.map((skill) => (
                                  <div
                                    key={skill}
                                    className="inline-flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-white/[0.04] text-[#e5ded5] border border-white/[0.07] hover:border-[#c59b6d]/60 hover:text-[#dfb88e] hover:bg-[#c59b6d]/10 transition-colors cursor-default group/subskill"
                                  >
                                    <SkillIcon name={skill} className="w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] shrink-0" />
                                    <span className="text-[13px] sm:text-[14px] font-mono font-medium tracking-tight group-hover/subskill:text-[#f7f4ee]">
                                      {skill}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      /* Clean Individual Chips with Real Technology Logos: 22-28px Logos, 14-16px Text */
                      <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-1">
                        {cap.skills?.map((skill) => (
                          <div
                            key={skill}
                            className="inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/[0.04] text-[#e5ded5] border border-white/[0.08] hover:border-[#c59b6d]/60 hover:text-[#dfb88e] hover:bg-[#c59b6d]/10 hover:scale-[1.02] transition-all duration-150 cursor-default group/skill shadow-sm"
                          >
                            <SkillIcon name={skill} className="w-6 h-6 sm:w-[26px] sm:h-[26px] shrink-0" />
                            <span className="text-sm sm:text-[14.5px] md:text-[15px] font-mono font-medium tracking-tight group-hover/skill:text-[#f7f4ee] transition-colors">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

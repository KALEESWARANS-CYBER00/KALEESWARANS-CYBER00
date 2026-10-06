'use client';

import { useState } from 'react';
import { ExternalLink, ShieldCheck, Flame, Trophy, Code2, Users, Search, Award } from 'lucide-react';
import CertificateModal, { CredentialItem } from '@/components/CertificateModal';

const milestones = [
  {
    platform: 'TryHackMe',
    role: 'Cybersecurity Practice & CTFs',
    metric: 'Top 4% Global',
    details: '114-day continuous streak, 93 completed rooms, 13 badges earned.',
    badge: '114-DAY STREAK',
    link: 'https://tryhackme.com/p/kalees',
    stats: [
      { label: 'GLOBAL RANK', value: 'TOP 4%' },
      { label: 'ROOMS COMPLETED', value: '93' },
      { label: 'BADGES EARNED', value: '13' },
    ],
    tags: ['Offensive Pentesting', 'Network Security', 'Privilege Escalation', 'Web Exploitation'],
  },
  {
    platform: 'LeetCode',
    role: 'Algorithms & Problem Solving',
    metric: '281 Solved',
    details: 'Global rank: 499,696. Core focus on Data Structures & Algorithms in Java and Python.',
    badge: 'RANK #499K',
    link: 'https://leetcode.com/u/kaleeswaran/',
    stats: [
      { label: 'PROBLEMS SOLVED', value: '281' },
      { label: 'PRIMARY STACK', value: 'Java / Python' },
      { label: 'CORE FOCUS', value: 'DSA & Complexity' },
    ],
    tags: ['Data Structures', 'Dynamic Programming', 'Graph Theory', 'Trees & Recursion'],
  },
  {
    platform: 'DEF CON Group Coimbatore',
    role: 'Community & Security Research',
    metric: 'DCG91422',
    details: 'Engaged with regional security practitioners, network labs, and threat discussions.',
    badge: 'ACTIVE RESEARCHER',
    link: null,
    stats: [
      { label: 'CHAPTER', value: 'DCG 91422' },
      { label: 'REGION', value: 'Coimbatore, IN' },
      { label: 'ENGAGEMENT', value: 'Threat Labs & Talks' },
    ],
    tags: ['Security Meetups', 'Hardware & RF Hacking', 'OSINT Labs', 'Red Team Talks'],
  },
];

const credentials: CredentialItem[] = [
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: '2025',
    id: 'P34KOVQ3ZEWA',
    category: 'Security',
    skills: ['Network Security', 'SIEM Tools', 'Python Scripting', 'Incident Response', 'SQL Auditing'],
  },
  {
    name: 'Linux Tools for Developers',
    issuer: 'Linux Foundation',
    date: '2026',
    id: 'JUC6RX8P20VU',
    category: 'Systems',
    skills: ['Linux Kernel Concepts', 'Bash Scripting', 'Git Version Control', 'Vim / CLI Tooling'],
  },
  {
    name: 'AWS: Compute, Storage and Containers',
    issuer: 'Whizlabs',
    date: '2025',
    id: 'NK1UL72MDCCX',
    category: 'Cloud',
    skills: ['EC2 Architecture', 'S3 Security', 'ECS & Docker Containers', 'IAM Policies'],
  },
  {
    name: 'Web Security, Social Engineering & External Attacks',
    issuer: 'Packt',
    date: '2026',
    id: '32O6QMUL7ZZ9',
    category: 'Security',
    skills: ['Web Attack Vectors', 'Social Engineering TTPs', 'External Reconnaissance', 'OWASP Top 10'],
  },
  {
    name: 'Connect and Protect: Networks and Network Security',
    issuer: 'Google',
    date: '2025',
    id: 'XGUVVQPXXRLF',
    category: 'Security',
    skills: ['TCP/IP Telemetry', 'Firewall Configurations', 'Wireshark Packet Analysis', 'Subnetting'],
  },
  {
    name: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    date: '2024',
    id: '4DAA5FDA25DB',
    category: 'Engineering',
    skills: ['Object-Oriented Programming', 'Data Structures', 'Exception Handling', 'Algorithms'],
  },
  {
    name: 'Tools of the Trade: Linux and SQL',
    issuer: 'Google',
    date: '2025',
    id: 'OAJVN0RJEBSJ',
    category: 'Security',
    skills: ['Linux CLI Commands', 'Database Queries', 'SQL Security', 'Bash Automation'],
  },
  {
    name: 'HTML and CSS in Depth',
    issuer: 'Meta',
    date: '2025',
    id: 'FN3YXK08D1H6',
    category: 'Engineering',
    skills: ['Semantic HTML5', 'Modern CSS3 Layouts', 'Responsive Architecture', 'Web Standards'],
  },
];

export default function ExperienceSection() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeCredential, setActiveCredential] = useState<CredentialItem | null>(null);

  const certCategories = ['ALL', 'Security', 'Cloud', 'Systems', 'Engineering'];

  const filteredCredentials = credentials.filter((c) => {
    if (selectedCategory === 'ALL') return true;
    return c.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section
      id="experience"
      className="py-16 sm:py-32 px-4 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase mb-2">
              TRACK RECORD & RECOGNITION
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-headline text-[#f7f4ee]">
              EXPERIENCE & MILESTONES<span className="text-[#c59b6d]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
            Documented problem-solving milestones, competitive security lab records, and accredited certifications.
          </p>
        </div>

        {/* Milestones Telemetry HUD Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 sm:mb-28">
          {milestones.map((item) => (
            <div
              key={item.platform}
              className="p-6 sm:p-8 bg-[#121316]/60 border border-white/[0.08] hover:border-[#c59b6d]/40 rounded-lg transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Platform Header & Live Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#c59b6d] uppercase tracking-wider font-semibold">
                    {item.platform}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#c59b6d]/15 text-[#dfb88e] border border-[#c59b6d]/30 font-semibold tracking-wide">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-light text-[#f7f4ee] mb-2 group-hover:text-[#dfb88e] transition-colors">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm text-[#a8a29e] font-light leading-relaxed mb-6">
                  {item.details}
                </p>

                {/* Telemetry Stats Rows */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#09090b]/80 border border-white/5 rounded mb-4 text-center">
                  {item.stats.map((st) => (
                    <div key={st.label} className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#a8a29e] uppercase">
                        {st.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#dfb88e]">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-[#d5cec5] border border-white/[0.05]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between text-xs font-mono text-[#dfb88e] hover:text-[#f7f4ee] transition-colors pt-4 border-t border-white/5"
                >
                  <span>VERIFY PUBLIC PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#a8a29e]">
                  COMMUNITY RESEARCH LAB
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Accreditations Table with Category Filter & Dossier Modal Trigger */}
        <div className="pt-4 sm:pt-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono text-[#a8a29e] uppercase tracking-widest mb-1">
                AUTHENTICATED CREDENTIALS
              </div>
              <h3 className="text-xl sm:text-3xl font-light text-[#f7f4ee] tracking-tight">
                Selected Accreditations & Credentials<span className="text-[#c59b6d]">.</span>
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {certCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#c59b6d] text-[#09090b] font-bold'
                      : 'bg-[#121316] text-[#a8a29e] hover:text-[#dfb88e] border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/[0.06] border-b border-white/[0.06]">
            {filteredCredentials.map((cert) => (
              <div
                key={cert.name}
                onClick={() => setActiveCredential(cert)}
                className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 group hover:bg-[#121316]/50 px-3 -mx-3 rounded transition-all cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d] group-hover:scale-125 transition-transform mt-1.5 sm:mt-0 shrink-0" />
                  <div>
                    <span className="text-xs sm:text-base font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors leading-snug block">
                      {cert.name}
                    </span>
                    {cert.skills && (
                      <span className="text-[10px] font-mono text-[#a8a29e] hidden md:inline-block mt-0.5">
                        {cert.skills.slice(0, 3).join(' • ')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono text-[#a8a29e] pl-4.5 sm:pl-0">
                  <span className="text-[#c59b6d] font-medium">{cert.issuer}</span>
                  <span className="hidden md:inline text-white/20">|</span>
                  <span className="hidden md:inline font-mono tracking-wider">{cert.id}</span>
                  <span className="hidden md:inline text-white/20">|</span>
                  <span>{cert.date}</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[#dfb88e] border border-white/10 text-[10px] group-hover:border-[#c59b6d]/40 transition-colors">
                    DOSSIER →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Verification Dossier Modal */}
      <CertificateModal
        credential={activeCredential}
        onClose={() => setActiveCredential(null)}
      />
    </section>
  );
}

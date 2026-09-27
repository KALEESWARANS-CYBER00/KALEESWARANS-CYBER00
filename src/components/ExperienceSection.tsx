'use client';

import { ExternalLink } from 'lucide-react';

const milestones = [
  {
    platform: 'TryHackMe',
    role: 'Cybersecurity Practice & CTFs',
    metric: 'Top 4% Global',
    details: '114-day continuous streak, 93 completed rooms, 13 badges earned.',
    link: 'https://tryhackme.com/p/kalees',
  },
  {
    platform: 'LeetCode',
    role: 'Algorithms & Problem Solving',
    metric: '281 Solved',
    details: 'Global rank: 499,696. Core focus on Data Structures & Algorithms in Java and Python.',
    link: null,
  },
  {
    platform: 'DEF CON Group Coimbatore',
    role: 'Community & Security Research',
    metric: 'DCG91422',
    details: 'Engaged with regional security practitioners, network labs, and threat discussions.',
    link: null,
  },
];

const credentials = [
  {
    name: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: '2025',
    id: 'P34KOVQ3ZEWA',
  },
  {
    name: 'Linux Tools for Developers',
    issuer: 'Linux Foundation',
    date: '2026',
    id: 'JUC6RX8P20VU',
  },
  {
    name: 'AWS: Compute, Storage and Containers',
    issuer: 'Whizlabs',
    date: '2025',
    id: 'NK1UL72MDCCX',
  },
  {
    name: 'Web Security, Social Engineering & External Attacks',
    issuer: 'Packt',
    date: '2026',
    id: '32O6QMUL7ZZ9',
  },
  {
    name: 'Connect and Protect: Networks and Network Security',
    issuer: 'Google',
    date: '2025',
    id: 'XGUVVQPXXRLF',
  },
  {
    name: 'Java (Basic) Certification',
    issuer: 'HackerRank',
    date: '2024',
    id: '4DAA5FDA25DB',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 px-6 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20">
          <div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
              EXPERIENCE & MILESTONES<span className="text-[#c59b6d]">.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
            Documented problem-solving milestones, competitive security lab records, and accredited certifications.
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {milestones.map((item) => (
            <div
              key={item.platform}
              className="p-8 bg-[#121316]/50 border border-white/[0.08] hover:border-[#c59b6d]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#c59b6d] uppercase tracking-wider">
                    {item.platform}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#c59b6d]/15 text-[#dfb88e] border border-[#c59b6d]/30">
                    {item.metric}
                  </span>
                </div>
                <h3 className="text-xl font-light text-[#f7f4ee] mb-2">{item.role}</h3>
                <p className="text-sm text-[#a8a29e] font-light leading-relaxed mb-6">
                  {item.details}
                </p>
              </div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#dfb88e] hover:text-[#f7f4ee] transition-colors mt-auto pt-4 border-t border-white/5"
                >
                  <span>VERIFY PUBLIC PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Accreditations Table */}
        <div className="pt-8">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
            <h3 className="text-xl sm:text-2xl font-light text-[#f7f4ee] tracking-tight">
              Selected Accreditations & Credentials
            </h3>
            <span className="text-xs font-mono text-[#a8a29e]">VERIFIED CERTIFICATES</span>
          </div>

          <div className="divide-y divide-white/[0.06] border-b border-white/[0.06]">
            {credentials.map((cert) => (
              <div
                key={cert.name}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#121316]/30 px-2 -mx-2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
                  <span className="text-sm font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors">
                    {cert.name}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-[#a8a29e] pl-6 sm:pl-0">
                  <span className="text-[#c59b6d]">{cert.issuer}</span>
                  <span className="hidden md:inline text-white/20">|</span>
                  <span className="hidden md:inline">{cert.id}</span>
                  <span className="hidden md:inline text-white/20">|</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'RedAlert EDR',
    description: 'Offline Endpoint Detection & Response system for real-time monitoring and threat detection.',
    tags: ['Python', 'Linux', 'Security', 'Automation'],
    github: 'https://github.com/KALEESWARANS-CYBER00/redalert-edr',
  },
  {
    title: 'ClickTrap',
    description: 'Cybersecurity awareness simulator demonstrating social engineering attacks through disguised files.',
    tags: ['React', 'JavaScript', 'Social Engineering'],
    github: 'https://github.com/KALEESWARANS-CYBER00/clicktrap',
  },
  {
    title: 'SQLi-Report',
    description: 'CLI-based SQL injection detection tool with automated reporting system.',
    tags: ['Python', 'SQL Injection', 'Penetration Testing'],
    github: 'https://github.com/KALEESWARANS-CYBER00/sqli-report',
  },
  {
    title: 'DNS Lab',
    description: 'Dockerized DNS environment for testing resolution, caching, and network analysis.',
    tags: ['Docker', 'Networking', 'DNS Security'],
    github: 'https://github.com/KALEESWARANS-CYBER00/dns-lab',
  },
  {
    title: 'Authify',
    description: 'Secure authentication system with OTP login and REST API-based user management.',
    tags: ['Node.js', 'Express', 'JWT', 'Security'],
    github: 'https://github.com/KALEESWARANS-CYBER00/authify',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 lg:px-12 bg-[#0b0c0e] relative border-t border-[#c59b6d]/10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          badge="Featured Engineering"
          title="Security Projects" 
          subtitle="A selection of technical projects focused on offensive testing, endpoint security, and defensive tooling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} {...project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

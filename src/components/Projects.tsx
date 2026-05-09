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
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Featured Projects" 
          subtitle="A selection of my technical projects focused on security engineering and tool development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} {...project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

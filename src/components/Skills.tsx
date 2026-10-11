'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import SkillIcon from './SkillIcon';
import {
  Shield,
  Terminal,
  Wrench,
  Cloud,
  Database,
  Cpu,
  Code2,
  Server,
  Layers,
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Cybersecurity',
    icon: Shield,
    skills: [
      'Offensive Security & Red Teaming',
      'Penetration Testing (VAPT)',
      'Web Application & API Security',
      'Network & Cloud Security',
      'Active Directory Security',
      'Linux & Windows Security',
      'Security Assessment & Auditing',
      'Threat Modeling & Research',
    ],
  },
  {
    title: 'Exploit Dev & Offensive',
    icon: Terminal,
    skills: [
      'Exploit Development',
      'Vulnerability Research',
      'Binary & Web Exploitation',
      'Reverse Engineering',
      'Shellcode & Payload Engineering',
      'Privilege Escalation & Initial Access',
      'Lateral Movement & Post-Exploitation',
      'Persistence & C2 Techniques',
      'Attack Surface Analysis & CTF',
    ],
  },
  {
    title: 'Security Tools & Technologies',
    icon: Wrench,
    skills: [
      'Burp Suite & Nmap',
      'Metasploit Framework',
      'Wireshark Network Dissection',
      'Gobuster, ffuf & sqlmap',
      'Hydra, John the Ripper, Hashcat',
      'Netcat, Ghidra, pwndbg, GDB',
      'Docker, Git, GitHub, Linux, Bash',
      'Python for Security Automation',
    ],
  },
  {
    title: 'Cloud & AWS',
    icon: Cloud,
    badge: 'AWS Certified Cloud Practitioner — In Progress',
    skills: [
      'AWS Cloud Fundamentals',
      'Compute: EC2, Lambda, ECS, EKS, ECR',
      'Storage & DB: S3, RDS, DynamoDB',
      'Networking: VPC, CloudFront, Route 53',
      'Security: IAM, Secrets Manager, KMS, WAF',
      'Shield, ACM, GuardDuty, Security Hub',
      'Governance: CloudWatch, CloudTrail, Config',
      'DevOps: CodePipeline, CloudFormation',
    ],
  },
  {
    title: 'Full-Stack Development',
    icon: Layers,
    skills: [
      'Full-Stack Web Development',
      'Java, Spring Boot',
      'React.js, Node.js, Express.js',
      'TypeScript, JavaScript',
      'Python — Basic Application Dev',
      'HTML5 & Modern CSS3 Layouts',
      'REST APIs & Microservices',
      'OOP, Data Structures & Algorithms',
    ],
  },
  {
    title: 'Databases & Data Technologies',
    icon: Database,
    skills: [
      'MySQL & MariaDB',
      'PostgreSQL',
      'MongoDB (NoSQL)',
      'Redis (In-Memory Caching)',
      'Database Design & Normalization',
      'SQL & NoSQL Query Engineering',
      'Database Optimization & Performance',
    ],
  },
  {
    title: 'Messaging & Distributed Systems',
    icon: Cpu,
    skills: [
      'Apache Kafka Event Streaming',
      'Event-Driven Architecture',
      'Message Queues & Work Distribution',
      'Distributed Systems Engineering',
      'Asynchronous Processing Workflows',
    ],
  },
  {
    title: 'Programming & Scripting',
    icon: Code2,
    skills: [
      'Java (Enterprise & DSA)',
      'Python (Automation & Security)',
      'JavaScript & TypeScript',
      'C & C++ (Systems Mechanics)',
      'Bash (Linux Shell Automation)',
      'SQL (Relational Queries)',
    ],
  },
  {
    title: 'DevOps & Engineering',
    icon: Server,
    skills: [
      'Git & GitHub Version Control',
      'Docker Containerization',
      'CI/CD Pipeline Automation',
      'Linux Systems Administration',
      'REST APIs & Microservices',
      'Cloud Deployment & Infrastructure',
      'Application Security Fundamentals',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-4 sm:px-8 lg:px-14 xl:px-16 bg-[#0b0c0e] relative border-t border-[#c59b6d]/10 w-full">
      <div className="w-full">
        <SectionHeader 
          badge="Technical Capability"
          title="Core Skills & Toolsets" 
          subtitle="Specialized competencies spanning offensive security, cloud architecture, and full-stack engineering."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-14">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-[#141211]/80 p-5 sm:p-6 lg:p-6.5 rounded-2xl border border-[#c59b6d]/20 hover:border-[#c59b6d]/50 hover:bg-[#1a1614] transition-all duration-300 group flex flex-col shadow-lg"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <h3 className="text-lg sm:text-[20px] font-mono font-bold text-[#f7f4ee] tracking-tight">{category.title}</h3>
                <div className="w-11 h-11 rounded-xl bg-[#c59b6d]/15 border border-[#c59b6d]/30 flex items-center justify-center text-[#dfb88e] shrink-0">
                  <category.icon className="w-5.5 h-5.5" />
                </div>
              </div>

              {category.badge && (
                <div className="mb-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#c59b6d]/10 border border-[#c59b6d]/30 text-xs font-mono text-[#dfb88e]">
                  <span className="w-2 h-2 rounded-full bg-[#dfb88e] animate-pulse" />
                  <span>{category.badge}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-1">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/[0.04] text-[#e5ded5] border border-white/[0.08] hover:border-[#c59b6d]/60 hover:text-[#dfb88e] hover:bg-[#c59b6d]/10 transition-colors cursor-default"
                  >
                    <SkillIcon name={skill} className="w-6 h-6 sm:w-[26px] sm:h-[26px] shrink-0" />
                    <span className="text-sm sm:text-[14.5px] font-mono font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

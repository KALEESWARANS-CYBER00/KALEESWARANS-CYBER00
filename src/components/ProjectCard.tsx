'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  index: number;
}

const getGitHubUrl = (github?: string) => {
  if (!github) return undefined;
  return github.startsWith('http') ? github : `https://github.com/${github}`;
};

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  link, 
  github, 
  image,
  index 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-[#141211]/80 rounded-2xl border border-[#c59b6d]/20 overflow-hidden hover:border-[#c59b6d]/50 hover:bg-[#191513] transition-all duration-300 hover:-translate-y-1 shadow-lg"
    >
      <div className="aspect-video w-full bg-[#1c1714]/80 relative overflow-hidden border-b border-[#c59b6d]/15">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-[#c59b6d]/10 rounded-2xl flex items-center justify-center border border-[#c59b6d]/20 group-hover:scale-110 transition-transform">
              <Github className="text-[#c59b6d] group-hover:text-[#dfb88e] transition-colors w-7 h-7" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors tracking-tight">
            {title}
          </h3>
          <div className="flex gap-3">
            {github && (
              <a 
                href={getGitHubUrl(github)} 
                className="text-[#a8a29e] hover:text-[#dfb88e] transition-colors p-1" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${title}`}
              >
                <Github size={18} />
              </a>
            )}
            {link && (
              <a 
                href={link} 
                className="text-[#a8a29e] hover:text-[#dfb88e] transition-colors p-1" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`External link for ${title}`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-[#d5cec5] text-sm mb-6 font-light leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-mono px-2.5 py-1 bg-[#1e1915] text-[#dfb88e] border border-[#c59b6d]/20 rounded-md uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

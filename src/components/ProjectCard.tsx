'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  index: number;
}

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
      transition={{ delay: index * 0.1 }}
      className="group relative bg-card-bg/40 rounded-2xl border border-white/5 overflow-hidden hover:border-cyber-green/30 transition-all hover:translate-y-[-4px]"
    >
      <div className="aspect-video w-full bg-cyber-green/5 relative overflow-hidden">
        {/* Project Thumbnail Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Github className="text-gray-600 group-hover:text-cyber-green transition-colors" />
            </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60" />
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-cyber-green transition-colors">
            {title}
          </h3>
          <div className="flex gap-4">
            {github && (
              <a href={github} className="text-gray-400 hover:text-white" target="_blank">
                <Github size={20} />
              </a>
            )}
            {link && (
              <a href={link} className="text-gray-400 hover:text-white" target="_blank">
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-mono px-2 py-1 bg-white/5 text-gray-400 rounded-md uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

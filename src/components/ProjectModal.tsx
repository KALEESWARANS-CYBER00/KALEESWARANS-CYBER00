'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ShieldAlert, Cpu, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface ProjectSpec {
  id: string;
  name: string;
  category: string;
  year: string;
  github: string;
  description: string;
  tags: string[];
  threatVector?: string;
  architecture?: string[];
  keyCapabilities?: string[];
  status?: string;
}

interface ProjectModalProps {
  project: ProjectSpec | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#09090b]/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#0e1013] border border-[#c59b6d]/40 rounded-lg shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_32px_rgba(197,155,109,0.12)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#14161a] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b6d] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c59b6d]" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb88e]">
                  ARCHITECTURE_SPEC // {project.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-light text-[#f7f4ee] tracking-tight">
                  {project.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#a8a29e] hover:text-[#f7f4ee] hover:bg-white/10 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6 font-sans">
            {/* Primary Overview */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8a29e] mb-2">
                SYSTEM SPECIFICATION & MISSION
              </div>
              <p className="text-sm sm:text-base text-[#d5cec5] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Threat Vector / Defensive Scope */}
            {project.threatVector && (
              <div className="p-4 bg-[#181513]/70 border border-[#c59b6d]/30 rounded">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#dfb88e] mb-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#c59b6d]" />
                  <span>Threat Vector & Security Scope</span>
                </div>
                <p className="text-xs sm:text-sm text-[#d5cec5] font-light leading-relaxed">
                  {project.threatVector}
                </p>
              </div>
            )}

            {/* Architectural Modules */}
            {project.architecture && project.architecture.length > 0 && (
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8a29e] mb-3 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#c59b6d]" />
                  <span>ENGINEERING HIGHLIGHTS & DESIGN</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white/[0.02] border border-white/[0.06] rounded flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#d5cec5] font-light leading-snug">
                        {arch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Tags */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8a29e] mb-2.5">
                DEPLOYED TECHNOLOGIES & PROTOCOLS
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded bg-[#c59b6d]/10 text-[#dfb88e] border border-[#c59b6d]/25"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar with Action Links */}
          <div className="px-5 py-4 bg-[#14161a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-xs font-mono text-[#a8a29e]">
              RELEASE YEAR: <span className="text-[#f7f4ee]">{project.year}</span>
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all rounded w-full sm:w-auto"
              >
                <span>OPEN REPOSITORY</span>
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

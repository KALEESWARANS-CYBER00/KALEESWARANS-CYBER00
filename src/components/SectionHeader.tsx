'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export default function SectionHeader({ title, subtitle, badge }: SectionHeaderProps) {
  return (
    <div className="mb-14">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {badge && (
          <div className="inline-block text-[11px] font-mono uppercase tracking-widest text-[#dfb88e] bg-[#1a1614] border border-[#c59b6d]/30 px-3 py-1 rounded-full mb-3">
            {badge}
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#f7f4ee] mb-4">
          {title}
          <span className="text-[#c59b6d]">.</span>
        </h2>
        {subtitle && (
          <p className="text-[#d5cec5] text-base md:text-lg max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="h-[2px] w-16 bg-gradient-to-r from-[#c59b6d] to-transparent mt-5 rounded-full" />
      </motion.div>
    </div>
  );
}

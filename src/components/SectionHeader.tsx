'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
          <span className="text-cyber-green">.</span>
        </h2>
        {subtitle && (
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="h-1 w-20 bg-cyber-green mt-4 rounded-full" />
      </motion.div>
    </div>
  );
}

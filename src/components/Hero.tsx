'use client';

import { motion } from 'framer-motion';
import { Download, ChevronRight, ShieldCheck, Activity } from 'lucide-react';
import TerminalText from './TerminalText';
import HeroScene from './HeroScene';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden relative bg-dark-bg">
      {/* Immersive 3D Space Background */}
      <HeroScene />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-dark-bg via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-dark-bg to-transparent opacity-90" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 pt-10 lg:pt-0">

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="col-span-1 lg:col-span-7 flex flex-col items-start"
        >
          

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold mb-4 tracking-tighter leading-tight drop-shadow-2xl">
            I am <span className="splash-gradient block mt-1">KALEESWARAN S</span>
          </h1>

          <div className="text-xl md:text-3xl text-gray-200 font-semibold mb-8 flex items-center gap-3 h-12">
            <ChevronRight className="text-cyber-green w-8 h-8" />
            <TerminalText texts={['Cybersecurity Analyst', 'Security Operations', 'Threat Intelligence']} />
          </div>

          <p className="splash-gradient text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-light">
            Architecting threat-resilient systems and conducting elite security analysis to safeguard digital frontiers against advanced, modern adversaries.
          </p>

          <div className="flex flex-wrap gap-5 w-full md:w-auto">
            <a
              href="#projects"
              className="px-8 py-4 bg-cyber-green text-dark-bg font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Analyze Portfolio
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/KALEESWARAN_S-RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-slate-700 bg-slate-900/50 backdrop-blur-md text-gray-100 font-bold text-lg rounded-xl hover:border-cyber-cyan hover:text-cyber-cyan transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Cinematic Avatar Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="col-span-1 lg:col-span-5 relative mt-12 lg:mt-0 w-full max-w-[480px] mx-auto hidden md:block"
        >
          {/* Avatar Glass Card */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_0_80px_rgba(6,182,212,0.2)] border border-white/10 group bg-slate-900/40 backdrop-blur-lg">

            <img
              src="/avatar.png"
              alt="Kaleeswaran S - Cybersecurity Analyst"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
            />

            {/* Tech overlays over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent opacity-80" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl"></div>

            {/* UI overlay badges floating on the avatar */}
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xs font-mono text-gray-200">Verified</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyber-green/20 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-cyber-green" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-wide">Threat Monitoring</div>
                  <div className="text-xs font-mono text-cyber-green mt-1">Active scanning...</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-cyber-cyan drop-shadow-md">99%</div>
              </div>
            </div>
          </div>

          {/* External decorative accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-cyan/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyber-green/20 rounded-full blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}

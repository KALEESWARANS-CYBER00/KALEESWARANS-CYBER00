'use client';

import { motion } from 'framer-motion';
import { Terminal, Download, Send, ChevronRight } from 'lucide-react';
import TerminalText from './TerminalText';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            I am <span className="block text-cyber-green mt-2">KALEESWARAN S</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-400 font-mono mb-8 flex items-center gap-2 h-10">
            <ChevronRight className="text-cyber-green" />
            <TerminalText texts={['Cybersecurity Analyst', 'SOC Analyst', 'Security Researcher']} />
          </div>

          <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
            Protecting systems, detecting threats, and analyzing vulnerabilities through real-world security practice.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-cyber-green text-dark-bg font-bold rounded-lg hover:bg-cyber-green/90 transition-all flex items-center gap-2 group"
            >
              View Projects
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/KALEESWARAN_S-RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-cyber-green text-cyber-green font-bold rounded-lg hover:bg-cyber-green/10 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="w-full aspect-square bg-cyber-green/5 rounded-3xl border border-cyber-green/10 relative overflow-hidden flex items-center justify-center">
            {/* Mock terminal window */}
            <div className="w-[85%] bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-gray-500 font-mono ml-2">bash — kaleeswaran@security-lab</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="flex gap-2 text-cyber-green">
                  <span>$</span>
                  <span>whoami</span>
                </div>
                <div className="text-gray-300 ml-4">kaleeswaran_s</div>
                <div className="flex gap-2 text-cyber-green">
                  <span>$</span>
                  <span>ls skills/core</span>
                </div>
                <div className="text-gray-400 ml-4 grid grid-cols-2 gap-2">
                  <span>- network_security</span>
                  <span>- threat_detection</span>
                  <span>- vuln_assessment</span>
                  <span>- incident_response</span>
                </div>
                <div className="flex gap-2 text-cyber-green">
                  <span>$</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyber-green/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

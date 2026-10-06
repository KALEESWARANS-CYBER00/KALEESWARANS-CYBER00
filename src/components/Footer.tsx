'use client';

import { ArrowUp, Terminal, Shield } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-20 px-4 sm:px-12 lg:px-16 bg-[#09090b] border-t border-white/[0.08] text-xs font-mono text-[#a8a29e]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Identity, Quote, Sitemap, Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
          {/* Left: Identity & Quote */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <div className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#f7f4ee] mb-2 flex items-center gap-2">
                <span>KALEESWARAN S</span>
                <span className="text-[#c59b6d] animate-pulse">_</span>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] sm:text-[11px] tracking-wider text-[#c59b6d]">
                <span>RED TEAM OPERATIONS</span>
                <span>CLOUD SECURITY ARCHITECTURE</span>
                <span>FULL-STACK SYSTEMS ENGINEERING</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#a8a29e] italic border-l-2 border-[#c59b6d]/40 pl-3">
              &ldquo;Every system has an attack surface. Every weakness has a story.&rdquo;
            </div>
          </div>

          {/* Center: Sitemap Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="text-[10px] uppercase tracking-widest text-[#f7f4ee] font-semibold mb-3">
              SYSTEM SITEMAP_
            </div>
            <div className="flex flex-col gap-2 text-[11px]">
              <a href="#work" className="hover:text-[#dfb88e] transition-colors flex items-center gap-1.5">
                <span className="text-[#c59b6d]">&gt;</span> Selected Work
              </a>
              <a href="#about" className="hover:text-[#dfb88e] transition-colors flex items-center gap-1.5">
                <span className="text-[#c59b6d]">&gt;</span> About &amp; Competencies
              </a>
              <a href="#experience" className="hover:text-[#dfb88e] transition-colors flex items-center gap-1.5">
                <span className="text-[#c59b6d]">&gt;</span> Milestones &amp; Credentials
              </a>
              <a href="#contact" className="hover:text-[#dfb88e] transition-colors flex items-center gap-1.5">
                <span className="text-[#c59b6d]">&gt;</span> Transmit Inquiry
              </a>
              <a
                href="/KALEESWARAN_S-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#dfb88e] transition-colors flex items-center gap-1.5 text-[#dfb88e]"
              >
                <span className="text-[#c59b6d]">&gt;</span> Curriculum Vitae [PDF]
              </a>
            </div>
          </div>

          {/* Right: Direct Channels */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-[10px] uppercase tracking-widest text-[#f7f4ee] font-semibold mb-3">
              OPERATOR CHANNELS_
            </div>
            <div className="flex flex-col gap-2 text-[11px]">
              <a
                href="https://github.com/KALEESWARANS-CYBER00"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
              >
                GitHub // @KALEESWARANS-CYBER00
              </a>
              <a
                href="https://tryhackme.com/p/kalees"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
              >
                TryHackMe // @kalees (Top 4%)
              </a>
              <a
                href="https://www.linkedin.com/in/kaleeswarans25/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
              >
                LinkedIn // kaleeswarans25
              </a>
              <a
                href="mailto:kaleeswaran.bcy24@rathinam.in"
                className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
              >
                Email // kaleeswaran.bcy24@rathinam.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Return to Top & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-[11px] text-[#a8a29e]/70 flex items-center gap-2">
            <span>sys.exit(0) // © 2026 KALEESWARAN S. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Terminate & Return to Top Button (Reference Inspired) */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#121316] border border-white/10 hover:border-[#c59b6d]/60 text-[#d5cec5] hover:text-[#dfb88e] text-[11px] font-mono tracking-wider transition-all duration-300 group cursor-pointer active:scale-95"
            aria-label="Return to top of page"
          >
            <span className="text-[#c59b6d]">&gt;</span>
            <span>[ Terminate &amp; Return to Top ]</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent border-b border-white/[0.05] py-5 sm:py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          {/* Left: Brand Identity & Live Status Beacon */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#"
              className="group text-sm sm:text-base font-light tracking-[0.2em] uppercase text-[#f7f4ee] hover:text-[#dfb88e] transition-colors"
            >
              <span>KALEESWARAN S</span>
            </a>

            {/* Subtle Divider */}
            <span className="hidden sm:inline-block w-px h-3.5 bg-white/15" />

            {/* Live Operational Status Beacon */}
            <div className="hidden sm:inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#a8a29e] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b6d] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c59b6d]" />
              </span>
              <span className="text-[#dfb88e]/90 font-medium">RED TEAM & SYSTEMS</span>
            </div>
          </div>

          {/* Right: Sleek Desktop Navigation & Bronze CV Action */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono tracking-[0.2em] text-[#d5cec5]/80 hover:text-[#f7f4ee] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c59b6d] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}

            {/* Architectural Bronze CV Action */}
            <a
              href="/KALEESWARAN_S-RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c59b6d]/40 bg-[#181513]/60 hover:bg-[#c59b6d] hover:text-[#09090b] text-[#dfb88e] text-xs font-mono uppercase tracking-widest transition-all duration-300 font-semibold group rounded shadow-[0_2px_12px_rgba(197,155,109,0.15)]"
            >
              <span>CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded text-xs font-mono tracking-widest text-[#dfb88e] hover:text-[#f7f4ee] uppercase"
            aria-label="Open menu"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-[#09090b] flex flex-col justify-between p-8 sm:p-12 md:hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b6d] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c59b6d]" />
                </span>
                <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#dfb88e]">
                  RED TEAM & SYSTEMS
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono tracking-[0.2em] uppercase text-[#a8a29e] hover:text-[#f7f4ee]"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Drawer Nav Links */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl sm:text-4xl font-light tracking-tight text-[#f7f4ee] hover:text-[#dfb88e] transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-6 border-t border-white/10">
                <a
                  href="/KALEESWARAN_S-RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all"
                >
                  <span>CURRICULUM VITAE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="text-[11px] font-mono tracking-widest text-[#a8a29e]/60 uppercase pt-6 border-t border-white/10 flex items-center justify-between">
              <span>KALEESWARAN S</span>
              <span>2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { audioManager } from '@/lib/audio';

const navLinks = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const toggleAudio = () => {
    audioManager.toggle();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    const isFs =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    if (!isFs) {
      const el = document.documentElement as any;
      const requestMethod =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
      if (requestMethod) {
        try {
          requestMethod.call(el)?.catch?.(() => {});
        } catch {}
      }
    } else {
      const exitMethod =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;
      if (exitMethod) {
        try {
          exitMethod.call(document)?.catch?.(() => {});
        } catch {}
      }
    }
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 flex items-center justify-between">
          {/* Left: Brand Identity & Live Status Beacon */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="#"
              className="group text-xs sm:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#f7f4ee] hover:text-[#dfb88e] transition-colors"
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
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
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

            {/* Audio Toggle Action (Hip Hop Beats) */}
            <button
              onClick={toggleAudio}
              className="flex items-center gap-2 px-2.5 py-1.5 border border-[#c59b6d]/30 bg-[#121316]/60 hover:border-[#c59b6d] rounded text-[#dfb88e] transition-all group cursor-pointer shadow-[0_2px_12px_rgba(197,155,109,0.1)]"
              title={isPlaying ? 'Click to Mute Music' : 'Click to Play Music (Hip Hop Beats)'}
              aria-label={isPlaying ? 'Mute background audio' : 'Play background audio'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5">
                    <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.6s_ease-in-out_infinite] h-full rounded-full" />
                    <span className="w-[2px] bg-[#dfb88e] animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-3/4 rounded-full" />
                    <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2/3 rounded-full" />
                    <span className="w-[2px] bg-[#dfb88e] animate-[pulse_0.8s_ease-in-out_infinite_0.1s] h-4/5 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-[#dfb88e] font-semibold">MUSIC: ON</span>
                  <span className="text-[9px] font-mono text-[#a8a29e] group-hover:text-[#f7f4ee]">[MUTE]</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#a8a29e] group-hover:text-[#dfb88e] transition-colors" />
                  <span className="text-[10px] font-mono tracking-wider text-[#a8a29e]">MUTED</span>
                </>
              )}
            </button>

            {/* Fullscreen Toggle Action */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 border border-white/10 hover:border-[#c59b6d]/60 rounded text-[#d5cec5] hover:text-[#dfb88e] transition-colors group cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </nav>

          {/* Mobile Actions: Audio + Fullscreen + Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#c59b6d]/30 bg-[#121316]/80 rounded text-[#dfb88e] active:scale-95 transition-transform"
              title={isPlaying ? 'Click to Mute Music' : 'Click to Play Music'}
              aria-label={isPlaying ? 'Mute background audio' : 'Play background audio'}
            >
              {isPlaying ? (
                <>
                  <div className="flex items-end gap-[2px] h-3.5 w-3 pb-0.5">
                    <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.6s_ease-in-out_infinite] h-full rounded-full" />
                    <span className="w-[2px] bg-[#dfb88e] animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-3/4 rounded-full" />
                    <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2/3 rounded-full" />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider text-[#dfb88e]">MUTE</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#a8a29e]" />
                  <span className="text-[9px] font-mono tracking-wider text-[#a8a29e]">PLAY</span>
                </>
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 border border-white/10 rounded text-[#dfb88e] active:scale-95 transition-transform"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 rounded text-xs font-mono tracking-widest text-[#dfb88e] hover:text-[#f7f4ee] uppercase active:scale-95 transition-transform"
              aria-label="Open menu"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]" />
              <span>MENU</span>
            </button>
          </div>
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
            className="fixed inset-0 z-[90] bg-[#09090b] flex flex-col justify-between p-6 sm:p-12 md:hidden overflow-y-auto overscroll-contain"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
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
                className="text-xs font-mono tracking-[0.2em] uppercase text-[#a8a29e] hover:text-[#f7f4ee] p-2 -mr-2"
              >
                CLOSE [×]
              </button>
            </div>

            {/* Drawer Nav Links */}
            <div className="flex flex-col gap-5 sm:gap-6 my-auto py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl xs:text-3xl sm:text-4xl font-light tracking-tight text-[#f7f4ee] hover:text-[#dfb88e] transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                {/* Audio soundtrack controller inside drawer */}
                <button
                  onClick={toggleAudio}
                  className="flex items-center justify-between p-3.5 rounded bg-[#121316] border border-white/10 text-left active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-3">
                    {isPlaying ? (
                      <div className="flex items-end gap-[2px] h-4 w-4 pb-0.5">
                        <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.6s_ease-in-out_infinite] h-full rounded-full" />
                        <span className="w-[2px] bg-[#dfb88e] animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-3/4 rounded-full" />
                        <span className="w-[2px] bg-[#c59b6d] animate-[pulse_0.7s_ease-in-out_infinite_0.4s] h-2/3 rounded-full" />
                      </div>
                    ) : (
                      <VolumeX className="w-4 h-4 text-[#a8a29e]" />
                    )}
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#dfb88e]">
                        SOUNDTRACK // BEATS
                      </div>
                      <div className="text-[10px] text-[#a8a29e] font-mono">
                        {isPlaying ? 'HIP HOP [PLAYING]' : 'AUDIO [MUTED]'}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[#c59b6d]/15 border border-[#c59b6d]/30 text-[#dfb88e]">
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </span>
                </button>

                <a
                  href="/KALEESWARAN_S-RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all"
                >
                  <span>CURRICULUM VITAE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center justify-center gap-2 py-3 border border-white/10 text-xs font-mono tracking-widest uppercase text-[#dfb88e]"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>EXIT FULLSCREEN</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span>ENTER FULLSCREEN</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="text-[11px] font-mono tracking-widest text-[#a8a29e]/60 uppercase pt-5 border-t border-white/10 flex items-center justify-between shrink-0">
              <span>KALEESWARAN S</span>
              <span>2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

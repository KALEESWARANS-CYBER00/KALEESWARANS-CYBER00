'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Search,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText,
  Shield,
  Layers,
  User,
  Send,
  X,
  CornerDownLeft,
} from 'lucide-react';
import { audioManager } from '@/lib/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [commandHistory, setCommandHistory] = useState<
    Array<{ cmd: string; output: string | React.ReactNode }>
  >([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = audioManager.subscribe((p) => setIsPlaying(p));
    return () => unsub();
  }, []);

  useEffect(() => {
    const checkFs = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
    };
    document.addEventListener('fullscreenchange', checkFs);
    return () => document.removeEventListener('fullscreenchange', checkFs);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const toggleFs = () => {
    if (typeof document === 'undefined') return;
    const isFs =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement;

    if (!isFs) {
      const el = document.documentElement as any;
      const req =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
      req?.call(el)?.catch?.(() => {});
    } else {
      const exit =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).mozCancelFullScreen ||
        (document as any).msExitFullscreen;
      exit?.call(document)?.catch?.(() => {});
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-[#d5cec5]">
            <p className="text-[#dfb88e] font-bold">AVAILABLE PROTOCOLS & COMMANDS:</p>
            <p><span className="text-[#c59b6d]">whoami</span> - Display operator profile and classification</p>
            <p><span className="text-[#c59b6d]">projects</span> - Jump to security and engineering works</p>
            <p><span className="text-[#c59b6d]">skills</span> - Display offensive & full-stack competencies</p>
            <p><span className="text-[#c59b6d]">certs</span> - Display accredited credentials & certifications</p>
            <p><span className="text-[#c59b6d]">contact</span> - Jump to secure transmission channels</p>
            <p><span className="text-[#c59b6d]">resume</span> - Download Curriculum Vitae (PDF)</p>
            <p><span className="text-[#c59b6d]">audio</span> - Toggle background soundtrack (Beats)</p>
            <p><span className="text-[#c59b6d]">fullscreen</span> - Toggle fullscreen display mode</p>
            <p><span className="text-[#c59b6d]">clear</span> - Clear terminal session output</p>
            <p><span className="text-[#c59b6d]">exit</span> - Terminate command session</p>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="space-y-1 text-xs font-mono text-[#d5cec5]">
            <p className="text-[#dfb88e] font-bold">OPERATOR: KALEESWARAN S</p>
            <p>ROLE: Red Team Security Specialist & Full-Stack Software Engineer</p>
            <p>RANK: Top 4% Global on TryHackMe (114-Day Streak, 93 Rooms)</p>
            <p>INSTITUTION: BS Computer Science (Cybersecurity), Rathinam Global University</p>
            <p>COMMUNITY: DEF CON Group Coimbatore (DCG91422)</p>
          </div>
        );
        break;

      case 'projects':
      case 'work':
        window.location.hash = '#work';
        onClose();
        return;

      case 'about':
      case 'skills':
        window.location.hash = '#about';
        onClose();
        return;

      case 'experience':
      case 'certs':
      case 'certifications':
        window.location.hash = '#experience';
        onClose();
        return;

      case 'contact':
        window.location.hash = '#contact';
        onClose();
        return;

      case 'resume':
      case 'cv':
        window.open('/KALEESWARAN_S-RESUME.pdf', '_blank');
        output = 'Opening official Curriculum Vitae in new tab...';
        break;

      case 'audio':
      case 'music':
        audioManager.toggle();
        output = `Audio state toggled: ${!isPlaying ? 'PLAYING [ON]' : 'MUTED [OFF]'}`;
        break;

      case 'fullscreen':
      case 'fs':
        toggleFs();
        output = 'Toggled fullscreen mode.';
        break;

      case 'clear':
      case 'cls':
        setCommandHistory([]);
        setQuery('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = `Command not recognized: "${trimmed}". Type 'help' for available commands.`;
        break;
    }

    setCommandHistory((prev) => [...prev, { cmd: query, output }]);
    setQuery('');
  };

  const quickNavActions = [
    {
      label: 'Selected Projects & Security Tooling',
      category: 'NAVIGATION',
      shortcut: '#work',
      icon: Layers,
      action: () => {
        window.location.hash = '#work';
        onClose();
      },
    },
    {
      label: 'About Operator & Technical Competencies',
      category: 'NAVIGATION',
      shortcut: '#about',
      icon: User,
      action: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      label: 'Experience, Lab Telemetry & Certifications',
      category: 'NAVIGATION',
      shortcut: '#experience',
      icon: Shield,
      action: () => {
        window.location.hash = '#experience';
        onClose();
      },
    },
    {
      label: 'Secure Transmission / Contact Protocol',
      category: 'COMMUNICATION',
      shortcut: '#contact',
      icon: Send,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },
    {
      label: 'Download Curriculum Vitae (PDF)',
      category: 'DOSSIER',
      shortcut: 'CV',
      icon: FileText,
      action: () => {
        window.open('/KALEESWARAN_S-RESUME.pdf', '_blank');
        onClose();
      },
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop with cyber blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09090b]/85 backdrop-blur-md"
          />

          {/* Modal Terminal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-[#0e1013] border border-[#c59b6d]/40 rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(197,155,109,0.15)] overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#14161a] border-b border-white/10 shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80 inline-block" />
                <span className="text-[11px] font-mono text-[#a8a29e] tracking-wider ml-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#c59b6d]" />
                  <span>root@kalees-sec:~ [COMMAND_NAVIGATOR]</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-mono text-[#a8a29e] hover:text-[#f7f4ee] px-2 py-1 rounded hover:bg-white/5 transition-colors"
              >
                ESC [×]
              </button>
            </div>

            {/* Terminal Live Output Area (if commands entered) */}
            {commandHistory.length > 0 && (
              <div
                ref={terminalScrollRef}
                className="p-4 bg-[#09090b]/90 border-b border-white/10 font-mono text-xs max-h-48 overflow-y-auto space-y-3 shrink-0"
              >
                {commandHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-[#c59b6d]">
                      <span>guest@kalees-sec:~$</span>
                      <span className="text-[#f7f4ee]">{item.cmd}</span>
                    </div>
                    <div className="pl-4 text-[#d5cec5]">{item.output}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleCommandSubmit}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#121316] shrink-0"
            >
              <span className="text-xs font-mono text-[#c59b6d] shrink-0">
                guest@kalees-sec:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command ('help', 'projects', 'whoami') or jump..."
                className="w-full bg-transparent text-sm font-mono text-[#f7f4ee] placeholder-[#a8a29e]/50 outline-none"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-[#c59b6d]/20 hover:bg-[#c59b6d] hover:text-[#09090b] text-[#dfb88e] border border-[#c59b6d]/40 rounded text-[10px] font-mono transition-all shrink-0 flex items-center gap-1"
              >
                <span>EXEC</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>

            {/* Quick Actions List */}
            <div className="p-3 overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#a8a29e] flex items-center justify-between">
                <span>QUICK SYSTEM DESTINATIONS</span>
                <span>ENTER / CLICK</span>
              </div>

              {quickNavActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-3 py-2.5 rounded hover:bg-[#181a1f] border border-transparent hover:border-[#c59b6d]/30 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-white/[0.04] text-[#c59b6d] group-hover:text-[#dfb88e] group-hover:bg-[#c59b6d]/15 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] font-mono text-[#a8a29e]">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#a8a29e] border border-white/5 group-hover:border-[#c59b6d]/40 group-hover:text-[#dfb88e]">
                      {item.shortcut}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* System Controls Bar in Footer */}
            <div className="px-4 py-2.5 bg-[#121316] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#a8a29e] shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => audioManager.toggle()}
                  className="inline-flex items-center gap-1.5 hover:text-[#dfb88e] transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#c59b6d]" />
                      <span>AUDIO: ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>AUDIO: OFF</span>
                    </>
                  )}
                </button>

                <span>•</span>

                <button
                  onClick={toggleFs}
                  className="inline-flex items-center gap-1.5 hover:text-[#dfb88e] transition-colors"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-[#c59b6d]" />
                      <span>FULLSCREEN: ON</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>FULLSCREEN: OFF</span>
                    </>
                  )}
                </button>
              </div>

              <span className="hidden sm:inline text-[10px] text-[#a8a29e]/60">
                PRO TIP: Type 'help' for red-team tools
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

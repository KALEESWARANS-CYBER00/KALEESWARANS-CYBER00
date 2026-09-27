'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { requestFullscreenMode } from '@/components/LoadingWrapper';
import { playAudioOnInteraction } from '@/lib/audio';

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const professionWrapRef = useRef<HTMLDivElement>(null);
  const professionTextRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const isDismissing = useRef(false);

  const dismissSplash = () => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    sessionStorage.setItem('visited_splash', 'true');
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'expo.inOut',
      onComplete: () => {
        setIsDone(true);
        if (onComplete) onComplete();
      },
    });
  };

  const handleSplashInteraction = () => {
    requestFullscreenMode();
    playAudioOnInteraction();
    dismissSplash();
  };

  useEffect(() => {
    // Check if splash was already shown in this session
    const hasSeenSplash = typeof window !== 'undefined' && sessionStorage.getItem('visited_splash');

    if (hasSeenSplash) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          handleSplashInteraction();
        },
      });

      // 0–20%: Small name appears with opacity 0 -> 1
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0.1
      );

      // 20–60%: Profession line reveals using subtle vertical text reveal
      tl.fromTo(
        professionTextRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        0.3
      );

      // Button reveal
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.45
      );

      // Progress line expands to 100%
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: 'power2.inOut', transformOrigin: 'left center' },
        0.2
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleSplashInteraction}
      onTouchStart={handleSplashInteraction}
      onWheel={handleSplashInteraction}
      className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col justify-between p-6 sm:p-14 select-none cursor-pointer pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      {/* Top minimal status marker */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-widest text-[#a8a29e]/60 uppercase">
        <span>KALEESWARAN S</span>
      </div>

      {/* Center Typography & Enter Action */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div
          ref={nameRef}
          className="text-base sm:text-2xl font-light tracking-[0.18em] sm:tracking-[0.2em] text-[#f7f4ee] uppercase mb-3 opacity-0"
        >
          KALEESWARAN S
        </div>

        <div ref={professionWrapRef} className="overflow-hidden py-1 mb-6">
          <div
            ref={professionTextRef}
            className="text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#dfb88e]"
          >
            RED TEAM • CYBERSECURITY • FULL-STACK & CLOUD
          </div>
        </div>

        {/* Explicit Enter Fullscreen Interactive Button */}
        <div ref={buttonRef} className="opacity-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleSplashInteraction();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleSplashInteraction();
            }}
            className="px-6 py-2.5 bg-[#c59b6d] text-[#09090b] font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all duration-300 rounded shadow-[0_4px_24px_rgba(197,155,109,0.3)] flex items-center gap-2 group active:scale-95 cursor-pointer"
          >
            <span>ENTER EXPERIENCE</span>
            <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Bottom Minimal Progress Line & Prompt */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-3">
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute inset-0 bg-[#c59b6d] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-[#a8a29e]/60 uppercase">
          TOUCH, SCROLL OR CLICK TO ENTER • SOUND AUTOPLAYS
        </span>
      </div>
    </div>
  );
}
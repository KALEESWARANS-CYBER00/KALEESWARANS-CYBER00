'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

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
          sessionStorage.setItem('visited_splash', 'true');
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: () => {
              setIsDone(true);
              if (onComplete) onComplete();
            },
          });
        },
      });

      // 0–20%: Small name appears with opacity 0 -> 1
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        0.1
      );

      // 20–70%: Profession line reveals using subtle vertical text reveal
      tl.fromTo(
        professionTextRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0.35
      );

      // Progress line expands to 100%
      tl.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power2.inOut', transformOrigin: 'left center' },
        0.2
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col justify-between p-8 sm:p-14 select-none pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      {/* Top minimal status marker */}
      <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#a8a29e]/60 uppercase">
        <span>KALEESWARAN S</span>
      </div>

      {/* Center Typography */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div
          ref={nameRef}
          className="text-lg sm:text-2xl font-light tracking-[0.2em] text-[#f7f4ee] uppercase mb-3 opacity-0"
        >
          KALEESWARAN S
        </div>

        <div ref={professionWrapRef} className="overflow-hidden py-1">
          <div
            ref={professionTextRef}
            className="text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#dfb88e]"
          >
            RED TEAM • CYBERSECURITY • FULL-STACK & CLOUD
          </div>
        </div>
      </div>

      {/* Bottom Minimal Progress Line */}
      <div className="w-full max-w-sm mx-auto">
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div
            ref={progressLineRef}
            className="absolute inset-0 bg-[#c59b6d] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
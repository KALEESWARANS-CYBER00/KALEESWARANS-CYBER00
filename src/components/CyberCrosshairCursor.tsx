'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorState = 'default' | 'scan' | 'lock' | 'interact' | 'minimal' | 'hidden';

export default function CyberCrosshairCursor() {
  const [enabled, setEnabled] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const outerScopeRingRef = useRef<SVGCircleElement>(null);
  const innerScopeRingRef = useRef<SVGCircleElement>(null);
  const centerDotRef = useRef<SVGCircleElement>(null);
  const armsRef = useRef<SVGGElement>(null);
  const bdcTicksRef = useRef<SVGGElement>(null);
  const scanRingRef = useRef<SVGCircleElement>(null);

  const currentStateRef = useRef<CursorState>('default');
  const scanTweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Check device capabilities and accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSupport = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      return !prefersReduced && hasFinePointer && canHover && !isTouch;
    };

    const isSupported = checkSupport();
    setEnabled(isSupported);

    if (isSupported) {
      document.documentElement.classList.add('custom-cursor-active');
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      const sup = checkSupport();
      setEnabled(sup);
      if (sup) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // GSAP tracking and AWM 4x scope state manager
  useEffect(() => {
    if (!enabled) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Center scope reticle on cursor
    gsap.set(wrapper, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
      pointerEvents: 'none',
    });

    // High-performance instantaneous hardware-feel tracking
    const xTo = gsap.quickTo(wrapper, 'x', { duration: 0.02, ease: 'power3.out' });
    const yTo = gsap.quickTo(wrapper, 'y', { duration: 0.02, ease: 'power3.out' });

    let hasMoved = false;

    const applyState = (newState: CursorState) => {
      if (newState === currentStateRef.current) return;
      const prevState = currentStateRef.current;
      currentStateRef.current = newState;

      // Kill any active scanning pulse loops if leaving scan mode
      if (prevState === 'scan' && scanTweenRef.current) {
        scanTweenRef.current.kill();
        scanTweenRef.current = null;
        if (scanRingRef.current) {
          gsap.set(scanRingRef.current, { opacity: 0, scale: 0.8, transformOrigin: '22px 22px' });
        }
        if (armsRef.current) {
          gsap.to(armsRef.current, { scale: 1, duration: 0.18, ease: 'power2.out', transformOrigin: '22px 22px' });
        }
      }

      // Handle visibility for editable fields
      if (newState === 'hidden') {
        gsap.to(wrapper, { opacity: 0, scale: 0.5, duration: 0.1, ease: 'power2.out' });
        return;
      } else if (prevState === 'hidden') {
        gsap.to(wrapper, { opacity: 1, scale: 1, duration: 0.12, ease: 'power2.out' });
      }

      switch (newState) {
        case 'scan': {
          // Radar scan mode on Hero headline & CTA
          if (scanRingRef.current) {
            const scanTl = gsap.timeline({ repeat: -1 });
            scanTl.fromTo(
              scanRingRef.current,
              { scale: 0.8, opacity: 0.85, transformOrigin: '22px 22px' },
              { scale: 1.4, opacity: 0, duration: 1.1, ease: 'power1.out', transformOrigin: '22px 22px' }
            );
            scanTweenRef.current = scanTl;
          }

          if (armsRef.current) {
            gsap.fromTo(
              armsRef.current,
              { scale: 0.94, transformOrigin: '22px 22px' },
              { scale: 1.06, duration: 0.55, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '22px 22px' }
            );
          }
          break;
        }

        case 'lock': {
          // AWM 4X Scope Full Target Lock: Scope circle snap, inner range circle focus, illuminated BDC ticks
          if (scanRingRef.current) gsap.to(scanRingRef.current, { opacity: 0, duration: 0.15 });

          // Outer Scope Circle snaps into crisp focus
          if (outerScopeRingRef.current) {
            gsap.fromTo(
              outerScopeRingRef.current,
              { scale: 1.25, opacity: 0.7, transformOrigin: '22px 22px' },
              { scale: 1.0, opacity: 1, duration: 0.2, ease: 'back.out(1.5)', transformOrigin: '22px 22px' }
            );
          }

          // Inner 4X range circle locks into focus
          if (innerScopeRingRef.current) {
            gsap.fromTo(
              innerScopeRingRef.current,
              { scale: 0.6, opacity: 0, transformOrigin: '22px 22px' },
              { scale: 1.0, opacity: 1, duration: 0.2, ease: 'back.out(1.4)', transformOrigin: '22px 22px' }
            );
          }

          // BDC range ticks illuminate
          if (bdcTicksRef.current) {
            gsap.to(bdcTicksRef.current, { opacity: 1, duration: 0.18, ease: 'power2.out' });
          }

          if (armsRef.current) {
            gsap.to(armsRef.current, { scale: 0.92, duration: 0.16, ease: 'power2.out', transformOrigin: '22px 22px' });
          }
          break;
        }

        case 'interact': {
          // Tactical 4X Scope focus on buttons, navigation, and links
          if (scanRingRef.current) gsap.to(scanRingRef.current, { opacity: 0, duration: 0.15 });

          if (outerScopeRingRef.current) {
            gsap.fromTo(
              outerScopeRingRef.current,
              { scale: 1.15, transformOrigin: '22px 22px' },
              { scale: 1.0, opacity: 1, duration: 0.18, ease: 'power2.out', transformOrigin: '22px 22px' }
            );
          }

          if (innerScopeRingRef.current) {
            gsap.fromTo(
              innerScopeRingRef.current,
              { scale: 0.7, opacity: 0, transformOrigin: '22px 22px' },
              { scale: 1.0, opacity: 0.85, duration: 0.18, ease: 'power2.out', transformOrigin: '22px 22px' }
            );
          }

          if (bdcTicksRef.current) {
            gsap.to(bdcTicksRef.current, { opacity: 0.85, duration: 0.18 });
          }

          if (armsRef.current) {
            gsap.to(armsRef.current, { scale: 0.95, duration: 0.16, ease: 'power2.out', transformOrigin: '22px 22px' });
          }
          break;
        }

        case 'minimal': {
          // Minimal AWM Scope in Contact section
          if (scanRingRef.current) gsap.to(scanRingRef.current, { opacity: 0, duration: 0.15 });
          if (innerScopeRingRef.current) gsap.to(innerScopeRingRef.current, { opacity: 0.4, scale: 0.9, duration: 0.18 });
          if (bdcTicksRef.current) gsap.to(bdcTicksRef.current, { opacity: 0.4, duration: 0.18 });
          if (outerScopeRingRef.current) gsap.to(outerScopeRingRef.current, { opacity: 0.75, scale: 1.0, duration: 0.18 });

          if (armsRef.current) {
            gsap.to(armsRef.current, { scale: 1.0, duration: 0.16, ease: 'power2.out', transformOrigin: '22px 22px' });
          }
          break;
        }

        case 'default':
        default: {
          // Clean default AWM Scope
          if (scanRingRef.current) gsap.to(scanRingRef.current, { opacity: 0, duration: 0.15 });
          if (outerScopeRingRef.current) gsap.to(outerScopeRingRef.current, { opacity: 0.85, scale: 1.0, duration: 0.2, transformOrigin: '22px 22px' });
          if (innerScopeRingRef.current) gsap.to(innerScopeRingRef.current, { opacity: 0.5, scale: 0.9, duration: 0.2, transformOrigin: '22px 22px' });
          if (bdcTicksRef.current) gsap.to(bdcTicksRef.current, { opacity: 0.5, duration: 0.2 });

          if (armsRef.current) {
            gsap.to(armsRef.current, { scale: 1.0, duration: 0.18, ease: 'power2.out', transformOrigin: '22px 22px' });
          }
          break;
        }
      }
    };

    const detectTargetState = (el: HTMLElement | null): CursorState => {
      if (!el) return 'default';

      // 1. Inputs, textareas, contenteditable - preserve native text cursor
      if (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.isContentEditable ||
        el.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return 'hidden';
      }

      // 2. Contact Section: keep cursor minimal
      if (el.closest('#contact')) {
        return 'minimal';
      }

      // 3. Hero Section: Scan animation on headline and primary CTA
      const inHero = el.closest('#hero') || (!el.closest('.cyber-gradient-container') && el.closest('main'));
      if (inHero) {
        const heading = el.closest('h1, h2');
        const cta = el.closest('a[href="#work"], a[href*="RESUME"], button');
        if (heading || cta) {
          return 'scan';
        }
      }

      const headingAnywhere = el.closest('h1, h2');
      if (
        headingAnywhere &&
        (headingAnywhere.textContent?.includes('ATTACK SURFACE') ||
          headingAnywhere.textContent?.includes('ATTACKER') ||
          headingAnywhere.textContent?.includes('BUILD LIKE AN ENGINEER'))
      ) {
        return 'scan';
      }

      // 4. Target-Lock Animation on Skills items, cybersecurity categories, project cards, security tools
      const inSkillsOrAbout = el.closest('#skills') || el.closest('#about');
      if (inSkillsOrAbout) {
        if (
          el.closest('.group\\/skill') ||
          el.closest('.group\\/subskill') ||
          el.closest('[class*="group/skill"]') ||
          el.closest('[class*="group/subskill"]') ||
          el.closest('[data-skill]') ||
          el.closest('button[role="tab"]') ||
          el.closest('[class*="rounded-2xl"]') ||
          el.closest('[class*="rounded-xl"]') ||
          el.closest('[class*="rounded-lg"]') ||
          el.closest('[class*="rounded-md"]') ||
          el.closest('button')
        ) {
          return 'lock';
        }
      }

      const inWork = el.closest('#work');
      if (inWork) {
        if (
          el.closest('.group') ||
          el.closest('button') ||
          el.closest('a') ||
          el.closest('[class*="divide-y"] > div')
        ) {
          return 'lock';
        }
      }

      // 5. Targeting on Experience, credentials, navigation, terminal, GitHub links
      const inExperience = el.closest('#experience');
      if (inExperience) {
        if (
          el.closest('.group') ||
          el.closest('button') ||
          el.closest('a') ||
          el.closest('li') ||
          el.closest('[class*="rounded"]')
        ) {
          return 'interact';
        }
      }

      if (
        el.closest('nav') ||
        el.closest('header') ||
        el.closest('footer a, footer button') ||
        el.closest('a[href*="github"], a[href*="linkedin"], a[href*="tryhackme"]') ||
        el.closest('button') ||
        el.closest('a') ||
        el.closest('[role="button"]') ||
        el.closest('[data-interactive]') ||
        el.closest('[class*="cursor-pointer"]')
      ) {
        return 'interact';
      }

      return 'default';
    };

    const onMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (!hasMoved) {
        hasMoved = true;
        gsap.to(wrapper, { opacity: 1, duration: 0.1 });
      }

      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement | null;
      applyState(detectTargetState(target));
    };

    const onScroll = () => {
      if (lastPosRef.current) {
        const target = document.elementFromPoint(lastPosRef.current.x, lastPosRef.current.y) as HTMLElement | null;
        applyState(detectTargetState(target));
      }
    };

    const onMouseLeave = () => {
      gsap.to(wrapper, { opacity: 0, duration: 0.15 });
    };

    const onMouseEnter = () => {
      if (currentStateRef.current !== 'hidden') {
        gsap.to(wrapper, { opacity: 1, duration: 0.15 });
      }
    };

    // Tactical sniper trigger recoil micro-animation
    const onPointerDown = () => {
      if (wrapper) {
        gsap.to(wrapper, {
          scale: 0.84,
          duration: 0.06,
          ease: 'power2.out',
        });
      }
    };

    const onPointerUp = () => {
      if (wrapper) {
        gsap.to(wrapper, {
          scale: 1.0,
          duration: 0.14,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);

      if (scanTweenRef.current) {
        scanTweenRef.current.kill();
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none select-none z-[99999] will-change-transform"
      style={{ width: 44, height: 44 }}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* ============================================================== */}
        {/* AWM 4X SNIPER SCOPE RETICLE (ICONIC CIRCLE SYMBOL)             */}
        {/* ============================================================== */}

        {/* 1. Radar Pulse Ring (Hero Scanning State) */}
        <circle
          ref={scanRingRef}
          cx="22"
          cy="22"
          r="18"
          stroke="#EF4444"
          strokeWidth="1.4"
          strokeDasharray="2 4"
          fill="none"
          className="opacity-0"
        />

        {/* 2. Outer Scope Circle (The Main 4X Lens Ring) */}
        <circle
          ref={outerScopeRingRef}
          cx="22"
          cy="22"
          r="14"
          stroke="#EF4444"
          strokeWidth="1.6"
          fill="none"
          opacity="0.85"
        />

        {/* 3. Inner Range Circle (Iconic 4X Concentric Range Ring) */}
        <circle
          ref={innerScopeRingRef}
          cx="22"
          cy="22"
          r="5.5"
          stroke="#EF4444"
          strokeWidth="1.3"
          fill="none"
          opacity="0.5"
        />

        {/* 4. Center Aiming Dot (Sub-pixel Precision) */}
        <circle
          ref={centerDotRef}
          cx="22"
          cy="22"
          r="1.4"
          fill="#EF4444"
        />

        {/* 5. Four Crosshair Stadia Lines (Traversing the Scope Circle) */}
        <g
          ref={armsRef}
          stroke="#EF4444"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {/* Top Post: Extends from outer rim towards center */}
          <line x1="22" y1="4" x2="22" y2="16.5" />
          {/* Bottom Post: Extends from center towards bottom rim */}
          <line x1="22" y1="27.5" x2="22" y2="40" />
          {/* Left Post: Horizontal windage line */}
          <line x1="4" y1="22" x2="16.5" y2="22" />
          {/* Right Post: Horizontal windage line */}
          <line x1="27.5" y1="22" x2="40" y2="22" />
        </g>

        {/* 6. AWM 4X BDC Elevation & Windage Mil-Ticks */}
        <g
          ref={bdcTicksRef}
          stroke="#EF4444"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        >
          {/* Left Windage Hash Tick at x=10 */}
          <line x1="10" y1="20.5" x2="10" y2="23.5" />
          {/* Right Windage Hash Tick at x=34 */}
          <line x1="34" y1="20.5" x2="34" y2="23.5" />

          {/* Bullet Drop Compensator (BDC) Elevation Ticks below center */}
          {/* 100m Range Tick */}
          <line x1="20" y1="31" x2="24" y2="31" />
          {/* 200m Range Tick */}
          <line x1="19" y1="35" x2="25" y2="35" />
          {/* 300m Range Tick */}
          <line x1="18" y1="39" x2="26" y2="39" />
        </g>
      </svg>
    </div>
  );
}

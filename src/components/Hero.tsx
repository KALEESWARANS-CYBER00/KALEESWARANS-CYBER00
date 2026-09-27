'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPinRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const textFrame1Ref = useRef<HTMLDivElement>(null);
  const textFrame2Ref = useRef<HTMLDivElement>(null);

  // Line reveal refs for Frame 01
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal
      const introTl = gsap.timeline({ delay: 0.1 });

      if (!prefersReducedMotion) {
        // Background scale & opacity
        introTl.fromTo(
          bgWrapperRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1.0, duration: 1.2, ease: 'power2.out' },
          0
        );

        // Headline 2 lines vertical mask reveal
        introTl.fromTo(
          [line1Ref.current, line2Ref.current],
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
          },
          0.2
        );

        // Disciplines strip
        introTl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.5
        );

        // Narrative bio
        introTl.fromTo(
          descRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.6
        );

        // Action CTAs
        introTl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          0.7
        );
      } else {
        gsap.set(
          [
            bgWrapperRef.current,
            line1Ref.current,
            line2Ref.current,
            subtextRef.current,
            descRef.current,
            ctaRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
      }

      // 2. Pinned Scroll Camera Pan & Content Transition
      if (!prefersReducedMotion && containerRef.current && heroPinRef.current) {
        const isDesktop = window.innerWidth >= 1024;

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            pin: heroPinRef.current,
            scrub: 0.5,
            anticipatePin: 1,
          },
        });

        // Frame 01 text slides up slightly and fades
        scrollTl.to(
          textFrame1Ref.current,
          {
            y: -20,
            autoAlpha: 0,
            ease: 'power2.in',
            duration: 0.32,
          },
          0
        );

        // Background camera motion linked to scroll on both desktop and mobile
        if (bgWrapperRef.current) {
          if (isDesktop) {
            scrollTl.fromTo(
              bgWrapperRef.current,
              { x: '8vw', scale: 1 },
              { x: '-8vw', scale: 1.04, ease: 'power1.inOut', duration: 1.0 },
              0
            );
          } else {
            scrollTl.fromTo(
              bgWrapperRef.current,
              { y: 0, scale: 1 },
              { y: -16, scale: 1.03, ease: 'power1.inOut', duration: 1.0 },
              0
            );
          }
        }

        // Frame 02 text fades and settles in
        scrollTl.fromTo(
          textFrame2Ref.current,
          {
            autoAlpha: 0,
            y: 20,
          },
          {
            autoAlpha: 1,
            y: 0,
            ease: 'power2.out',
            duration: 0.32,
          },
          0.32
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#09090b]">
      {/* Pinned Viewport Container */}
      <div
        ref={heroPinRef}
        className="relative w-full h-[100svh] overflow-hidden flex flex-col lg:flex-row items-center justify-between lg:justify-center"
      >
        {/* ============================================================== */}
        {/* UNIFIED FULL-SCREEN BACKGROUND CAMERA LAYER                     */}
        {/* Seamless full background image for mobile and desktop           */}
        {/* ============================================================== */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
          {/* Main Background Image Container */}
          <div
            ref={bgWrapperRef}
            className="absolute inset-0 w-full h-full lg:w-[124%] lg:-left-[12%]"
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src="/hero-portrait.png"
              alt="Kaleeswaran S - Professional Portrait"
              className="w-full h-full object-contain lg:object-cover object-top lg:object-center pt-14 sm:pt-16 lg:pt-0"
            />
          </div>

          {/* Desktop: Luminous left gradient veil for Frame 01 text readability */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#09090b] via-[#09090b]/75 to-transparent pointer-events-none" />

          {/* Desktop: Luminous right gradient veil for Frame 02 text readability */}
          <div className="hidden lg:block absolute inset-y-0 right-0 w-[60%] bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />

          {/* Mobile: Seamless atmospheric fade from portrait into lower content area */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#09090b]/30 via-transparent via-40% to-[#09090b] pointer-events-none" />

          {/* Top and Bottom Atmospheric Fades */}
          <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#09090b]/90 to-transparent z-10 pointer-events-none" />
        </div>

        {/* ============================================================== */}
        {/* CONTENT STAGE                                                  */}
        {/* ============================================================== */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 h-full flex items-center">

          {/* ============================================================ */}
          {/* FRAME 01: ATTACKER MINDSET × ENGINEER MINDSET                */}
          {/* ============================================================ */}
          <div
            ref={textFrame1Ref}
            className="absolute inset-x-4 sm:inset-x-12 lg:inset-x-16 bottom-4 xs:bottom-6 sm:bottom-10 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto max-w-3xl flex flex-col items-start drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Headline: I Think Like an Attacker. I Build Like an Engineer. */}
            <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-7xl xl:text-[5.25rem] font-black text-[#f7f4ee] leading-[1.08] sm:leading-[0.98] tracking-headline mb-2 sm:mb-5">
              <span className="block overflow-hidden py-0.5">
                <span ref={line1Ref} className="block will-change-transform">
                  I THINK LIKE AN ATTACKER.
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span ref={line2Ref} className="block text-[#c59b6d] will-change-transform">
                  I BUILD LIKE AN ENGINEER.
                </span>
              </span>
            </h1>

            {/* Disciplines & Roles Strip */}
            <div
              ref={subtextRef}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3.5 sm:gap-y-2 text-[10px] xs:text-[11px] sm:text-[13px] font-mono tracking-wider uppercase text-[#dfb88e] border-y border-[#c59b6d]/20 py-1.5 sm:py-2.5 mb-2.5 sm:mb-5 max-w-2xl opacity-0"
            >
              <span>Red Team Specialist</span>
              <span className="text-[#c59b6d]/40">•</span>
              <span>Penetration Tester</span>
              <span className="text-[#c59b6d]/40">•</span>
              <span>Exploit Development</span>
              <span className="text-[#c59b6d]/40">•</span>
              <span>Cloud Security</span>
              <span className="text-[#c59b6d]/40">•</span>
              <span className="text-[#f7f4ee]">Full-Stack Engineer</span>
            </div>

            {/* Narrative Bio (Kaleeswaran S) */}
            <p
              ref={descRef}
              className="text-xs sm:text-base lg:text-lg text-[#d5cec5] font-light leading-relaxed max-w-xl mb-3 sm:mb-7 opacity-0"
            >
              I’m Kaleeswaran S — Red Team Security Specialist, Vulnerability Researcher, and Full-Stack Software Engineer. Ranked in the top 4% globally on TryHackMe, I dissect applications, uncover attack vectors, and engineer resilient systems across offensive security and cloud infrastructure.
            </p>

            {/* Action CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-2.5 sm:gap-4 opacity-0">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8 py-2.5 sm:py-3.5 bg-[#c59b6d] text-[#09090b] font-mono text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#dfb88e] shadow-[0_4px_24px_rgba(197,155,109,0.25)] text-center rounded-sm"
              >
                <span>EXPLORE SELECTED WORK</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2">
                  →
                </span>
              </a>

              <a
                href="/KALEESWARAN_S-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2.5 sm:py-3.5 border border-white/20 text-[#f7f4ee] font-mono text-[10px] xs:text-[11px] sm:text-xs uppercase tracking-widest hover:border-[#dfb88e] hover:text-[#dfb88e] transition-colors text-center rounded-sm"
              >
                <span>CURRICULUM VITAE</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FRAME 02: CONTINUATION AS USER SCROLLS (FULLY VISIBLE)       */}
          {/* ============================================================ */}
          <div
            ref={textFrame2Ref}
            className="absolute inset-x-4 sm:inset-x-12 lg:inset-x-16 bottom-4 xs:bottom-6 sm:bottom-10 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center opacity-0 pointer-events-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Left Column Spacer (Desktop) */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Column Content */}
            <div className="lg:col-span-7 flex flex-col items-start lg:pl-10 pointer-events-auto">
              {/* Headline */}
              <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#f7f4ee] leading-[1.08] sm:leading-[1.02] tracking-headline mb-2 sm:mb-4">
                <span className="block">EVERY SYSTEM HAS AN</span>
                <span className="block text-[#c59b6d]">ATTACK SURFACE.</span>
                <span className="block text-[#dfb88e]">EVERY WEAKNESS HAS A STORY.</span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-[#d5cec5] font-light leading-relaxed max-w-xl mb-2.5 sm:mb-5">
                From investigating application flaws, exploit development, and bug bounty research to engineering full-stack platforms and hardening cloud environments, I work across the systems that power modern technology.
              </p>

              {/* Roles & Domain Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[9px] xs:text-[10px] sm:text-xs font-mono tracking-wider text-[#dfb88e] mb-3 sm:mb-6">
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Red Team Operations</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Penetration Testing</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Vulnerability Research</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Bug Bounty</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Exploit Development</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded">Cloud Security</span>
                <span className="bg-[#121316]/90 border border-white/10 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded text-[#f7f4ee]">TryHackMe Top 4%</span>
              </div>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-0 sm:py-0 bg-[#c59b6d] sm:bg-transparent text-[#09090b] sm:text-[#dfb88e] rounded sm:rounded-none font-bold sm:font-normal text-[11px] sm:text-xs font-mono tracking-widest uppercase hover:text-[#f7f4ee] transition-all group"
              >
                <span>Discover Selected Engineering Work</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

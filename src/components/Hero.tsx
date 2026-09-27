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
            end: '+=130%',
            pin: heroPinRef.current,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Frame 01 text slides up and fades
        scrollTl.to(
          textFrame1Ref.current,
          {
            yPercent: -35,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.45,
          },
          0
        );

        // Background smooth camera pan from right to left (placing subject on right, then on left)
        if (isDesktop && bgWrapperRef.current) {
          scrollTl.fromTo(
            bgWrapperRef.current,
            { x: '10vw' },
            { x: '-10vw', ease: 'power1.inOut', duration: 1 },
            0
          );
        }

        // Frame 02 text fades and settles in on the right
        scrollTl.fromTo(
          textFrame2Ref.current,
          {
            opacity: 0,
            yPercent: 30,
          },
          {
            opacity: 1,
            yPercent: 0,
            ease: 'power2.out',
            duration: 0.5,
          },
          0.4
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
        className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center"
      >
        {/* ============================================================== */}
        {/* UNIFIED FULL-SCREEN BACKGROUND CAMERA LAYER                     */}
        {/* Single seamless layer with smooth camera pan across portrait   */}
        {/* ============================================================== */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
          <div
            ref={bgWrapperRef}
            className="absolute inset-y-0 w-[124%] -left-[12%] h-full"
            style={{ willChange: 'transform, opacity' }}
          >
            <img
              src="/hero-portrait.png"
              alt="Kaleeswaran S - Professional Portrait"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Luminous left gradient veil for Frame 01 text readability */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-[#09090b] via-[#09090b]/75 to-transparent pointer-events-none" />

          {/* Luminous right gradient veil for Frame 02 text readability */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />

          {/* Top and Bottom Atmospheric Fades */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#09090b] via-[#09090b]/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent z-10 pointer-events-none" />

          {/* Mobile Text Protection Overlay */}
          <div className="lg:hidden absolute inset-0 bg-[#09090b]/75 z-10 pointer-events-none" />
        </div>

        {/* ============================================================== */}
        {/* CONTENT STAGE                                                  */}
        {/* ============================================================== */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-full flex items-center">

          {/* ============================================================ */}
          {/* FRAME 01: ATTACKER MINDSET × ENGINEER MINDSET                */}
          {/* ============================================================ */}
          <div
            ref={textFrame1Ref}
            className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 top-1/2 -translate-y-1/2 max-w-3xl flex flex-col items-start"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Headline: I Think Like an Attacker. I Build Like an Engineer. */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black text-[#f7f4ee] leading-[0.98] tracking-headline mb-6">
              <span className="block overflow-hidden py-0.5">
                <span ref={line1Ref} className="block inline-block will-change-transform">
                  I THINK LIKE AN ATTACKER.
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span ref={line2Ref} className="block inline-block text-[#c59b6d] will-change-transform">
                  I BUILD LIKE AN ENGINEER.
                </span>
              </span>
            </h1>

            {/* Disciplines & Roles Strip */}
            <div
              ref={subtextRef}
              className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs sm:text-[13px] font-mono tracking-wider uppercase text-[#dfb88e] border-y border-[#c59b6d]/20 py-3 mb-6 max-w-2xl opacity-0"
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
              className="text-sm sm:text-base lg:text-lg text-[#d5cec5] font-light leading-relaxed max-w-xl mb-9 opacity-0"
            >
              I’m Kaleeswaran S — Red Team Security Specialist, Vulnerability Researcher, and Full-Stack Software Engineer. Ranked in the top 4% globally on TryHackMe, I dissect applications, uncover attack vectors, and engineer resilient systems across offensive security and cloud infrastructure.
            </p>

            {/* Action CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:bg-[#dfb88e] shadow-[0_4px_24px_rgba(197,155,109,0.25)]"
              >
                <span>EXPLORE SELECTED WORK</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </a>

              <a
                href="/KALEESWARAN_S-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 border border-white/15 text-[#f7f4ee] font-mono text-xs uppercase tracking-widest hover:border-[#dfb88e] hover:text-[#dfb88e] transition-colors"
              >
                <span>CURRICULUM VITAE</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FRAME 02: CONTINUATION AS USER SCROLLS                       */}
          {/* ============================================================ */}
          <div
            ref={textFrame2Ref}
            className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 top-1/2 -translate-y-1/2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center opacity-0 pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Left Column Spacer */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Column Content */}
            <div className="lg:col-span-7 flex flex-col items-start lg:pl-10 pointer-events-auto">
              {/* Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#f7f4ee] leading-[1.02] tracking-headline mb-5">
                <span className="block">EVERY SYSTEM HAS AN</span>
                <span className="block text-[#c59b6d]">ATTACK SURFACE.</span>
                <span className="block text-[#dfb88e]">EVERY WEAKNESS HAS A STORY.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#d5cec5] font-light leading-relaxed max-w-xl mb-6">
                From investigating application flaws, exploit development, and bug bounty research to engineering full-stack platforms and hardening cloud environments, I work across the systems that power modern technology.
              </p>

              {/* Roles & Domain Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-mono tracking-wider text-[#dfb88e] mb-8">
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Red Team Operations</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Penetration Testing</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Vulnerability Research</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Bug Bounty</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Exploit Development</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5">Cloud Security</span>
                <span className="bg-[#121316]/80 border border-white/10 px-3 py-1.5 text-[#f7f4ee]">TryHackMe Top 4%</span>
              </div>

              <a
                href="#work"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#dfb88e] hover:text-[#f7f4ee] transition-colors group"
              >
                <span>Discover Selected Engineering Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

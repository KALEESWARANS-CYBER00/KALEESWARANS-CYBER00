'use client';

import { useEffect, useRef, useState, RefObject } from 'react';

interface HeroInkRevealProps {
  bgWrapperRef: RefObject<HTMLDivElement | null>;
  heroContainerRef: RefObject<HTMLDivElement | null>;
}

export default function HeroInkReveal({
  bgWrapperRef,
  heroContainerRef,
}: HeroInkRevealProps) {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetMouse = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const inkPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const prevPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const opacity = useRef<number>(0);
  const animFrameId = useRef<number>(0);
  const isRunning = useRef<boolean>(false);
  const lastSpawnDist = useRef<number>(0);

  // Droplets trail for spreading liquid ink feel
  const droplets = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      life: number;
      maxLife: number;
      spreadRate: number;
    }>
  >([]);

  // Device & accessibility check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkSupport = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      return !prefersReduced && hasFinePointer && canHover && !isTouch;
    };

    setEnabled(checkSupport());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => setEnabled(checkSupport());
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const hero = heroContainerRef.current;
    const bgWrapper = bgWrapperRef.current;

    if (!canvas || !hero || !bgWrapper) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    // Sync canvas resolution to device pixels
    const updateSize = () => {
      if (!bgWrapper || !canvas) return;
      const rect = bgWrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });

    // Main organic render loop
    const render = (time: number) => {
      const rect = bgWrapper.getBoundingClientRect();

      // Fluid lerp tracking with liquid delay
      if (inkPos.current.x === 0 && inkPos.current.y === 0) {
        inkPos.current.x = targetMouse.current.x;
        inkPos.current.y = targetMouse.current.y;
        prevPos.current.x = targetMouse.current.x;
        prevPos.current.y = targetMouse.current.y;
      } else {
        const lerpFactor = 0.09;
        inkPos.current.x += (targetMouse.current.x - inkPos.current.x) * lerpFactor;
        inkPos.current.y += (targetMouse.current.y - inkPos.current.y) * lerpFactor;
      }

      const vx = inkPos.current.x - prevPos.current.x;
      const vy = inkPos.current.y - prevPos.current.y;
      const speed = Math.hypot(vx, vy);
      prevPos.current = { x: inkPos.current.x, y: inkPos.current.y };

      // Fade-in / Fade-out smoothing
      if (targetMouse.current.active) {
        opacity.current += (1 - opacity.current) * 0.09;
      } else {
        opacity.current += (0 - opacity.current) * 0.06;
      }

      // If fully invisible, clear and pause loop to save cycles
      if (opacity.current <= 0.004) {
        opacity.current = 0;
        ctx.clearRect(0, 0, rect.width, rect.height);
        isRunning.current = false;
        return;
      }

      // Spawning spreading ink droplets during cursor movement
      if (targetMouse.current.active) {
        lastSpawnDist.current += speed;
        if (lastSpawnDist.current > 18) {
          lastSpawnDist.current = 0;
          droplets.current.push({
            x: inkPos.current.x + (Math.random() - 0.5) * 16,
            y: inkPos.current.y + (Math.random() - 0.5) * 16,
            radius: 46 + Math.random() * 32,
            life: 50,
            maxLife: 50,
            spreadRate: 0.35 + Math.random() * 0.25,
          });
          if (droplets.current.length > 10) {
            droplets.current.shift();
          }
        }
      }

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.save();
      ctx.globalAlpha = opacity.current;

      // Natural feathered edge via soft shadow
      // Neutral tone #808080 stripped via mix-blend-mode: color transforms color to pure black-and-white
      ctx.shadowColor = 'rgba(128, 128, 128, 1)';
      ctx.shadowBlur = 26;
      ctx.fillStyle = '#808080';

      // 1. Primary organic ink blot spline
      const numPoints = 28;
      const baseRadius = 160;
      const pts: Array<{ x: number; y: number }> = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        // Harmonic asymmetrical lobes for liquid ink contour
        const n1 = Math.sin(angle * 3 + time * 0.0016) * 0.17;
        const n2 = Math.cos(angle * 5 - time * 0.0012) * 0.13;
        const n3 = Math.sin(angle * 7 + time * 0.002) * 0.08;

        // Directional momentum stretch
        const moveAngle = Math.atan2(vy, vx);
        const align = Math.cos(angle - moveAngle);
        const stretch = align * Math.min(speed * 0.05, 0.42);

        const r = baseRadius * (1 + n1 + n2 + n3 + stretch);
        pts.push({
          x: inkPos.current.x + Math.cos(angle) * r,
          y: inkPos.current.y + Math.sin(angle) * r,
        });
      }

      // Smooth closed Catmull-style curve
      ctx.beginPath();
      const p0 = pts[0];
      const pLast = pts[pts.length - 1];
      ctx.moveTo((pLast.x + p0.x) / 2, (pLast.y + p0.y) / 2);

      for (let i = 0; i < pts.length; i++) {
        const pCurr = pts[i];
        const pNext = pts[(i + 1) % pts.length];
        const midX = (pCurr.x + pNext.x) / 2;
        const midY = (pCurr.y + pNext.y) / 2;
        ctx.quadraticCurveTo(pCurr.x, pCurr.y, midX, midY);
      }
      ctx.closePath();
      ctx.fill();

      // 2. Trailing spreading droplets (capillary action)
      for (let i = droplets.current.length - 1; i >= 0; i--) {
        const drop = droplets.current[i];
        drop.radius += drop.spreadRate;
        drop.life -= 1;
        if (drop.life <= 0) {
          droplets.current.splice(i, 1);
          continue;
        }
        const dropAlpha = Math.pow(drop.life / drop.maxLife, 1.4);
        ctx.save();
        ctx.globalAlpha = opacity.current * dropAlpha;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Satellite capillary bleeds (organic bleeds around the blot rim)
      const satelliteBlobs = [
        { angle: 0.75, distMult: 1.25, rMult: 0.28, phase: 0 },
        { angle: 2.35, distMult: 1.28, rMult: 0.24, phase: 1.4 },
        { angle: 4.15, distMult: 1.22, rMult: 0.26, phase: 2.9 },
        { angle: 5.45, distMult: 1.3, rMult: 0.22, phase: 4.6 },
      ];

      for (const sat of satelliteBlobs) {
        const pulse = 1 + Math.sin(time * 0.0022 + sat.phase) * 0.16;
        const satAngle = sat.angle + Math.sin(time * 0.001) * 0.18;
        const satDist = baseRadius * sat.distMult;
        const satX = inkPos.current.x + Math.cos(satAngle) * satDist;
        const satY = inkPos.current.y + Math.sin(satAngle) * satDist;
        ctx.beginPath();
        ctx.arc(satX, satY, baseRadius * sat.rMult * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animFrameId.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = bgWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetMouse.current = { x, y, active: true };
      startLoop();
    };

    const handleMouseLeave = () => {
      targetMouse.current.active = false;
      startLoop();
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateSize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      isRunning.current = false;
    };
  }, [enabled, bgWrapperRef, heroContainerRef]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{
        mixBlendMode: 'color',
        willChange: 'contents',
      }}
    />
  );
}

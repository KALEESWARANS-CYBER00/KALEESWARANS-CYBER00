'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent
} from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, Mouse } from 'lucide-react';

export type DepthCarouselItem = string | { image: string; alt?: string; [key: string]: any };
type TiltDirection = 'left' | 'right';

export interface DepthCarouselProps<T = DepthCarouselItem> {
  items?: T[];
  renderItem?: (item: T, index: number, isActive: boolean) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  fullWidth?: boolean;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: T) => void;
  className?: string;
}

interface CarouselConfig {
  count: number;
  depth: number;
  spread: number;
  tilt: number;
  tiltDirection: TiltDirection;
  visibleCards: number;
  falloff: number;
  blur: number;
  duration: number;
  ease: string;
  loop: boolean;
  cardWidth: number;
  cardHeight: number;
  autoplayDelay: number;
  fullWidth: boolean;
}

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
  { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
  { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' }
];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function DepthCarousel<T = DepthCarouselItem>({
  items,
  renderItem,
  cardWidth = 350,
  cardHeight = 490,
  fullWidth = true,
  radius = 16,
  tint = '#05060a',
  depth = 160,
  spread = 15,
  tilt = 10,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 3,
  falloff = 0.22,
  blur = 4,
  duration = 650,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 4000,
  loop = false,
  showControls = true,
  showIndicators = true,
  onChange,
  className = ''
}: DepthCarouselProps<T>) {
  const data = useMemo(() => {
    if (Array.isArray(items) && items.length > 0) return items;
    return DEFAULT_ITEMS as unknown as T[];
  }, [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef<CarouselConfig>({} as CarouselConfig);
  const onChangeRef = useRef(onChange);

  const [cardDims, setCardDims] = useState({ width: cardWidth, height: cardHeight });
  const dragRef = useRef<DragState | null>(null);
  const lastWheelTimeRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(0);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth: cardDims.width,
    cardHeight: cardDims.height,
    autoplayDelay,
    fullWidth
  };

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === 'left' ? -1 : 1;
    const sc = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= cfg.visibleCards + 0.5;

      // 3D positioning tuned for widescreen full-width cards
      const tz = -cfg.depth * back;
      const ty = back * 14; // Subtle vertical tier offset in depth
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);
      const depthScale = Math.max(0.78, 1 - back * 0.045);

      // Past cards slide upwards and fade away cleanly
      let opacity = d < 0 ? Math.max(0, 1 + d * 1.5) : Math.max(0.12, 1 - back * 0.28);
      if (!shown) opacity = 0;

      const brightness = Math.max(0.25, 1 - back * cfg.falloff);
      const blurPx = cfg.blur > 0 && back > 0.1 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;
      const zi = Math.round(2000 - d * 30);

      el.style.transform = `translate(-50%, -50%) scale(${sc * depthScale}) translateX(${tx.toFixed(2)}px) translateY(${ty.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      el.style.zIndex = String(zi);

      // Only the active card in front has direct pointer interaction on its buttons
      const isCardActive = Math.abs(d) < 0.45;
      el.style.pointerEvents = isCardActive ? 'auto' : shown ? 'auto' : 'none';

      const ov = overlayRefs.current[i];
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
    }
  }, []);

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0 && cfg.loop) {
            posRef.current = ((posRef.current % n) + n) % n;
          }
          layout(posRef.current);
        }
      });
    },
    [layout]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus]);

  // Responsive full-width container observer
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (!w) return;

      if (fullWidth) {
        // Calculate dynamic dimensions covering the section width
        const targetW = w < 640 
          ? Math.max(300, w)
          : w < 1024 
            ? Math.max(540, w - 16) 
            : Math.min(w - 24, 1220);

        // Height adjusts to comfortably house all telemetry and buttons
        const targetH = w < 640 ? 620 : w < 1024 ? 540 : 480;

        setCardDims({ width: targetW, height: targetH });
        cfgRef.current.cardWidth = targetW;
        cfgRef.current.cardHeight = targetH;
        scaleRef.current = 1.0;
      } else {
        const needed = cfgRef.current.cardWidth + Math.abs(cfgRef.current.spread) * 2 + 100;
        scaleRef.current = clamp(w / needed, 0.45, 1);
      }

      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fullWidth, layout]);

  // Smooth mouse-wheel & touchpad vertical scrolling to advance projects
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 18) return;

      const now = performance.now();
      const current = Math.round(posRef.current);
      const isAtEnd = current >= cfg.count - 1;
      const isAtStart = current <= 0;

      // Scrolling DOWN / FORWARD
      if (delta > 0) {
        if (!isAtEnd || cfg.loop) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 380) {
            lastWheelTimeRef.current = now;
            navigateBy(1);
          }
        }
        // At the last card without loop, allow natural page scroll downward
      } else {
        // Scrolling UP / BACKWARD
        if (!isAtStart || cfg.loop) {
          e.preventDefault();
          if (now - lastWheelTimeRef.current > 380) {
            lastWheelTimeRef.current = now;
            navigateBy(-1);
          }
        }
        // At the first card without loop, allow natural page scroll upward
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [navigateBy]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('button') || target?.closest('a') || target?.closest('input')) {
      return;
    }
    const cfg = cfgRef.current;
    if (cfg.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId
    };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const cfg = cfgRef.current;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 60);
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        try {
          rootRef.current?.setPointerCapture(drag.id);
        } catch {}
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    const moved = drag.moved;
    dragRef.current = null;
    if (!moved) return;
    const cfg = cfgRef.current;
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 60);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      if (dragRef.current?.moved) return;
      // If clicking directly on a background card, bring it to front
      if (index !== active) {
        setFocus(index, true);
      }
    },
    [active, setFocus]
  );

  useEffect(() => {
    reducedRef.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(
        () => {
          if (!hovered && !focused) navigateBy(1);
        },
        Math.max(cfgRef.current.autoplayDelay, 1000)
      );
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onFocusIn);
    root?.addEventListener('focusout', onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onFocusIn);
      root?.removeEventListener('focusout', onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardDims, radius, count]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-[540px] sm:min-h-[580px] w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-[#ef4444]/40 ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Interactive 3D Depth Carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d] flex items-center justify-center pointer-events-none" ref={stageRef}>
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 cursor-pointer overflow-hidden rounded-[18px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85),0_12px_24px_-10px_rgba(0,0,0,0.7)] [transform:translate(-50%,-50%)] [transform-origin:center] [will-change:transform,opacity,filter] pointer-events-auto"
            ref={el => {
              cardRefs.current[i] = el;
            }}
            style={{ width: cardDims.width, height: cardDims.height, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active !== i}
            onClick={(e) => onCardClick(i, e)}
          >
            {renderItem ? (
              renderItem(item, i, active === i)
            ) : (
              <>
                <img
                  className="block h-full w-full select-none object-cover [pointer-events:none] [-webkit-user-drag:none]"
                  src={(item as any).image}
                  alt={(item as any).alt || ''}
                  draggable={false}
                />
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply"
                  ref={el => {
                    overlayRefs.current[i] = el;
                  }}
                  style={{ background: tint }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Floating Tactical Navigation Arrows */}
      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="absolute left-1 sm:left-3 top-1/2 z-[3000] grid h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0f1117]/85 text-[#d5cec5] backdrop-blur-md transition-all duration-200 hover:border-[#ef4444]/60 hover:text-[#f7f4ee] hover:bg-[#181a20] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.8)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous project"
            disabled={!cfgRef.current.loop && active === 0}
            onClick={(e) => {
              e.stopPropagation();
              navigateBy(-1);
            }}
          >
            <ChevronLeft className="w-5 h-5 text-current" />
          </button>
          <button
            type="button"
            className="absolute right-1 sm:right-3 top-1/2 z-[3000] grid h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0f1117]/85 text-[#d5cec5] backdrop-blur-md transition-all duration-200 hover:border-[#ef4444]/60 hover:text-[#f7f4ee] hover:bg-[#181a20] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.8)] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next project"
            disabled={!cfgRef.current.loop && active === count - 1}
            onClick={(e) => {
              e.stopPropagation();
              navigateBy(1);
            }}
          >
            <ChevronRight className="w-5 h-5 text-current" />
          </button>
        </>
      )}

      {/* Bottom Indicator Pill with Scroll Tip */}
      <div className="absolute -bottom-2 sm:bottom-1 left-1/2 z-[3000] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-[#0d0f14]/90 px-4 py-2 backdrop-blur-md shadow-xl">
        <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#a8a29e] uppercase border-r border-white/15 pr-3">
          <Mouse className="w-3.5 h-3.5 text-[#ef4444]" />
          <span>SCROLL TO ADVANCE</span>
        </span>

        {showIndicators && count > 1 && (
          <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
            {data.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to slide ${i + 1}`}
                className={`cursor-pointer rounded-full transition-all duration-300 ${
                  active === i
                    ? 'w-7 h-2 bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.7)]'
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFocus(i, true);
                }}
              />
            ))}
          </div>
        )}

        <span className="text-[10px] font-mono font-bold text-[#f7f4ee]">
          0{active + 1} / 0{count}
        </span>
      </div>
    </div>
  );
}

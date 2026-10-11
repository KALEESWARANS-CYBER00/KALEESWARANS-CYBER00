'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent
} from 'react';

export type FolderFloatItem = string | { label: string; value: string; ext?: string };
export type FolderFloatTrigger = 'hover' | 'click';

export interface FolderFloatProps {
  items?: FolderFloatItem[];
  label?: string;
  sublabel?: string;
  trigger?: FolderFloatTrigger;
  defaultOpen?: boolean;
  closeOnSelect?: boolean;
  drift?: number;
  onSelect?: (value: string, index: number) => void;
  onOpenChange?: (open: boolean) => void;
  width?: number;
  height?: number;
  spread?: number;
  lift?: number;
  tilt?: number;
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  className?: string;
}

type Entry = { label: string; value: string; ext?: string };
type Size = { w: number; h: number };

const DEFAULT_LINUX_ITEMS: FolderFloatItem[] = [
  { label: 'redalert_edr.ko', value: 'redalert', ext: 'KO' },
  { label: 'exploit_scan.py', value: 'sqli', ext: 'PY' },
  { label: 'clicktrap_sim.sh', value: 'clicktrap', ext: 'SH' },
  { label: 'dns_lab.pcap', value: 'dns', ext: 'PCAP' },
  { label: 'authify_jwt.rs', value: 'authify', ext: 'RS' }
];

const PAD = 32;
const CHAR = 7.5;
const GAP = 14;
const ROW = 52;

const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

const layout = (list: Entry[], spread: number, lift: number, tilt: number, sizes: (Size | null)[]) => {
  const rows: { items: { i: number; pw: number }[]; width: number }[] = [];
  let row: { i: number; pw: number }[] = [];
  let width = 0;
  list.forEach((item, i) => {
    const pw = sizes[i]?.w ?? PAD + item.label.length * CHAR;
    if (row.length && width + GAP + pw > spread * 2) {
      rows.push({ items: row, width });
      row = [];
      width = 0;
    }
    row.push({ i, pw });
    width += (row.length > 1 ? GAP : 0) + pw;
  });
  if (row.length) rows.push({ items: row, width });
  const pos: { x: number; y: number; r: number }[] = [];
  rows.forEach((r, ri) => {
    let x = -r.width / 2;
    const shift = (ri % 2 ? 1 : -1) * Math.min(20, spread * 0.1);
    r.items.forEach(({ i, pw }) => {
      const j = jitter(i);
      pos[i] = {
        x: x + pw / 2 + shift + (j - 0.5) * 8,
        y: -lift - ri * ROW - j * 8,
        r: tilt * (j * 2 - 1)
      };
      x += pw + GAP;
    });
  });
  return pos;
};

const STYLE = `
@keyframes folder-float-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -5px); }
}
@keyframes folder-float-pop {
  30% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
`;

export default function FolderFloat({
  items = DEFAULT_LINUX_ITEMS,
  label = '~/security-dossier',
  sublabel = 'drwxr-xr-x · 5 files',
  trigger = 'hover',
  defaultOpen = false,
  closeOnSelect = false,
  drift = 0.5,
  onSelect,
  onOpenChange,
  width = 330,
  height = 226,
  spread = 220,
  lift = 44,
  tilt = 7,
  openDuration = 480,
  stagger = 40,
  bounce = 0.3,
  className = ''
}: FolderFloatProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [popped, setPopped] = useState(-1);
  const [sizes, setSizes] = useState<Size[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latest = useRef({ onSelect, onOpenChange, drift, reduce: false });
  latest.current = { onSelect, onOpenChange, drift, reduce: latest.current.reduce };

  const list: Entry[] = items.map(item =>
    typeof item === 'string'
      ? { label: item, value: item, ext: item.split('.').pop()?.toUpperCase() }
      : { ...item, ext: item.ext || item.label.split('.').pop()?.toUpperCase() }
  );
  const n = list.length;
  const pos = layout(list, spread, lift, tilt, sizes);
  const labelsKey = list.map(item => item.label).join('|');

  useLayoutEffect(() => {
    const measure = () => {
      const next = pillRefs.current.slice(0, n).map(el => (el ? { w: el.offsetWidth, h: el.offsetHeight } : null));
      if (next.some(s => !s)) return;
      const sized = next as Size[];
      setSizes(prev =>
        prev.length === sized.length && prev.every((s, i) => s.w === sized[i].w && s.h === sized[i].h) ? prev : sized
      );
    };
    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
  }, [n, labelsKey]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      latest.current.reduce = mq.matches;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(popTimer.current);
    };
  }, []);

  const set = useCallback((next: boolean) => {
    setOpen(prev => {
      if (prev === next) return prev;
      latest.current.onOpenChange?.(next);
      return next;
    });
  }, []);

  const pick = (item: Entry, i: number) => {
    latest.current.onSelect?.(item.value, i);
    clearTimeout(popTimer.current);
    setPopped(i);
    popTimer.current = setTimeout(() => setPopped(-1), 320);
    if (closeOnSelect) set(false);
  };

  const hover = trigger === 'hover';

  return (
    <div
      className={`group relative inline-block text-[13px] leading-none font-medium select-none [width:var(--ff-w)] [height:var(--ff-h)]${
        className ? ` ${className}` : ''
      }`}
      data-open={open ? '' : undefined}
      data-trigger={trigger}
      onPointerEnter={hover ? () => set(true) : undefined}
      onPointerLeave={hover ? () => set(false) : undefined}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && open) {
          e.stopPropagation();
          set(false);
        }
      }}
      style={
        {
          '--ff-w': `${width}px`,
          '--ff-h': `${height}px`,
          '--ff-spread': `${spread}px`,
          '--ff-lift': `${lift}px`,
          '--ff-open': `${openDuration}ms`,
          '--ff-close': `${Math.round(openDuration * 0.6)}ms`,
          '--ff-stagger': `${stagger}ms`,
          '--ff-n': n,
          '--ff-ease-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
          '--ff-spring': `cubic-bezier(0.34, ${(1 + bounce * 1.9).toFixed(2)}, 0.64, 1)`
        } as CSSProperties
      }
    >
      <style>{STYLE}</style>

      <div
        ref={anchorRef}
        className="absolute top-10 left-1/2 z-30 h-0 w-0 group-data-[open]:before:absolute group-data-[open]:before:top-[calc(-1*(var(--ff-lift)+140px))] group-data-[open]:before:left-[calc(-1*(var(--ff-spread)+120px))] group-data-[open]:before:h-[calc(var(--ff-lift)+140px)] group-data-[open]:before:w-[calc(2*var(--ff-spread)+240px)] group-data-[open]:before:content-['']"
      >
        {list.map((item, i) => {
          const p = pos[i] || { x: 0, y: -lift, r: 0 };
          return (
            <button
              key={`${item.value}-${i}`}
              ref={el => {
                pillRefs.current[i] = el;
              }}
              type="button"
              className="pointer-events-none absolute top-0 left-1/2 m-0 h-[38px] cursor-pointer rounded-lg border border-white/15 px-4 whitespace-nowrap opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.85)] outline-none bg-[#121316] text-[#f7f4ee] font-mono text-xs tracking-wider [transform:translate(-50%,36px)_scale(0.6)] [transform-origin:50%_50%] [-webkit-tap-highlight-color:transparent] [transition:transform_var(--ff-close)_var(--ff-ease-out)_calc((var(--ff-n)-1-var(--i))*var(--ff-stagger)*0.5),opacity_160ms_ease_calc((var(--ff-n)-1-var(--i))*var(--ff-stagger)*0.5+var(--ff-close)*0.45),scale_160ms_var(--ff-ease-out)] group-data-[open]:pointer-events-auto group-data-[open]:opacity-100 group-data-[open]:[transform:translate(calc(-50%+var(--x)),var(--y))_rotate(var(--r))_scale(1)] group-data-[open]:[transition:transform_var(--ff-open)_var(--ff-spring)_calc(var(--i)*var(--ff-stagger)),opacity_160ms_ease_calc(var(--i)*var(--ff-stagger)),scale_160ms_var(--ff-ease-out)] group-data-[open]:hover:scale-105 group-data-[open]:hover:border-[#c59b6d]/60 group-data-[open]:hover:bg-[#1a1b22] group-data-[open]:hover:text-[#f7f4ee] group-data-[open]:active:scale-95 data-[pop]:[animation:folder-float-pop_320ms_var(--ff-ease-out)] motion-reduce:[transition:opacity_200ms_ease] motion-reduce:group-data-[open]:[transition:opacity_200ms_ease_calc(var(--i)*var(--ff-stagger))]"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              data-pop={popped === i ? '' : undefined}
              style={
                {
                  '--i': i,
                  '--x': `${p.x.toFixed(1)}px`,
                  '--y': `${p.y.toFixed(1)}px`,
                  '--r': `${p.r.toFixed(2)}deg`
                } as CSSProperties
              }
              onClick={() => pick(item, i)}
            >
              <span className="flex items-center gap-2.5 [animation:folder-float-drift_3.2s_ease-in-out_infinite] [animation-delay:calc(var(--i)*-0.7s)] [animation-play-state:paused] group-data-[open]:[animation-play-state:running] motion-reduce:[animation:none]">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1e1f26] text-[#dfb88e] border border-white/10">
                  {item.ext || 'FILE'}
                </span>
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full h-full cursor-pointer transition-all duration-300">
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 330 226"
            className="w-full h-full filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroBackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1c1d24" />
                <stop offset="40%" stopColor="#13141a" />
                <stop offset="100%" stopColor="#0a0b0e" />
              </linearGradient>
            </defs>

            <path
              d="M 8,36 
                 C 8,26 14,18 24,18 
                 L 116,18 
                 C 126,18 133,23 139,30 
                 L 150,42 
                 C 155,47 163,50 174,50 
                 L 306,50 
                 C 318,50 324,56 324,68 
                 L 324,208 
                 C 324,218 316,224 304,224 
                 L 20,224 
                 C 8,224 8,218 8,208 
                 Z"
              fill="url(#heroBackGradient)"
              stroke="rgba(197,155,109,0.22)"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div
          className="absolute left-[20px] right-[20px] top-[34px] h-[126px] z-10 transition-all duration-400 ease-out origin-bottom"
          style={{
            transform: open ? 'translateY(-18px) rotate(-1.5deg)' : 'translateY(14px) scale(0.96)',
            opacity: open ? 1 : 0.4
          }}
        >
          <div className="absolute inset-0 bg-[#202129] border border-white/10 rounded-t-sm shadow-md overflow-hidden p-3.5 opacity-90 rotate-1">
            <div className="w-20 h-2 bg-[#dfb88e]/30 rounded-full mb-2" />
            <div className="w-32 h-1.5 bg-[#dfb88e]/20 rounded-full mb-1.5" />
            <div className="w-28 h-1.5 bg-[#dfb88e]/15 rounded-full" />
          </div>

          <div className="absolute inset-x-2 top-1.5 bottom-0 bg-[#0e0f14] border border-white/10 rounded-t-sm shadow-lg overflow-hidden p-4">
            <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-white/10">
              <span className="text-[10px] font-mono font-bold text-[#dfb88e] tracking-wider">
                ROOT KALEESWARAN
              </span>
              <span className="text-[9px] font-mono text-[#c59b6d]">755</span>
            </div>
            <div className="space-y-1.5 font-mono text-[9px] text-[#d5cec5]/70 leading-tight">
              <div className="w-44 h-1.5 bg-[#dfb88e]/25 rounded-full" />
              <div className="w-32 h-1.5 bg-[#dfb88e]/15 rounded-full" />
              <div className="w-36 h-1.5 bg-[#dfb88e]/20 rounded-full" />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[164px] z-20 origin-bottom transition-transform duration-400"
          style={{
            perspective: '800px',
            transform: open ? 'rotateX(-38deg)' : 'rotateX(-12deg)',
            transformOrigin: '50% 100%'
          }}
        >
          <svg
            viewBox="0 0 330 164"
            className="w-full h-full filter drop-shadow-[0_-8px_24px_rgba(0,0,0,0.7)]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroFrontGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#20222a" />
                <stop offset="25%" stopColor="#171820" />
                <stop offset="70%" stopColor="#101116" />
                <stop offset="100%" stopColor="#0a0a0d" />
              </linearGradient>
            </defs>

            <path
              d="M 8,24
                 C 8,14 16,8 26,8
                 L 304,8
                 C 314,8 322,14 322,24
                 L 322,148
                 C 322,158 314,164 302,164
                 L 20,164
                 C 8,164 8,158 8,148
                 Z"
              fill="url(#heroFrontGradient)"
              stroke="rgba(197,155,109,0.25)"
              strokeWidth="1.2"
            />
          </svg>

          <div className="absolute inset-x-8 bottom-5 flex flex-col gap-1.5 pointer-events-none select-none">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#f7f4ee] tracking-wider flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                <svg
                  className="w-4 h-4 text-[#c59b6d] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                </svg>
                <span>{label}</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#c59b6d]/40" />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#dfb88e] tracking-wide">
              <span>{sublabel}</span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-[#121316] border border-white/10 text-[#dfb88e]">
                LINUX EXT4
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="absolute inset-0 z-40 m-0 cursor-pointer border-0 bg-transparent p-0 outline-none [-webkit-tap-highlight-color:transparent]"
          aria-expanded={open}
          aria-label={`${label}, ${sublabel}`}
          onClick={() => set(!open)}
        />
      </div>
    </div>
  );
}

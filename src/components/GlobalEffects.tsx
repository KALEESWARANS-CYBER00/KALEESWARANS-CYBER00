'use client';

import dynamic from 'next/dynamic';

const Lightfall = dynamic(() => import('./Lightfall'), { ssr: false });

export default function GlobalEffects() {
  return (
    <>
      {/* Subtle Warm Architectural Ambient Lighting */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -10, backgroundColor: '#0b0c0e' }}
      >
        <Lightfall
          colors={['#c59b6d', '#8c6946', '#2b221c', '#dfb88e']}
          backgroundColor="#0b0c0e"
          speed={0.12}
          streakCount={2}
          streakWidth={1.0}
          streakLength={1.2}
          glow={0.6}
          density={0.25}
          twinkle={0.4}
          zoom={2.0}
          backgroundGlow={0.3}
          opacity={0.4}
          mouseInteraction={false}
        />
        {/* Soft studio vignette overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0c0e]/60 to-[#0b0c0e] pointer-events-none" />
      </div>
    </>
  );
}

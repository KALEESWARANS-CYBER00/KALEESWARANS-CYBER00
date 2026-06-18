import React from "react";

export default function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
        Kaleeswaran<span className="text-cyan-400">.</span>S
      </h1>

      <p className="font-mono text-sm uppercase tracking-[0.35em] text-zinc-500">
        Identify • Validate • Secure
      </p>

      <div className="mt-8 flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-900" />
        <span className="font-mono text-sm text-zinc-400">
          Whoami
        </span>
      </div>
    </div>
  );
}
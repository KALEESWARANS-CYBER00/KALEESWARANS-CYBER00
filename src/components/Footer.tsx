'use client';

export default function Footer() {
  return (
    <footer className="py-20 px-6 sm:px-12 lg:px-16 bg-[#09090b] border-t border-white/[0.08] text-xs font-mono text-[#a8a29e]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        {/* Left: Name & Disciplines */}
        <div>
          <div className="text-sm font-light tracking-[0.2em] uppercase text-[#f7f4ee] mb-4">
            KALEESWARAN S
          </div>
          <div className="flex flex-col gap-1 text-[11px] tracking-wider text-[#c59b6d]">
            <span>CYBERSECURITY</span>
            <span>TECHNOLOGY</span>
            <span>CREATIVE ENGINEERING</span>
          </div>
        </div>

        {/* Right: Social Channels & Copyright */}
        <div className="flex flex-col md:items-end gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/kaleeswarans25/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">•</span>
            <a
              href="https://github.com/KALEESWARANS-CYBER00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
            >
              GitHub
            </a>
            <span className="text-white/20">•</span>
            <a
              href="mailto:kaleeswaran.bcy24@rathinam.in"
              className="text-[#d5cec5] hover:text-[#dfb88e] transition-colors"
            >
              Email
            </a>
          </div>

          <div className="text-[10px] text-[#a8a29e]/60">
            © 2026 KALEESWARAN S. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}

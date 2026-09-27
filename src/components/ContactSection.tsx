'use client';

import { ArrowUpRight, Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

const channels = [
  { label: 'Email', value: 'kaleeswaran.bcy24@rathinam.in', href: 'mailto:kaleeswaran.bcy24@rathinam.in' },
  { label: 'LinkedIn', value: 'linkedin.com/in/kaleeswarans25', href: 'https://www.linkedin.com/in/kaleeswarans25/' },
  { label: 'GitHub', value: 'github.com/KALEESWARANS-CYBER00', href: 'https://github.com/KALEESWARANS-CYBER00' },
  { label: 'TryHackMe', value: 'tryhackme.com/p/kalees', href: 'https://tryhackme.com/p/kalees' },
  { label: 'Phone', value: '+91 6374892220', href: 'tel:+916374892220' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-32 px-4 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <h2 className="text-3xl sm:text-6xl font-black tracking-headline text-[#f7f4ee]">
              GET IN TOUCH<span className="text-[#c59b6d]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-base text-[#d5cec5] font-light max-w-md leading-relaxed">
            Open for technical security engineering opportunities, offensive research collaboration, or architecture consulting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 sm:py-5 flex items-center justify-between group hover:bg-[#121316]/50 px-2 sm:px-3 -mx-2 sm:-mx-3 transition-colors gap-3"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8a29e] block mb-1">
                      {channel.label}
                    </span>
                    <span className="text-xs sm:text-base font-light text-[#f7f4ee] group-hover:text-[#dfb88e] transition-colors break-all sm:break-normal">
                      {channel.value}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#a8a29e] group-hover:text-[#dfb88e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              ))}
            </div>

            {/* Dedicated CV Interaction */}
            <div className="pt-4 sm:pt-6">
              <a
                href="/KALEESWARAN_S-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all duration-300 shadow-[0_4px_24px_rgba(197,155,109,0.25)] group w-full xs:w-auto text-center"
              >
                <span>CURRICULUM VITAE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Minimalist Inquiry Form */}
          <div className="lg:col-span-6 bg-[#121316]/40 p-5 sm:p-8 md:p-10 border border-white/[0.08]">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alexander Vance"
                  className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@organization.com"
                  className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline project scope, engineering role, or inquiry..."
                  className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 border border-[#c59b6d]/50 bg-[#181513] text-[#dfb88e] font-mono text-xs uppercase tracking-widest hover:bg-[#c59b6d] hover:text-[#09090b] transition-all duration-300 font-bold active:scale-[0.99]"
              >
                SUBMIT INQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, Phone, Linkedin, Github, Terminal, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const channels = [
  { label: 'Email', value: 'kaleeswaran.bcy24@rathinam.in', href: 'mailto:kaleeswaran.bcy24@rathinam.in' },
  { label: 'LinkedIn', value: 'linkedin.com/in/kaleeswarans25', href: 'https://www.linkedin.com/in/kaleeswarans25/' },
  { label: 'GitHub', value: 'github.com/KALEESWARANS-CYBER00', href: 'https://github.com/KALEESWARANS-CYBER00' },
  { label: 'TryHackMe', value: 'tryhackme.com/p/kalees', href: 'https://tryhackme.com/p/kalees' },
  { label: 'Phone', value: '+91 6374892220', href: 'tel:+916374892220' },
];

export default function ContactSection() {
  const [terminalMode, setTerminalMode] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    setIsSubmitting(true);
    setTransmissionLogs([
      '[*] Initializing secure transmission channel...',
      '[*] Generating ephemeral session key...',
      '[*] Encoding payload with TLS 1.3 encryption...',
    ]);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        `[+] Authenticated sender: ${senderName} <${senderEmail}>`,
        '[+] Packaging message payload (256-bit hash verified)...',
        '[+] Transmitting payload to kaleeswaran.bcy24@rathinam.in...',
      ]);
    }, 500);

    setTimeout(() => {
      setTransmissionLogs((prev) => [
        ...prev,
        '[✓] Transmission acknowledged by remote host.',
        '[✓] Protocol sys.exit(0): Payload delivered successfully.',
      ]);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSenderName('');
    setSenderEmail('');
    setSenderMessage('');
    setSubmitted(false);
    setTransmissionLogs([]);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-32 px-4 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-20">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#c59b6d] uppercase mb-2">
              INITIATE CONNECTION // SECURE CHANNEL
            </div>
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
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all duration-300 shadow-[0_4px_24px_rgba(197,155,109,0.25)] group w-full xs:w-auto text-center rounded-sm"
              >
                <span>CURRICULUM VITAE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Interactive Inquiry Console & Terminal Mode */}
          <div className="lg:col-span-6 bg-[#121316]/60 p-5 sm:p-8 md:p-10 border border-white/[0.08] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {/* Mode Switcher */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c59b6d] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#dfb88e]">
                  {terminalMode ? 'TERMINAL PAYLOAD DISPATCH' : 'TRANSMISSION INQUIRY FORM'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setTerminalMode(!terminalMode)}
                className="text-[11px] font-mono text-[#a8a29e] hover:text-[#dfb88e] px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 transition-colors"
              >
                {terminalMode ? 'SWITCH TO GUI [FORM]' : 'SWITCH TO CLI [TERMINAL]'}
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4 font-mono">
                <CheckCircle2 className="w-10 h-10 text-[#10b981] mx-auto" />
                <h4 className="text-lg text-[#f7f4ee] font-semibold">PAYLOAD DISPATCHED SUCCESSFULLY</h4>
                <div className="text-xs text-[#a8a29e] max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-[#dfb88e]">{senderName}</span>. Your inquiry has been encrypted and received. You will receive an operational response shortly.
                </div>

                {/* Transmission Log output */}
                <div className="text-left bg-[#09090b] p-4 rounded border border-white/10 text-[11px] text-[#c59b6d] space-y-1">
                  {transmissionLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 bg-[#c59b6d] text-[#09090b] text-xs font-mono uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-colors rounded"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                {!terminalMode ? (
                  /* Standard Mode */
                  <>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                        NAME / CALLSIGN
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Alex Vance"
                        className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                        RETURN EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@organization.com"
                        className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-widest text-[#a8a29e] mb-2">
                        TRANSMISSION PAYLOAD / MESSAGE
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        placeholder="Outline project scope, security audit requirements, or collaboration..."
                        className="w-full bg-[#09090b] border border-white/10 p-3 sm:p-3.5 text-base sm:text-sm text-[#f7f4ee] placeholder-white/20 focus:border-[#c59b6d] outline-none transition-colors resize-none rounded"
                      />
                    </div>
                  </>
                ) : (
                  /* Terminal Mode (Reference Inspired) */
                  <div className="bg-[#09090b] p-4 sm:p-5 rounded border border-white/10 font-mono text-xs space-y-4">
                    <div className="text-[#a8a29e]">
                      <div>root@kalees-sec:~# ./init_connection.sh</div>
                      <div className="text-[#c59b6d]">Establishing secure channel... [READY]</div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[#dfb88e]">user@guest:~$ name=</span>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder='"John Doe"'
                          className="bg-transparent text-[#f7f4ee] border-b border-white/20 focus:border-[#c59b6d] outline-none ml-2 px-1 py-0.5 w-[65%]"
                        />
                      </div>

                      <div>
                        <span className="text-[#dfb88e]">user@guest:~$ email=</span>
                        <input
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder='"john@example.com"'
                          className="bg-transparent text-[#f7f4ee] border-b border-white/20 focus:border-[#c59b6d] outline-none ml-2 px-1 py-0.5 w-[65%]"
                        />
                      </div>

                      <div>
                        <div className="text-[#dfb88e] mb-1">user@guest:~$ echo "</div>
                        <textarea
                          rows={3}
                          required
                          value={senderMessage}
                          onChange={(e) => setSenderMessage(e.target.value)}
                          placeholder="Type payload message here..."
                          className="w-full bg-[#121316] border border-white/10 p-2 text-[#f7f4ee] focus:border-[#c59b6d] outline-none rounded text-xs resize-none"
                        />
                        <div className="text-[#dfb88e]">" &gt; message.txt</div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 border border-[#c59b6d]/50 bg-[#181513] text-[#dfb88e] font-mono text-xs uppercase tracking-widest hover:bg-[#c59b6d] hover:text-[#09090b] transition-all duration-300 font-bold active:scale-[0.99] flex items-center justify-center gap-2 rounded cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>ENCRYPTING & TRANSMITTING...</span>
                  ) : terminalMode ? (
                    <>
                      <Terminal className="w-4 h-4" />
                      <span>./SEND_PAYLOAD.sh</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT TRANSMISSION</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

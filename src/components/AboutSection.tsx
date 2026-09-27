'use client';

const capabilities = [
  {
    category: 'OFFENSIVE SECURITY & RED TEAM',
    summary: 'Adversary emulation, penetration testing, and vulnerability research.',
    items: [
      'Red Team Operations & Tactics',
      'Penetration Testing (Web/Network)',
      'Vulnerability & Bug Bounty Research',
      'Exploit Development',
      'Threat Detection & Security Monitoring',
      'OWASP Top 10 Auditing',
    ],
  },
  {
    category: 'FULL-STACK & CLOUD ENGINEERING',
    summary: 'Production backend systems, defensive tooling, and cloud infrastructure security.',
    items: [
      'Full-Stack Software Engineering',
      'Cloud Security & Architecture',
      'Systems & Linux Tooling (Python, Java, Bash)',
      'Container Security & Docker Hardening',
      'Secure API Design & Auth Protocols',
      'Database Security & SQL Hardening',
    ],
  },
  {
    category: 'CREATIVE SYSTEMS & CRAFT',
    summary: 'High-fidelity visual systems, responsive interfaces, and intentional digital work.',
    items: [
      'Interactive Digital Systems',
      'Visual Systems & Identity',
      'User Interface Architecture',
      'Security Education Tooling',
      'Performance Optimization',
      'Motion Design & Typography',
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 sm:px-12 lg:px-16 bg-[#09090b] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto">
        {/* Large Editorial Typographic Statement */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-headline text-[#f7f4ee] leading-[0.96] max-w-5xl">
            <span className="block">I WORK AT THE</span>
            <span className="block text-[#c59b6d]">INTERSECTION OF</span>
            <span className="block">SECURITY AND</span>
            <span className="block text-[#dfb88e]">ENGINEERING.</span>
          </h2>
        </div>

        {/* Concise, Human, Credible Paragraph */}
        <div className="pb-24 border-b border-white/10 max-w-4xl space-y-6 text-base sm:text-lg text-[#d5cec5] font-light leading-relaxed">
          <p>
            I am Kaleeswaran S — a Red Team Security Specialist, Cloud Security Architect, and Full-Stack Software Engineer focused on understanding how systems fail, how adversaries operate, and how to engineer resilient software that withstands real-world threats.
          </p>
          <p className="text-[#a8a29e]">
            Ranked in the top 4% globally on TryHackMe, my technical foundation spans vulnerability research, exploit development, bug bounty engagements, cloud infrastructure defense, and hands-on systems engineering in Python, Java, Bash, Next.js, and modern distributed environments. Rather than viewing security as an afterthought or a compliance checkbox, I treat security as an architectural discipline woven into every layer of software.
          </p>
        </div>

        {/* Capabilities Section: Typography & Layout Driven */}
        <div className="pt-24">
          <div className="mb-16">
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-[#f7f4ee]">
              Technical Competencies<span className="text-[#c59b6d]">.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {capabilities.map((cap) => (
              <div key={cap.category} className="flex flex-col">
                <div className="pb-4 mb-6 border-b border-white/10">
                  <h4 className="text-lg font-mono font-medium tracking-wider text-[#f7f4ee]">
                    {cap.category}
                  </h4>
                </div>

                <p className="text-sm font-light text-[#a8a29e] mb-8 leading-relaxed">
                  {cap.summary}
                </p>

                <ul className="space-y-3.5 mt-auto">
                  {cap.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs sm:text-sm font-light text-[#d5cec5] flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d]/60 group-hover:bg-[#dfb88e] transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

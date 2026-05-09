'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Award, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';

const allCertifications = [
  { 
    name: 'Web Security, Social Engineering & External Attacks', 
    issuer: 'Packt', 
    date: 'Mar 2026', 
    id: '32O6QMUL7ZZ9' 
  },
  { 
    name: 'Linux Tools for Developers', 
    issuer: 'Linux Foundation', 
    date: 'Jan 2026', 
    id: 'JUC6RX8P20VU' 
  },
  { 
    name: 'AWS: Compute, Storage and Containers', 
    issuer: 'Whizlabs', 
    date: 'Jun 2025', 
    id: 'NK1UL72MDCCX' 
  },
  { 
    name: 'Connect and Protect: Networks and Network Security', 
    issuer: 'Google', 
    date: 'Jun 2025', 
    id: 'XGUVVQPXXRLF' 
  },
  { 
    name: 'Play It Safe: Manage Security Risks', 
    issuer: 'Google', 
    date: 'Jun 2025', 
    id: 'R36DSAN5GCXD' 
  },
  { 
    name: 'Tools of the Trade: Linux and SQL', 
    issuer: 'Google', 
    date: 'Aug 2025', 
    id: 'OAJVN0RJEBSJ' 
  },
  { 
    name: 'Google Cybersecurity Certificate', 
    issuer: 'Google', 
    date: 'Jun 2025', 
    id: 'P34KOVQ3ZEWA' 
  },
  { 
    name: 'HTML and CSS in Depth', 
    issuer: 'Meta', 
    date: 'Mar 2025', 
    id: 'FN3YXK08D1H6' 
  },
  { 
    name: 'Java (Basic) Certification', 
    issuer: 'HackerRank', 
    date: 'Dec 2024', 
    id: '4DAA5FDA25DB' 
  },
  { 
    name: 'Intermediate Ethical Hacking Techniques', 
    issuer: 'Packt',
    date: '2025'
  },
  { 
    name: 'Advanced Exploitation and Scripting Techniques', 
    issuer: 'Packt',
    date: '2025'
  },
  { 
    name: 'Foundations of Microservices and REST APIs with Spring Boot', 
    issuer: 'Spring',
    date: '2025'
  },
  { 
    name: 'Spring Boot Foundations', 
    issuer: 'Spring',
    date: '2025'
  },
  { 
    name: 'Ethical Hacking Foundations & Network Security', 
    issuer: 'Security+',
    date: '2025'
  },
  { 
    name: 'Introduction to Python for Cybersecurity', 
    issuer: 'Infosec',
    date: '2025'
  },
  { 
    name: 'Web Development', 
    issuer: 'AIC RAISE', 
    date: 'Jan 2025' 
  },
  { 
    name: 'Logic Building', 
    issuer: 'Scaler', 
    date: 'Oct 2024' 
  }
];

export default function Certifications() {
  const [showAll, setShowAll] = useState(false);
  
  const row1 = allCertifications.slice(0, 6);
  const row2 = allCertifications.slice(6, 12);
  const row3 = allCertifications.slice(12);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-card-bg/10">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeader 
          title="Certifications" 
          subtitle="Validated technical expertise across cybersecurity, cloud, and modern development."
        />
      </div>

      <div className="space-y-8 relative py-4">
        {/* Decorative Gradients */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-dark-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-dark-bg to-transparent z-10" />

        <MarqueeRow items={row1} direction="left" speed={45} />
        <MarqueeRow items={row2} direction="right" speed={55} />
        <MarqueeRow items={row3} direction="left" speed={50} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-col items-center">
        {!showAll ? (
          <button 
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 px-8 py-4 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded-xl font-bold hover:bg-cyber-green hover:text-dark-bg transition-all"
          >
            Show All Credentials
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {allCertifications.map((cert, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-card-bg/30 border border-white/5 hover:border-cyber-green/30 transition-all flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyber-green/10 rounded-lg flex items-center justify-center shrink-0">
                      <Award className="text-cyber-green w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white leading-tight">{cert.name}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-gray-500">ISSUED:</span>
                      <span className="text-gray-300">{cert.date?.toUpperCase()}</span>
                    </div>
                    {cert.id && (
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-gray-500">CREDENTIAL ID:</span>
                        <span className="text-cyber-green/70">{cert.id}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowAll(false)}
              className="mx-auto mt-12 flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-bold hover:bg-white/10 hover:text-white transition-all underline decoration-cyber-green underline-offset-4"
            >
              Minimize View
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction, speed }: { items: any[], direction: "left" | "right", speed: number }) {
  return (
    <motion.div 
      animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
      transition={{ 
        duration: speed, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="flex whitespace-nowrap gap-6 w-max"
    >
      {[...items, ...items].map((cert, i) => (
        <div 
          key={i} 
          className="group flex items-center gap-4 px-6 py-4 rounded-xl bg-card-bg/40 border border-white/5 hover:border-cyber-green/40 hover:bg-cyber-green/5 transition-all cursor-pointer"
        >
          <div className="w-10 h-10 bg-cyber-green/10 rounded-lg flex items-center justify-center group-hover:bg-cyber-green/20 transition-colors">
            <Award className="text-cyber-green w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white group-hover:text-cyber-green transition-colors leading-none">{cert.name}</p>
            <p className="text-[10px] text-gray-500 font-mono mt-1 uppercase tracking-tighter">{cert.issuer}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

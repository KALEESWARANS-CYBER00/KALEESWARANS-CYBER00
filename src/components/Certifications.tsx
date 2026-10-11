'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import SectionHeader from './SectionHeader';
import { Award, ChevronDown, RotateCcw, GripVertical } from 'lucide-react';
import Shredder, { ShredderItem } from './Shredder';

interface Certification extends ShredderItem {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
}

const allCertificationsRaw = [
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
    name: 'Google Cybersecurity Professional Certificate', 
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

const allCertifications: Certification[] = allCertificationsRaw.map((cert, index) => ({
  id: cert.id || `cert-${index}`,
  name: cert.name,
  issuer: cert.issuer,
  date: cert.date,
  credentialId: cert.id
}));

export default function Certifications() {
  const [shreddedIds, setShreddedIds] = useState<Set<string | number>>(new Set());
  const [isDesktopFinePointer, setIsDesktopFinePointer] = useState(false);
  const [viewMode, setViewMode] = useState<'shredder' | 'grid'>('shredder');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      const isLargeScreen = window.innerWidth >= 768;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktopFinePointer(hasFinePointer && canHover && isLargeScreen && !prefersReduced);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer, { passive: true });
    return () => window.removeEventListener('resize', checkPointer);
  }, []);

  const activeCertifications = useMemo(() => {
    return allCertifications.filter(c => !shreddedIds.has(c.id));
  }, [shreddedIds]);

  const handleShred = useCallback((item: Certification) => {
    setShreddedIds(prev => {
      const next = new Set(prev);
      next.add(item.id);
      return next;
    });
  }, []);

  const handleRestoreAll = useCallback(() => {
    setShreddedIds(new Set());
  }, []);

  const renderCertCard = (cert: Certification, isShredderItem = false) => (
    <div className="w-full p-4 sm:p-5 rounded-xl bg-[#141211]/80 border border-[#c59b6d]/20 hover:border-[#c59b6d]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 select-none">
      <div className="flex items-center gap-3 sm:gap-4">
        {isShredderItem && (
          <div className="text-[#a8a29e]/50 hover:text-[#dfb88e] transition-colors shrink-0 hidden sm:block" aria-hidden="true">
            <GripVertical className="w-4 h-4" />
          </div>
        )}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#c59b6d]/10 rounded-xl flex items-center justify-center shrink-0 border border-[#c59b6d]/20">
          <Award className="text-[#c59b6d] w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h4 className="font-light text-[#f7f4ee] text-sm sm:text-base leading-snug">{cert.name}</h4>
          <p className="text-xs text-[#a8a29e] font-mono mt-0.5">{cert.issuer}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-mono shrink-0 pl-13 sm:pl-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
        {cert.date && (
          <div className="flex sm:flex-col items-center sm:items-end gap-1.5 sm:gap-0.5">
            <span className="text-[#a8a29e]">ISSUED:</span>
            <span className="text-[#d5cec5]">{cert.date.toUpperCase()}</span>
          </div>
        )}
        {cert.credentialId && (
          <div className="flex sm:flex-col items-center sm:items-end gap-1.5 sm:gap-0.5">
            <span className="text-[#a8a29e]">CREDENTIAL ID:</span>
            <span className="text-[#dfb88e]">{cert.credentialId}</span>
          </div>
        )}
      </div>
    </div>
  );

  const originalGridLayout = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCertifications.map(cert => (
        <div 
          key={cert.id}
          className="p-6 rounded-2xl bg-[#141211]/80 border border-[#c59b6d]/20 hover:border-[#c59b6d]/50 transition-all flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c59b6d]/10 rounded-xl flex items-center justify-center shrink-0 border border-[#c59b6d]/20">
              <Award className="text-[#c59b6d] w-6 h-6" />
            </div>
            <div>
              <h4 className="font-light text-[#f7f4ee] leading-snug">{cert.name}</h4>
              <p className="text-xs text-[#a8a29e] font-mono mt-1">{cert.issuer}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
            {cert.date && (
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#a8a29e]">ISSUED:</span>
                <span className="text-[#d5cec5]">{cert.date.toUpperCase()}</span>
              </div>
            )}
            {cert.credentialId && (
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-[#a8a29e]">CREDENTIAL ID:</span>
                <span className="text-[#dfb88e]">{cert.credentialId}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="certifications" className="py-28 relative overflow-hidden bg-[#0b0c0e] border-t border-[#c59b6d]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <SectionHeader 
          badge="Credentials & Validation"
          title="Certifications & Accreditations" 
          subtitle="Industry-verified technical competencies spanning offensive security, cloud architecture, and secure software engineering."
        />

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
          <div className="text-xs font-mono text-[#a8a29e]">
            {isDesktopFinePointer && viewMode === 'shredder' ? (
              <span>DRAG CERTIFICATION DOWN TO SHRED · {activeCertifications.length} REMAINING</span>
            ) : (
              <span>ALL ACCREDITED CREDENTIALS · {allCertifications.length} TOTAL</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {shreddedIds.size > 0 && (
              <button
                type="button"
                onClick={handleRestoreAll}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#141211] border border-[#c59b6d]/40 text-[#dfb88e] rounded-lg font-mono text-xs uppercase tracking-wider hover:bg-[#c59b6d] hover:text-[#0b0c0e] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESTORE ALL ({shreddedIds.size})</span>
              </button>
            )}

            {isDesktopFinePointer && (
              <button
                type="button"
                onClick={() => setViewMode(prev => (prev === 'shredder' ? 'grid' : 'shredder'))}
                className="px-3.5 py-1.5 bg-[#141211] border border-white/10 text-[#d5cec5] rounded-lg font-mono text-xs uppercase tracking-wider hover:text-[#dfb88e] transition-colors cursor-pointer"
              >
                {viewMode === 'shredder' ? 'SHOW GRID VIEW' : 'SHOW SHREDDER VIEW'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {isDesktopFinePointer && viewMode === 'shredder' ? (
          activeCertifications.length > 0 ? (
            <Shredder
              items={activeCertifications}
              renderItem={(cert) => renderCertCard(cert, true)}
              onShred={handleShred}
              width={900}
              height={620}
              gap={12}
              fallHeight={140}
              slitHeight={6}
              slitColor="#141211"
              color="#f7f4ee"
              stripWidth={10}
              curl={1}
              feedSpeed={220}
              className="mx-auto"
              fallback={originalGridLayout}
            />
          ) : (
            <div className="py-20 text-center border border-dashed border-[#c59b6d]/30 rounded-2xl bg-[#141211]/50 p-8 flex flex-col items-center gap-4">
              <Award className="w-12 h-12 text-[#c59b6d]/40" />
              <p className="font-mono text-sm text-[#f7f4ee]">ALL CERTIFICATIONS SHREDDED</p>
              <p className="text-xs text-[#a8a29e] max-w-sm">Every credential in the stack was processed through the shredder. Restore them at any time.</p>
              <button
                type="button"
                onClick={handleRestoreAll}
                className="mt-2 flex items-center gap-2 px-6 py-2.5 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RESTORE ALL CREDENTIALS</span>
              </button>
            </div>
          )
        ) : (
          originalGridLayout
        )}
      </div>
    </section>
  );
}

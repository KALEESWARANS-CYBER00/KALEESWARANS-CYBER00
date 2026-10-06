'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, CheckCircle, ExternalLink, ShieldCheck, Calendar, Hash, Building } from 'lucide-react';

export interface CredentialItem {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  category?: string;
  skills?: string[];
  verificationUrl?: string;
  description?: string;
}

interface CertificateModalProps {
  credential: CredentialItem | null;
  onClose: () => void;
}

export default function CertificateModal({ credential, onClose }: CertificateModalProps) {
  if (!credential) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#09090b]/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-[#0e1013] border border-[#c59b6d]/40 rounded-lg shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_32px_rgba(197,155,109,0.12)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#14161a] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#c59b6d]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#dfb88e]">
                ACCREDITATION_DOSSIER // VERIFIED
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#a8a29e] hover:text-[#f7f4ee] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Certificate Title */}
            <div>
              <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#c59b6d]/15 text-[#dfb88e] border border-[#c59b6d]/30 mb-2 uppercase">
                {credential.issuer} Accredited
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-[#f7f4ee] tracking-tight leading-snug">
                {credential.name}
              </h3>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#121316] border border-white/[0.08] rounded">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#d5cec5]">
                <Building className="w-4 h-4 text-[#c59b6d] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#a8a29e] uppercase">Issuing Authority</div>
                  <div className="text-[#f7f4ee] font-medium">{credential.issuer}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono text-[#d5cec5]">
                <Calendar className="w-4 h-4 text-[#c59b6d] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#a8a29e] uppercase">Issue Date</div>
                  <div className="text-[#f7f4ee] font-medium">{credential.date}</div>
                </div>
              </div>

              {credential.id && (
                <div className="flex items-center gap-2.5 text-xs font-mono text-[#d5cec5] sm:col-span-2">
                  <Hash className="w-4 h-4 text-[#c59b6d] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#a8a29e] uppercase">Credential ID</div>
                    <div className="text-[#dfb88e] font-mono tracking-wider font-semibold">
                      {credential.id}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Validated Skills */}
            {credential.skills && credential.skills.length > 0 && (
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#a8a29e] mb-2.5">
                  VERIFIED TECHNICAL SKILLS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {credential.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] text-[#d5cec5] border border-white/[0.08]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verification Status Banner */}
            <div className="p-3.5 bg-[#181513] border border-[#c59b6d]/30 rounded flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#10b981] shrink-0" />
              <div className="text-xs text-[#d5cec5] font-light">
                <span className="text-[#f7f4ee] font-medium font-mono">Status: Authenticated.</span>{' '}
                Documented in professional academic and security research records.
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 bg-[#14161a] border-t border-white/10 flex items-center justify-between shrink-0">
            <span className="text-xs font-mono text-[#a8a29e]">KALEESWARAN S // DOSSIER</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#c59b6d] text-[#09090b] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#dfb88e] transition-all rounded"
            >
              CLOSE DOSSIER
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

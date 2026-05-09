'use client';

import { Shield, Heart, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyber-green/10 rounded flex items-center justify-center">
              <Shield className="text-cyber-green w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              KALEESWARAN<span className="text-cyber-green">.S</span>
            </span>
          </div>

          <p className="text-gray-500 text-sm max-w-sm text-center md:text-right italic">
            “Built with passion for cybersecurity, threat intelligence, and ethical hacking.”
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} KALEESWARAN S. ALL SYSTEMS SECURE.
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-xs font-mono">
            <span>Powered by</span>
            <Terminal className="text-cyber-green w-4 h-4" />
            <span>Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

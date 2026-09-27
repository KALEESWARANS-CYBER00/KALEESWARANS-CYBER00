'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Trophy, Target, Code, ExternalLink } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'TryHackMe Success',
    description:
      'Rank 135268 with a 114-day streak. Completed 93 rooms and earned 13 security badges.',
    badge: 'Top 6%',
  },
  {
    icon: Code,
    title: 'LeetCode Proficiency',
    description:
      'Global Rank: 499,696 | 281 problems solved with a focus on Java, Python, and DSA.',
    badge: '281 Solved',
  },
  {
    icon: Target,
    title: 'Cyber Security Conference',
    description:
      'Attended the DEF CON Group Coimbatore (DCG91422) conference, engaging with security research and labs.',
    badge: 'Attendee',
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative bg-[#0b0c0e] px-6 lg:px-12 py-28 border-t border-[#c59b6d]/10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Track Record"
          title="Milestones & Achievements"
          subtitle="Documented benchmarks across competitive offensive security, problem solving, and community engagement."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="group relative flex flex-col items-center rounded-2xl border border-[#c59b6d]/20 bg-[#141211]/80 p-8 text-center transition-all duration-300 hover:border-[#c59b6d]/50 hover:bg-[#191513] shadow-lg"
            >
              <div className="absolute right-4 top-4 rounded-full bg-[#c59b6d]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#dfb88e] ring-1 ring-[#c59b6d]/30 font-mono">
                {item.badge}
              </div>

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#c59b6d]/10 ring-1 ring-[#c59b6d]/25 transition-transform duration-300 group-hover:scale-110">
                <item.icon className="h-8 w-8 text-[#c59b6d] group-hover:text-[#dfb88e] transition-colors" />
              </div>

              <h3 className="mb-3 text-xl font-light text-[#f7f4ee] tracking-tight">
                {item.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-[#d5cec5] font-light">
                {item.description}
              </p>

              {item.title === 'TryHackMe Success' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Rank
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        135,268
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Streak
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        114 Days
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Rooms
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">93</p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Badges
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">13</p>
                    </div>
                  </div>
                </div>
              )}

              {item.title === 'LeetCode Proficiency' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="mb-2 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Solved
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">281</p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Global Rank
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        499,696
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Rating
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        1,416
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Badges
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        2 (100 Days)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {item.title === 'Cyber Security Conference' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Event
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        DCG Conf
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Group ID
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        DCG91422
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Status
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        Attendee
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-[#a8a29e]">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-[#dfb88e]">
                        Coimbatore
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center rounded-2xl border border-[#c59b6d]/20 bg-[#141211]/80 p-8 shadow-lg"
        >
          <h3 className="mb-6 flex items-center gap-2 text-lg font-light text-[#f7f4ee]">
            <Code className="h-5 w-5 text-[#c59b6d]" />
            Continuous Development & Open Source
          </h3>

          <div className="group relative mx-auto w-full max-w-md">
            <motion.a
              href="https://github.com/KALEESWARANS-CYBER00"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              className="relative block overflow-hidden rounded-2xl border border-[#c59b6d]/20 bg-[#1e1915]/60 p-5 transition-all hover:border-[#c59b6d]/50"
            >
              <img
                src="https://streak-stats.demolab.com?user=KALEESWARANS-CYBER00&theme=dark&hide_border=true"
                alt="GitHub Streak Stats"
                className="w-full h-auto rounded-xl shadow-2xl shadow-black/50"
              />
              <div className="mt-5 flex justify-center">
                <div className="inline-flex items-center rounded-xl border border-[#c59b6d]/40 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#dfb88e] transition-all group-hover:bg-[#c59b6d] group-hover:text-[#0b0c0e]">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </div>
              </div>
            </motion.a>

            <div className="mt-5 border-t border-white/5 pt-4 text-center">
              <p className="font-mono text-xs text-[#a8a29e]">
                GITHUB:{' '}
                <span className="font-bold uppercase tracking-widest text-[#dfb88e]">
                  KALEESWARANS-CYBER00
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
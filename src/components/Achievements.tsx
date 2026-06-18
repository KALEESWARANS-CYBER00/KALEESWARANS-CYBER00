'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import {
  Trophy,
  Target,
  Code,
  ExternalLink,
} from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'TryHackMe Success',
    description:
      'Rank 135268 with a 114-day streak. Completed 93 rooms and earned 13 badges.',
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
      'Attended the DEF CON Group Coimbatore (DCG91422) conference, engaging with the security community and labs.',
    badge: 'Attendee',
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative bg-card-bg/20 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Achievements"
          subtitle="Milestones and recognitions in cybersecurity and competitive programming."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col items-center rounded-2xl border border-white/5 bg-[#0a0f1d] p-8 text-center transition-all hover:border-cyber-green/20"
            >
              <div className="absolute right-4 top-4 rounded bg-cyber-green/10 px-2 py-1 text-[10px] font-bold uppercase text-cyber-green ring-1 ring-cyber-green/20">
                {item.badge}
              </div>

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyber-green/5 ring-1 ring-white/5 transition-transform group-hover:scale-110">
                <item.icon className="h-8 w-8 text-cyber-green" />
              </div>

              <h3 className="mb-4 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>

              {item.title === 'TryHackMe Success' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Rank
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        135268
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Streak
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        114 Days
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Rooms
                      </p>
                      <p className="text-sm font-bold text-cyber-green">93</p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Badges
                      </p>
                      <p className="text-sm font-bold text-cyber-green">13</p>
                    </div>
                  </div>
                </div>
              )}

              {item.title === 'LeetCode Proficiency' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="mb-6 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Solved
                      </p>
                      <p className="text-sm font-bold text-cyber-green">281</p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Global Rank
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        499,696
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Rating
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        1416
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Badges
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        2 (100 Days)
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      filter: [
                        'drop-shadow(0 0 2px rgba(16,185,129,0.2))',
                        'drop-shadow(0 0 10px rgba(16,185,129,0.5))',
                        'drop-shadow(0 0 2px rgba(16,185,129,0.2))',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="flex justify-center"
                  />
                </div>
              )}

              {item.title === 'Cyber Security Conference' && (
                <div className="mt-auto w-full border-t border-white/5 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Event
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        DCG Conf
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Group ID
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        DCG91422
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Status
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        Attendee
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[10px] uppercase text-gray-500">
                        Location
                      </p>
                      <p className="text-sm font-bold text-cyber-green">
                        Coimbatore
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center rounded-2xl border border-white/5 bg-card-bg/40 p-6"
        >
          <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
            <Code className="h-5 w-5 text-cyber-green" />
            GitHub Activity
          </h3>

          <div className="group relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-red-500/10 to-cyber-green/10 blur-2xl opacity-0 transition duration-1000 group-hover:opacity-100" />

            <motion.a
              href="https://github.com/KALEESWARANS-CYBER00"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              className="relative block overflow-hidden rounded-2xl border border-white/5 bg-[#0a0f1d]/60 p-4 transition-all hover:border-red-500/30"
            >
             <img
  src="https://streak-stats.demolab.com?user=KALEESWARANS-CYBER00&theme=dark&hide_border=true"
  alt="GitHub Streak Stats"
  className="w-full h-auto rounded-xl shadow-2xl shadow-black/50"
/>
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center rounded-md border border-cyber-green px-4 py-2 font-mono text-sm text-cyber-green transition-all group-hover:bg-cyber-green/10">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
                <span>VIEW PROFILE</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </motion.a>

            <div className="mt-6 border-t border-white/5 pt-6 text-center">
              <p className="font-mono text-xs text-gray-500">
                GITHUB HANDLE:{' '}
                <span className="font-bold uppercase tracking-widest text-red-500 opacity-80">
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
'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { Trophy, Star, Target, Code, ExternalLink } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'TryHackMe Success',
    description: 'Rank 135268 with a 114-day streak. Completed 93 rooms and earned 13 badges.',
    badge: 'Top 6%',
  },
  {
    icon: Code,
    title: 'LeetCode Proficiency',
    description: 'Global Rank: 499,696 | 281 problems solved with a focus on Java, Python, and DSA.',
    badge: '281 Solved',
  },
  {
    icon: Target,
    title: 'Cyber Security Conference',
    description: 'Attended the DEF CON Group Coimbatore (DCG91422) conference, engaging with the security community and labs.',
    badge: 'Attendee',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 relative bg-card-bg/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Achievements" 
          subtitle="Milestones and recognitions in cybersecurity and competitive programming."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-2xl bg-[#0a0f1d] border border-white/5 hover:border-cyber-green/20 transition-all flex flex-col items-center text-center group"
            >
              <div className="absolute top-4 right-4 bg-cyber-green/10 text-cyber-green text-[10px] uppercase font-bold px-2 py-1 rounded ring-1 ring-cyber-green/20">
                {item.badge}
              </div>
              <div className="w-16 h-16 bg-cyber-green/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/5 group-hover:scale-110 transition-transform">
                <item.icon className="text-cyber-green w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              
              {item.title === 'TryHackMe Success' && (
                <div className="mt-auto w-full pt-6 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Rank</p>
                      <p className="text-sm font-bold text-cyber-green">135268</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Streak</p>
                      <p className="text-sm font-bold text-cyber-green">114 Days</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Rooms</p>
                      <p className="text-sm font-bold text-cyber-green">93</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Badges</p>
                      <p className="text-sm font-bold text-cyber-green">13</p>
                    </div>
                  </div>
                </div>
              )}

              {item.title === 'LeetCode Proficiency' && (
                <div className="mt-auto w-full pt-6 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4 text-left mb-6">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Solved</p>
                      <p className="text-sm font-bold text-cyber-green">281</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Global Rank</p>
                      <p className="text-sm font-bold text-cyber-green">499,696</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Rating</p>
                      <p className="text-sm font-bold text-cyber-green">1416</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Badges</p>
                      <p className="text-sm font-bold text-cyber-green">2 (100 Days)</p>
                    </div>
                  </div>
                  
                  {/* Animated Badge */}
                  <motion.div 
                    animate={{ 
                      y: [0, -5, 0],
                      filter: ["drop-shadow(0 0 2px rgba(16,185,129,0.2))", "drop-shadow(0 0 10px rgba(16,185,129,0.5))", "drop-shadow(0 0 2px rgba(16,185,129,0.2))"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex justify-center"
                  >
                    <img 
                      src="https://assets.leetcode.com/static_assets/public/images/badges/2024/100-days-2024.png" 
                      alt="LeetCode 100 Days Badge" 
                      className="h-20 w-20 object-contain"
                      onError={(e) => {
                         (e.target as HTMLImageElement).src = 'https://assets.leetcode.com/static_assets/public/images/badges/50-days-2024.png';
                      }}
                    />
                  </motion.div>
                </div>
              )}
              {item.title === 'Cyber Security Conference' && (
                <div className="mt-auto w-full pt-6 border-t border-white/5">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Event</p>
                      <p className="text-sm font-bold text-cyber-green">DCG Conf</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Group ID</p>
                      <p className="text-sm font-bold text-cyber-green">DCG91422</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Status</p>
                      <p className="text-sm font-bold text-cyber-green">Attendee</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-mono">Location</p>
                      <p className="text-sm font-bold text-cyber-green">Coimbatore</p>
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
          className="mt-12 p-6 rounded-2xl bg-card-bg/40 border border-white/5 flex flex-col items-center"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Code className="text-cyber-green w-5 h-5" />
            GitHub Activity
          </h3>
          <div className="w-full max-w-md mx-auto relative group">
            {/* Background Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-cyber-green/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <motion.a 
              href="https://github.com/KALEESWARANS-CYBER00"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              className="relative block w-full p-2 rounded-2xl bg-[#0a0f1d]/60 border border-white/5 hover:border-red-500/30 transition-all overflow-hidden"
            >
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=KALEESWARANS-CYBER00&theme=blood&hide_border=true" 
                alt="GitHub Streak Stats" 
                className="w-full h-auto rounded-xl shadow-2xl shadow-black/50"
              />
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[10px] font-mono text-gray-500">
                <span>VIEW PROFILE</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>

            <div className="text-center mt-12 pt-6 border-t border-white/5 w-full">
              <p className="text-xs font-mono text-gray-500">
                GITHUB HANDLE: <span className="text-red-500 font-bold opacity-80 uppercase tracking-widest">KALEESWARANS-CYBER00</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

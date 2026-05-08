'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Compass, Sparkles, Map, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      {/* Subtle background glow blobs */}
      <div className="absolute top-[-15%] left-[-5%] w-[50%] h-[50%] bg-neon-indigo/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-neon-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-indigo/10 border border-neon-indigo/20 mb-10"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-bold text-neon-indigo uppercase tracking-widest">
            Reimagining Travel Planning
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-9xl font-black tracking-tight text-foreground"
        >
          Vibe<span className="text-neon-indigo italic">Quest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed"
        >
          The visual travel planner that matches your energy. Discover locations
          through video and build your roadmap in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/onboarding"
            className="group px-10 py-5 bg-neon-indigo text-white rounded-2xl font-bold text-lg flex items-center gap-3 neon-glow-indigo hover:neon-glow-indigo-strong hover:-translate-y-0.5 focus-visible:neon-glow-focus transition-all duration-200"
          >
            Start Your Quest
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <Link
            href="/planner"
            className="px-10 py-5 bg-card border border-border rounded-2xl font-bold text-lg text-foreground hover:border-neon-cyan hover:text-neon-cyan hover:-translate-y-0.5 focus-visible:neon-glow-focus-cyan transition-all duration-200 flex items-center gap-3"
          >
            <Play className="w-5 h-5 text-neon-cyan" />
            View Demo
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Compass, label: 'Swipe to Discover' },
            { icon: Map, label: 'Live Roadmap' },
            { icon: Sparkles, label: 'Hidden Gems' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-full text-sm font-semibold text-foreground-secondary"
            >
              <Icon className="w-4 h-4 text-neon-indigo" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

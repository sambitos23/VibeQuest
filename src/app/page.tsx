'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Compass, Sparkles, Map, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary shadow-neon-indigo" />
          <span className="text-sm font-medium">Reimagining Travel Planning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter"
        >
          Vibe<span className="text-primary italic">Quest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl text-foreground/60 max-w-xl mx-auto"
        >
          The visual travel planner that matches your energy. Explore locations through video and build your roadmap in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/onboarding"
            className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:neon-border-indigo"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Quest <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <button className="px-8 py-4 glass border border-white/5 rounded-2xl font-bold text-lg text-foreground/80 hover:bg-white/5 transition-colors">
            See Example Trip
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 text-foreground/20">
        <Compass className="w-8 h-8" />
        <Map className="w-8 h-8" />
        <Compass className="w-8 h-8" />
      </div>
    </main>
  );
}

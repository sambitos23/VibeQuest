'use client';

import { usePlannerStore } from '@/store/usePlannerStore';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MapIntegration() {
  const { roadmapItems } = usePlannerStore();

  return (
    <aside className="w-80 flex flex-col border-l border-white/5 bg-black/40 backdrop-blur-xl h-full">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Navigation className="w-5 h-5 text-secondary shadow-neon-cyan" />
          Live Route
        </h2>
        <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-bold">
          Visualizing Your Quest
        </p>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        {/* Mock Map Visual */}
        <div className="relative aspect-square w-full rounded-[2rem] bg-[#0a0a0a] border border-white/5 overflow-hidden group">
          {/* Grid lines to make it look "techy" */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <MapIcon className="w-12 h-12 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
          </div>

          {/* Render mock points */}
          {roadmapItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute w-3 h-3 bg-primary rounded-full shadow-neon-indigo"
              style={{
                left: `${(item.coordinates.lng + 180) % 100}%`,
                top: `${(90 - item.coordinates.lat) % 100}%`,
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur px-2 py-1 rounded border border-white/10 text-[8px] font-bold whitespace-nowrap">
                {item.title}
              </div>
            </motion.div>
          ))}
          
          <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl text-[10px] text-foreground/40 font-mono">
            GOOGLE MAPS API MOCK: 
            <br /> ACTIVE_NODES: {roadmapItems.length}
          </div>
        </div>

        {/* Route List */}
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase font-black tracking-widest text-foreground/20">Stops Sequence</h4>
          <div className="space-y-3">
            {roadmapItems.length === 0 ? (
              <p className="text-xs text-foreground/20 italic">No stops added to sequence yet.</p>
            ) : (
              roadmapItems.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={item.id}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium">{item.title}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gradient-to-t from-secondary/5 to-transparent">
        <div className="flex items-center gap-4 p-4 glass rounded-2xl border border-secondary/20">
          <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <div>
            <p className="text-[10px] font-black uppercase text-secondary">Real-time Sync</p>
            <p className="text-xs text-foreground/60">Route dynamically updating...</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

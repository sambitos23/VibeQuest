'use client';

import { usePlannerStore } from '@/store/usePlannerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Plane, Trash2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SidebarRoadmap() {
  const { roadmapItems, removeFromRoadmap, nature } = usePlannerStore();

  return (
    <aside className="w-80 flex flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl h-full">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MapPin className={cn("w-5 h-5", nature === 'intense' ? "text-accent" : "text-primary")} />
          Your Roadmap
        </h2>
        <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-bold">
          {roadmapItems.length} Stops Planned
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {roadmapItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-40 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-2xl"
            >
              <p className="text-sm text-foreground/40 italic">Swipe right to add locations to your trip.</p>
            </motion.div>
          ) : (
            roadmapItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative glass p-4 rounded-2xl border border-white/5 hover:neon-border-indigo transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm truncate w-40">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {item.transportMode === 'backpacker' ? (
                        <Bus className="w-3 h-3 text-secondary" />
                      ) : (
                        <Plane className="w-3 h-3 text-primary" />
                      )}
                      <span className="text-[10px] uppercase font-black text-foreground/40 tracking-tighter">
                        {item.transportMode === 'backpacker' ? 'Bus (Est. 4h)' : 'Flight (Est. 1.5h)'}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => removeFromRoadmap(item.id)}
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-accent/10 hover:text-accent transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-6 -bottom-5 w-[1px] h-4 bg-gradient-to-b from-primary/40 to-transparent" />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-6 border-t border-white/5 bg-black/40">
        <button className={cn(
          "w-full py-3 rounded-xl font-bold transition-all shadow-lg",
          roadmapItems.length > 0 
            ? "bg-primary text-white hover:neon-border-indigo" 
            : "bg-white/5 text-foreground/20 cursor-not-allowed"
        )}>
          Finalize Itinerary
        </button>
      </div>
    </aside>
  );
}

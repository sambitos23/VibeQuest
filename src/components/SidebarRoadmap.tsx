'use client';

import { useState, useEffect, useRef } from 'react';
import { usePlannerStore } from '@/store/usePlannerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Plane, Trash2, MapPin, Flag, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SidebarRoadmap() {
  const { roadmapItems, removeFromRoadmap } = usePlannerStore();
  const [announcement, setAnnouncement] = useState('');
  const prevItemsCount = useRef(roadmapItems.length);

  useEffect(() => {
    if (roadmapItems.length > prevItemsCount.current) {
      const addedItem = roadmapItems[roadmapItems.length - 1];
      setAnnouncement(`Added ${addedItem.title} to trip`);
    } else if (roadmapItems.length < prevItemsCount.current) {
      setAnnouncement('Removed destination from trip');
    }
    prevItemsCount.current = roadmapItems.length;
  }, [roadmapItems]);

  return (
    <aside 
      className="w-[260px] h-full flex flex-col border-l border-border bg-card shrink-0"
      aria-label="Trip Roadmap"
    >
      {/* ARIA Live Region for Announcements */}
      <div className="sr-only" aria-live="polite" role="status">
        {announcement}
      </div>

      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-neon-indigo/10 rounded-xl border border-neon-indigo/20">
            <Navigation className="w-4 h-4 text-neon-indigo" />
          </div>
          <div>
            <h2 className="text-base font-black text-foreground tracking-tight">Your Roadmap</h2>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              {roadmapItems.length} Stop{roadmapItems.length !== 1 ? 's' : ''} Planned
            </p>
          </div>
        </div>
      </div>

      {/* Stops list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {roadmapItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-40 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border rounded-2xl bg-card-elevated"
            >
              <MapPin className="w-8 h-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">
                Swipe right to add locations to your trip.
              </p>
            </motion.div>
          ) : (
            roadmapItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group relative bg-card-elevated border border-border rounded-2xl p-4 hover:border-neon-indigo/40 hover:shadow-2xl hover:shadow-black/40 transition-all"
              >
                {/* Stop number */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neon-indigo/10 border border-neon-indigo/30 text-neon-indigo text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 neon-glow-indigo">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-foreground truncate">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                      {item.country}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {item.transportMode === 'backpacker' ? (
                        <Bus className="w-3.5 h-3.5 text-neon-cyan" />
                      ) : (
                        <Plane className="w-3.5 h-3.5 text-neon-indigo" />
                      )}
                      <span className="text-[10px] font-bold text-foreground-secondary uppercase tracking-wider">
                        {item.transportMode === 'backpacker'
                          ? `Bus · ${item.backpackerTime}`
                          : `Flight · ${item.executiveTime}`}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromRoadmap(item.id)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 text-muted-foreground/30 transition-all focus-visible:opacity-100 focus-visible:neon-glow-focus"
                    aria-label={`Remove ${item.title} from roadmap`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Connector line */}
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-[1.85rem] -bottom-4 w-[2px] h-4 bg-gradient-to-b from-neon-indigo to-transparent opacity-30" />
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-border">
        <button
          disabled={roadmapItems.length === 0}
          className={cn(
            'w-full py-4 rounded-xl font-black text-sm tracking-tight transition-all flex items-center justify-center gap-2 uppercase focus-visible:neon-glow-focus',
            roadmapItems.length > 0
              ? 'bg-neon-indigo text-white neon-glow-indigo hover:neon-glow-indigo-strong hover:-translate-y-0.5 active:scale-95'
              : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
          )}
        >
          <Flag className="w-4 h-4" />
          Finalize Itinerary
        </button>
      </div>
    </aside>
  );
}


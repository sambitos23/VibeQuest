'use client';

import { useState, useEffect } from 'react';
import { usePlannerStore } from '@/store/usePlannerStore';
import { Navigation, Target, Layers, Bus, Plane } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MapView() {
  const { roadmapItems, deck, currentCardIndex } = usePlannerStore();
  const currentLocation = deck[currentCardIndex];
  const [lastLabel, setLastLabel] = useState('Explore the World');

  useEffect(() => {
    if (currentLocation?.mapLabel) {
      setLastLabel(currentLocation.mapLabel);
    }
  }, [currentLocation]);

  const mapLabel = currentLocation?.mapLabel || lastLabel;

  return (
    <div className="flex-1 bg-card rounded-3xl border border-border relative overflow-hidden shadow-2xl min-h-[500px]">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--neon-indigo) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Location pill */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl shadow-2xl shadow-black/40">
          <Navigation className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-bold text-foreground">{mapLabel}</span>
        </div>
      </div>

      {/* Animated route SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 120 480 Q 280 380 460 420 T 720 160"
          fill="transparent"
          className="stroke-neon-cyan"
          strokeWidth="4"
          strokeDasharray="12 8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Map nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <MapNode x="15%" y="80%" number="1" />
        <MapNode x="57%" y="62%" number="2" active />
        <MapNode x="90%" y="25%" number="3" />

        {/* Route info bubble */}
        <div className="absolute left-[58%] top-[55%] pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center gap-3 bg-card px-4 py-3 rounded-2xl shadow-2xl border border-border"
          >
            <div className="p-2 bg-neon-indigo/10 rounded-xl border border-neon-indigo/20">
              <Bus className="w-5 h-5 text-neon-indigo" />
            </div>
            <div>
              <div className="text-xs font-black text-foreground">
                Bus:{' '}
                <span className="text-neon-cyan">
                  {currentLocation?.backpackerTime || '3h 15m'}
                </span>
              </div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                Stitched via Google Transit
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Roadmap stops list (if any) */}
      {roadmapItems.length > 0 && (
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="bg-card/80 backdrop-blur-md rounded-2xl border border-border p-4 shadow-2xl">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">
              Route Stops — Start to Finish
            </p>
            <div className="flex flex-wrap gap-2">
              {roadmapItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-background-secondary border border-border rounded-full hover:border-neon-indigo/40 transition-all"
                >
                  <span className="w-4 h-4 rounded-full bg-neon-indigo text-white text-[9px] font-black flex items-center justify-center neon-glow-indigo">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold text-foreground-secondary">
                    {item.title}
                  </span>
                  {item.transportMode === 'executive' ? (
                    <Plane className="w-3 h-3 text-neon-indigo" />
                  ) : (
                    <Bus className="w-3 h-3 text-neon-cyan" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-10">
        <button className="p-3.5 bg-card-elevated rounded-2xl shadow-2xl border border-border text-muted-foreground hover:text-neon-indigo hover:border-neon-indigo focus-visible:neon-glow-focus transition-all">
          <Target className="w-5 h-5" />
        </button>
        <button className="p-3.5 bg-card-elevated rounded-2xl shadow-2xl border border-border text-muted-foreground hover:text-neon-indigo hover:border-neon-indigo focus-visible:neon-glow-focus transition-all">
          <Layers className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function MapNode({
  x,
  y,
  number,
  active,
}: {
  x: string;
  y: string;
  number: string;
  active?: boolean;
}) {
  return (
    <div
      className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-[0.9rem] flex items-center justify-center font-black text-sm transition-all duration-500',
          active
            ? 'bg-neon-indigo text-white rotate-45 scale-110 shadow-2xl shadow-neon-indigo/50 ring-4 ring-background neon-glow-indigo'
            : 'bg-card text-muted-foreground border border-border shadow-2xl hover:border-neon-cyan hover:text-neon-cyan'
        )}
      >
        <span className={active ? '-rotate-45' : ''}>{number}</span>
      </div>
      {active && (
        <span className="absolute inset-0 rounded-[0.9rem] animate-ping bg-neon-indigo opacity-30" />
      )}
    </div>
  );
}


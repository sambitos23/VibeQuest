'use client';

import { usePlannerStore } from '@/store/usePlannerStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Star,
  ShieldCheck,
  X,
  MapPin,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LiveInsights() {
  const { deck, currentCardIndex, acceptCard, rejectCard } = usePlannerStore();
  const location = deck[currentCardIndex];

  if (!location) {
    return (
      <div className="space-y-5">
        <SectionHeader />
        <div className="bg-card rounded-3xl border border-border shadow-2xl shadow-black/40 p-12 text-center">
          <div className="text-4xl mb-4">🌍</div>
          <p className="text-muted-foreground font-semibold">
            You've explored all destinations!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SectionHeader />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-3xl border border-border shadow-2xl shadow-black/40 overflow-hidden"
        >
          {/* Image / Video area */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={location.imageUrl}
              alt={location.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Hidden Gem badge */}
            {location.isHiddenGem && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-indigo/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest neon-glow-indigo">
                <Sparkles className="w-3 h-3" />
                Hidden Gem
              </div>
            )}

            {/* Creator info + title */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 overflow-hidden">
                  <img
                    src={location.creatorAvatar}
                    alt={location.creator}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-sm font-semibold">
                  {location.creator}
                </span>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-red-500/90 rounded-lg text-[10px] text-white font-bold uppercase border border-white/10">
                  <PlayCircle className="w-3.5 h-3.5 fill-current" />
                  Shorts
                </div>
              </div>
              <h3 className="text-xl font-black text-white leading-tight tracking-tight">
                {location.title}: Hidden Gems 2024
              </h3>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 space-y-3">
            <StatRow
              icon={<Sun className="w-5 h-5 text-neon-cyan" />}
              label="Weather Forecast"
              value={location.weather}
              valueClass="text-neon-cyan font-bold"
              bg="bg-neon-cyan/5"
              border="border-neon-cyan/10"
            />

            <StatRow
              icon={<Star className="w-5 h-5 text-neon-indigo" />}
              label="Google Maps"
              value={
                <span>
                  <span className="font-black text-neon-indigo">
                    {location.mapsRating}
                  </span>
                  <span className="text-muted-foreground font-medium ml-1">
                    ({location.mapsReviews} reviews)
                  </span>
                </span>
              }
              bg="bg-card-elevated"
              border="border-border"
            />

            <div className="flex items-center justify-between p-4 bg-neon-indigo/5 rounded-2xl border border-neon-indigo/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-neon-indigo" />
                <span className="text-sm font-semibold text-muted-foreground">
                  Authenticity Score
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-neon-indigo rounded-full neon-glow-indigo"
                    initial={{ width: 0 }}
                    animate={{ width: `${location.authenticityScore}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-sm font-black text-neon-indigo">
                  {location.authenticityScore}%
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => rejectCard()}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-border bg-card-elevated rounded-2xl font-bold text-muted-foreground hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm active:scale-95 focus-visible:neon-glow-focus"
              >
                <X className="w-4 h-4" />
                Skip
              </button>
              <button
                onClick={() => acceptCard(location, 'executive')}
                className="flex-[1.5] flex items-center justify-center gap-2 py-3.5 bg-neon-indigo text-white rounded-2xl font-bold neon-glow-indigo hover:neon-glow-indigo-strong hover:-translate-y-0.5 transition-all text-sm active:scale-95 focus-visible:neon-glow-focus"
              >
                <MapPin className="w-4 h-4" />
                Save to Route
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-black text-foreground tracking-tight">
        Live Insights
      </h2>
      <span className="px-4 py-1.5 bg-neon-indigo/10 text-neon-indigo text-[10px] font-bold uppercase rounded-lg tracking-widest border border-neon-indigo/20">
        New Content
      </span>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  valueClass,
  bg,
  border,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  bg: string;
  border: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-2xl border',
        bg,
        border
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      </div>
      <span className={cn('text-sm', valueClass)}>{value}</span>
    </div>
  );
}


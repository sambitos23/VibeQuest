'use client';

import { useState } from 'react';
import { Bus, Plane, Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlannerStore } from '@/store/usePlannerStore';

export default function TransportComparison() {
  const { deck, currentCardIndex, natureLabel, nature } = usePlannerStore();
  const location = deck[currentCardIndex];
  const [selected, setSelected] = useState<'backpacker' | 'executive'>(
    nature === 'intense' ? 'executive' : 'backpacker'
  );

  const backpackerCost = location?.backpackerCost ?? 15;
  const backpackerTime = location?.backpackerTime ?? '6hrs';
  const executiveCost = location?.executiveCost ?? 80;
  const executiveTime = location?.executiveTime ?? '4hrs';

  const isBackpackerRecommended = nature === 'relaxed';
  const isExecutiveRecommended = nature === 'intense' || !nature;

  return (
    <div className="space-y-5 bg-card rounded-2xl p-5 border border-border">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-neon-indigo/10 rounded-xl border border-neon-indigo/20">
          <Bus className="w-5 h-5 text-neon-indigo" />
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground tracking-tight">
            Transport Comparison
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Recommended: <span className={nature === 'intense' ? 'text-neon-indigo' : 'text-neon-cyan'}>
              {nature === 'intense' ? 'Executive' : 'Backpacker'}
            </span> based on your vibe.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Backpacker */}
        <button
          onClick={() => setSelected('backpacker')}
          className={cn(
            'relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group focus-visible:neon-glow-focus',
            selected === 'backpacker'
              ? 'border-neon-cyan bg-neon-cyan/5 neon-glow-cyan'
              : 'border-border bg-card-elevated hover:border-neon-cyan/30 hover:bg-card'
          )}
        >
          {/* Recommended badge */}
          {isBackpackerRecommended && (
            <div className="absolute top-0 right-0">
              <div className={cn(
                'text-[9px] font-bold uppercase px-3 py-1.5 rounded-bl-2xl tracking-widest transition-colors',
                selected === 'backpacker' ? 'bg-neon-cyan text-white neon-glow-cyan-sm' : 'bg-muted text-muted-foreground'
              )}>
                Recommended
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4 mt-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                'font-bold transition-colors',
                selected === 'backpacker' ? 'text-neon-cyan' : 'text-foreground'
              )}>Backpacker</span>
              <span className={cn(
                'px-2 py-0.5 text-[9px] font-bold uppercase rounded-md tracking-widest border transition-colors',
                selected === 'backpacker' ? 'bg-neon-cyan text-white border-neon-cyan' : 'bg-muted text-muted-foreground border-border'
              )}>
                Economy
              </span>
            </div>
            <div
              className={cn(
                'p-2 rounded-xl transition-all',
                selected === 'backpacker'
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-muted text-muted-foreground group-hover:text-foreground'
              )}
            >
              <Check className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className={cn(
              'text-3xl font-black transition-colors',
              selected === 'backpacker' ? 'text-neon-cyan neon-glow-cyan' : 'text-foreground'
            )}>
              ${backpackerCost}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Bus className={cn(
              'w-4 h-4 transition-colors',
              selected === 'backpacker' ? 'text-neon-cyan' : 'text-muted-foreground'
            )} />
            <span className="text-sm font-semibold">{backpackerTime}</span>
          </div>
        </button>

        {/* Executive */}
        <button
          onClick={() => setSelected('executive')}
          className={cn(
            'relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group overflow-hidden focus-visible:neon-glow-focus',
            selected === 'executive'
              ? 'border-neon-indigo bg-neon-indigo/5 neon-glow-indigo'
              : 'border-border bg-card-elevated hover:border-neon-indigo/30 hover:bg-card'
          )}
        >
          {/* Recommended badge */}
          {isExecutiveRecommended && (
            <div className="absolute top-0 right-0">
              <div className={cn(
                'text-[9px] font-bold uppercase px-3 py-1.5 rounded-bl-2xl tracking-widest transition-colors',
                selected === 'executive' ? 'bg-neon-indigo text-white neon-glow-indigo-sm' : 'bg-muted text-muted-foreground'
              )}>
                Recommended
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4 mt-1">
            <div className="flex items-center gap-2">
              <span className={cn(
                'font-bold transition-colors',
                selected === 'executive' ? 'text-neon-indigo' : 'text-foreground'
              )}>Executive</span>
              <span className={cn(
                'px-2 py-0.5 text-[9px] font-bold uppercase rounded-md tracking-widest border transition-colors',
                selected === 'executive' ? 'bg-neon-indigo text-white border-neon-indigo' : 'bg-muted text-muted-foreground border-border'
              )}>
                Private
              </span>
            </div>
            <div
              className={cn(
                'p-2 rounded-xl transition-all',
                selected === 'executive'
                  ? 'bg-neon-indigo text-white neon-glow-indigo'
                  : 'bg-muted text-muted-foreground group-hover:text-foreground'
              )}
            >
              <Check className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className={cn(
              'text-3xl font-black transition-colors',
              selected === 'executive' ? 'text-neon-indigo neon-glow-indigo' : 'text-foreground'
            )}>
              ${executiveCost}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Plane className={cn(
              'w-4 h-4 transition-colors',
              selected === 'executive' ? 'text-neon-indigo' : 'text-muted-foreground'
            )} />
            <span className="text-sm font-semibold">{executiveTime}</span>
          </div>
        </button>
      </div>
    </div>
  );
}



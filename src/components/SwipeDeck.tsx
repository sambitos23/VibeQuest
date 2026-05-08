'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePlannerStore } from '@/store/usePlannerStore';
import SwipeCard from '@/components/SwipeCard';
import LogisticsModal from '@/components/LogisticsModal';
import { Location } from '@/data/mockLocations';
import { RotateCcw } from 'lucide-react';

export default function SwipeDeck() {
  const { deck, currentCardIndex, acceptCard, rejectCard, resetPlanner } =
    usePlannerStore();
  const [showLogistics, setShowLogistics] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<Location | null>(null);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentLocation = deck[currentCardIndex];
    setExitDirection(direction);

    if (direction === 'right') {
      setPendingLocation(currentLocation);
      // Small delay so exit animation starts before modal opens
      setTimeout(() => setShowLogistics(true), 150);
    } else {
      setTimeout(() => {
        rejectCard();
        setExitDirection(null);
      }, 350);
    }
  };

  const onConfirmLogistics = (mode: 'backpacker' | 'executive') => {
    if (pendingLocation) {
      acceptCard(pendingLocation, mode);
      setPendingLocation(null);
      setShowLogistics(false);
      setExitDirection(null);
    }
  };

  const onCloseModal = () => {
    setShowLogistics(false);
    rejectCard();
    setExitDirection(null);
  };

  const isDone = currentCardIndex >= deck.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDone || showLogistics) return;
      if (e.key === 'ArrowLeft') handleSwipe('left');
      if (e.key === 'ArrowRight') handleSwipe('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDone, showLogistics, currentCardIndex]);

  // Show up to 3 cards in the stack for depth
  const visibleCards = deck.slice(currentCardIndex, currentCardIndex + 3);

  return (
    <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden p-6 bg-background">
      {/* Card count indicator */}
      {!isDone && (
        <div className="absolute top-8 right-8 px-4 py-2 bg-card border border-border rounded-full text-xs font-bold text-muted-foreground shadow-2xl z-20">
          <span className="text-neon-indigo">{currentCardIndex + 1}</span>
          <span className="mx-1 text-border">/</span>
          <span>{deck.length}</span>
        </div>
      )}

      <div className="relative w-full max-w-[380px] aspect-[3/4]">
        <AnimatePresence mode="popLayout">
          {isDone ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-card rounded-[2.5rem] border border-border shadow-2xl shadow-black/60 p-10 text-center flex flex-col items-center justify-center gap-6"
            >
              <div className="w-20 h-20 bg-neon-indigo/10 rounded-full flex items-center justify-center text-4xl neon-glow-indigo border border-neon-indigo/20">
                🌍
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">
                  You've seen it all!
                </h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                  Ready to finalize your epic journey or start a new quest?
                </p>
              </div>
              <button
                onClick={resetPlanner}
                className="flex items-center gap-2 px-8 py-4 bg-neon-indigo text-white rounded-2xl font-black text-sm uppercase tracking-tight neon-glow-indigo hover:neon-glow-indigo-strong hover:-translate-y-0.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Discovery
              </button>
            </motion.div>
          ) : (
            // Render stack bottom-to-top so top card is last (highest z-index)
            [...visibleCards].reverse().map((location, reversedIdx) => {
              const stackIndex = visibleCards.length - 1 - reversedIdx;
              const isTop = stackIndex === 0;
              return (
                <SwipeCard
                  key={location.id}
                  location={location}
                  onSwipe={isTop ? handleSwipe : () => {}}
                  isTop={isTop}
                  stackIndex={stackIndex}
                  exitDirection={isTop ? exitDirection : null}
                />
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Hint text */}
      {!isDone && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-xs text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-4"
        >
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Swipe Left to Skip</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neon-indigo neon-glow-indigo"></span> Swipe Right to Add</span>
        </motion.p>
      )}

      <LogisticsModal
        isOpen={showLogistics}
        onClose={onCloseModal}
        onConfirm={onConfirmLogistics}
        location={pendingLocation}
      />
    </div>
  );
}


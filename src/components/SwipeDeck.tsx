'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePlannerStore } from '@/store/usePlannerStore';
import SwipeCard from '@/components/SwipeCard';
import LogisticsModal from '@/components/LogisticsModal';
import { Location } from '@/data/mockLocations';

export default function SwipeDeck() {
  const { deck, currentCardIndex, acceptCard, rejectCard } = usePlannerStore();
  const [showLogistics, setShowLogistics] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<Location | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentLocation = deck[currentCardIndex];
    if (direction === 'right') {
      setPendingLocation(currentLocation);
      setShowLogistics(true);
    } else {
      rejectCard();
    }
  };

  const onConfirmLogistics = (mode: 'backpacker' | 'executive') => {
    if (pendingLocation) {
      acceptCard(pendingLocation, mode);
      setPendingLocation(null);
      setShowLogistics(false);
    }
  };

  return (
    <div className="flex-1 relative flex items-center justify-center overflow-hidden p-8">
      <div className="relative w-full max-w-md aspect-[3/4]">
        <AnimatePresence>
          {currentCardIndex < deck.length ? (
            <>
              {/* Stack effect: Render next card underneath */}
              {currentCardIndex + 1 < deck.length && (
                <SwipeCard
                  key={deck[currentCardIndex + 1].id}
                  location={deck[currentCardIndex + 1]}
                  onSwipe={() => {}}
                  isTop={false}
                />
              )}
              
              {/* Top Card */}
              <SwipeCard
                key={deck[currentCardIndex].id}
                location={deck[currentCardIndex]}
                onSwipe={handleSwipe}
                isTop={true}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-[2.5rem] text-center space-y-6 border border-white/5"
            >
              <div className="text-6xl">🌍</div>
              <h3 className="text-2xl font-bold">You've seen it all!</h3>
              <p className="text-foreground/60">Ready to finalize your epic journey?</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-primary rounded-xl font-bold hover:neon-border-indigo transition-all"
              >
                Restart Discovery
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LogisticsModal 
        isOpen={showLogistics} 
        onClose={() => setShowLogistics(false)} 
        onConfirm={onConfirmLogistics}
        locationTitle={pendingLocation?.title || ''}
      />
    </div>
  );
}

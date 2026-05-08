'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Plane, X, Clock, DollarSign } from 'lucide-react';
import { Location } from '@/data/mockLocations';

interface LogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mode: 'backpacker' | 'executive') => void;
  location: Location | null;
}

export default function LogisticsModal({
  isOpen,
  onClose,
  onConfirm,
  location,
}: LogisticsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the first button after animation
      const timer = setTimeout(() => {
        initialFocusRef.current?.focus();
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        // Basic focus trap
        if (e.key === 'Tab' && modalRef.current) {
          const focusables = modalRef.current.querySelectorAll('button');
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  if (!location) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-sm bg-card rounded-[2.5rem] shadow-2xl shadow-black/80 border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-border">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground hover:bg-card-elevated rounded-xl transition-all focus-visible:neon-glow-focus"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 id="modal-title" className="text-2xl font-black text-foreground tracking-tight">
                Travel Logistics
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                How do you want to arrive at{' '}
                <span className="font-bold text-neon-cyan">{location.title}</span>?
              </p>
            </div>

            {/* Options */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {/* Backpacker */}
              <button
                ref={initialFocusRef}
                onClick={() => onConfirm('backpacker')}
                className="group p-6 rounded-2xl bg-card-elevated border-2 border-border hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all text-center space-y-4 active:scale-95 focus-visible:neon-glow-focus-cyan"
              >
                <div className="w-14 h-14 rounded-2xl bg-card border border-border mx-auto flex items-center justify-center group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/5 transition-all shadow-2xl">
                  <Bus className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <span className="block font-bold text-foreground text-sm">
                    Backpacker
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1 block">
                    Scenic & Slow
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-neon-cyan" />
                    <span className="font-black">${location.backpackerCost}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{location.backpackerTime}</span>
                  </div>
                </div>
              </button>

              {/* Executive */}
              <button
                onClick={() => onConfirm('executive')}
                className="group p-6 rounded-2xl bg-card-elevated border-2 border-neon-indigo/30 hover:border-neon-indigo hover:bg-neon-indigo/10 transition-all text-center space-y-4 active:scale-95 shadow-2xl shadow-neon-indigo/5 focus-visible:neon-glow-focus"
              >
                <div className="w-14 h-14 rounded-2xl bg-neon-indigo mx-auto flex items-center justify-center shadow-2xl shadow-neon-indigo/40 neon-glow-indigo">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="block font-bold text-foreground text-sm">
                    Executive
                  </span>
                  <span className="text-[10px] text-neon-indigo uppercase font-bold tracking-widest mt-1 block">
                    Fast & Direct
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-neon-indigo" />
                    <span className="font-black">${location.executiveCost}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{location.executiveTime}</span>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-center text-[10px] text-muted-foreground/40 pb-6 font-bold uppercase tracking-widest">
              Estimated times based on route
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}



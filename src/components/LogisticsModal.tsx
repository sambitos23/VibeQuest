'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Plane, X } from 'lucide-react';

interface LogisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (mode: 'backpacker' | 'executive') => void;
  locationTitle: string;
}

export default function LogisticsModal({ isOpen, onClose, onConfirm, locationTitle }: LogisticsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm glass p-8 rounded-[2rem] border border-white/10 shadow-2xl space-y-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold">Travel Logistics</h3>
              <p className="mt-2 text-foreground/60 text-sm">
                How do you want to arrive at <span className="text-primary font-bold">{locationTitle}</span>?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onConfirm('backpacker')}
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:neon-border-cyan transition-all text-center space-y-3"
              >
                <div className="p-3 rounded-xl bg-secondary/10 mx-auto w-fit group-hover:bg-secondary/20 transition-colors">
                  <Bus className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <span className="block font-bold">Backpacker</span>
                  <span className="text-[10px] text-foreground/40 uppercase font-black">Scenic & Slow</span>
                </div>
              </button>

              <button
                onClick={() => onConfirm('executive')}
                className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:neon-border-indigo transition-all text-center space-y-3"
              >
                <div className="p-3 rounded-xl bg-primary/10 mx-auto w-fit group-hover:bg-primary/20 transition-colors">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block font-bold">Executive</span>
                  <span className="text-[10px] text-foreground/40 uppercase font-black">Fast & Direct</span>
                </div>
              </button>
            </div>
            
            <p className="text-center text-[10px] text-foreground/20 italic">
              Estimated travel times will update in your roadmap.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

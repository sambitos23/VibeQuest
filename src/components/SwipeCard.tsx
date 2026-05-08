'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Location } from '@/data/mockLocations';
import { Sparkles, X, Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwipeCardProps {
  location: Location;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export default function SwipeCard({ location, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: isTop ? 10 : 0 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      className={cn(
        "absolute inset-0 cursor-grab active:cursor-grabbing",
        !isTop && "scale-95 translate-y-4 opacity-40"
      )}
    >
      <div className="relative h-full w-full glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
        {/* Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-10 left-10 z-20 border-4 border-secondary text-secondary font-black text-4xl px-4 py-2 rounded-xl rotate-[-15deg] uppercase">
          Exciting
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-10 right-10 z-20 border-4 border-accent text-accent font-black text-4xl px-4 py-2 rounded-xl rotate-[15deg] uppercase">
          Skip
        </motion.div>

        {/* YouTube Iframe Placeholder */}
        <div className="relative h-3/5 w-full bg-muted">
          <iframe
            className="w-full h-full object-cover pointer-events-none"
            src={`https://www.youtube.com/embed/${location.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${location.youtubeId}&showinfo=0&rel=0`}
            title={location.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {location.isHiddenGem && (
            <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3 h-3" />
              Hidden Gem
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 h-2/5 flex flex-col justify-between bg-card">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{location.category}</span>
            </div>
            <h3 className="text-3xl font-black">{location.title}</h3>
            <p className="mt-3 text-foreground/60 text-sm leading-relaxed line-clamp-2">
              {location.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 pb-2">
             <button className="p-4 rounded-full border border-white/5 bg-white/5 hover:bg-accent/10 hover:text-accent transition-all">
               <X className="w-6 h-6" />
             </button>
             <button className="p-6 rounded-full border border-primary/20 bg-primary/10 text-primary shadow-neon-indigo hover:bg-primary/20 transition-all">
               <Heart className="w-8 h-8 fill-current" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

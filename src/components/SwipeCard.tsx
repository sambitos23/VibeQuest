import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '@/data/mockLocations';
import { Sparkles, X, Heart, MapPin, Play, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwipeCardProps {
  location: Location;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  stackIndex?: number;
  exitDirection?: 'left' | 'right' | null;
}

export default function SwipeCard({
  location,
  onSwipe,
  isTop,
  stackIndex = 0,
  exitDirection = null,
}: SwipeCardProps) {
  const stackOffset = stackIndex * 8;
  const stackScale = 1 - stackIndex * 0.05;

  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(true);

  // Reset video states when location changes
  useEffect(() => {
    setVideoError(false);
    setIsVideoLoaded(false);
    setUseVideo(true);
  }, [location.id]);

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isTop ? 1 : stackScale,
        y: isTop ? 0 : stackOffset,
        zIndex: isTop ? 10 : 10 - stackIndex,
      }}
      exit={
        exitDirection === 'right'
          ? { x: 400, rotate: 20, opacity: 0, transition: { duration: 0.35 } }
          : exitDirection === 'left'
          ? { x: -400, rotate: -20, opacity: 0, transition: { duration: 0.35 } }
          : { opacity: 0 }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className={cn(
        'absolute inset-0',
        !isTop && 'pointer-events-none'
      )}
    >
      <div className="relative h-full w-full bg-card rounded-[2rem] overflow-hidden border border-border shadow-2xl shadow-black/40">
        {/* Media Container */}
        <div className="relative h-[62%] w-full overflow-hidden bg-muted">
          {/* YouTube Video Embed */}
          {isTop && location.youtubeId && useVideo && !videoError && (
            <div className={cn(
              "absolute inset-0 z-10 transition-opacity duration-1000",
              isVideoLoaded ? "opacity-100" : "opacity-0"
            )}>
              <iframe
                src={`https://www.youtube.com/embed/${location.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${location.youtubeId}&modestbranding=1&rel=0&iv_load_policy=3`}
                className="w-full h-full pointer-events-none scale-[1.4]"
                allow="autoplay; encrypted-media"
                onLoad={() => setIsVideoLoaded(true)}
                onError={() => {
                  setVideoError(true);
                  setUseVideo(false);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            </div>
          )}

          {/* Fallback/Default Image */}
          <img
            src={location.imageUrl}
            alt={location.title}
            className={cn(
              "w-full h-full object-cover select-none transition-opacity duration-1000",
              isVideoLoaded && isTop ? "opacity-0" : "opacity-100"
            )}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

          {/* Status Indicators */}
          <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
            {location.isHiddenGem && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-indigo/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest neon-glow-indigo">
                <Sparkles className="w-3 h-3" />
                Hidden Gem
              </div>
            )}
            {isTop && location.youtubeId && !videoError && (
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-opacity duration-500",
                isVideoLoaded ? "opacity-100" : "opacity-50"
              )}>
                <div className={cn("w-1.5 h-1.5 rounded-full bg-red-500", isVideoLoaded && "animate-pulse")} />
                {isVideoLoaded ? "Live Preview" : "Loading Video..."}
              </div>
            )}
          </div>

          {/* Country tag */}
          <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 z-20">
            {location.country}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-[38%] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-neon-cyan mb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {location.category}
              </span>
            </div>
            <h3 className="text-2xl font-black text-foreground leading-tight tracking-tight">
              {location.title}
            </h3>
            <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed line-clamp-2">
              {location.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => onSwipe('left')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background-secondary text-muted-foreground font-bold text-sm hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
              Skip
            </button>
            <button
              onClick={() => onSwipe('right')}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-neon-indigo text-white font-bold text-sm neon-glow-indigo hover:neon-glow-indigo-strong hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
              Add to Trip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


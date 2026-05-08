'use client';

import { usePlannerStore } from '@/store/usePlannerStore';
import SidebarRoadmap from '@/components/SidebarRoadmap';
import SwipeDeck from '@/components/SwipeDeck';
import MapIntegration from '@/components/MapIntegration';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

export default function PlannerPage() {
  const { nature } = usePlannerStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!nature) {
      // If no nature selected, go back to onboarding
      router.push('/onboarding');
    }
  }, [nature, router]);

  if (!mounted || !nature) return null;

  return (
    <div className={clsx(
      "flex h-screen w-full overflow-hidden transition-colors duration-1000",
      nature === 'intense' ? "bg-[#080505]" : "bg-[#050508]"
    )}>
      {/* 3-Column Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex w-full h-full"
      >
        <SidebarRoadmap />
        <SwipeDeck />
        <MapIntegration />
      </motion.div>

      {/* Nature Glow Effects */}
      <div className={clsx(
        "absolute top-0 right-0 w-96 h-96 blur-[150px] opacity-20 pointer-events-none transition-all duration-1000",
        nature === 'intense' ? "bg-accent" : "bg-primary"
      )} />
      <div className={clsx(
        "absolute bottom-0 left-0 w-96 h-96 blur-[150px] opacity-10 pointer-events-none transition-all duration-1000",
        nature === 'intense' ? "bg-primary" : "bg-secondary"
      )} />
    </div>
  );
}

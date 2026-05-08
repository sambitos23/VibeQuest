'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlannerStore } from '@/store/usePlannerStore';
import AppSidebar from '@/components/AppSidebar';
import TopBar from '@/components/TopBar';
import LiveInsights from '@/components/LiveInsights';
import MapView from '@/components/MapView';
import TransportComparison from '@/components/TransportComparison';
import SidebarRoadmap from '@/components/SidebarRoadmap';
import SwipeDeck from '@/components/SwipeDeck';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function PlannerPage() {
  const { activeNav } = usePlannerStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Left Navigation Sidebar - Hidden on mobile */}
      <div className="hidden md:flex shrink-0">
        <AppSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar />

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main content switch */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-background">
            <AnimatePresence mode="wait">
              {activeNav === 'Discover' ? (
                <motion.div
                  key="discover"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col p-4 md:p-6"
                >
                  <ErrorBoundary>
                    <SwipeDeck />
                  </ErrorBoundary>
                </motion.div>
              ) : (
                <motion.div
                  key="planner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 md:p-8 space-y-6 md:space-y-8"
                >
                  {/* Top grid: Live Insights (left) + Map (right) */}
                  <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 md:gap-8">
                    {/* Live Insights panel */}
                    <div className="flex flex-col">
                      <ErrorBoundary>
                        <LiveInsights />
                      </ErrorBoundary>
                    </div>

                    {/* Map View */}
                    <div className="flex flex-col min-h-[400px] md:min-h-[500px]">
                      <ErrorBoundary>
                        <MapView />
                      </ErrorBoundary>
                    </div>
                  </div>

                  {/* Transport Comparison */}
                  <div className="bg-card rounded-3xl border border-border shadow-2xl shadow-black/20 p-4 md:p-6">
                    <ErrorBoundary>
                      <TransportComparison />
                    </ErrorBoundary>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Roadmap Sidebar - Hidden on mobile/tablet */}
          <div className="hidden lg:flex shrink-0">
            <SidebarRoadmap />
          </div>
        </div>
      </main>
    </div>
  );
}


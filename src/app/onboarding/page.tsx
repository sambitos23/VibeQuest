'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePlannerStore, NatureType } from '@/store/usePlannerStore';
import {
  Compass,
  Sparkles,
  Map,
  Mountain,
  Building2,
  Gem,
  Landmark,
  Coffee,
  Zap,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 1,
    tag: 'Step 1 of 3',
    title: 'Choose your pace',
    subtitle: 'How do you like to travel?',
    options: [
      {
        id: 'relaxed',
        label: 'Slow & Steady',
        description: 'Sunsets, spas, and long lunches. You savour every moment.',
        icon: Coffee,
        emoji: '☕',
        color: 'teal',
      },
      {
        id: 'intense',
        label: 'High Energy',
        description: 'Dawn to dusk exploration and adrenaline. Every second counts.',
        icon: Zap,
        emoji: '⚡',
        color: 'emerald',
      },
    ],
  },
  {
    id: 2,
    tag: 'Step 2 of 3',
    title: 'Visual preference',
    subtitle: 'What landscapes speak to you?',
    options: [
      {
        id: 'nature',
        label: 'Nature First',
        description: 'Mountains, forests, and fresh air. The wild calls to you.',
        icon: Mountain,
        emoji: '🏔️',
        color: 'teal',
      },
      {
        id: 'urban',
        label: 'City Pulse',
        description: 'Skyscrapers, lights, and subway hum. You thrive in the urban jungle.',
        icon: Building2,
        emoji: '🌆',
        color: 'emerald',
      },
    ],
  },
  {
    id: 3,
    tag: 'Step 3 of 3',
    title: 'Discovery style',
    subtitle: 'What kind of traveller are you?',
    options: [
      {
        id: 'hidden',
        label: 'Hidden Gems',
        description: 'Off the beaten path secrets. You find places before they trend.',
        icon: Gem,
        emoji: '💎',
        color: 'teal',
      },
      {
        id: 'iconic',
        label: 'Iconic Landmarks',
        description: 'The must-see sights of the world. You collect experiences.',
        icon: Landmark,
        emoji: '🗺️',
        color: 'emerald',
      },
    ],
  },
];

const NATURE_LABELS: Record<string, string> = {
  relaxed: 'Relaxed Explorer',
  intense: 'Thrill Seeker',
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const setNature = usePlannerStore((state) => state.setNature);
  const router = useRouter();

  const handleSelect = (optionId: string) => {
    const newSelections = { ...selections, [currentStep]: optionId };
    setSelections(newSelections);

    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      const finalNature = newSelections[0] as NatureType;
      const label = (finalNature ? NATURE_LABELS[finalNature] : null) || 'Modern Explorer';
      setNature(finalNature, label);
      router.push('/planner');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-indigo via-neon-indigo-500 to-neon-cyan" />
      <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-neon-indigo/10 blur-[80px] rounded-full opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 blur-[80px] rounded-full opacity-70 pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <span className="text-2xl font-black text-neon-indigo">VibeQuest</span>
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Progress bar */}
        <div className="flex gap-2 mb-12">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-all duration-500',
                i <= currentStep ? 'bg-neon-indigo' : 'bg-card'
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neon-indigo uppercase tracking-widest">
                {STEPS[currentStep].tag}
              </span>
              <h1 className="text-5xl font-black text-foreground tracking-tight">
                {STEPS[currentStep].title}
              </h1>
              <p className="text-lg text-muted-foreground font-medium">
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STEPS[currentStep].options.map((option) => {
                const isHovered = hoveredOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={cn(
                      'group relative p-8 text-left rounded-2xl border-2 transition-all duration-200',
                      'bg-card hover:border-neon-indigo hover:-translate-y-0.5',
                      'focus-visible:neon-glow-focus focus-visible:outline-none',
                      selections[currentStep] === option.id
                        ? 'border-neon-indigo neon-glow-indigo'
                        : 'border-border'
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300',
                          isHovered ? 'bg-neon-indigo-500 scale-110' : 'bg-card-elevated'
                        )}
                      >
                        {option.emoji}
                      </div>
                      <ArrowRight
                        className={cn(
                          'w-5 h-5 text-neon-indigo transition-all duration-300',
                          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        )}
                      />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-2">
                      {option.label}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed text-sm">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Back button */}
        {currentStep > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleBack}
            className="mt-8 flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold text-sm focus-visible:neon-glow-focus focus-visible:outline-none rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
        )}
      </div>
    </div>
  );
}

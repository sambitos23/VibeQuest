'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePlannerStore, NatureType } from '@/store/usePlannerStore';
import { Compass, Sparkles, Map, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 1,
    title: 'Choose your pace',
    options: [
      { id: 'relaxed', label: 'Slow & Steady', description: 'Sunsets, spas, and long lunches.', icon: Map },
      { id: 'intense', label: 'High Energy', description: 'Dawn to dusk exploration and adrenaline.', icon: Sparkles },
    ],
  },
  {
    id: 2,
    title: 'Visual Preference',
    options: [
      { id: 'nature', label: 'Nature First', description: 'Mountains, forests, and fresh air.', icon: Compass },
      { id: 'urban', label: 'City Pulse', description: 'Skyscrapers, lights, and subway hum.', icon: Map },
    ],
  },
  {
    id: 3,
    title: 'Discovery Style',
    options: [
      { id: 'hidden', label: 'Hidden Gems', description: 'Off the beaten path secrets.', icon: Sparkles },
      { id: 'iconic', label: 'Iconic Landmarks', description: 'The must-see sights of the world.', icon: Map },
    ],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const setNature = usePlannerStore((state) => state.setNature);
  const router = useRouter();

  const handleSelect = (optionId: string) => {
    const newSelections = { ...selections, [currentStep]: optionId };
    setSelections(newSelections);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: Calculate nature based on first choice mainly for the prototype
      const finalNature = newSelections[0] as NatureType;
      setNature(finalNature);
      router.push('/planner');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {STEPS[currentStep].title}
              </h1>
              <p className="mt-2 text-foreground/60">Step {currentStep + 1} of 3</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STEPS[currentStep].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className="glass p-6 rounded-2xl text-left hover:neon-border-indigo transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary/0 group-hover:text-primary transition-all translate-x-4 group-hover:translate-x-0" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{option.label}</h3>
                  <p className="mt-1 text-foreground/60">{option.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-12 flex justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 transition-all duration-500 rounded-full",
                i === currentStep ? "w-8 bg-primary" : "w-2 bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

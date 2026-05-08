import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location, mockLocations } from '@/data/mockLocations';

export type NatureType = 'relaxed' | 'intense' | null;
export type TransportMode = 'backpacker' | 'executive' | null;

interface RoadmapItem extends Location {
  transportMode: TransportMode;
}

interface PlannerState {
  nature: NatureType;
  roadmapItems: RoadmapItem[];
  deck: Location[];
  currentCardIndex: number;
  
  // Actions
  setNature: (nature: NatureType) => void;
  acceptCard: (location: Location, transportMode: TransportMode) => void;
  rejectCard: () => void;
  removeFromRoadmap: (id: string) => void;
  resetPlanner: () => void;
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      nature: null,
      roadmapItems: [],
      deck: mockLocations,
      currentCardIndex: 0,

      setNature: (nature) => set({ nature }),

      acceptCard: (location, transportMode) => 
        set((state) => ({
          roadmapItems: [...state.roadmapItems, { ...location, transportMode }],
          currentCardIndex: state.currentCardIndex + 1,
        })),

      rejectCard: () => 
        set((state) => ({
          currentCardIndex: state.currentCardIndex + 1,
        })),

      removeFromRoadmap: (id) =>
        set((state) => ({
          roadmapItems: state.roadmapItems.filter((item) => item.id !== id),
        })),

      resetPlanner: () =>
        set({
          nature: null,
          roadmapItems: [],
          currentCardIndex: 0,
        }),
    }),
    {
      name: 'vibequest-storage',
    }
  )
);

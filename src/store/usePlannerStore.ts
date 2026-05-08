import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Location, mockLocations } from '@/data/mockLocations';

export type NatureType = 'relaxed' | 'intense' | null;
export type TransportMode = 'backpacker' | 'executive';

export const MAX_ROADMAP_CAPACITY = 20;

export interface RoadmapItem extends Location {
  transportMode: TransportMode;
  addedAt: number;
}

export interface PlannerState {
  nature: NatureType;
  natureLabel: string;
  roadmapItems: RoadmapItem[];
  deck: Location[];
  currentCardIndex: number;
  activeNav: string;

  // Derived
  roadmapFull: boolean;

  // Actions
  setNature: (nature: NatureType, label: string) => void;
  acceptCard: (location: Location, transportMode: TransportMode) => void;
  rejectCard: () => void;
  removeFromRoadmap: (id: string) => void;
  resetPlanner: () => void;
  setActiveNav: (nav: string) => void;
}

/**
 * Validates the persisted state schema on hydration.
 * Returns true if the state shape matches expected types; false otherwise.
 */
function validatePersistedState(state: any): boolean {
  if (!state || typeof state !== 'object') return false;

  // Validate nature: must be null, 'relaxed', or 'intense'
  if (state.nature !== null && state.nature !== 'relaxed' && state.nature !== 'intense') {
    return false;
  }

  // Validate natureLabel: must be a string
  if (typeof state.natureLabel !== 'string') {
    return false;
  }

  // Validate roadmapItems: must be an array
  if (!Array.isArray(state.roadmapItems)) {
    return false;
  }

  // Validate currentCardIndex: must be a number
  if (typeof state.currentCardIndex !== 'number') {
    return false;
  }

  // Validate deck: must be an array
  if (!Array.isArray(state.deck)) {
    return false;
  }

  return true;
}

/**
 * Custom storage adapter that wraps localStorage with error handling
 * for private browsing, quota exceeded, and malformed data scenarios.
 */
export const safeStorage = {
  getItem(name: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      const value = localStorage.getItem(name);
      if (value === null) return null;

      // Attempt to parse to validate JSON structure
      const parsed = JSON.parse(value);

      // Validate the state portion of the persisted data
      if (parsed && typeof parsed === 'object' && 'state' in parsed) {
        if (!validatePersistedState(parsed.state)) {
          // Schema validation failed — discard invalid data
          console.warn(
            '[VibeQuest] Stored state failed schema validation. Using defaults.'
          );
          try {
            localStorage.removeItem(name);
          } catch {
            // Ignore removal failure
          }
          return null;
        }
      }

      return value;
    } catch (error) {
      // localStorage unavailable (private browsing) or JSON parse error
      console.warn(
        '[VibeQuest] Failed to read from localStorage:',
        error instanceof Error ? error.message : error
      );
      return null;
    }
  },

  setItem(name: string, value: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      // Handle quota exceeded or private browsing restrictions
      if (
        error instanceof DOMException &&
        (error.name === 'QuotaExceededError' ||
          error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      ) {
        console.warn(
          '[VibeQuest] localStorage quota exceeded. State will not be persisted.'
        );
      } else {
        console.warn(
          '[VibeQuest] Failed to write to localStorage:',
          error instanceof Error ? error.message : error
        );
      }
    }
  },

  removeItem(name: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.warn(
        '[VibeQuest] Failed to remove from localStorage:',
        error instanceof Error ? error.message : error
      );
    }
  },
};

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set, get) => ({
      nature: null,
      natureLabel: 'Modern Explorer',
      roadmapItems: [],
      deck: mockLocations,
      currentCardIndex: 0,
      activeNav: 'Discover',

      get roadmapFull() {
        return get().roadmapItems.length >= MAX_ROADMAP_CAPACITY;
      },

      setNature: (nature, label) => set({ nature, natureLabel: label }),

      acceptCard: (location, transportMode) => {
        const state = get();
        const isFull = state.roadmapItems.length >= MAX_ROADMAP_CAPACITY;

        set({
          roadmapItems: isFull
            ? state.roadmapItems
            : [
                ...state.roadmapItems,
                { ...location, transportMode, addedAt: Date.now() },
              ],
          currentCardIndex: state.currentCardIndex + 1,
        });
      },

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
          natureLabel: 'Modern Explorer',
          roadmapItems: [],
          currentCardIndex: 0,
          deck: mockLocations,
        }),

      setActiveNav: (nav) => set({ activeNav: nav }),
    }),
    {
      name: 'vibequest-storage',
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        nature: state.nature,
        natureLabel: state.natureLabel,
        roadmapItems: state.roadmapItems,
        currentCardIndex: state.currentCardIndex,
        deck: state.deck,
      }) as unknown as PlannerState,
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            // Suppress noise during SSR build
            if (typeof window === 'undefined') return;
            
            console.warn(
              '[VibeQuest] Error during state rehydration:',
              error instanceof Error ? error.message : error
            );
          }
        };
      },
    }
  )
);

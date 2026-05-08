import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { usePlannerStore } from '../../store/usePlannerStore';
import { mockLocations } from '../../data/mockLocations';

describe('Persistence and Hydration Property Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    usePlannerStore.getState().resetPlanner();
    vi.clearAllMocks();
  });

  it('Property: stored state should match in-memory state after acceptCard', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (numAdds) => {
        usePlannerStore.getState().resetPlanner();
        
        for (let i = 0; i < numAdds; i++) {
          usePlannerStore.getState().acceptCard(mockLocations[i], 'backpacker');
        }

        const state = usePlannerStore.getState();
        const stored = JSON.parse(localStorage.getItem('vibequest-storage') || '{}');
        
        expect(stored.state.roadmapItems.length).toBe(state.roadmapItems.length);
        expect(stored.state.currentCardIndex).toBe(state.currentCardIndex);
        expect(stored.state.roadmapItems[0].id).toBe(state.roadmapItems[0].id);
      })
    );
  });

  it('Property: hydration should restore state correctly from valid localStorage', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (numItems) => {
        localStorage.clear();
        const items = mockLocations.slice(0, numItems).map(l => ({
          ...l,
          transportMode: 'executive',
          addedAt: Date.now()
        }));

        const mockStorage = {
          state: {
            roadmapItems: items,
            currentCardIndex: numItems,
            nature: 'intense',
            natureLabel: 'Intense Explorer',
            activeNav: 'Roadmap'
          },
          version: 1
        };

        localStorage.setItem('vibequest-storage', JSON.stringify(mockStorage));
        
        // Trigger hydration (Zustand persist handles this on create, 
        // but we can force it or check current state if it's already hydrated)
        // Since we are in a test environment, we might need to manually trigger or 
        // check how the store behaves with the pre-set localStorage.
        
        // For this test, we verify that IF we had this in storage, a new store instance 
        // would pick it up. In Vitest/JSDOM, we can re-import or reset.
        
        // Actually, let's just verify that the store's persist.rehydrate() works.
        usePlannerStore.persist.rehydrate();
        
        const state = usePlannerStore.getState();
        expect(state.roadmapItems.length).toBe(numItems);
        expect(state.nature).toBe('intense');
      })
    );
  });
});

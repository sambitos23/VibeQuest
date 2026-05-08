import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { usePlannerStore } from '../../store/usePlannerStore';
import { mockLocations } from '../../data/mockLocations';

describe('Store Actions Property-Based Tests', () => {
  beforeEach(() => {
    usePlannerStore.getState().resetPlanner();
  });

  it('Property: acceptCard should increment roadmapItems length up to MAX (20)', () => {
    const store = usePlannerStore.getState();
    const locations = mockLocations.slice(0, 25); // Get enough for testing limit

    fc.assert(
      fc.property(fc.integer({ min: 1, max: 25 }), (numAdds) => {
        usePlannerStore.getState().resetPlanner();
        
        for (let i = 0; i < numAdds; i++) {
          const loc = locations[i % locations.length];
          usePlannerStore.getState().acceptCard(loc, 'backpacker');
        }

        const state = usePlannerStore.getState();
        const expectedLength = Math.min(numAdds, 20);
        expect(state.roadmapItems.length).toBe(expectedLength);
        expect(state.currentCardIndex).toBe(numAdds);
      })
    );
  });

  it('Property: removeFromRoadmap should always decrease length if ID exists', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (numAdds) => {
        usePlannerStore.getState().resetPlanner();
        const locations = mockLocations.slice(0, numAdds);
        
        locations.forEach(loc => {
          usePlannerStore.getState().acceptCard(loc, 'backpacker');
        });

        const stateBefore = usePlannerStore.getState();
        const idToRemove = locations[0].id;
        
        usePlannerStore.getState().removeFromRoadmap(idToRemove);
        
        const stateAfter = usePlannerStore.getState();
        expect(stateAfter.roadmapItems.length).toBe(stateBefore.roadmapItems.length - 1);
        expect(stateAfter.roadmapItems.find(i => i.id === idToRemove)).toBeUndefined();
      })
    );
  });

  it('Property: resetPlanner should always clear state', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10 }), (numAdds) => {
        for (let i = 0; i < numAdds; i++) {
          usePlannerStore.getState().acceptCard(mockLocations[0], 'backpacker');
        }
        
        usePlannerStore.getState().resetPlanner();
        const state = usePlannerStore.getState();
        
        expect(state.roadmapItems.length).toBe(0);
        expect(state.currentCardIndex).toBe(0);
        expect(state.nature).toBeNull();
      })
    );
  });
});

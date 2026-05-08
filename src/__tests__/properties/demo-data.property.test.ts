import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { mockLocations } from '../../data/mockLocations';

/**
 * Property 12: Demo Data Schema Validation
 * Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7
 *
 * For all locations in the mockLocations array, the following constraints SHALL hold:
 * - The array contains at least 12 locations across at least 6 unique countries
 * - All 4 categories (nature, urban, cultural, adventure) have at least 2 locations each
 * - Each youtubeId is non-empty and unique across all locations
 * - Each creator matches format @[Handle] with max 20 characters and is unique
 * - Each description contains 2-3 sentences, each between 50-200 characters
 * - backpackerCost between 5-200, executiveCost between 35-500, executiveCost > backpackerCost
 * - Duration strings match format [number][unit] (e.g., "6hrs", "45min")
 * - coordinates.lat between -90 and 90, coordinates.lng between -180 and 180
 * - weather matches format [number]°C / [condition]
 * - mapsRating between 4.5 and 5.0
 * - authenticityScore is integer between 80 and 99
 * - At least 30% of locations (rounded up) have isHiddenGem set to true
 */
describe('Feature: vibequest-travel-planner, Property 12: Demo Data Schema Validation', () => {
  it('should validate all schema constraints on mockLocations array', () => {
    fc.assert(
      fc.property(fc.constant(mockLocations), (locations) => {
        // --- Array-level constraints ---

        // At least 12 locations (Requirement 11.1)
        expect(locations.length).toBeGreaterThanOrEqual(12);

        // At least 6 unique countries (Requirement 11.1)
        const countries = new Set(locations.map((l) => l.country));
        expect(countries.size).toBeGreaterThanOrEqual(6);

        // All 4 categories present with at least 2 each (Requirement 11.1)
        const categoryCounts = locations.reduce(
          (acc, l) => {
            acc[l.category] = (acc[l.category] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );
        const requiredCategories = ['nature', 'urban', 'cultural', 'adventure'];
        for (const cat of requiredCategories) {
          expect(categoryCounts[cat]).toBeGreaterThanOrEqual(2);
        }

        // Each youtubeId is non-empty and unique (Requirement 11.2)
        const youtubeIds = locations.map((l) => l.youtubeId);
        for (const id of youtubeIds) {
          expect(id).toBeTruthy();
          expect(id.length).toBeGreaterThan(0);
        }
        const uniqueYoutubeIds = new Set(youtubeIds);
        expect(uniqueYoutubeIds.size).toBe(locations.length);

        // Each creator matches @[Handle] format, max 20 chars, and is unique (Requirement 11.3)
        const creatorRegex = /^@\w+$/;
        const creators = locations.map((l) => l.creator);
        for (const creator of creators) {
          expect(creator).toMatch(creatorRegex);
          expect(creator.length).toBeLessThanOrEqual(20);
        }
        const uniqueCreators = new Set(creators);
        expect(uniqueCreators.size).toBe(locations.length);

        // Each description contains 2-3 sentences, each between 50-200 characters (Requirement 11.4)
        for (const location of locations) {
          const sentences = location.description
            .split('. ')
            .map((s) => (s.endsWith('.') ? s : s + '.'));
          expect(sentences.length).toBeGreaterThanOrEqual(2);
          expect(sentences.length).toBeLessThanOrEqual(3);
          for (const sentence of sentences) {
            expect(sentence.length).toBeGreaterThanOrEqual(50);
            expect(sentence.length).toBeLessThanOrEqual(200);
          }
        }

        // --- Per-location constraints ---

        for (const location of locations) {
          // backpackerCost between 5-200 (Requirement 11.5)
          expect(location.backpackerCost).toBeGreaterThanOrEqual(5);
          expect(location.backpackerCost).toBeLessThanOrEqual(200);

          // executiveCost between 35-500 (Requirement 11.5)
          expect(location.executiveCost).toBeGreaterThanOrEqual(35);
          expect(location.executiveCost).toBeLessThanOrEqual(500);

          // executiveCost > backpackerCost (Requirement 11.5)
          expect(location.executiveCost).toBeGreaterThan(location.backpackerCost);

          // Duration strings match format [number][unit] (Requirement 11.5)
          const durationRegex = /^\d+(hrs|hr|min|days|day)$/;
          expect(location.backpackerTime).toMatch(durationRegex);
          expect(location.executiveTime).toMatch(durationRegex);

          // coordinates.lat between -90 and 90 (Requirement 11.6)
          expect(location.coordinates.lat).toBeGreaterThanOrEqual(-90);
          expect(location.coordinates.lat).toBeLessThanOrEqual(90);

          // coordinates.lng between -180 and 180 (Requirement 11.6)
          expect(location.coordinates.lng).toBeGreaterThanOrEqual(-180);
          expect(location.coordinates.lng).toBeLessThanOrEqual(180);

          // weather matches format [number]°C / [condition] (Requirement 11.6)
          const weatherRegex = /^-?\d+°C \/ .+$/;
          expect(location.weather).toMatch(weatherRegex);

          // mapsRating between 4.5 and 5.0 (Requirement 11.6)
          expect(location.mapsRating).toBeGreaterThanOrEqual(4.5);
          expect(location.mapsRating).toBeLessThanOrEqual(5.0);

          // authenticityScore is integer between 80 and 99 (Requirement 11.6)
          expect(Number.isInteger(location.authenticityScore)).toBe(true);
          expect(location.authenticityScore).toBeGreaterThanOrEqual(80);
          expect(location.authenticityScore).toBeLessThanOrEqual(99);
        }

        // At least 30% of locations (rounded up) have isHiddenGem set to true (Requirement 11.7)
        const hiddenGemCount = locations.filter((l) => l.isHiddenGem).length;
        const requiredHiddenGems = Math.ceil(locations.length * 0.3);
        expect(hiddenGemCount).toBeGreaterThanOrEqual(requiredHiddenGems);
      }),
      { numRuns: 100 }
    );
  });
});

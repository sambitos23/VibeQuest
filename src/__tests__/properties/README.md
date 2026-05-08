# Property-Based Tests

This directory contains property-based tests using [fast-check](https://github.com/dubzzz/fast-check) with Vitest.

## Test Files

| File | Properties Covered |
|------|--------------------|
| `store-actions.property.test.ts` | Properties 1, 4, 5, 6, 8, 9 |
| `persistence.property.test.ts` | Property 7 |
| `card-rendering.property.test.tsx` | Property 3 |
| `map-view.property.test.tsx` | Property 11 |
| `transport.property.test.tsx` | Property 10 |
| `demo-data.property.test.ts` | Property 12 |
| `sanitization.property.test.ts` | Property 13 |
| `counter.property.test.tsx` | Property 2 |

## Configuration

- **Library**: fast-check
- **Minimum iterations**: 100 per property test
- **Tag format**: `Feature: vibequest-travel-planner, Property {number}: {property_text}`

## Running Tests

```bash
npm run test          # run once
npm run test:watch    # watch mode
```

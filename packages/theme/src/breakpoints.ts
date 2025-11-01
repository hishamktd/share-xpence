/**
 * Breakpoint design tokens for responsive design
 */

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
} as const;

// Max-width media queries
export const mediaQueriesMax = {
  xs: `@media (max-width: ${breakpoints.sm - 1}px)`,
  sm: `@media (max-width: ${breakpoints.md - 1}px)`,
  md: `@media (max-width: ${breakpoints.lg - 1}px)`,
  lg: `@media (max-width: ${breakpoints.xl - 1}px)`,
  xl: `@media (max-width: ${breakpoints['2xl'] - 1}px)`,
} as const;

export type Breakpoint = keyof typeof breakpoints;

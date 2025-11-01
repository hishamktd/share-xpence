/**
 * @shared/theme - Design tokens and theme configuration
 *
 * This package contains all design tokens for consistent styling across
 * the application including colors, typography, spacing, shadows, etc.
 */

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
export * from './shadows';
export * from './borders';
export * from './transitions';
export * from './zIndex';

// Re-export commonly used items for convenience
export { colors } from './colors';
export { typography, textStyles } from './typography';
export { spacing, semanticSpacing } from './spacing';
export { breakpoints, mediaQueries } from './breakpoints';
export { shadows, elevation } from './shadows';
export { borders } from './borders';
export { transitions, commonTransitions } from './transitions';
export { zIndex } from './zIndex';

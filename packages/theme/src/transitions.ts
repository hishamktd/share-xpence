/**
 * Transition and animation design tokens
 */

export const transitions = {
  // Durations
  duration: {
    fastest: '100ms',
    faster: '150ms',
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Timing functions (easing)
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom cubic-bezier curves
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    decelerated: 'cubic-bezier(0, 0, 0.2, 1)',
    accelerated: 'cubic-bezier(0.4, 0, 1, 1)',
  },

  // Common transition properties
  property: {
    all: 'all',
    opacity: 'opacity',
    transform: 'transform',
    color: 'color',
    backgroundColor: 'background-color',
    borderColor: 'border-color',
    boxShadow: 'box-shadow',
  },
} as const;

// Predefined transitions
export const commonTransitions = {
  fade: `opacity ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
  slideUp: `transform ${transitions.duration.normal} ${transitions.easing.emphasized}`,
  slideDown: `transform ${transitions.duration.normal} ${transitions.easing.emphasized}`,
  scale: `transform ${transitions.duration.fast} ${transitions.easing.standard}`,
  color: `color ${transitions.duration.fast} ${transitions.easing.easeInOut}`,
  background: `background-color ${transitions.duration.fast} ${transitions.easing.easeInOut}`,
  all: `all ${transitions.duration.normal} ${transitions.easing.easeInOut}`,
} as const;

export type TransitionDuration = keyof typeof transitions.duration;
export type TransitionEasing = keyof typeof transitions.easing;
export type TransitionProperty = keyof typeof transitions.property;

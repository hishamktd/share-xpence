/**
 * Z-index design tokens for layering
 */

export const zIndex = {
  background: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
  notification: 1090,
  max: 9999,
} as const;

export type ZIndex = keyof typeof zIndex;

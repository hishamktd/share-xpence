# @shared/theme

Design tokens and theme configuration for the Share-Xpence monorepo.

## Overview

This package contains all design tokens for consistent styling across web and mobile applications, including colors, typography, spacing, shadows, and more.

## Contents

- **Colors**: Primary, secondary, success, warning, error, info, gray scales, dark mode
- **Typography**: Font families, sizes, weights, line heights, predefined text styles
- **Spacing**: Spacing scale (0-64) and semantic spacing
- **Breakpoints**: Responsive breakpoints with media queries
- **Shadows**: Shadow tokens and Material Design elevation
- **Borders**: Border widths, radius, styles
- **Transitions**: Duration, easing curves, common transitions
- **Z-Index**: Layering system for overlays and modals

## Installation

```bash
pnpm add @shared/theme
```

## Usage

### Colors

```typescript
import { colors } from '@shared/theme';

const primaryColor = colors.primary[500]; // "#2196f3"
const errorColor = colors.error[500]; // "#f44336"
const textColor = colors.text.primary; // "rgba(0, 0, 0, 0.87)"
const darkBg = colors.dark.background.default; // "#121212"
```

### Typography

```typescript
import { typography, textStyles } from '@shared/theme';

const headingStyle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize['3xl'], // "1.875rem"
  fontWeight: typography.fontWeight.bold, // 700
};

// Or use predefined text styles
const h1Style = textStyles.h1;
const bodyStyle = textStyles.body1;
```

### Spacing

```typescript
import { spacing, semanticSpacing } from '@shared/theme';

const cardPadding = semanticSpacing.cardPadding; // "1rem"
const gap = spacing[4]; // "1rem"
```

### Breakpoints

```typescript
import { breakpoints, mediaQueries } from '@shared/theme';

// In CSS-in-JS
const styles = {
  width: '100%',
  [mediaQueries.md]: {
    width: '50%',
  },
  [mediaQueries.lg]: {
    width: '33.333%',
  },
};
```

### Shadows

```typescript
import { shadows, elevation } from '@shared/theme';

const cardShadow = shadows.md; // "0 4px 6px -1px rgba(0, 0, 0, 0.1), ..."
const modalShadow = elevation[8]; // Material Design elevation 8
```

### Borders

```typescript
import { borders } from '@shared/theme';

const borderStyle = {
  borderWidth: borders.width.thin, // "1px"
  borderRadius: borders.radius.lg, // "0.5rem"
  borderStyle: borders.style.solid, // "solid"
};
```

### Transitions

```typescript
import { transitions, commonTransitions } from '@shared/theme';

const fadeTransition = commonTransitions.fade; // "opacity 300ms ease-in-out"
const customTransition = `transform ${transitions.duration.fast} ${transitions.easing.standard}`;
```

### Z-Index

```typescript
import { zIndex } from '@shared/theme';

const modalZIndex = zIndex.modal; // 1060
const tooltipZIndex = zIndex.tooltip; // 1080
```

## MUI Integration

These design tokens can be used to create a custom MUI theme:

```typescript
import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, shadows } from '@shared/theme';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
    },
    error: {
      main: colors.error[500],
    },
  },
  typography: {
    fontFamily: typography.fontFamily.base,
    h1: {
      fontSize: typography.fontSize['5xl'],
      fontWeight: typography.fontWeight.bold,
    },
  },
  spacing: (factor) => `${parseFloat(spacing[factor as keyof typeof spacing]) * 16}px`,
});
```

## Dependencies

None - this is a pure design token package with no runtime dependencies.

## Exports

All design tokens are exported from the main index:

```typescript
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';
export * from './shadows';
export * from './borders';
export * from './transitions';
export * from './zIndex';
```

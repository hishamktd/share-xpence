# Shared Packages

This directory contains shared packages used across all applications.

## Structure

- **ui/** - Shared UI components (Bit components)
  - MUI-based components (Button, TextField, ExpenseCard, etc.)
  - Charts (LineChart, PieChart, BarChart)
  - Each component managed as Bit component

- **types/** - Shared TypeScript types and interfaces
  - User, Expense, Category, Split types
  - API request/response DTOs
  - Enums and constants

- **redux/** - Redux Toolkit slices and RTK Query
  - Shared Redux store configuration
  - RTK Query API services
  - Reusable selectors and actions

- **utils/** - Utility functions
  - formatCurrency, formatDate
  - calculateSplitBalances
  - Sync helpers
  - Validation utilities

- **theme/** - Design system and themes
  - MUI theme configuration
  - Design tokens (colors, spacing, typography)
  - Light/dark mode themes

- **config/** - Configuration and constants
  - Environment variable types
  - API endpoints
  - Feature flags

## Usage

Install as workspace dependencies:

```json
{
  "dependencies": {
    "@shared/ui": "workspace:*",
    "@shared/types": "workspace:*",
    "@shared/utils": "workspace:*"
  }
}
```

Import in your code:

```typescript
import { Button } from '@shared/ui';
import type { User, Expense } from '@shared/types';
import { formatCurrency } from '@shared/utils';
import { theme } from '@shared/theme';
```

## Component Management with Bit

Shared UI components are managed with Bit for versioning and sharing:

```bash
# Create new component
bit create react packages/ui/my-component

# Tag a version
bit tag ui/my-component --message "Description"

# Export to remote scope
bit export
```

# @shared/utils

Comprehensive utility function library for the Share-Xpence monorepo.

## Overview

This package provides a collection of utility functions for common operations across web, API, and mobile applications.

## Contents

- **Currency Utils**: Format currency, convert between dollars and cents
- **Date Utils**: Format dates, relative time, date ranges
- **Validation Utils**: Email, password, UUID, phone, URL, amount validation
- **Split Utils**: Calculate equal/percentage splits, simplify debts
- **Sync Utils**: Queue management, conflict resolution, backoff delays
- **String Utils**: Capitalize, truncate, slugify, mask sensitive data

## Installation

```bash
pnpm add @shared/utils
```

## Usage

### Currency Utilities

```typescript
import { formatCurrency, dollarsToCents } from '@shared/utils';

const formatted = formatCurrency(5000); // "$50.00"
const cents = dollarsToCents(50.99); // 5099
```

### Date Utilities

```typescript
import { formatDate, getRelativeTime } from '@shared/utils';

const date = new Date();
const formatted = formatDate(date); // "Jan 15, 2025"
const relative = getRelativeTime(date); // "2 hours ago"
```

### Validation Utilities

```typescript
import { isValidEmail, isValidPassword } from '@shared/utils';

if (!isValidEmail(email)) {
  throw new Error('Invalid email format');
}

if (!isValidPassword(password)) {
  throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
}
```

### Split Calculation

```typescript
import { calculateEqualSplit, simplifyDebts } from '@shared/utils';

// Split $100 equally among 3 people
const amounts = calculateEqualSplit(10000, 3); // [3334, 3333, 3333]

// Simplify group debts to minimize transactions
const debts = simplifyDebts(members); // [{ from: 'user1', to: 'user2', amount: 5000 }]
```

### String Utilities

```typescript
import { capitalize, slugify, maskString } from '@shared/utils';

const title = capitalize('hello world'); // "Hello world"
const slug = slugify('Hello World! 123'); // "hello-world-123"
const masked = maskString('1234567890', 2, 2); // "12******90"
```

## Dependencies

- `@shared/types` - For type definitions
- `@shared/config` - For validation constants

## Exports

All utilities are exported from the main index:

```typescript
export * from './currency.utils';
export * from './date.utils';
export * from './validation.utils';
export * from './split.utils';
export * from './sync.utils';
export * from './string.utils';
```

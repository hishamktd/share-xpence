# @shared/types

Shared TypeScript types and interfaces for the Share-Xpence monorepo.

## Overview

This package contains all shared types used across web, API, and mobile applications.

## Structure

```
src/
├── index.ts              # Main exports
├── enums.ts              # Shared enumerations
├── user.types.ts         # User and authentication types
├── expense.types.ts      # Expense management types
├── category.types.ts     # Category and subcategory types
├── split.types.ts        # Expense splitting types
├── api.types.ts          # API DTOs (request/response)
└── sync.types.ts         # Synchronization types
```

## Usage

Import types in your application:

```typescript
import {
  User,
  Expense,
  SplitGroup,
  Currency,
  SyncStatus,
  CreateExpenseDto,
  AuthResponseDto,
} from '@shared/types';
```

## Type Categories

### Enums

- `SyncStatus` - Sync state (synced, pending, conflict, error)
- `ExpenseStatus` - Expense state (active, deleted, archived)
- `SplitType` - Split method (equal, percentage, exact, unequal)
- `MemberType` - Member type (registered, dummy)
- `Currency` - Supported currencies
- `Theme` - UI theme (light, dark, system)
- `TransactionType` - Transaction types

### User Types

- `User` - Main user interface
- `UserProfile` - User profile information
- `UserPreferences` - User settings
- `DummyUser` - Temporary user for splits
- `AuthTokens` - JWT tokens
- `UserSession` - Session information

### Expense Types

- `Expense` - Main expense interface
- `ExpenseFilter` - Filtering options
- `ExpenseSortOptions` - Sorting configuration
- `ExpenseAttachment` - File attachments
- `ExpenseSummary` - Expense statistics
- `CategoryExpenseSummary` - Category breakdown

### Category Types

- `Category` - Expense category
- `SubCategory` - Category subdivision
- `CategoryWithSubCategories` - Category with nested subcategories

### Split Types

- `SplitGroup` - Group for splitting expenses
- `SplitMember` - Group member
- `SplitExpense` - Expense split details
- `SplitAllocation` - Individual member allocation
- `MemberBalance` - Member balance calculation
- `SimplifiedDebt` - Optimized debt settlements
- `DummyUserMigration` - Dummy to registered user migration

### API DTOs

Request and response types for all API endpoints:

- Authentication: `RegisterDto`, `LoginDto`, `AuthResponseDto`
- User: `UpdateProfileDto`, `UpdatePreferencesDto`
- Expense: `CreateExpenseDto`, `UpdateExpenseDto`, `ExpenseListDto`
- Category: `CreateCategoryDto`, `UpdateCategoryDto`
- Split: `CreateSplitGroupDto`, `AddMemberDto`, `CreateSplitExpenseDto`
- Sync: `SyncRequestDto`, `SyncResponseDto`, `SyncConflict`
- Reports: `GenerateReportDto`, `ReportResponseDto`
- Common: `PaginationDto`, `ErrorResponseDto`, `SuccessResponseDto`

### Sync Types

- `SyncQueueItem` - Queued sync operation
- `SyncState` - Current sync state
- `OfflineOperation` - Offline operation tracking

## Building

```bash
# Build types package
pnpm run build

# Watch mode for development
pnpm run dev

# Type check
pnpm run typecheck
```

## Adding New Types

1. Create new file in `src/` (e.g., `feature.types.ts`)
2. Export from `index.ts`:

```typescript
export * from './feature.types';
```

3. Rebuild package: `pnpm run build`

## Type Safety

All types are designed with strict TypeScript checking:

- Required fields are enforced
- Optional fields use `?` notation
- Dates use `Date` type (not strings)
- Enums prevent invalid values

## Best Practices

1. **Use enums for fixed values**: Don't use string literals
2. **Keep types DRY**: Extend or compose existing types
3. **Document complex types**: Add JSDoc comments
4. **Version carefully**: Breaking changes affect all apps
5. **Validate DTOs**: Use class-validator in API

## Examples

### Creating an expense

```typescript
import { CreateExpenseDto, Currency } from '@shared/types';

const expense: CreateExpenseDto = {
  title: 'Grocery Shopping',
  amount: 15000, // cents
  currency: Currency.USD,
  categoryId: 'category-123',
  date: new Date(),
  time: '14:30',
  notes: 'Weekly groceries',
};
```

### Filtering expenses

```typescript
import { ExpenseFilter, ExpenseStatus } from '@shared/types';

const filter: ExpenseFilter = {
  userId: 'user-123',
  categoryId: 'category-456',
  dateFrom: new Date('2025-01-01'),
  dateTo: new Date('2025-12-31'),
  status: ExpenseStatus.ACTIVE,
};
```

### Creating a split group

```typescript
import { CreateSplitGroupDto, MemberType } from '@shared/types';

const group: CreateSplitGroupDto = {
  name: 'Weekend Trip',
  description: 'Lake house weekend',
  members: [
    { userId: 'user-1', name: 'Alice', type: MemberType.REGISTERED },
    { name: 'Bob', email: 'bob@example.com', type: MemberType.DUMMY },
  ],
};
```

## Type Versioning

When making breaking changes:

1. Increment package version
2. Update CHANGELOG
3. Communicate changes to team
4. Consider deprecation period for major changes

## Related Packages

- `@shared/utils` - Utility functions for these types
- `@shared/redux` - Redux state using these types
- `@app/api` - NestJS API implementing these DTOs

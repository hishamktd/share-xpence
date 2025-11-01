# @shared/config

Shared configuration, constants, and API endpoints for the Share-Xpence monorepo.

## Overview

This package provides centralized configuration management for all applications.

## Structure

```
src/
├── index.ts              # Main exports
├── env.types.ts          # Environment configuration types
├── api-endpoints.ts      # API endpoint constants
└── constants.ts          # Application constants
```

## Usage

Import configuration in your application:

```typescript
import {
  API_ENDPOINTS,
  STORAGE_KEYS,
  TIMEOUTS,
  ROUTES,
  FEATURE_FLAGS,
  EnvironmentConfig,
  ApiConfig,
} from '@shared/config';
```

## Configuration Categories

### Environment Types

TypeScript types for environment configuration:

- `EnvironmentConfig` - Main environment settings
- `ApiConfig` - API client configuration
- `AuthConfig` - Authentication settings
- `StorageConfig` - Storage (LocalStorage, IndexedDB, Hive)
- `SyncConfig` - Synchronization settings
- `UploadConfig` - File upload limits
- `FeatureFlags` - Feature toggles

### API Endpoints

Centralized API endpoint definitions:

```typescript
// Authentication
API_ENDPOINTS.AUTH.LOGIN; // '/api/v1/auth/login'
API_ENDPOINTS.AUTH.REGISTER; // '/api/v1/auth/register'

// Expenses
API_ENDPOINTS.EXPENSES.LIST; // '/api/v1/expenses'
API_ENDPOINTS.EXPENSES.GET('123'); // '/api/v1/expenses/123'

// Split Groups
API_ENDPOINTS.SPLIT_GROUPS.ADD_MEMBER('group-id');
```

All endpoints are strongly typed and use template literals for dynamic parameters.

### Application Constants

#### Storage Keys

```typescript
STORAGE_KEYS.AUTH_TOKEN; // 'auth_token'
STORAGE_KEYS.USER_PROFILE; // 'user_profile'
```

#### IndexedDB Stores

```typescript
INDEXED_DB_STORES.EXPENSES; // 'expenses'
INDEXED_DB_STORES.SYNC_QUEUE; // 'sync_queue'
```

#### Hive Boxes (Flutter)

```typescript
HIVE_BOXES.EXPENSES; // 'expenses'
HIVE_BOXES.PREFERENCES; // 'preferences'
```

#### Pagination

```typescript
PAGINATION.DEFAULT_PAGE_SIZE; // 20
PAGINATION.MAX_PAGE_SIZE; // 100
```

#### Upload Limits

```typescript
UPLOAD_LIMITS.MAX_FILE_SIZE; // 5MB
UPLOAD_LIMITS.MAX_FILES_PER_EXPENSE; // 3
UPLOAD_LIMITS.ALLOWED_IMAGE_TYPES; // ['image/jpeg', ...]
```

#### Validation Rules

```typescript
VALIDATION.PASSWORD_MIN_LENGTH; // 8
VALIDATION.TITLE_MAX_LENGTH; // 100
```

#### Timeouts

```typescript
TIMEOUTS.API_TIMEOUT; // 30000ms
TIMEOUTS.SYNC_INTERVAL; // 900000ms (15 min)
TIMEOUTS.DEBOUNCE_DELAY; // 300ms
```

#### Authentication

```typescript
AUTH.ACCESS_TOKEN_EXPIRY; // 900000ms (15 min)
AUTH.REFRESH_TOKEN_EXPIRY; // 604800000ms (7 days)
```

#### Routes

```typescript
ROUTES.DASHBOARD; // '/dashboard'
ROUTES.EXPENSE_DETAIL('123'); // '/expenses/123'
```

#### WebSocket Events

```typescript
WS_EVENTS.EXPENSE_CREATED; // 'expense:created'
WS_EVENTS.SPLIT_UPDATED; // 'split:updated'
```

#### Error Codes

```typescript
ERROR_CODES.UNAUTHORIZED; // 'UNAUTHORIZED'
ERROR_CODES.VALIDATION_ERROR; // 'VALIDATION_ERROR'
```

#### Feature Flags

```typescript
FEATURE_FLAGS.ENABLE_OFFLINE_MODE; // true
FEATURE_FLAGS.ENABLE_WEBSOCKET; // true
FEATURE_FLAGS.ENABLE_OCR; // false
```

## Examples

### Using API Endpoints

```typescript
import { API_ENDPOINTS } from '@shared/config';

// Fetch expenses
const response = await fetch(API_ENDPOINTS.EXPENSES.LIST);

// Get specific expense
const expenseId = '123';
const expense = await fetch(API_ENDPOINTS.EXPENSES.GET(expenseId));

// Update split group
const groupId = 'group-456';
await fetch(API_ENDPOINTS.SPLIT_GROUPS.UPDATE(groupId), {
  method: 'PUT',
  body: JSON.stringify(data),
});
```

### Using Constants

```typescript
import { STORAGE_KEYS, TIMEOUTS, VALIDATION } from '@shared/config';

// Store auth token
localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

// Configure API timeout
const apiClient = axios.create({
  timeout: TIMEOUTS.API_TIMEOUT,
});

// Validate password
if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
  throw new Error('Password too short');
}
```

### Using Environment Types

```typescript
import { EnvironmentConfig, ApiConfig } from '@shared/config';

const envConfig: EnvironmentConfig = {
  nodeEnv: process.env.NODE_ENV,
  apiUrl: process.env.API_URL,
  apiTimeout: 30000,
  wsUrl: process.env.WS_URL,
  appName: 'Share-Xpence',
  appVersion: '0.1.0',
};

const apiConfig: ApiConfig = {
  baseUrl: envConfig.apiUrl,
  timeout: envConfig.apiTimeout,
  retryAttempts: 3,
  retryDelay: 1000,
};
```

### Feature Flags

```typescript
import { FEATURE_FLAGS } from '@shared/config';

if (FEATURE_FLAGS.ENABLE_OFFLINE_MODE) {
  // Initialize offline storage
  initializeOfflineMode();
}

if (FEATURE_FLAGS.ENABLE_WEBSOCKET) {
  // Connect WebSocket
  connectWebSocket();
}
```

## Type Safety

All constants are typed using `as const` to ensure:

- No accidental modifications
- Autocomplete in IDE
- Type checking for constant values

## Building

```bash
# Build config package
pnpm run build

# Watch mode for development
pnpm run dev

# Type check
pnpm run typecheck
```

## Best Practices

1. **Use constants instead of hardcoded values**
2. **Import only what you need**: Tree-shaking will remove unused exports
3. **Don't modify constants at runtime**: They're frozen with `as const`
4. **Use environment variables for sensitive data**: Don't commit secrets
5. **Update feature flags carefully**: Changes affect all apps

## Environment Variables

Each app should define its own `.env` file:

```env
# .env.local
NODE_ENV=development
API_URL=http://localhost:3000
WS_URL=ws://localhost:3000
```

Then create environment config:

```typescript
import { EnvironmentConfig } from '@shared/config';

export const env: EnvironmentConfig = {
  nodeEnv: process.env.NODE_ENV as 'development' | 'production',
  apiUrl: process.env.API_URL!,
  apiTimeout: 30000,
  wsUrl: process.env.WS_URL!,
  appName: 'Share-Xpence',
  appVersion: '0.1.0',
};
```

## Adding New Configuration

1. Add constant to appropriate file:

```typescript
// constants.ts
export const MY_NEW_CONSTANT = {
  VALUE: 'something',
} as const;
```

2. Export from `index.ts` (if new file):

```typescript
export * from './new-config';
```

3. Rebuild package: `pnpm run build`

## Related Packages

- `@shared/types` - TypeScript types and interfaces
- `@shared/utils` - Utility functions using these constants
- `@app/web` - Next.js web app using configuration
- `@app/api` - NestJS API defining these endpoints

# Applications

This directory contains the main applications of the monorepo.

## Structure

- **web/** - Next.js web application (PWA)
  - Framework: Next.js 14+ with App Router
  - UI: Material UI (MUI)
  - State: Redux Toolkit + RTK Query
  - Features: PWA, offline support, responsive design

- **api/** - NestJS backend API
  - Framework: NestJS
  - Database: PostgreSQL + TypeORM
  - Auth: JWT (access + refresh tokens)
  - Features: REST API, WebSocket, Swagger docs

- **mobile/** - Flutter mobile application
  - Framework: Flutter
  - Local DB: Hive
  - Features: Offline-first, background sync, Material 3

## Development

Each application can be developed independently but shares dependencies with packages in `/packages`.

```bash
# Run specific app
pnpm --filter @app/web dev
pnpm --filter @app/api dev
```

## Dependencies

Applications can import shared packages:
```typescript
import { Button } from '@shared/ui';
import { User } from '@shared/types';
import { formatCurrency } from '@shared/utils';
```

# TypeScript Configuration

## Structure

The monorepo uses TypeScript with project references for efficient builds and type checking.

### Configuration Files

- **tsconfig.base.json** - Base configuration inherited by all packages and apps
- **tsconfig.json** - Root configuration with project references
- **packages/*/tsconfig.json** - Package-specific configurations
- **apps/*/tsconfig.json** - Application-specific configurations

## Base Configuration

`tsconfig.base.json` includes:
- Strict type checking enabled
- Path aliases for shared packages (`@shared/*`)
- ES2022 target with DOM libraries
- Decorator support for NestJS

## Path Aliases

Import shared packages using path aliases:

```typescript
// Instead of relative imports
import { User } from '../../../packages/types/src/user';

// Use path aliases
import { User } from '@shared/types';
import { formatCurrency } from '@shared/utils';
import { Button } from '@shared/ui';
```

## Project References

TypeScript project references enable:
- Faster incremental builds
- Better editor performance
- Proper dependency graph

### Building Projects

```bash
# Build all projects
pnpm run build

# Build specific project
cd packages/types
pnpm run build

# Watch mode
pnpm run dev
```

## Adding New Packages

When creating a new package:

1. Create `tsconfig.json` extending base config:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

2. Add project reference in root `tsconfig.json`:

```json
{
  "references": [
    { "path": "./packages/your-package" }
  ]
}
```

3. Add path alias in `tsconfig.base.json`:

```json
{
  "paths": {
    "@shared/your-package": ["./packages/your-package/src"]
  }
}
```

## Type Checking

```bash
# Check all projects
pnpm run typecheck

# Check specific project
cd packages/types
pnpm run typecheck
```

## IDE Setup

### VS Code

Install recommended extensions:
- TypeScript and JavaScript Language Features (built-in)
- ESLint
- Prettier

The workspace is configured to use the TypeScript version from `node_modules`.

### IntelliJ/WebStorm

Enable TypeScript support in settings and configure to use project TypeScript version.

## Troubleshooting

### Path aliases not resolving

- Run `pnpm install` to ensure all dependencies are installed
- Restart TypeScript server in your editor
- Check that `baseUrl` and `paths` are configured correctly

### Build errors

- Run `pnpm run clean` to remove all dist folders
- Run `pnpm run build` to rebuild from scratch
- Ensure all project references are up to date

### Slow type checking

- Use `skipLibCheck: true` in tsconfig (already enabled)
- Ensure project references are properly configured
- Consider using `incremental: true` for faster rebuilds

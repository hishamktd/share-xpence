# Linting & Formatting Setup

## Overview

The monorepo uses global ESLint and Prettier configurations for consistent code quality across all packages and applications.

## Tools

- **ESLint** - TypeScript/JavaScript linting
- **Prettier** - Code formatting
- **EditorConfig** - Editor settings consistency

## Configuration Files

- **.prettierrc** - Prettier configuration
- **.prettierignore** - Files ignored by Prettier
- **eslint.config.js** - ESLint flat config (ESLint 9+)
- **.eslintignore** - Files ignored by ESLint
- **.editorconfig** - Editor settings

## Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Running Prettier

```bash
# Format all files
pnpm run format

# Check formatting
pnpm run format:check

# Format specific files
pnpm prettier --write "apps/web/**/*.{ts,tsx}"
```

## ESLint Configuration

Uses ESLint flat config with TypeScript support:

- TypeScript recommended rules
- Strict type checking
- Custom rules for NestJS and React
- Test file exceptions

### Running ESLint

```bash
# Lint all files
pnpm run lint

# Lint and fix
pnpm run lint:fix

# Lint specific directory
pnpm eslint apps/web
```

## Key Rules

### TypeScript

- Unused variables error (except prefixed with `_`)
- `any` type warning
- Floating promises error
- Await thenable error

### General

- No console (except warn/error)
- Prefer const over let
- Prefer template literals
- No var keyword

### React/Next.js (apps/web, packages/ui)

- React-specific rules (to be expanded)

### NestJS (apps/api)

- Relaxed unsafe assignment rules (decorators)

### Tests

- Relaxed rules for test files
- Allow `any` and non-null assertions

## IDE Integration

### VS Code

Install extensions:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension editorconfig.editorconfig
```

Add to `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

### IntelliJ/WebStorm

- Enable ESLint in Settings → Languages & Frameworks → ESLint
- Enable Prettier in Settings → Languages & Frameworks → Prettier
- Enable "Run eslint --fix on save"
- Enable "On save" for Prettier

## Pre-commit Hooks

Linting and formatting are enforced via Lefthook (configured in T6):

```yaml
pre-commit:
  commands:
    lint-staged:
      run: pnpm lint-staged
```

## lint-staged Configuration

Will be added in `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

## Troubleshooting

### ESLint errors in editor

- Restart ESLint server in VS Code: Cmd/Ctrl + Shift + P → "ESLint: Restart ESLint Server"
- Check that `eslint.config.js` is at project root
- Ensure dependencies are installed: `pnpm install`

### Prettier not formatting

- Check file extension is in Prettier config
- Verify file not in `.prettierignore`
- Check editor default formatter setting

### Conflicting rules

- Prettier config is last in `eslint.config.js` to override conflicts
- Use `eslint-config-prettier` to disable conflicting ESLint rules

## Adding Rules

### For all TypeScript files

Edit `eslint.config.js`:
```javascript
{
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'your-rule': 'error'
  }
}
```

### For specific apps

```javascript
{
  files: ['apps/web/**/*.ts'],
  rules: {
    'your-rule': 'error'
  }
}
```

## Disabling Rules

### In code (sparingly)

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = something();

/* eslint-disable @typescript-eslint/no-explicit-any */
// Multiple lines
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### For entire file

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
// File content
```

## CI/CD Integration

In GitHub Actions (will be configured in T83):

```yaml
- name: Lint
  run: pnpm run lint

- name: Check formatting
  run: pnpm run format:check
```

## Best Practices

1. Fix linting errors before committing
2. Use `pnpm run lint:fix` for auto-fixes
3. Don't disable rules without good reason
4. Document rule exceptions with comments
5. Run `pnpm run format` before commits
6. Keep global config, avoid per-file overrides

# Tools & Scripts

This directory contains development tools, scripts, and utilities for the monorepo.

## Structure

- **scripts/** - Automation and utility scripts
  - Database migrations and seeding
  - Build and deployment scripts
  - Code generation utilities
  - Development workflow helpers

## Scripts

### Database Management

- `migrate.ts` - Run database migrations
- `seed.ts` - Seed database with sample data
- `reset-db.ts` - Reset database (dev only)

### Build & Deploy

- `build-all.ts` - Build all applications
- `deploy.ts` - Deployment orchestration
- `release.ts` - Version and release management

### Development

- `setup.ts` - Initial project setup
- `clean.ts` - Clean build artifacts
- `check-deps.ts` - Check for dependency updates

## Usage

Run scripts from root:

```bash
# Using pnpm
pnpm run script:migrate
pnpm run script:seed

# Or directly with ts-node
npx ts-node tools/scripts/migrate.ts
```

## Adding New Scripts

1. Create script in `tools/scripts/`
2. Add to root `package.json` scripts section
3. Document usage in this README

## Best Practices

- Use TypeScript for type safety
- Add proper error handling
- Log progress and results
- Support dry-run mode where applicable
- Add command-line arguments with `yargs` or similar

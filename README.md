# Share-Xpence

> Expense Tracker + Splitter with offline-first architecture

A full-stack expense tracking and splitting application built with a modern monorepo architecture.

## 🏗️ Architecture

This project uses a **monorepo** structure with:

- **pnpm workspaces** for package management
- **Bit workspace** for component versioning and sharing
- **TypeScript** across all applications
- **Global linting and formatting** with ESLint & Prettier
- **Lefthook** for fast Git hooks

## 📦 Project Structure

```
share-xpence/
├── apps/
│   ├── web/          # Next.js web app (PWA)
│   ├── api/          # NestJS backend
│   └── mobile/       # Flutter mobile app
├── packages/
│   ├── ui/           # Shared UI components (Bit)
│   ├── types/        # Shared TypeScript types
│   ├── redux/        # Redux slices & RTK Query
│   ├── utils/        # Utility functions
│   ├── theme/        # Design system
│   └── config/       # Configuration
└── tools/
    └── scripts/      # Development scripts
```

## 🚀 Tech Stack

### Frontend (Web)

- Next.js 14+ (App Router)
- Material UI (MUI)
- Redux Toolkit + RTK Query
- PWA support

### Backend (API)

- NestJS
- PostgreSQL + TypeORM
- JWT authentication
- WebSocket + REST

### Mobile

- Flutter
- Hive (local DB)
- Offline-first + sync

### Shared

- TypeScript
- Bit components
- pnpm workspaces

## 🛠️ Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL (for API)
- Flutter SDK (for mobile)

## 📥 Installation

```bash
# Clone repository
git clone https://github.com/your-org/share-xpence.git
cd share-xpence

# Install dependencies
pnpm install

# Setup will automatically:
# - Install all workspace dependencies
# - Install Lefthook git hooks
# - Prepare development environment
```

## 🏃 Development

### Run all apps in development mode

```bash
pnpm dev
```

### Run specific applications

```bash
# Web app
pnpm web:dev

# API
pnpm api:dev
```

### Build all applications

```bash
pnpm build
```

### Build specific applications

```bash
# Web app
pnpm web:build

# API
pnpm api:build

# All shared packages
pnpm packages:build
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## 🎨 Code Quality

### Linting

```bash
# Lint all files
pnpm lint

# Lint and auto-fix
pnpm lint:fix
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

```bash
# Type check all TypeScript projects
pnpm typecheck
```

## 🔧 Git Hooks

Lefthook automatically enforces code quality:

- **Pre-commit**: Lint staged files, type check
- **Commit-msg**: Validate [Conventional Commits](https://www.conventionalcommits.org/)
- **Pre-push**: Run tests, final lint check

### Commit Message Format

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
```

Examples:

```bash
feat(api): add user authentication
fix(web): resolve login redirect issue
docs(readme): update installation steps
```

## 🧩 Bit Components

### Create new component

```bash
bit create react packages/ui/my-component
```

### Tag and version

```bash
bit tag ui/my-component --message "Description"
```

### Export to remote

```bash
bit export
```

See [BIT_SETUP.md](./BIT_SETUP.md) for complete instructions.

## 📚 Documentation

- [TypeScript Setup](./TYPESCRIPT_SETUP.md)
- [Linting Setup](./LINTING_SETUP.md)
- [Lefthook Setup](./LEFTHOOK_SETUP.md)
- [Bit Workspace](./BIT_SETUP.md)

## 🗂️ Workspace Commands

```bash
# Clean all build outputs
pnpm clean

# Install dependencies
pnpm install

# Update dependencies
pnpm update

# Check for outdated packages
pnpm outdated
```

## 🚢 Deployment

### Web (Vercel)

```bash
pnpm web:build
# Deploy to Vercel
```

### API (Docker)

```bash
cd apps/api
docker build -t share-xpence-api .
docker run -p 3000:3000 share-xpence-api
```

See deployment documentation in each app's README.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass: `pnpm test`
4. Ensure linting passes: `pnpm lint`
5. Commit with conventional format
6. Create a pull request

## 📄 License

MIT

## 🙏 Acknowledgments

Built with:

- [pnpm](https://pnpm.io/)
- [Bit](https://bit.dev/)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Flutter](https://flutter.dev/)
- [Lefthook](https://github.com/evilmartians/lefthook)

---

**Status**: 🚧 Phase 1 Complete - Foundation Setup ✅

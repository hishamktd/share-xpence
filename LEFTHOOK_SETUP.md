# Lefthook Setup

## Overview

Lefthook is a fast Git hooks manager written in Go. It's significantly faster than Husky and doesn't require Node.js to run hooks.

## Why Lefthook?

- ⚡️ **Fast** - Written in Go, no Node.js overhead
- 🔧 **Flexible** - YAML configuration, parallel execution
- 🎯 **Reliable** - No dependency on npm scripts
- 📦 **Lightweight** - Single binary, no node_modules bloat

## Configuration

Hooks are configured in `lefthook.yml`:

### Pre-commit Hooks

Runs on every commit:

```yaml
pre-commit:
  parallel: true
  commands:
    lint-staged:      # Lint and format staged files
    typecheck:        # TypeScript type checking
```

### Commit Message Hook

Enforces Conventional Commits format:

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code style (formatting, semicolons)
- refactor: Code refactoring
- perf: Performance improvement
- test: Adding tests
- build: Build system changes
- ci: CI configuration
- chore: Maintenance tasks
- revert: Revert previous commit
```

Examples:
```
feat(workspace): initialize pnpm workspace
fix(api): resolve authentication bug
docs(readme): update installation instructions
```

### Pre-push Hooks

Runs before pushing:

```yaml
pre-push:
  commands:
    test:    # Run all tests
    lint:    # Final lint check
```

### Post-checkout / Post-merge Hooks

Automatically install dependencies when:
- Switching branches (if package.json changed)
- After merging (if package.json changed)

## Installation

Lefthook will be installed as a dev dependency and initialized automatically.

### Manual Installation

If you need to reinstall hooks:

```bash
# Install lefthook
pnpm add -D lefthook

# Install git hooks
pnpm lefthook install
```

## Usage

### Normal Workflow

Just commit and push as usual. Lefthook runs automatically:

```bash
git add .
git commit -m "feat(api): add user authentication"
# ✓ Lefthook runs pre-commit hooks
# ✓ Lefthook validates commit message

git push
# ✓ Lefthook runs pre-push hooks
```

### Skipping Hooks

Sometimes you need to skip hooks (use sparingly):

```bash
# Skip all hooks
LEFTHOOK=0 git commit -m "WIP: work in progress"

# Skip specific hook
LEFTHOOK_EXCLUDE=test git push
```

Or use git flags:
```bash
git commit --no-verify -m "skip hooks"
git push --no-verify
```

## lint-staged Configuration

Configured in `package.json`:

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

Only staged files are linted/formatted for performance.

## Troubleshooting

### Hooks not running

```bash
# Reinstall hooks
pnpm lefthook install

# Check installation
pnpm lefthook run pre-commit
```

### Hook failures

```bash
# Run hooks manually to debug
pnpm lefthook run pre-commit

# Check lefthook version
pnpm lefthook version
```

### Bypass hooks temporarily

```bash
# For emergency fixes only!
git commit --no-verify
```

## Hook Execution Order

1. **Pre-commit**
   - Lint staged files (parallel)
   - Type check TypeScript files (parallel)

2. **Commit-msg**
   - Validate commit message format

3. **Pre-push**
   - Run tests
   - Final lint check

## Performance

Lefthook runs hooks in parallel when possible:

- Pre-commit hooks run in parallel
- Only staged files are checked (via lint-staged)
- Type checking skipped during merge/rebase

Typical pre-commit time: **< 5 seconds**

## CI Integration

Lefthook hooks should also run in CI:

```yaml
# .github/workflows/ci.yml
- name: Run lint
  run: pnpm lint

- name: Run tests
  run: pnpm test

- name: Type check
  run: pnpm typecheck
```

## Best Practices

1. ✅ Keep hooks fast (< 10 seconds)
2. ✅ Use lint-staged for incremental checks
3. ✅ Run expensive operations in CI, not hooks
4. ✅ Follow Conventional Commits format
5. ❌ Don't skip hooks unless absolutely necessary
6. ❌ Don't run full build in pre-commit

## Customization

Edit `lefthook.yml` to add/modify hooks:

```yaml
pre-commit:
  commands:
    custom-hook:
      glob: "*.ts"
      run: your-command {staged_files}
```

## Uninstalling

To remove Lefthook:

```bash
pnpm lefthook uninstall
pnpm remove -D lefthook
```

## Resources

- [Lefthook Documentation](https://github.com/evilmartians/lefthook)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [lint-staged](https://github.com/okonet/lint-staged)

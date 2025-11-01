# Bit Workspace Setup Guide

This document provides instructions for completing the Bit workspace setup for the Share-Xpence monorepo.

## Overview

The monorepo is configured to use Bit for component management and sharing. Bit allows us to:

- Version and publish individual components independently
- Share components across different applications (Next.js, NestJS, Flutter)
- Track dependencies between components
- Ensure component isolation and reusability

## Prerequisites

1. **Node.js**: v18+ (already available)
2. **pnpm**: v10.20.0+ (already configured)
3. **Bit CLI**: Needs to be installed and configured

## Installation Steps

### 1. Install Bit CLI

The Bit CLI requires system utilities (e.g., `sed`, `dirname`) that may not be available in all environments. To install Bit CLI:

```bash
# Using npm
npm install -g @teambit/bvm

# Or using the Bit installer script
npx @teambit/bvm install
```

For more information, see: https://bit.dev/docs/getting-started/installing-bit

### 2. Initialize Bit Workspace

The workspace configuration files have been created:

- `workspace.jsonc` - Main Bit workspace configuration
- `.bitmap` - Component tracking file

To complete the initialization:

```bash
# Initialize Bit workspace (if not already done)
bit init --harmony

# Verify installation
bit --version
```

### 3. Configure Bit Account

To publish and share components, you'll need a Bit account:

```bash
# Login to Bit
bit login

# Create a remote scope (if needed)
bit remote add https://node.bit.dev
```

## Component Configuration

The following shared packages are configured as Bit components:

### 1. @shared/types

**Purpose**: TypeScript type definitions and interfaces
**Location**: `packages/types`
**Exports**: User types, expense types, API DTOs, enums

### 2. @shared/config

**Purpose**: Configuration constants and API endpoints
**Location**: `packages/config`
**Dependencies**: @shared/types

### 3. @shared/utils

**Purpose**: Utility functions (currency, date, validation, etc.)
**Location**: `packages/utils`
**Dependencies**: @shared/types, @shared/config

### 4. @shared/theme

**Purpose**: Design tokens and theme configuration
**Location**: `packages/theme`
**Dependencies**: None

## Adding Components to Bit

To register the shared packages as Bit components:

```bash
# Add components to Bit tracking
bit add packages/types --namespace shared --id types
bit add packages/config --namespace shared --id config
bit add packages/utils --namespace shared --id utils
bit add packages/theme --namespace shared --id theme

# Verify components are tracked
bit status

# Tag components with a version
bit tag --all --message "Initial version of shared packages"

# Export to remote scope (requires Bit account)
bit export org.share-xpence.shared
```

## Component Dependencies

Bit will automatically detect dependencies between components:

```
@shared/types (no dependencies)
  ↓
@shared/config (depends on @shared/types)
  ↓
@shared/utils (depends on @shared/types, @shared/config)

@shared/theme (independent)
```

## Using Components in Applications

Once components are exported to Bit, they can be imported in applications:

```bash
# In Next.js app
cd apps/web
bit import org.share-xpence.shared/types
bit import org.share-xpence.shared/utils

# In NestJS app
cd apps/api
bit import org.share-xpence.shared/types
bit import org.share-xpence.shared/config
```

## Development Workflow

1. **Make changes** to a component
2. **Build** the component: `bit build <component-id>`
3. **Test** the component: `bit test <component-id>`
4. **Tag** a new version: `bit tag <component-id> --patch/--minor/--major`
5. **Export** to remote: `bit export`

## Component Versioning

Bit uses semantic versioning (semver):

- **Patch** (0.0.x): Bug fixes, no API changes
- **Minor** (0.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

```bash
# Patch version (0.1.0 -> 0.1.1)
bit tag shared/utils --patch --message "Fix validation bug"

# Minor version (0.1.0 -> 0.2.0)
bit tag shared/utils --minor --message "Add new utility function"

# Major version (0.1.0 -> 1.0.0)
bit tag shared/utils --major --message "Breaking: Change API signature"
```

## Troubleshooting

### Issue: Bit CLI installation fails

**Solution**: Ensure you have the required system utilities (sed, dirname, etc.) installed. On Ubuntu/Debian: `apt-get install coreutils`

### Issue: Component dependencies not detected

**Solution**: Ensure your package.json has the correct dependencies listed, and run `bit link` to resolve dependencies.

### Issue: Export fails

**Solution**: Verify you're logged in (`bit login`) and have permission to export to the remote scope.

## Additional Resources

- Bit Documentation: https://bit.dev/docs
- Bit CLI Reference: https://bit.dev/docs/cli/reference
- Bit Workspace Configuration: https://bit.dev/docs/workspace/workspace-configuration
- Component Versioning: https://bit.dev/docs/components/component-versioning

## Current Status

✅ Workspace configuration files created
✅ Shared packages created (types, config, utils, theme)
✅ TypeScript project references configured
⏳ Bit CLI installation required (manual step)
⏳ Components need to be added to Bit tracking (manual step)
⏳ Remote scope configuration needed (manual step)

## Next Steps

1. Install Bit CLI using one of the methods above
2. Run `bit init --harmony` to complete workspace initialization
3. Add components to Bit tracking using the commands in "Adding Components to Bit" section
4. Configure remote scope and export components
5. Import components in applications as needed

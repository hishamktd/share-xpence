# Bit Workspace Setup

## Current Status

Basic Bit workspace configuration files have been created:
- `workspace.jsonc` - Bit workspace configuration
- `.bitmap` - Component tracking file

## Complete Setup Instructions

To complete the Bit workspace setup with full functionality:

### 1. Install Bit

Follow the official installation guide: https://bit.dev/docs/getting-started/installing-bit

**Option A: Using BVM (Bit Version Manager)**
```bash
npx @teambit/bvm install
```

**Option B: Using npm/pnpm**
```bash
pnpm add -g @teambit/bbit
```

### 2. Initialize Bit Workspace

```bash
bit init --harmony
```

This command will:
- Configure the Bit workspace
- Set up the component registry
- Enable component isolation and versioning

### 3. Configure Component Scopes

Update `workspace.jsonc` to define your component scopes:

```jsonc
{
  "teambit.workspace/variants": {
    "packages/ui/**": {
      "teambit.react/react": {}
    },
    "packages/types/**": {
      "teambit.harmony/node": {}
    }
  }
}
```

### 4. Create and Track Components

Example: Create a Button component
```bash
bit create react packages/ui/button
```

Track existing components:
```bash
bit add packages/ui/button --id ui/button
```

### 5. Tag and Export Components

```bash
# Tag a version
bit tag ui/button --message "Initial version"

# Export to remote scope (Bit Cloud or self-hosted)
bit export
```

## Integration with pnpm Workspaces

Bit is configured to work seamlessly with pnpm workspaces:
- Components live in `packages/*`
- pnpm handles dependency installation
- Bit manages component versioning and sharing

## Resources

- [Bit Documentation](https://bit.dev/docs/intro/)
- [Bit + pnpm Guide](https://bit.dev/docs/workspace/package-manager)
- [Component Sharing](https://bit.dev/docs/components/sharing-components)

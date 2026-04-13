# AGENTS.md

React Modal Utility (RMU) - Zero-dependency React modal state library.

## Architecture

- **Event-driven**: Uses custom event emitter (`src/emitter.ts`) for imperative `openModal()`/`closeModal()` API
- **Multi-outlet**: Supports named outlets for React context isolation (default outlet + custom outlets)
- **Dual-target**: Works in React DOM and React Native (optional peer dependency)
- **Public API**: `RMUProvider`, `RMUOutlet`, `openModal`, `closeModal` (see `src/index.ts`)

## Requirements

- Node.js >= 24 (enforced in `engines` and CI)
- React >= 18 (peer dependency)

## Commands

```bash
# Build (outputs ESM + CJS + types to dist/)
npm run build

# Dev mode with watch
npm run dev

# Run tests (CI mode, no watch)
npm test

# Watch mode for development
npm run test:watch

# Coverage report (outputs to coverage/)
npm run test:coverage

# Check bundle size (limit: 2KB per format)
npm run size
```

## Build Notes

- **Bundler**: tsdown (Rollup-based TypeScript bundler)
- **Formats**: ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`)
- **Externals**: `react`, `react-dom`, `react-native` are never bundled
- **Sourcemaps**: Generated for both formats
- **Minification**: Enabled

## Testing

- **Runner**: Vitest
- **Environment**: jsdom
- **Coverage**: v8 provider, outputs lcov + text to `coverage/`

## CI/CD (GitHub Actions)

- **Triggers**: Push/PR to `master`, releases
- **Pipeline**: `test` (coverage) → `build` → `size` → `npm publish` (releases only)
- **Node version**: Locked to 24.x

## Style

Prettier config in `package.json`:
- Single quotes, semicolons, trailing commas (ES5)
- Print width: 80

## Size Budget

Hard limit in CI: 2KB per format (CJS + ESM). Check with `npm run size` before committing.

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

- **Bundler**: tsdown (Rolldown-based TypeScript bundler)
- **Formats**: ESM (`dist/index.mjs`) + CJS (`dist/index.cjs`)
- **Declarations**: ESM (`dist/index.d.mts`) + CJS (`dist/index.d.cts`)
- **Externals**: `react`, `react-dom`, `react-native` are never bundled
- **Sourcemaps**: Generated for both formats
- **Minification**: Enabled

## Testing

- **Runner**: Vitest
- **Environment**: jsdom
- **Coverage**: v8 provider, outputs lcov + text to `coverage/`

## CI/CD (GitHub Actions)

- **CI**: `ci.yml` runs coverage tests, build and size checks on push/PR to `master`
- **Publication**: `publish.yml` runs on GitHub `release: published`, checks the release commit, tag, lockfile versions and repository metadata, then builds, tests and checks size
- **Archive**: Packs once, records SHA-256, runs a publish dry run, uploads evidence and publishes the same archive after checking its checksum
- **Authentication**: npm trusted publishing through OIDC with `id-token: write`; no npm token secret
- **Runtime**: Node 24 from `.node-version`, npm 12.1.0 for publication
- **Release guide**: See [docs/release.md](docs/release.md); a tag push alone does not publish

## Style

Prettier config in `package.json`:
- Single quotes, semicolons, trailing commas (ES5)
- Print width: 80

## Size Budget

Hard limit in CI: 2KB per format (CJS + ESM). Check with `npm run size` before committing.

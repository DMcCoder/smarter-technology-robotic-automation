# smarter-technology-robotic-automation
Core Engineering Technical Screen

## Quick Start

Install dependencies and run the tests:

```bash
pnpm install
pnpm test
```

`pnpm test` runs the deterministic unit and CLI tests. Use `pnpm run test:fuzz` to execute the Faker-based randomized coverage 10 times, or `pnpm run test:once` to run the full Vitest suite once.

Build the CLI:

```bash
pnpm build
```

Run the built CLI:

```bash
pnpm cli 100 100 100 20
```

Expected output:

```text
REJECTED
```

## Direct Usage

You can also invoke the compiled file directly:

```bash
node dist/cli.js <width> <height> <length> <mass>
```

## Bun

Bun is optional for this repo. If you already have it installed, the same flow works:

```bash
bun install
bun test
bun run build
bun dist/cli.js 100 100 100 20
```

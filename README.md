# smarter-technology-robotic-automation
Core Engineering Technical Screen

## Quick Start

Install dependencies and run the tests:

```bash
pnpm install
pnpm test
```

`pnpm test` executes the Vitest suite 10 times so each run exercises new Faker-generated cases. Use `pnpm run test:once` for a single pass.

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

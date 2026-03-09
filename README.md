# smarter-technology-robotic-automation
Core Engineering Technical Screen

## Quick Start

Install dependencies and run the tests:

```bash
pnpm install
pnpm test
```

`pnpm test` runs the deterministic unit and CLI tests. Use `pnpm run test:fuzz` to execute the Faker-based randomized coverage 10 times, or `pnpm run test:once` to run the full Vitest suite once.

Generate code coverage with:

```bash
pnpm run coverage
```

This writes an HTML report to `coverage/` and prints a text summary in the terminal.

Build the CLI:

```bash
pnpm build
```

Run the built CLI:

```bash
pnpm cli --width 100 --height 100 --lenght 100 --mass 20
```

Expected output:

```text
REJECTED
```

## Direct Usage

You can also invoke the compiled file directly:

```bash
node dist/cli.js -w 100 -h 100 -l 100 -m 20
```

Use `--debug` to print the derived package details and runtime before the final stack:

```bash
node dist/cli.js -w 100 -h 100 -l 100 -m 20 --debug
```

## Bun

Bun is the simplest way to create standalone release binaries for this CLI.

Install Bun, then install dependencies:

```bash
curl -fsSL https://bun.com/install | bash
source ~/.bashrc
bun install
```

Run the tests and build the TypeScript output:

```bash
bun test
bun run build
```

Create the release binaries:

```bash
bun run release
```

That command creates these files in `release/`:

```text
release/smarter-sort-linux-x64
release/smarter-sort-darwin-arm64
release/smarter-sort-darwin-x64
release/smarter-sort-windows-x64.exe
```

You can still run the CLI directly with Bun during development:

```bash
bun dist/cli.js --width 100 --height 100 --lenght 100 --mass 20
```

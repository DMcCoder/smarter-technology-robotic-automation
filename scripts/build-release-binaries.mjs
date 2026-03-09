#!/usr/bin/env bun

import { cpSync, existsSync, mkdirSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const rootDir = process.cwd();
const releaseDir = resolve(rootDir, "release");
const tempBuildDir = join(tmpdir(), `smarter-release-build-${Date.now()}`);
const tempReleaseDir = join(tempBuildDir, "release");

const targets = [
  { target: "bun-darwin-x64", outfile: "smarter-sort-darwin-x64" },
  { target: "bun-darwin-arm64", outfile: "smarter-sort-darwin-arm64" },
  { target: "bun-windows-x64", outfile: "smarter-sort-windows-x64.exe" },
];

mkdirSync(releaseDir, { recursive: true });
mkdirSync(tempReleaseDir, { recursive: true });

for (const file of ["cli.ts", "index.ts", "package.json", "tsconfig.json"]) {
  cpSync(resolve(rootDir, file), join(tempBuildDir, file));
}

if (!existsSync(join(tempBuildDir, "node_modules"))) {
  symlinkSync(resolve(rootDir, "node_modules"), join(tempBuildDir, "node_modules"));
}

for (const { target, outfile } of targets) {
  const outputPath = join(tempReleaseDir, outfile);
  const result = Bun.spawnSync(
    [
      "bun",
      "build",
      join(tempBuildDir, "cli.ts"),
      "--compile",
      `--target=${target}`,
      `--outfile=${outputPath}`,
    ],
    {
      cwd: tempBuildDir,
      stdout: "inherit",
      stderr: "inherit",
    },
  );

  if (result.exitCode !== 0) {
    process.exit(result.exitCode);
  }

  cpSync(outputPath, join(releaseDir, outfile));
}

console.log(`Built release binaries in ${releaseDir}`);

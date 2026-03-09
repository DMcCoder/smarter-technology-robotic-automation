import { spawnSync } from "node:child_process";

const RUN_COUNT = 10;

for (let runNumber = 1; runNumber <= RUN_COUNT; runNumber += 1) {
  console.log(`\nTest run ${runNumber}/${RUN_COUNT}`);

  const result = spawnSync("pnpm", ["exec", "vitest", "run"], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { pagefindOutputDirectory } from "./pagefind-config.ts";

const cli = resolve(dirname(fileURLToPath(import.meta.resolve("pagefind"))), "runner/bin.cjs");
const result = spawnSync(process.execPath, [
  cli, "--site", "dist", "--output-subdir", pagefindOutputDirectory,
], { stdio: "inherit" });

if (result.error) throw result.error;
process.exit(result.status ?? 1);

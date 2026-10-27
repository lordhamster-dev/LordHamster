import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packagePath = resolve(dirname(fileURLToPath(import.meta.resolve("pagefind"))), "../package.json");
const { version } = JSON.parse(readFileSync(packagePath, "utf8"));

// Keep the JavaScript, worker and WASM on the same version, even with immutable caching.
export const pagefindOutputDirectory = `pagefind/v${version}`;

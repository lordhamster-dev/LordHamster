import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { pagefindOutputDirectory } from "./pagefind-config.ts";

const bundlePath = `/${pagefindOutputDirectory}/`;
const html = await readFile("dist/index.html", "utf8");
assert.ok(html.includes(`${bundlePath}pagefind.js`), "Page must load the versioned search bundle");

// Serve the built files to Pagefind's real JS/WASM engine without a web server.
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  const url = new URL(input, "http://localhost");
  return new Response(await readFile(resolve("dist", `.${url.pathname}`)));
};

try {
  const pagefind = await import(pathToFileURL(resolve("dist", pagefindOutputDirectory, "pagefind.js")));
  await pagefind.options({ basePath: bundlePath, baseUrl: "/", noWorker: true });
  const response = await pagefind.search("garage");
  const results = await Promise.all(response.results.map((item) => item.data()));
  assert.ok(results.some((item) => item.url === "/posts/garage/"), "Search must find the Garage article");
  console.log(`Pagefind JS/WASM search passed: ${results.length} result(s)`);
} finally {
  globalThis.fetch = originalFetch;
}

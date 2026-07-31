import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js");

test("keeps public routes on the trailing-slash URL convention", () => {
  assert.equal(nextConfig.trailingSlash, true);
});

test("adds baseline browser security headers to every route", async () => {
  assert.equal(typeof nextConfig.headers, "function");

  const rules = await nextConfig.headers();
  const globalRule = rules.find((rule: { source: string }) => rule.source === "/:path*");

  assert.ok(globalRule, "expected a global /:path* header rule");
  assert.deepEqual(
    Object.fromEntries(
      globalRule.headers.map((header: { key: string; value: string }) => [
        header.key,
        header.value,
      ]),
    ),
    {
      "Permissions-Policy": "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  );
});

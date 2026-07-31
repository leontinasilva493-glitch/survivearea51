import assert from "node:assert/strict";
import test from "node:test";

import { resolveSiteUrl } from "../config/site";

test("resolveSiteUrl never publishes localhost as the production fallback", () => {
  assert.equal(resolveSiteUrl(undefined, "production"), "https://survivearea51.site");
});

test("resolveSiteUrl keeps localhost for local development", () => {
  assert.equal(resolveSiteUrl(undefined, "development"), "http://localhost:3000");
});

test("resolveSiteUrl prefers the configured deployment URL", () => {
  assert.equal(
    resolveSiteUrl("https://preview.example.com/", "production"),
    "https://preview.example.com",
  );
});

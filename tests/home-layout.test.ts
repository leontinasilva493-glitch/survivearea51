import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dashboardPath = new URL(
  "../components/home/Dashboard.tsx",
  import.meta.url,
);
const globalsPath = new URL("../app/globals.css", import.meta.url);

test("homepage quick MVP keeps the hero compact across breakpoints", async () => {
  const source = await readFile(dashboardPath, "utf8");

  assert.match(source, /text-\[clamp\(3rem,5\.7vw,5\.2rem\)\]/);
  assert.match(source, /py-10[^\"]*lg:py-14/);
  assert.match(source, /hidden[^\"]*lg:block[^\"]*lg:min-h-\[360px\]/);
  assert.doesNotMatch(source, /min-h-\[670px\]/);
});

test("homepage quick MVP tightens repeated section and guide-card rhythm", async () => {
  const [dashboard, globals] = await Promise.all([
    readFile(dashboardPath, "utf8"),
    readFile(globalsPath, "utf8"),
  ]);

  assert.match(dashboard, /min-h-\[205px\]/);
  assert.match(globals, /margin-top: clamp\(3\.5rem, 6vw, 6rem\)/);
});

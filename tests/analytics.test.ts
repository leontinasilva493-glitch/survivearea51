import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
import { Children, createElement, isValidElement, type ReactElement, type ReactNode } from "react";

function elementsWithId(node: ReactNode, id: string): ReactElement[] {
  if (!isValidElement(node)) return [];

  const current = node.props.id === id ? [node] : [];
  const descendants = Children.toArray(node.props.children).flatMap((child) =>
    elementsWithId(child, id),
  );
  return [...current, ...descendants];
}

test("root layout loads Microsoft Clarity once with the configured project id", async () => {
  const require = createRequire(import.meta.url);
  require.extensions[".css"] = () => undefined;
  const { default: RootLayout } = await import("../app/layout");
  const layout = RootLayout({ children: createElement("main", null, "Analytics test") });
  const clarityScripts = elementsWithId(layout, "microsoft-clarity");

  assert.equal(clarityScripts.length, 1);
  assert.equal(clarityScripts[0].props.strategy, "afterInteractive");

  const bootstrap = String(clarityScripts[0].props.children);
  assert.match(bootstrap, /https:\/\/www\.clarity\.ms\/tag\//);
  assert.equal((bootstrap.match(/xwvasbalds/g) ?? []).length, 1);
});

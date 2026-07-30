import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "node_modules/**",
    "app/games/**",
    "app/schema.ts",
    "components/cta/**",
    "components/game/**",
    "components/how-to-play/**",
    "components/layout/**",
    "components/other-games/**",
    "components/schema/**",
    "components/ui/**",
    "components/what-is/**",
    "config/content.ts",
    "config/theme.ts",
    "hooks/**",
    "lib/utils.ts",
  ]),
]);

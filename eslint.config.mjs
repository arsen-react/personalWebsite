import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Layer boundaries (docs/adr/0001). A later block replaces an earlier one for the same files,
// so each block lists every import its layer may not use.
const levels = {
  molecules: ["@/shared/ui/molecules", "@/shared/ui/molecules/*"],
  organisms: ["@/shared/ui/organisms", "@/shared/ui/organisms/*"],
  templates: ["@/shared/ui/templates", "@/shared/ui/templates/*"],
};
const outsideShared = [
  "@/app",
  "@/app/*",
  "@/features",
  "@/features/*",
  "@/content",
  "@/content/*",
  "@/config",
  "@/config/*",
];

const forbid = (files, group, message) => ({
  files,
  rules: { "no-restricted-imports": ["error", { patterns: [{ group, message }] }] },
});

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  forbid(
    ["src/shared/**"],
    outsideShared,
    "shared/ is generic: it must not import app, features, content or config.",
  ),
  forbid(
    ["src/shared/ui/atoms/**"],
    [...outsideShared, ...levels.molecules, ...levels.organisms, ...levels.templates],
    "Atoms may use only other atoms and shared helpers.",
  ),
  forbid(
    ["src/shared/ui/molecules/**"],
    [...outsideShared, ...levels.organisms, ...levels.templates],
    "Molecules may use atoms, not organisms or templates.",
  ),
  forbid(
    ["src/shared/ui/organisms/**"],
    [...outsideShared, ...levels.templates],
    "Organisms may use atoms and molecules, not templates.",
  ),
  forbid(
    ["src/features/**"],
    ["@/app", "@/app/*", "@/features/*/*"],
    "Features never import app/, and use other features only through their index.ts.",
  ),
  forbid(
    ["src/content/**", "src/config/**"],
    ["@/app", "@/app/*", "@/features", "@/features/*", "@/shared/ui", "@/shared/ui/*"],
    "content/ and config/ are plain data.",
  ),

  globalIgnores([".next/**", "out/**", "coverage/**", "storybook-static/**", "next-env.d.ts"]),
]);

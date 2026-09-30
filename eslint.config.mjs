// Flat config. `eslint-config-next` v16 ships native flat config (an array),
// so it can be spread directly — no FlatCompat/eslintrc shim needed.
//
// `core-web-vitals` is used rather than the base config because it promotes the
// performance rules that matter most here (notably @next/next/no-img-element)
// from warning to error.
import next from "eslint-config-next/core-web-vitals";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const config = [
  {
    // Build output, vendored artifacts, and design-tool exports that are not
    // part of the application source.
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "support.js",
      "scratch/**",
      "media/**",
      "public/**",
      "*.dc.html",
    ],
  },

  ...next,

  {
    name: "signiance/project-rules",
    // Scoped to TS files and registering the plugin locally: in flat config a
    // plugin is only visible to config objects that both declare it and match
    // the same files, and `next/typescript` restricts itself to TS/TSX.
    files: ["**/*.ts", "**/*.tsx"],
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      // Surfaces the dead exports and unused locals the audit found in
      // lib/data.ts, but as warnings so they never block a build.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // The Cal.com embed boundary currently relies on `any`; keep this visible
      // as a warning rather than silently accepting it.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default config;

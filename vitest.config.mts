import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// `vite-tsconfig-paths` is what makes the project's `@/*` alias resolve inside
// tests, so test files can import app modules exactly the way components do.
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    // Source files are scanned as text by the link/data tests, so watching
    // them would retrigger runs constantly during development.
    restoreMocks: true,
  },
});

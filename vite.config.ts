import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // test: {
  //   globals: true,
  //   environment: "jsdom",
  //   setupFiles: ["@testing-library/jest-dom/vitest", "src/setupTests.ts"],
  // },
});

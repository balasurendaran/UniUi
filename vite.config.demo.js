import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite config for the GitHub Pages demo build.
 * Builds the full app (App.jsx entry), not the library.
 * base must match the GitHub repo name.
 */
export default defineConfig({
  base: "/UniUi/",          // ← matches https://balasurendaran.github.io/UniUi/
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      hooks: path.resolve(__dirname, "src/hooks"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    outDir: "dist-demo",    // separate from the library dist/
  },
});

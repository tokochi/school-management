import { rmSync } from "fs";
import { join } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron/renderer";
import { builtinModules } from "module";
import pkg from "./package.json";
import postcss from "./postcss.config.js";
rmSync(join(__dirname, "dist"), { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
      styles: join(__dirname, "src/assets/styles"),
    },
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main/index.js",
        vite: {
          build: {
            sourcemap: false,
            outDir: "dist/electron/main",
            rollupOptions: {
              external: [
                "electron",
                ...builtinModules,
                // Here
                // "json-file-encrypt",
                // "systeminformation",
                // "mongoose",
              ],
            },
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          splash: join(__dirname, "electron/preload/splash.ts"),
        },
        vite: {
          build: {
            // For debug
            sourcemap: "inline",
            outDir: "dist/electron/preload",
          },
        },
      },
    }),
    // Enables use of Node.js API in the Renderer-process
    renderer(),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});

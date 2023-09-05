// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default (mode: any) =>
  defineConfig({
    base: "",
    build: {
      chunkSizeWarningLimit: 3000, // Set the limit to a higher value (in KiB)
    },
    plugins: [
      vue({
        include: [/\.vue$/],
      }),
      vuetify({
        autoImport: true,
      }),
    ],
    define: { "process.env": loadEnv(mode, process.cwd(), "") },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
    },
    server: {
      port: 3000,
    },
  });

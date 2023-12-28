import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: "@services", replacement: "/src/services" },
      { find: "@features", replacement: "/src/features" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@ui", replacement: "/src/ui" },
    ],
  },
});

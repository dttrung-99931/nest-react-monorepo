import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      target: "react",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    // Both packages/ui and apps/web need react, react-dom
    // This prevent 2 different react, react-dom used
    dedupe: ["react", "react-dom"],
  },
  build: {
    sourcemap: true,
  },
});

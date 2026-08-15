import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: !options.watch,
  outDir: "dist",
  // Do not build prisma
  external: ["@prisma/client"],
  // ?
  noExternal: [],
}));

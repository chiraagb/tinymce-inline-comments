import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import type { ModuleFormat } from "rollup";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "TinymceInlineComments",
      fileName: (format: ModuleFormat) => `inline-comments.${format}.js`,
    },
    rollupOptions: {
      external: ["tinymce"],
    },
  },

  plugins: [
    dts({
      entryRoot: "src",
      outDir: "dist",
    }),
  ],
});

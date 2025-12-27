import { defineConfig } from "vite";
import type { ModuleFormat } from "rollup";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "TinymceInlineComments",

      fileName: (format: ModuleFormat, entryName: string) => {
        return `inline-comments.${format}.js`;
      },
    },

    rollupOptions: {
      external: ["tinymce"],
    },
  },
});

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "TinymceInlineComments",
      fileName: (format) => `inline-comments.${format}.js`,
    },
    rollupOptions: {
      external: ["tinymce"],
    },
  },
});

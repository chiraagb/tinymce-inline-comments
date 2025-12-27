import "tinymce";

declare module "tinymce" {
  interface Editor {
    removeInlineComment(annotationId: string): void;
  }
}

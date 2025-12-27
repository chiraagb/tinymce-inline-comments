export type InlineCommentEventPayload = {
  annotationId: string;
  selectedText?: string;
};

declare module "tinymce" {
  interface Editor {
    removeInlineComment(annotationId: string): void;
  }
}

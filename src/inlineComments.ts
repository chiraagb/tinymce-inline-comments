export type InlineCommentEventPayload = {
  annotationId: string;
  selectedText?: string;
};

export function registerInlineComments(editor: any) {
  const FORMAT = "inline_comment";
  const CLASS = "inline-comment";

  editor.on("init", () => {
    editor.formatter.register(FORMAT, {
      inline: "span",
      classes: CLASS,
      attributes: { "data-annotation-id": "%value" },
    });
  });

  editor.addCommand("inline-comments:add", () => {
    if (editor.selection.isCollapsed()) return;

    const annotationId = crypto.randomUUID();
    const selectedText = editor.selection.getContent({ format: "text" });

    editor.undoManager.transact(() => {
      editor.formatter.apply(FORMAT, { value: annotationId });
    });

    editor.fire("inline-comments:add", { annotationId, selectedText });
  });

  editor.removeInlineComment = (annotationId: string) => {
    editor.undoManager.transact(() => {
      const spans = editor.dom.select(
        `span[data-annotation-id="${annotationId}"]`
      );

      spans.forEach((span: HTMLElement) => {
        const parent = span.parentNode;
        if (!parent) return;

        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      });
    });

    editor.fire("inline-comments:delete", { annotationId });
  };

  editor.on("click", (e: any) => {
    const el = editor.dom.getParent(e.target, `span.${CLASS}`);
    if (!el) return;

    const annotationId = el.getAttribute("data-annotation-id");
    if (!annotationId) return;

    editor.dom
      .select(`.${CLASS}`)
      .forEach((n: HTMLElement) => n.classList.remove("active"));

    el.classList.add("active");

    editor.fire("inline-comments:select", { annotationId });
  });

  editor.ui.registry.addButton("inlineComment", {
    icon: "comment",
    tooltip: "Add comment",
    onAction: () => editor.execCommand("inline-comments:add"),
  });

  editor.ui.registry.addContextToolbar("inlineCommentToolbar", {
    predicate: () => !editor.selection.isCollapsed(),
    items: "inlineComment",
    position: "selection",
    scope: "editor",
  });
}

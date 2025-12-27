function c(n) {
  const s = "inline_comment", o = "inline-comment";
  n.on("init", () => {
    n.formatter.register(s, {
      inline: "span",
      classes: o,
      attributes: { "data-annotation-id": "%value" }
    });
  }), n.addCommand("inline-comments:add", () => {
    if (n.selection.isCollapsed()) return;
    const t = crypto.randomUUID(), a = n.selection.getContent({ format: "text" });
    n.undoManager.transact(() => {
      n.formatter.apply(s, { value: t });
    }), n.fire("inline-comments:add", { annotationId: t, selectedText: a });
  }), n.removeInlineComment = (t) => {
    n.undoManager.transact(() => {
      n.dom.select(
        `span[data-annotation-id="${t}"]`
      ).forEach((e) => {
        const i = e.parentNode;
        if (i) {
          for (; e.firstChild; )
            i.insertBefore(e.firstChild, e);
          i.removeChild(e);
        }
      });
    }), n.fire("inline-comments:delete", { annotationId: t });
  }, n.on("click", (t) => {
    const a = n.dom.getParent(t.target, `span.${o}`);
    if (!a) return;
    const e = a.getAttribute("data-annotation-id");
    e && (n.dom.select(`.${o}`).forEach((i) => i.classList.remove("active")), a.classList.add("active"), n.fire("inline-comments:select", { annotationId: e }));
  }), n.ui.registry.addButton("inlineComment", {
    icon: "comment",
    tooltip: "Add comment",
    onAction: () => n.execCommand("inline-comments:add")
  }), n.ui.registry.addContextToolbar("inlineCommentToolbar", {
    predicate: () => !n.selection.isCollapsed(),
    items: "inlineComment",
    position: "selection",
    scope: "editor"
  });
}
export {
  c as registerInlineComments
};

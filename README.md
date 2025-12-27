# tinymce-inline-comments

A **headless, Google Docs–style inline comments plugin for TinyMCE**.

This plugin enables **inline annotations** on selected text and emits
**comment lifecycle events** (add / select / delete), while keeping
all **UI, backend APIs, permissions, and threading logic in your app**.

Designed for:

- Contract editors
- Legal documents
- Review & approval workflows
- Collaborative document tools

---

## Links

- **GitHub Repository:**  
  https://github.com/chiraagb/tinymce-inline-comments

- **Issues & Feature Requests:**  
  https://github.com/chiraagb/tinymce-inline-comments/issues

---

## Features

- Inline comment annotations using `<span>`
- Selection-based comments
- Event-driven (no backend coupling)
- Annotation delete / unwrap API
- Framework-agnostic
- React / Vue / Angular / Vanilla JS friendly
- Thread-ready architecture

---

## Installation

```bash
npm install tinymce-inline-comments
```

---

## Basic Usage (React Example)

```tsx
import { Editor } from "@tinymce/tinymce-react";
import { registerInlineComments } from "tinymce-inline-comments";

<Editor
  init={{
    extended_valid_elements: "span[class|data-annotation-id]",
    content_style: `
      .inline-comment {
        background: rgba(145,166,255,0.22);
        border-bottom: 2px solid #6C48C5;
        cursor: pointer;
      }
      .inline-comment.active {
        background: rgba(108,72,197,0.25);
      }
    `,
    setup: (editor) => {
      registerInlineComments(editor);

      editor.on("inline-comments:add", (e) => {
        console.log("Comment added", e.annotationId, e.selectedText);
      });

      editor.on("inline-comments:select", (e) => {
        console.log("Comment selected", e.annotationId);
      });

      editor.on("inline-comments:delete", (e) => {
        console.log("Comment deleted", e.annotationId);
      });
    },
    toolbar: "undo redo | inlineComment",
  }}
/>;
```

---

## Events

### `inline-comments:add`

Fired when a comment is added to selected text.

```ts
{
  annotationId: string;
  selectedText: string;
}
```

---

### `inline-comments:select`

Fired when an existing annotation is clicked.

```ts
{
  annotationId: string;
}
```

---

### `inline-comments:delete`

Fired when an annotation is removed.

```ts
{
  annotationId: string;
}
```

---

## API

### `editor.removeInlineComment(annotationId: string)`

Removes the inline annotation wrapper while **preserving the text content**.

```ts
editor.removeInlineComment(annotationId);
```

---

## Architecture (Important)

This plugin is intentionally **headless**.

| Concern              | Where it lives |
| -------------------- | -------------- |
| UI (sidebar, modals) | Your app       |
| Backend APIs         | Your app       |
| Auth & permissions   | Your app       |
| Mentions             | Your app       |
| Threaded comments    | Your app       |
| Inline annotations   | This plugin    |

This design makes the plugin:

- Enterprise-safe
- Highly reusable
- Easy to extend

---

## Threaded Comments (Recommended Pattern)

Use `annotationId` as the thread key:

```json
{
  "annotation_id": "uuid",
  "thread": [
    { "id": "c1", "text": "Initial comment" },
    { "id": "c2", "text": "Reply" }
  ]
}
```

The plugin does **not** enforce a data model.

---

## Notes

- The plugin does **not** store comments
- The plugin does **not** make API calls
- The plugin does **not** manage UI state

This is by design.

---

## License

MIT © Chirag Bhandakkar

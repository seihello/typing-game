import { Mark, mergeAttributes } from "@tiptap/core"

export const SpanColor = Mark.create({
  name: "spanColor",
  priority: 1000,
  // 全ての span タグをこの Mark として認識させる
  parseHTML() {
    return [{ tag: "span" }]
  },
  // attributes として style を維持するように設定
  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {}
          return { style: attributes.style }
        },
      },
      "data-char-id": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-char-id"),
        renderHTML: (attributes) => {
          if (!attributes["data-char-id"]) return {}
          return { "data-char-id": attributes["data-char-id"] }
        },
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0]
  },
})

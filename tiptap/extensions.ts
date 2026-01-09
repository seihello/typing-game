import { Extension, Mark, mergeAttributes } from "@tiptap/core"
import { Plugin } from "@tiptap/pm/state" // これが必要
import { Decoration, DecorationSet } from "@tiptap/pm/view"

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

export const CharacterColorHighlighter = Extension.create({
  name: "characterColorHighlighter",

  addOptions() {
    return {
      targetSentence: "",
    }
  },

  addProseMirrorPlugins() {
    // ここで this は拡張機能のインスタンスを指す
    return [
      new Plugin({
        // key を設定しておくとデバッグしやすくなります
        props: {
          // アロー関数にすることで、外側の this (optionsなど) を直接参照できる
          decorations: (state) => {
            const { doc } = state
            const decorations: Decoration[] = []
            const target = this.options.targetSentence // 直接 this.options が使える

            doc.descendants((node, pos) => {
              if (!node.isText || !node.text) return

              const nodeText = node.text
              for (let i = 0; i < nodeText.length; i++) {
                const absolutePos = pos + i

                // ProseMirrorのドキュメント位置は1始まり
                // charIdxは比較用の0始まりインデックス
                const charIdx = absolutePos - 1

                if (
                  charIdx < target.length &&
                  nodeText[i] !== target[charIdx]
                ) {
                  decorations.push(
                    Decoration.inline(absolutePos, absolutePos + 1, {
                      style: "color: red; font-weight: bold;",
                    }),
                  )
                }
              }
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})

"use client"

import { SpanColor } from "@/tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction, useRef } from "react"

type Props = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  targetSentence: string
}

export default function StaticInputArea({
  value,
  setValue,
  targetSentence,
}: Props) {
  const isComposing = useRef(false)

  const editor = useEditor({
    extensions: [StarterKit, SpanColor],
    content: "",
    immediatelyRender: false,
    editorProps: {
      handleDOMEvents: {
        compositionstart: () => {
          isComposing.current = true
        },
        compositionend: () => {
          isComposing.current = false
        },
      },
    },
  })

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      if (!editor) {
        return
      }

      // const originalHtml = editor.getHTML()
      // console.log("originalHtml", originalHtml)

      const originalText = editor
        .getText()
        .trim()
        .replace(/[\r\n]/g, "")
      console.log("originalText", originalText)

      // クォーテーションをしっかりつける
      const coloredText = [...originalText]
        .map((char, i) => {
          const matchesTarget =
            i < targetSentence.length && char === targetSentence[i]
          return matchesTarget
            ? char
            : `<span data-char-id="${i}" style="color: red;">${char}</span>`
        })
        .join("")
      console.log("coloredText", coloredText)

      // HTMLが変更されていないなら何もしない（無限ループ防止）
      if (coloredText === editor.getHTML()) return

      // カーソル位置の保持
      const { from, to } = editor.state.selection

      // // 更新処理
      // editor.commands.setContent(coloredText, { emitUpdate: false })

      // editor.commands.setTextSelection(to)

      editor
        .chain()
        .focus()
        .setContent(coloredText, { emitUpdate: false }) // 第2引数をfalseにすると更新イベントを抑制
        .setTextSelection({ from, to }) // 元の位置にセット
        .run()

      // 改行が挿入されるのを防ぐ（Enterで更新処理をする場合）
      event.preventDefault()
    }
  }

  if (!editor) return null

  return (
    <EditorContent
      editor={editor}
      className="w-full bg-white p-2 text-2xl font-bold text-black [&>.tiptap:focus]:outline-none [&>.tiptap]:h-64"
      onKeyDown={handleKeyDown}
    />
  )
}

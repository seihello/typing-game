"use client"

import { SpanColor } from "@/tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction, useCallback, useRef } from "react"

type Props = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  targetSentence: string
}

export default function InputArea({ value, setValue, targetSentence }: Props) {
  const isComposing = useRef(false)

  // handleInputをuseCallbackでラップし、エディタを引数で受け取る
  const handleInput = useCallback(
    (currentEditor: any) => {
      if (!currentEditor || isComposing.current) return

      const originalText = currentEditor.getText()
      setValue(originalText)

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

      // HTMLが変更されていないなら何もしない（無限ループ防止）
      if (coloredText === currentEditor.getHTML()) return

      // カーソル位置の保持
      const { to } = currentEditor.state.selection

      // 更新処理
      currentEditor.commands.setContent(coloredText, { emitUpdate: false })

      // カーソルをセット（単純な to だとずれることがありますが、まずはこれで確認）
      // to が新しいドキュメントのサイズを超えないように保護
      const newPos = Math.min(to, currentEditor.state.doc.content.size)
      currentEditor.commands.setTextSelection(newPos)
    },
    [targetSentence, setValue],
  )

  const editor = useEditor({
    extensions: [StarterKit, SpanColor],
    content: "",
    immediatelyRender: false,
    editorProps: {
      handleDOMEvents: {
        compositionstart: () => {
          isComposing.current = true
          return false // trueにすると標準のイベントが止まる場合があるのでfalse推奨
        },
        compositionend: (view, event) => {
          isComposing.current = false
          // ここが重要！一瞬だけ遅らせる
          setTimeout(() => {
            handleInput(editor)
          }, 10)
          return false
        },
      },
    },
    onUpdate: ({ editor }) => {
      // IME中でなければ即時実行
      if (!isComposing.current) {
        handleInput(editor)
      }
    },
  })

  if (!editor) return null

  return (
    <EditorContent
      editor={editor}
      className="w-full bg-white p-2 text-2xl font-bold text-black [&>.tiptap:focus]:outline-none [&>.tiptap]:h-64"
    />
  )
}

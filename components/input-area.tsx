"use client"

import { SpanColor } from "@/tiptap/extensions"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction } from "react"

type Props = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function InputArea({ value, setValue }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, SpanColor],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue(editor.getText())

      const originalText = editor.getText()

      const coloredText = originalText.replace(
        /あ/g,
        '<span style="color: red;">あ</span>',
      )

      if (originalText !== coloredText) {
        const { from, to } = editor.state.selection
        editor.commands.setContent(coloredText, { emitUpdate: false })
        editor.commands.setTextSelection({ from, to })
      }
    },
  })

  if (!editor) {
    return null
  }

  return (
    <EditorContent
      editor={editor}
      className="w-full bg-white p-2 text-2xl font-bold text-black [&>.tiptap:focus]:outline-none [&>.tiptap]:h-64"
    />
  )
}

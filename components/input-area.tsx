"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Dispatch, SetStateAction } from "react"

type Props = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function InputArea({ value, setValue }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>aaaa</p>",
    // editorProps: {
    //   attributes: {
    //     class:
    //       "p-2 h-64 bg-white font-bold text-2xl overflow-y-auto focus:outline-none",
    //   },
    // },
    // Explicitly set immediatelyRender to false to avoid SSR hydration mismatches
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setValue(editor.getText())
    },
  })

  if (!editor) {
    return null
  }

  console.log("input", value)

  return (
    <EditorContent
      editor={editor}
      className="w-full bg-white p-2 text-2xl font-bold text-black [&>.tiptap:focus]:outline-none [&>.tiptap]:h-64"
    />
  )
}

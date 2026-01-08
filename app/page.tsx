"use client"

import TargetSentence from "@/components/target-sentence"
import { useLayoutEffect, useRef, useState } from "react"

export default function Home() {
  const inputRef = useRef<HTMLDivElement>(null)
  const caretRef = useRef(0)
  const isComposing = useRef(false)
  const [input, setInput] = useState("")

  const handleInput = () => {
    if (isComposing.current) return

    const el = inputRef.current
    if (!el) return

    caretRef.current = getCaretOffset(el)
    setInput(el.innerText)
  }

  // DOM更新後にcaret復元
  useLayoutEffect(() => {
    if (!inputRef.current) return
    setCaretOffset(inputRef.current, caretRef.current)
  }, [input])

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-y-8 p-4 text-white">
      <TargetSentence />
      <div
        contentEditable
        suppressContentEditableWarning
        ref={inputRef}
        onCompositionStart={() => {
          isComposing.current = true
        }}
        onCompositionEnd={() => {
          isComposing.current = false
          handleInput()
        }}
        onInput={handleInput}
        className="h-64 w-full bg-white text-black"
      >
        {input}
      </div>
    </div>
  )
}

function getCaretOffset(root: HTMLElement): number {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return 0

  const range = sel.getRangeAt(0)
  const pre = range.cloneRange()
  pre.selectNodeContents(root)
  pre.setEnd(range.endContainer, range.endOffset)
  return pre.toString().length
}

function setCaretOffset(root: HTMLElement, offset: number) {
  const sel = window.getSelection()
  if (!sel) return

  const range = document.createRange()
  let current = 0

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Text | null = null

  while ((node = walker.nextNode() as Text | null)) {
    const len = node.textContent?.length ?? 0
    if (current + len >= offset) {
      range.setStart(node, offset - current)
      break
    }
    current += len
  }

  range.collapse(true)
  sel.removeAllRanges()
  sel.addRange(range)
}

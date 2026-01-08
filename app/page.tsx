"use client"

import TargetSentence from "@/components/target-sentence"
import { useLayoutEffect, useRef, useState } from "react"

export default function Home() {
  const inputRef = useRef<HTMLDivElement>(null)
  const caretRef = useRef(0)
  const isComposing = useRef(false)
  const [input, setInput] = useState("")

  const targetSentence =
    "効率だけを追い求める社会では、人間の尊厳と想像力が静かに削られていく。"

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
      <TargetSentence value={targetSentence} />
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
        {renderColoredText(targetSentence, input)}
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

function renderColoredText(target: string, input: string) {
  // const max = Math.max(target.length, input.length)
  // return Array.from({ length: max }).map((_, i) => {
  //   const t = target[i]
  //   const v = input[i]
  //   let color = "#999"
  //   if (v != null) {
  //     color = v === t ? "green" : "red"
  //   }
  //   return (
  //     <span key={i} style={{ color }}>
  //       {v ?? t ?? ""}
  //     </span>
  //   )
  // })

  return Array.from({ length: input.length }).map((_, i) => {
    return (
      <span key={i} style={{ color: input[i] === "あ" ? "red" : "black" }}>
        {input[i]}
      </span>
    )
  })
}

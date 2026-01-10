"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import { generateSentence } from "@/lib/openai/generate-sentence"
import { useEffect, useState } from "react"

type Props = {
  complete: () => void
}

export default function SingleGame({ complete }: Props) {
  const [target, setTarget] = useState("")
  const [input, setInput] = useState("")

  useEffect(() => {
    ;(async () => {
      const sentence = await generateSentence()
      setTarget(sentence)
    })()
  }, [])

  useEffect(() => {
    if (target && input === target) {
      complete()
    }
  }, [input, target, complete])

  if (!target) return

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-y-8 px-2 py-8 text-white">
      <TargetSentence target={target} input={input} />
      <NormalInputArea input={input} setInput={setInput} />
    </div>
  )
}

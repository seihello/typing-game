"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import { generateSentence } from "@/lib/openai/generate-sentence"
import { useEffect, useState } from "react"

type Props = {
  complete: () => void
}

export default function SingleGame({ complete }: Props) {
  const [target, setTarget] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    ;(async () => {
      const sentence = await generateSentence(3)
      setTarget(sentence)
    })()
  }, [])

  useEffect(() => {
    if (target.length === 0) return
    if (input === target[index]) {
      if (index === target.length - 1) {
        complete()
      } else {
        setIndex((prev) => prev + 1)
      }
    }
  }, [input, target, index, complete])

  useEffect(() => {
    setInput("")
  }, [index])

  if (target.length === 0) return

  return (
    <div className="flex flex-col items-center gap-y-8">
      <TargetSentence target={target[index]} input={input} />
      <NormalInputArea input={input} setInput={setInput} />
    </div>
  )
}

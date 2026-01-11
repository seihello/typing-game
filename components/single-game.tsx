"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import Timer from "@/components/timer"
import { generateSentence } from "@/lib/openai/generate-sentence"
import { Result } from "@/types/result"
import { useEffect, useRef, useState } from "react"
import { HashLoader } from "react-spinners"

type Props = {
  complete: (result: Result) => void
}

export default function SingleGame({ complete }: Props) {
  const [target, setTarget] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const isGeneratingSentences = useRef(false)

  useEffect(() => {
    ;(async () => {
      if (!isGeneratingSentences.current) {
        isGeneratingSentences.current = true
        const sentence = await generateSentence(3)
        setTarget(sentence)
      }
    })()
  }, [])

  useEffect(() => {
    if (target.length === 0) return

    if (input === target[index]) {
      if (index === target.length - 1) {
        const wordCount = target.reduce(
          (sum, sentence) => sum + sentence.length,
          0,
        )
        complete({ elapsedTime, wordCount })
      } else {
        setIndex((prev) => prev + 1)
      }
    }
  }, [input, target, index, complete, elapsedTime])

  useEffect(() => {
    if (index > 0) {
      setInput("")
    }
  }, [index])

  return (
    <div className="flex flex-col items-center gap-y-8">
      {target.length === 0 ? (
        <div className="flex h-64 flex-col justify-center">
          <HashLoader size={64} color="#FFFFFF" />
        </div>
      ) : (
        <>
          <TargetSentence target={target[index]} input={input} />
          <NormalInputArea input={input} setInput={setInput} />
          <Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
        </>
      )}
    </div>
  )
}

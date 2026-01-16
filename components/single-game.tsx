"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import Timer from "@/components/timer"
import { generateSentence } from "@/lib/generate-sentence"
import { Result } from "@/types/result"
import { useEffect, useRef, useState } from "react"
import { HashLoader } from "react-spinners"

type Props = {
  numSentences: number
  topics: string[]
  complete: (result: Result) => void
}

export default function SingleGame({ numSentences, topics, complete }: Props) {
  const [target, setTarget] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const isGeneratingSentences = useRef(false)

  useEffect(() => {
    ;(async () => {
      if (!isGeneratingSentences.current) {
        isGeneratingSentences.current = true

        const sentence = await generateSentence(numSentences, topics)
        setTarget(sentence)
      }
    })()
  }, [numSentences, topics])

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
    <>
      {target.length === 0 ? (
        <div className="flex h-64 w-full flex-col items-center justify-center gap-y-8">
          <p className="text-xl font-semibold">文章を作成中...</p>
          <HashLoader size={64} color="#FFFFFF" />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-y-8">
          <TargetSentence target={target[index]} input={input} />
          <div className="flex w-full flex-col items-end gap-y-2">
            <NormalInputArea input={input} setInput={setInput} />
            <div className="self-end font-semibold">
              {index + 1} / {numSentences} 問目
            </div>
          </div>
          <Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
        </div>
      )}
    </>
  )
}

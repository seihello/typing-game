"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import Timer from "@/components/timer"
import { useResult } from "@/contexts/result"
import { useSettings } from "@/contexts/settings"
import { generateSentence } from "@/lib/generate-sentence"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { HashLoader } from "react-spinners"

export default function PlayView() {
  const router = useRouter()
  const pathname = usePathname()

  const { settings } = useSettings()
  const { setResult } = useResult()

  const [isRouting, setIsRouting] = useState(false)

  const [target, setTarget] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const isGeneratingSentences = useRef(false)

  useEffect(() => {
    ;(async () => {
      if (!settings) {
        router.push("/")
        return
      }
      if (!isGeneratingSentences.current) {
        isGeneratingSentences.current = true

        const sentence = await generateSentence(
          settings.numSentences,
          settings.topics,
        )
        setTarget(sentence)
      }
    })()
  }, [settings, router])

  useEffect(() => {
    if (!setResult) return
    if (target.length === 0) return
    if (isRouting) return

    if (input === target[index]) {
      if (index === target.length - 1) {
        const wordCount = target.reduce(
          (sum, sentence) => sum + sentence.length,
          0,
        )
        setResult({ elapsedTime, wordCount })

        setIsRouting(true)
        router.push("/score")
      } else {
        setIndex((prev) => prev + 1)
      }
    }
  }, [input, target, index, elapsedTime, isRouting, setResult, router])

  useEffect(() => {
    if (index > 0) {
      setInput("")
    }
  }, [index])

  if (!settings) {
    return
  }

  return (
    <div
      className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white"
      key={pathname}
    >
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
              {index + 1} / {settings.numSentences} 問目
            </div>
          </div>
          <Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} />
        </div>
      )}
    </div>
  )
}

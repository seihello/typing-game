"use client"

import ResultView from "@/components/result-view"
import SingleGame from "@/components/single-game"
import StartView from "@/components/start-view"
import { Result } from "@/types/result"
import { useState } from "react"

type Status = "Start" | "InProgress" | "Result"

export default function Home() {
  const [status, setStatus] = useState<Status>("Start")
  const [result, setResult] = useState<Result>()
  const [numSentences, setNumSentences] = useState<number>(3)
  const [categories, setCategories] = useState<string[]>([])

  const start = (numSentences: number, categories: string[]) => {
    setNumSentences(numSentences)
    setCategories(categories)
    setStatus("InProgress")
  }

  const restart = () => {
    setStatus("InProgress")
  }

  const complete = (result: Result) => {
    setResult(result)
    setStatus("Result")
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center px-4 py-8 text-white">
      {status === "Start" ? (
        <StartView
          // numSentences={numSentences}
          // setNumSentences={setNumSentences}
          start={start}
        />
      ) : status === "InProgress" ? (
        <SingleGame
          numSentences={numSentences}
          categories={categories}
          complete={complete}
        />
      ) : status === "Result" && result ? (
        <ResultView result={result} restart={restart} />
      ) : null}
    </div>
  )
}

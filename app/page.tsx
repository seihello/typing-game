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

  const start = (numSentences: number) => {
    setNumSentences(numSentences)
    setStatus("InProgress")
  }

  const complete = (result: Result) => {
    setResult(result)
    setStatus("Result")
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center px-4 py-8 text-white">
      {status === "Start" ? (
        <StartView start={start} />
      ) : status === "InProgress" ? (
        <SingleGame numSentences={numSentences} complete={complete} />
      ) : status === "Result" && result ? (
        <ResultView result={result} start={() => start(numSentences)} />
      ) : null}
    </div>
  )
}

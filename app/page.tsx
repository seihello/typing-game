"use client"

import SingleGame from "@/components/single-game"
import { Button } from "@/components/ui/button"
import { Result } from "@/types/result"
import { useState } from "react"

type Status = "Start" | "InProgress" | "Result"

export default function Home() {
  const [status, setStatus] = useState<Status>("InProgress")
  const [result, setResult] = useState<Result>()

  const complete = (result: Result) => {
    setResult(result)
    setStatus("Result")
  }

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-2 py-8 text-white">
      {status === "Start" ? (
        <Button>Start</Button>
      ) : status === "InProgress" ? (
        <SingleGame complete={complete} />
      ) : status === "Result" && result ? (
        <div>
          <p>
            あなたは{result.wordCount}文字を
            {(result.elapsedTime / 1000).toFixed(1)}
            秒で入力しました（
            {result.elapsedTime > 0
              ? (result.wordCount / (result.elapsedTime / 1000)).toFixed(1)
              : ""}
            文字 / 秒）
          </p>
          <div></div>
        </div>
      ) : null}
    </div>
  )
}

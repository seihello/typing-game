"use client"

import { Button } from "@/components/ui/button"
import { useResult } from "@/contexts/result"
import { recordScore } from "@/lib/record-score"
import { Result } from "@/types/result"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ScorePage() {
  const router = useRouter()

  const { result } = useResult()

  const [score, setScore] = useState(-1)
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (!result) {
      router.push("/")
      return
    }

    recordScore(result)

    setScore(calcScore(result))
  }, [result, router])

  useEffect(() => {
    if (score < 0) return

    // const d = Math.floor(score / 100)
    const d = 9

    const timerId = setInterval(() => {
      setDisplayScore((prev) => (prev + d < score ? prev + d : score))
    }, 1)

    return () => clearInterval(timerId)
  }, [score])

  if (!result) return

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white">
      <div className="flex w-full flex-col items-center justify-center gap-y-12">
        <div className="space-y-8">
          <table className="[&_td]:px-4 [&_td]:py-2">
            <tr>
              <td className="text-right font-semibold">入力した文字数</td>
              <td className="text-2xl font-bold">
                <span>{result.wordCount}</span>
                <span className="ml-1">字</span>
              </td>
            </tr>
            <tr>
              <td className="text-right font-semibold">かかった時間</td>
              <td className="text-2xl font-bold">
                <span>{(result.elapsedTime / 1000).toFixed(1)}</span>
                <span className="ml-1">秒</span>
              </td>
            </tr>
            <tr>
              <td className="text-right font-semibold">平均タイプ数</td>
              <td className="text-2xl font-bold">
                <span>
                  {result.elapsedTime > 0
                    ? (result.wordCount / (result.elapsedTime / 1000)).toFixed(
                        1,
                      )
                    : ""}
                </span>
                <span className="ml-1">文字/秒</span>
              </td>
            </tr>
          </table>
          <div className="flex flex-col items-center gap-y-2">
            <h2 className="font-semibold">総合スコア</h2>
            <p className="font-martian text-7xl font-bold tracking-wide">
              {displayScore}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-8">
          <Button
            variant="secondary"
            size="xl"
            className="w-60"
            onClick={() => router.push("/play")}
          >
            もう一回プレイする
          </Button>
          <Button
            variant="secondary"
            size="xl"
            className="w-60"
            onClick={() => router.push("/")}
          >
            スタート画面に戻る
          </Button>
        </div>
      </div>
    </div>
  )
}

function calcScore(result: Result): number {
  const timeInSeconds = result.elapsedTime / 1000

  const kps = result.wordCount / timeInSeconds

  const score = Math.floor(kps * result.wordCount * 9)

  return score
}

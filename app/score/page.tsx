"use client"

import { Button } from "@/components/ui/button"
import { useResult } from "@/contexts/result"
import { recordScore } from "@/lib/record-score"
import { Result } from "@/types/result"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ScorePage() {
  const router = useRouter()

  const { result } = useResult()

  useEffect(() => {
    if (!result) {
      router.push("/")
      return
    }
    recordScore(result)
  }, [result, router])

  if (!result) return

  const { score, grade } = calcScore(result)

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white">
      <div className="flex w-full flex-col items-center justify-center gap-y-12">
        <div className="space-y-8">
          <table className="[&_td]:px-4 [&_td]:py-2">
            <tr>
              <td className="text-right font-semibold">入力した文字数</td>
              <td className="text-2xl font-bold">{result.wordCount}字</td>
            </tr>
            <tr>
              <td className="text-right font-semibold">かかった時間</td>
              <td className="text-2xl font-bold">
                {(result.elapsedTime / 1000).toFixed(1)}秒
              </td>
            </tr>
            <tr>
              <td className="text-right font-semibold">平均タイプ数</td>
              <td className="text-2xl font-bold">
                {result.elapsedTime > 0
                  ? (result.wordCount / (result.elapsedTime / 1000)).toFixed(1)
                  : ""}
                文字 / 秒
              </td>
            </tr>
          </table>
          <div className="flex flex-col items-center gap-y-2">
            <h2 className="font-semibold">総合スコア</h2>
            <p className="text-7xl font-bold tracking-wide">{score}</p>
          </div>
        </div>
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
  )
}

function calcScore(result: Result): { score: number; grade: string } {
  const timeInSeconds = result.elapsedTime / 1000
  // const wordPerSecond = result.wordCount / timeInSeconds

  const kps = result.wordCount / timeInSeconds

  const score = Math.floor(kps * result.wordCount * 9)

  let grade = ""
  if (score > 10000) {
    grade = "S"
  } else if (score > 8000) {
    grade = "A"
  } else if (score > 6000) {
    grade = "B"
  } else if (score > 4000) {
    grade = "C"
  } else if (score > 2000) {
    grade = "D"
  } else {
    grade = "E"
  }

  return { score, grade }
}

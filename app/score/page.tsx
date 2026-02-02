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

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white">
      <div className="flex w-full flex-col items-center justify-center gap-y-8">
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
        <div className="flex flex-col items-center gap-x-2">
          <h2 className="font-semibold">総合スコア</h2>
          <p className="text-6xl font-bold">{calcScore(result)}</p>
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

function calcScore(result: Result) {
  if (result.elapsedTime <= 0) {
    return "判定不能"
  }

  const wordPerSecond = result.wordCount / (result.elapsedTime / 1000)

  if (wordPerSecond > 2) {
    return "S"
  } else if (wordPerSecond > 1.5) {
    return "A"
  } else if (wordPerSecond > 1) {
    return "B"
  } else if (wordPerSecond > 0.6) {
    return "C"
  } else if (wordPerSecond > 0.3) {
    return "D"
  } else {
    return "E"
  }
}

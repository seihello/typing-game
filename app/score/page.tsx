"use client"

import { Button } from "@/components/ui/button"
import { useResult } from "@/contexts/result"
import { recordScore } from "@/lib/record-score"
import { Result } from "@/types/result"
import confetti, { Options } from "canvas-confetti"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function ScorePage() {
  const router = useRouter()

  const { result } = useResult()

  const [score, setScore] = useState<number>()
  const [displayScore, setDisplayScore] = useState(0)

  const isConfettiFalling = useRef(false)

  useEffect(() => {
    if (!score) return

    if (isConfettiFalling.current) return
    isConfettiFalling.current = true

    const options: Options = {
      scalar: 0.8,
      particleCount: Math.max(Math.floor(score / 100), 30),
      spread: 100,
      angle: 270,
      ticks: 400,
    }

    confetti({
      ...options,
      origin: {
        x: 0.2,
        y: -0.7,
      },
    })

    confetti({
      ...options,
      origin: {
        x: 0.8,
        y: -0.7,
      },
    })
  }, [score])

  useEffect(() => {
    if (!result) {
      router.push("/")
      return
    }

    recordScore(result)

    setScore(calcScore(result))
  }, [result, router])

  useEffect(() => {
    if (!score) return

    const d = Math.floor(score / 200)
    // const d = 9

    const timerId = setInterval(() => {
      setDisplayScore((prev) => (prev + d < score ? prev + d : score))
    }, 5)

    return () => clearInterval(timerId)
  }, [score])

  if (!result) return

  return (
    <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white">
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
            <p className="font-azeret text-7xl font-bold tracking-wide">
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

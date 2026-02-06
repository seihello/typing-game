import { Result } from "@/types/result"

export function calcScore(result: Result): number {
  const timeInSeconds = result.elapsedTime / 1000

  const kps = result.wordCount / timeInSeconds

  const score = Math.floor(kps * result.wordCount * 9)

  return score
}

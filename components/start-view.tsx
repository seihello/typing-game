import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

type Props = {
  start: (numSentences: number) => void
}

export default function StartView({ start }: Props) {
  const [numSentences, setNumSentences] = useState(3)

  return (
    <div className="flex h-64 flex-col items-center justify-center gap-y-8">
      <h1 className="text-4xl font-bold">日本語タイピング</h1>
      <div className="flex items-center justify-center gap-x-2">
        <label className="font-semibold">問題数</label>
        <Input
          value={numSentences}
          onChange={(e) => setNumSentences(Number(e.target.value))}
          className="w-24 font-semibold"
          type="number"
        />
      </div>
      <Button size="lg" className="w-48" onClick={() => start(numSentences)}>
        スタート
      </Button>
    </div>
  )
}

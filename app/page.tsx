"use client"

import InputArea from "@/components/input-area"
import TargetSentence from "@/components/target-sentence"
import { useState } from "react"

export default function Home() {
  const [input, setInput] = useState("")

  const targetSentence =
    "効率だけを追い求める社会では、人間の尊厳と想像力が静かに削られていく。"

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-y-8 p-4 text-white">
      <TargetSentence value={targetSentence} />
      <InputArea
        value={input}
        setValue={setInput}
        targetSentence={targetSentence}
      />
    </div>
  )
}

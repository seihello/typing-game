"use client"

import NormalInputArea from "@/components/normal-input-area"
import TargetSentence from "@/components/target-sentence"
import { useState } from "react"

export default function Home() {
  const [input, setInput] = useState("")

  const target =
    "効率だけを追い求める社会では、人間の尊厳と想像力が静かに削られていく。効率だけを追い求める社会では、人間の尊厳と想像力が静かに削られていく。"

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-y-8 px-2 py-8 text-white">
      <TargetSentence target={target} input={input} />
      <NormalInputArea input={input} setInput={setInput} />
    </div>
  )
}

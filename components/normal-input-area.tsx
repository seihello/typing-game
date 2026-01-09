"use client"

import { Dispatch, SetStateAction } from "react"

type Props = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
}

export default function NormalInputArea({ input, setInput }: Props) {
  return (
    <textarea
      className="h-64 w-full bg-white p-2 text-2xl font-bold text-black outline-none"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  )
}

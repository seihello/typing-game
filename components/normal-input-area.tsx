"use client"

import { Dispatch, SetStateAction, useRef, useState } from "react"

type Props = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
}

export default function NormalInputArea({ input, setInput }: Props) {
  const [value, setValue] = useState(input)
  const isComposing = useRef(false)

  return (
    <textarea
      className="h-64 w-full bg-white p-2 text-2xl font-bold text-black outline-none"
      value={value}
      onCompositionStart={() => {
        isComposing.current = true
      }}
      onCompositionEnd={() => {
        isComposing.current = false
        setInput(value)
      }}
      onChange={(e) => {
        setValue(e.target.value)
        if (!isComposing.current) {
          setInput(e.target.value)
        }
      }}
    />
  )
}

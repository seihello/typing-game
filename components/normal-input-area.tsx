"use client"

import { Textarea } from "@/components/ui/textarea"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

type Props = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
}

export default function NormalInputArea({ input, setInput }: Props) {
  const [value, setValue] = useState(input)
  const isComposing = useRef(false)

  useEffect(() => {
    if (!isComposing.current) {
      setInput(value)
    }
  }, [setInput, value])

  useEffect(() => {
    if (input === "") {
      setValue("")
    }
  }, [input])

  return (
    <Textarea
      className="h-64 w-full bg-white p-2 text-2xl font-bold text-black outline-none md:text-2xl"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onCompositionStart={() => {
        isComposing.current = true
      }}
      onCompositionEnd={(e) => {
        isComposing.current = false
        // 確定した瞬間の値を親に反映
        setInput(e.currentTarget.value)
      }}
    />
  )
}

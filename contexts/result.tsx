"use client"

import { Result } from "@/types/result"
import { createContext, ReactNode, useContext, useState } from "react"

export const ResultContext = createContext<{
  result?: Result
  setResult?: React.Dispatch<React.SetStateAction<Result | undefined>>
}>({})

export function ResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<Result>()

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  )
}

export const useResult = () => {
  const context = useContext(ResultContext)

  return context
}

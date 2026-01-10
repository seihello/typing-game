"use client"

import SingleGame from "@/components/single-game"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Status = "Start" | "InProgress" | "Result"

export default function Home() {
  const [status, setStatus] = useState<Status>("InProgress")

  const complete = () => {
    setStatus("Result")
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center gap-y-8 px-2 py-8 text-white">
      {status === "Start" ? (
        <Button>Start</Button>
      ) : status === "InProgress" ? (
        <SingleGame complete={complete} />
      ) : status === "Result" ? (
        <div>Thank you for playing</div>
      ) : null}
    </div>
  )
}

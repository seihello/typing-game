import { Dispatch, SetStateAction, useEffect } from "react"

type Props = {
  elapsedTime: number
  setElapsedTime: Dispatch<SetStateAction<number>>
}

export default function Timer({ elapsedTime, setElapsedTime }: Props) {
  useEffect(() => {
    const startTime = Date.now()

    const timerId = setInterval(() => {
      setElapsedTime(Date.now() - startTime)
    }, 10) // 10ms間隔で更新

    return () => clearInterval(timerId)
  }, [setElapsedTime])

  // 00:00.00 のフォーマットに変換
  const minutes = Math.floor(elapsedTime / 60000)
  const seconds = Math.floor((elapsedTime % 60000) / 1000)
  const centiseconds = Math.floor((elapsedTime % 1000) / 10)

  // 必要なら0埋め
  const formatted =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}.` +
    `${String(centiseconds).padStart(2, "0")}`

  return <div className="font-azeret text-2xl">{formatted}</div>
}

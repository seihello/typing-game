import { useCallback } from "react"

type Props = {
  target: string
  input: string
}

export default function TargetSentence({ target, input }: Props) {
  const render = useCallback(
    (target: string) => {
      return [...target]
        .map((char, i) => {
          if (i < input.length && char === input[i]) {
            return `<span data-char-id="${i}" style="color: white; opacity: 0.5;">${char}</span>`
          } else {
            return `<span data-char-id="${i}" style="color: white;">${char}</span>`
          }
        })
        .join("")
    },
    [input],
  )

  return (
    <div
      className="text-2xl font-bold"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: render(target) }}
        className="flex flex-wrap justify-center"
      />
    </div>
  )
}

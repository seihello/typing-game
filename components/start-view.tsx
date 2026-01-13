import { Button } from "@/components/ui/button"

type Props = {
  start: () => void
}

export default function StartView({ start }: Props) {
  return (
    <div className="flex h-64 flex-col items-center gap-y-8">
      <h1 className="text-4xl font-bold">日本語タイピング</h1>
      <Button size="lg" className="w-48" onClick={() => start()}>
        スタート
      </Button>
    </div>
  )
}

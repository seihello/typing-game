import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TOPICS } from "@/constants"

type Props = {
  start: (numSentences: number, topics: string[]) => void
}

export default function StartView({ start }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const numSentences = Number(formData.get("numSentences"))
    const topics = formData.getAll("topics") as string[]

    start(numSentences, topics)
  }

  return (
    <div className="h-64">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-y-8"
      >
        <h1 className="text-4xl font-bold">日本語タイピング</h1>
        <div className="flex items-center justify-center gap-x-2">
          <label className="font-semibold">問題数</label>
          <Input
            type="number"
            name="numSentences"
            defaultValue={3}
            className="w-24 font-semibold"
          />
        </div>
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-center font-semibold">
            文章のジャンルを選択してください。
            <br />
            何もチェックしない場合はランダムで出題されます。
          </p>
          <div className="flex max-w-3xl flex-wrap justify-center gap-4">
            {TOPICS.map((TOPIC, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <Input
                  type="checkbox"
                  id={TOPIC}
                  name="topics"
                  value={TOPIC}
                  className="size-6"
                />
                <Label
                  htmlFor={TOPIC}
                  className="whitespace-nowrap text-lg font-semibold"
                >
                  {TOPIC}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Button size="lg" className="w-48">
          スタート
        </Button>
      </form>
    </div>
  )
}

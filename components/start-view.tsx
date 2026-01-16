import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CATEGORIES } from "@/constants"

type Props = {
  start: (numSentences: number, categories: string[]) => void
}

export default function StartView({ start }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const numSentences = Number(formData.get("numSentences"))
    const categories = formData.getAll("categories") as string[]

    start(numSentences, categories)
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
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((CATEGORY, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <Input
                type="checkbox"
                id={CATEGORY}
                name="categories"
                value={CATEGORY}
                className="size-6"
              />
              <Label
                htmlFor={CATEGORY}
                className="whitespace-nowrap text-lg font-semibold"
              >
                {CATEGORY}
              </Label>
            </div>
          ))}
        </div>
        <Button size="lg" className="w-48">
          スタート
        </Button>
      </form>
    </div>
  )
}

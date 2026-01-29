import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TOPICS } from "@/constants"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useEffect, useState } from "react"

type Props = {
  start: (numSentences: number, topics: string[]) => void
}

export default function StartView({ start }: Props) {
  const [defaultNumSentences, setDefaultNumSentences] = useState(3)
  const [allTopicsChecked, setAllTopicsChecked] = useState<boolean>(false)
  const [checkedTopics, setCheckedTopics] = useState<string[]>([])
  const [isLoadingUserSetting, setIsLoadingUserSetting] = useState(true)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const numSentences = Number(formData.get("numSentences"))
    const topics = Array.from(formData.entries())
      .filter(([, value]) => value === "on")
      .map(([name]) => name)

    console.log("topics", topics)

    localStorage.setItem("numSentences", numSentences.toString())
    localStorage.setItem("topics", topics.join(","))

    start(numSentences, topics)
  }

  useEffect(() => {
    const defaultNumSentences = localStorage.getItem("numSentences")
    if (defaultNumSentences && Number(defaultNumSentences) > 0) {
      setDefaultNumSentences(Number(defaultNumSentences))
    }

    const defaultTopics = localStorage.getItem("topics") ?? ""
    setCheckedTopics(defaultTopics.split(","))

    setIsLoadingUserSetting(false)
  }, [])

  useEffect(() => {
    setAllTopicsChecked(checkedTopics.length === TOPICS.length)
  }, [checkedTopics])

  if (isLoadingUserSetting) {
    return
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
            defaultValue={defaultNumSentences}
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
            <div className="flex w-40 items-center gap-x-2 rounded-md border bg-white p-1.5 text-primary">
              <Checkbox
                id="all"
                className="size-5"
                checked={allTopicsChecked}
                onCheckedChange={(checked: CheckedState) => {
                  setAllTopicsChecked(checked === true)
                  if (checked) {
                    setCheckedTopics(TOPICS)
                  } else {
                    setCheckedTopics([])
                  }
                }}
              />
              <Label
                htmlFor="all"
                className="text-md grow whitespace-nowrap font-semibold hover:cursor-pointer"
              >
                全て
              </Label>
            </div>
            {TOPICS.map((TOPIC, index) => (
              <div
                key={index}
                className="flex w-40 items-center gap-x-2 rounded-md border bg-white p-1.5 text-primary"
              >
                <Checkbox
                  id={TOPIC}
                  name={TOPIC}
                  checked={checkedTopics.includes(TOPIC)}
                  onCheckedChange={(checked: CheckedState) => {
                    if (checked) {
                      setCheckedTopics((prev) =>
                        prev.includes(TOPIC) ? prev : [...prev, TOPIC],
                      )
                    } else {
                      setCheckedTopics((prev) =>
                        prev.includes(TOPIC)
                          ? prev.filter((topic) => topic !== TOPIC)
                          : prev,
                      )
                    }
                  }}
                  className="size-5"
                />
                <Label
                  htmlFor={TOPIC}
                  className="text-md grow whitespace-nowrap font-semibold hover:cursor-pointer"
                >
                  {TOPIC}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Button variant="secondary" size="xl" className="w-48">
          スタート
        </Button>
      </form>
    </div>
  )
}

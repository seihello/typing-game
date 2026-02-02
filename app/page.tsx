"use client"

import TopicOption from "@/components/topic-option"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MAX_SENTENCES, TOPICS } from "@/constants"
import { useSettings } from "@/contexts/settings"
import { CheckedState } from "@radix-ui/react-checkbox"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()

  const { setSettings } = useSettings()

  const [allTopicsChecked, setAllTopicsChecked] = useState<boolean>(false)
  const [checkedTopics, setCheckedTopics] = useState<string[]>([])
  const [isLoadingUserSetting, setIsLoadingUserSetting] = useState(true)
  const [numSentences, setNumSentences] = useState(3)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!setSettings) return

    const formData = new FormData(e.currentTarget)

    const numSentences = Number(formData.get("numSentences"))
    const topics = Array.from(formData.entries())
      .filter(([, value]) => value === "on")
      .map(([name]) => name)

    localStorage.setItem("numSentences", numSentences.toString())
    localStorage.setItem("topics", topics.join(","))

    setSettings({ numSentences, topics })

    router.push("/play")
  }

  useEffect(() => {
    const defaultNumSentences = localStorage.getItem("numSentences")
    if (defaultNumSentences && Number(defaultNumSentences) > 0) {
      setNumSentences(Number(defaultNumSentences))
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
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 py-8 text-white">
      <div className="h-64">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center gap-y-12"
        >
          <h1 className="text-4xl font-bold">日本語タイピング</h1>
          <div className="relative flex w-full items-center justify-between gap-x-8">
            <h3 className="border-l-4 border-secondary pl-2 font-semibold">
              問題数
            </h3>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-x-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setNumSentences((prev) => (prev > 1 ? prev - 1 : prev))
                }
                disabled={numSentences <= 1}
                className="shadow-0 flex size-8 items-center justify-center rounded-full border-2 border-white p-0 text-xs font-bold hover:bg-primary hover:text-white"
              >
                <IconChevronLeft size={16} stroke={3} />
              </Button>

              <div className="w-10 text-center text-lg font-semibold">
                {numSentences}
              </div>
              <Input
                type="number"
                name="numSentences"
                value={numSentences}
                onChange={(e) => e.preventDefault()}
                className="hidden w-auto border-none font-semibold md:text-xl"
                hidden
              />
              <Button
                type="button"
                onClick={() => {
                  setNumSentences((prev) =>
                    prev < MAX_SENTENCES ? prev + 1 : prev,
                  )
                }}
                disabled={numSentences >= MAX_SENTENCES}
                className="shadow-0 flex size-8 items-center justify-center rounded-full border-2 border-white p-0 text-xs font-bold hover:bg-primary hover:text-white"
              >
                <IconChevronRight size={16} stroke={3} />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h3 className="border-l-4 border-secondary pl-2 font-semibold">
              ジャンル選択
            </h3>
            <div className="flex max-w-3xl flex-wrap gap-4">
              <TopicOption
                id="all"
                checked={allTopicsChecked}
                onCheckedChange={(checked: CheckedState) => {
                  setAllTopicsChecked(checked === true)
                  if (checked) {
                    setCheckedTopics(TOPICS)
                  } else {
                    setCheckedTopics([])
                  }
                }}
              >
                全て
              </TopicOption>

              {TOPICS.map((TOPIC, index) => (
                <TopicOption
                  key={index}
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
                >
                  {TOPIC}
                </TopicOption>
              ))}
            </div>
            <p className="w-full text-center text-sm">
              ※何もチェックしない場合はランダムで出題されます。
            </p>
          </div>
          <Button variant="secondary" size="xl" className="w-48">
            スタート
          </Button>
        </form>
      </div>
    </div>
  )
}

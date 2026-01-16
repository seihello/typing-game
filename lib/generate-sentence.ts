"use server"

import { CATEGORIES, TONES } from "@/constants"
import { getResponse } from "@/lib/gemini/get-response"
import { shuffle } from "@/lib/utils/shuffle"

// import { getResponse } from "@/lib/openai/get-response"

export async function generateSentence(numSentences: number, topics: string[]) {
  const selectedTopics = getRandomTopics(numSentences, topics)
  const selectedTones = getRandomTones(numSentences)
  const selectedCategories = getRandomCategories(numSentences)

  const prompt = `
    30文字以上50文字未満で、日本語の例文を${numSentences}個考えてください。
    下記のXMLフォーマットの<sentence>タグ内に指定した条件を基に文章を生成してください。
    <topic>タグは、文章のテーマ・ジャンルです。
    <tone>タグは、文章のフォーマル度や口調です。
    <category>タグは、文章の種類です。
    文章の内容は、具体的にしてください。
    できるだけ句点の数は文末の1つで済むような自然な文章にしてください。読点は複数あっても問題ないです。
    句読点以外の記号を含めないでください。

    <sentences>
    ${Array.from({ length: numSentences })
      .map(
        (_, index) => `
        <sentence>
          <topic>${selectedTopics[index]}</topic>
          <tone>${selectedTones[index]}</tone>
          <category>${selectedCategories[index]}</category>
        </sentence>`,
      )
      .join("\n")}
    </sentences>

    回答は、以下のXMLフォーマットで出力してください。このフォーマット以外の説明や補足は不要です。

    <sentences>
      <sentence>ここに文章</sentence>
      <sentence>ここに文章</sentence>
      ...
      <sentence>ここに文章</sentence>
    </sentences>
  `

  console.log("prompt", prompt)

  const response = await getResponse(prompt)
  console.log("response", response)

  const matches = [...response.matchAll(/<sentence>([^<]*)<\/sentence>/g)]
  const sentences = matches.map((m) => m[1].trim())

  console.log("sentences", sentences)

  return sentences
}

function getRandomTopics(numSentences: number, topics: string[]) {
  const shuffledTopics = shuffle(topics)

  const selectedTopics = shuffledTopics.slice(
    0,
    Math.min(numSentences, topics.length),
  )

  while (selectedTopics.length < numSentences) {
    const random = topics[Math.floor(Math.random() * topics.length)]
    selectedTopics.push(random)
  }

  return selectedTopics
}

function getRandomTones(numSentences: number) {
  const shuffledTones = shuffle(TONES)

  const selectedTones = shuffledTones.slice(
    0,
    Math.min(numSentences, TONES.length),
  )

  while (selectedTones.length < numSentences) {
    const random = TONES[Math.floor(Math.random() * TONES.length)]
    selectedTones.push(random)
  }

  return selectedTones
}

function getRandomCategories(numSentences: number) {
  const shuffledCategories = shuffle(CATEGORIES)

  const selectedCategories = shuffledCategories.slice(
    0,
    Math.min(numSentences, CATEGORIES.length),
  )

  while (selectedCategories.length < numSentences) {
    const random = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
    selectedCategories.push(random)
  }

  return selectedCategories
}

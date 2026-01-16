"use server"

import { getResponse } from "@/lib/gemini/get-response"
import { shuffle } from "@/lib/utils/shuffle"

// import { getResponse } from "@/lib/openai/get-response"

export async function generateSentence(
  numSentences: number,
  categories: string[],
) {
  const shuffledCategories = shuffle(categories)

  const selectedCategories = shuffledCategories.slice(
    0,
    Math.min(numSentences, categories.length),
  )

  while (selectedCategories.length < numSentences) {
    const random = categories[Math.floor(Math.random() * categories.length)]
    selectedCategories.push(random)
  }

  const prompt = `
    30文字以上50文字未満で、日本語の例文を${numSentences}個考えてください。
    下記のXML形式の応答フォーマット内の各<sentence></sentence>内に指定したカテゴリの文章を生成してください。
    思想の強く特徴的な文章にしたり、ユーモアを混ぜたり、偏見やブラックジョークを混ぜるのも良いでしょう。
    ただし、特定の人物を侮辱する内容であってはいけません。
    文体や語り手のキャラクターも文章ごとに変化させてください。
    できるだけ句点の数は文末の1つだけにしてください。読点は複数あっても問題ないです。
    句読点以外の記号を含めないでください。
    以下のXMLフォーマットでのみ出力してください。説明や補足は不要です。

    <sentences>
    ${selectedCategories
      .map((selectedCategory) => `<sentence>${selectedCategory}</sentence>`)
      .join("\n")}
    </sentences>
  `

  console.log("prompt", prompt)

  const response = await getResponse(prompt)

  const matches = [...response.matchAll(/<sentence>([^<]*)<\/sentence>/g)]
  const sentences = matches.map((m) => m[1].trim())

  console.log("sentences", sentences)

  return sentences
}

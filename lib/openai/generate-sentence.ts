"use server"

import { getClient } from "@/lib/openai/get-client"

export async function generateSentence(numSentences: number) {
  const client = getClient()

  // XML形式でnumSentences個の<sentence>タグに包まれた文章を生成するプロンプト
  const prompt = `
    50文字以上100文字未満で、日本語の例文を${numSentences}個考えてください。
    それぞれ思想の強く特徴的かつ魅力的な文章にしてください。
    美しい文学などのレトリックのように表現するのも良いでしょう。
    ジャンルは同じではなく、様々な分野から採用してください。
    1つの文章につき、読点は1つまでにしてください。
    句読点以外の記号を含めないでください。
    以下のXMLフォーマットでのみ出力してください（説明や補足は不要です）。

    <sentences>
    ${Array(numSentences)
      .fill(0)
      .map(() => `<sentence></sentence>`)
      .join("\n")}
    </sentences>
  `

  console.log("prompt", prompt)

  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: prompt,
  })

  // レスポンスからXML形式の文章を抽出
  const content = response.output_text

  console.log("content", content)

  // <sentence>タグで囲まれた部分を抽出して配列で返す
  const matches = [...content.matchAll(/<sentence>([^<]*)<\/sentence>/g)]
  const sentences = matches.map((m) => m[1].trim())

  console.log("sentences", sentences)

  return sentences
}

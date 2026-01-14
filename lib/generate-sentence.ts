"use server"

import { getResponse } from "@/lib/gemini/get-response"

// import { getResponse } from "@/lib/openai/get-response"

export async function generateSentence(numSentences: number) {
  // XML形式でnumSentences個の<sentence>タグに包まれた文章を生成するプロンプト
  const prompt = `
    30文字以上50文字未満で、日本語の例文を${numSentences}個考えてください。
    それぞれ思想の強く特徴的かつ魅力的な文章にしてください。
    美しい文学などのレトリックのように表現するのも良いでしょう。語彙
    ジャンルは同じではなく、様々な分野から採用してください。
    <sentence>一つにつき、文章は1つまでにしてください。つまり「。」は最後の一つだけです。
    句読点以外の記号を含めないでください。
    以下のXMLフォーマットでのみ出力してください（説明や補足は不要です）。

    <sentences>
    ${Array(numSentences)
      .fill(0)
      .map(() => `<sentence>ここに文章</sentence>`)
      .join("\n")}
    </sentences>
  `

  console.log("prompt", prompt)

  const response = await getResponse(prompt)

  // <sentence>タグで囲まれた部分を抽出して配列で返す
  const matches = [...response.matchAll(/<sentence>([^<]*)<\/sentence>/g)]
  const sentences = matches.map((m) => m[1].trim())

  console.log("sentences", sentences)

  return sentences
}

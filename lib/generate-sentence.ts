"use server"

import { getResponse } from "@/lib/gemini/get-response"

// import { getResponse } from "@/lib/openai/get-response"

export async function generateSentence(numSentences: number) {
  // XML形式でnumSentences個の<sentence>タグに包まれた文章を生成するプロンプト
  const prompt = `
    30文字以上50文字未満で、日本語の例文を${numSentences}個考えてください。
    文章の内容は、思想の強く特徴的な文章にしてください。
    面白おかしく、偏見やブラックジョークを混ぜるのも良いでしょう。
    ただし、特定の人物を侮辱する内容であってはいけません。
    ジャンルは同じではなく、様々な分野から採用してください。
    文体や語り手のキャラクター、文章のタイプを１つごとに変化させてください。
    できるだけ句点の数は文末の1つだけにしてください。読点は複数あっても問題ないです。
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

"use server"

import { getClient } from "@/lib/openai/get-client"

export async function generateSentence() {
  const client = getClient()

  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: `30文字以上50文字未満で、日本語の文章を作ってください。思想の強く特徴的な文章にしてください。句読点以外の記号を含めないでください。`,
  })

  return response.output_text
}

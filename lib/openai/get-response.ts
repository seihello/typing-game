"use server"

import { getClient } from "@/lib/openai/get-client"

export async function getResponse(request: string) {
  const client = getClient()

  const response = await client.responses.create({
    model: "gpt-3.5-turbo",
    input: request,
  })

  return response.output_text
}

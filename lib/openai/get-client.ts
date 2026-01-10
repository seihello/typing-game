import OpenAI from "openai"
import "server-only"

export function getClient() {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  return client
}

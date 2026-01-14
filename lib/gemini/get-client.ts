import { GoogleGenAI } from "@google/genai"
import "server-only"

export function getClient() {
  const client = new GoogleGenAI({})

  return client
}

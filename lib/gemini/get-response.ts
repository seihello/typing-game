import { getClient } from "@/lib/gemini/get-client"
import "server-only"

export async function getResponse(request: string) {
  const client = getClient()
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: request,
  })

  if (!response.text) {
    throw new Error("Response Undefined")
  }

  return response.text
}

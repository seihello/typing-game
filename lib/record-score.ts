"use server"

import { Result } from "@/types/result"

export async function recordScore(result: Result) {
  console.log("result", result)
}

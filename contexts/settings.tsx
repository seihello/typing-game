"use client"

import { Settings } from "@/types/settings"
import { createContext, ReactNode, useContext, useState } from "react"

export const SettingsContext = createContext<{
  settings?: Settings
  setSettings?: React.Dispatch<React.SetStateAction<Settings | undefined>>
}>({})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>()

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)

  return context
}

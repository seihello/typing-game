import { ResultProvider } from "@/contexts/result"
import { SettingsProvider } from "@/contexts/settings"
import type { Metadata } from "next"
import { Geist, Martian_Mono } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "変換タイピングゲーム",
  description: "変換ありの日本語タイピングゲームです。",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
})

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${martianMono.variable} bg-primary antialiased`}
      >
        <main className="font-geist">
          <SettingsProvider>
            <ResultProvider>{children}</ResultProvider>
          </SettingsProvider>
        </main>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

export const metadata: Metadata = {
  title: "タイピン | 変換ありタイピングゲーム",
  description: "変換ありの日本語タイピングゲームです。",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
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
      <body className={`${geistSans.className} bg-primary antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}

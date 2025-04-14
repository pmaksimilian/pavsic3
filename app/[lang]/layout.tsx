import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getDictionary } from "@/lib/dictionaries"

// Use Inter as our font
const inter = Inter({ subsets: ["latin"] })

// Define our supported languages
export const locales = ["sl", "en"]

// Generate static params for our supported languages
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang}>
      <body className={`${inter.className} terminal-bg`}>
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="terminal-title">PAVSIC.NET - Terminal</div>
            <LanguageSwitcher currentLang={params.lang} />
          </div>
          <div className="terminal-content">{children}</div>
        </div>
      </body>
    </html>
  )
}

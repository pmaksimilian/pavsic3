"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales } from "@/app/[lang]/layout"

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname()

  const switchLanguage = (locale: string) => {
    // Replace the current language segment in the path with the new locale
    const newPath = pathname.replace(`/${currentLang}`, `/${locale}`)
    return newPath
  }

  return (
    <div className="language-switcher">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={switchLanguage(locale)}
          className={`language-btn ${currentLang === locale ? "active" : ""}`}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}

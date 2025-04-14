"use client"

import { useEffect, useState } from "react"

export default function Hero({ dict }: { dict: any }) {
  const [titleTyped, setTitleTyped] = useState(false)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")

  useEffect(() => {
    let titleTimeout: NodeJS.Timeout
    let subtitleTimeout: NodeJS.Timeout

    // Type out the title
    const typeTitle = () => {
      const fullTitle = "PAVSIC.NET"
      let i = 0

      const typing = setInterval(() => {
        setTitle(fullTitle.substring(0, i + 1))
        i++

        if (i === fullTitle.length) {
          clearInterval(typing)
          setTitleTyped(true)
        }
      }, 150)

      return typing
    }

    // Type out the subtitle after title is done
    const typeSubtitle = () => {
      const fullSubtitle = dict.subtitle
      let i = 0

      const typing = setInterval(() => {
        setSubtitle(fullSubtitle.substring(0, i + 1))
        i++

        if (i === fullSubtitle.length) {
          clearInterval(typing)
        }
      }, 100)

      return typing
    }

    const titleInterval = typeTitle()

    // Start subtitle typing after title is done
    titleTimeout = setTimeout(
      () => {
        const subtitleInterval = typeSubtitle()
        subtitleTimeout = setTimeout(() => clearInterval(subtitleInterval), dict.subtitle.length * 100 + 100)
      },
      "PAVSIC.NET".length * 150 + 500,
    )

    return () => {
      clearInterval(titleInterval)
      clearTimeout(titleTimeout)
      clearTimeout(subtitleTimeout)
    }
  }, [dict.subtitle])

  return (
    <section className="section hero">
      <div className="hero-content">
        <h1 className="text-4xl md:text-6xl mb-4 font-bold">
          {title}
          <span className={titleTyped ? "hidden" : "inline"}>|</span>
        </h1>
        <h2 className="text-xl md:text-2xl">
          {subtitle}
          <span className={titleTyped ? "inline" : "hidden"}>|</span>
        </h2>
      </div>
    </section>
  )
}

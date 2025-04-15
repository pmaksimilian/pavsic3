'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AsciiArt from '../components/about_image'

export default function Home () {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [titleDone, setTitleDone] = useState(false)
  const [subtitleDone, setSubtitleDone] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [language, setLanguage] = useState('sl') // Default to Slovenian

  // Add refs for sections to enable automatic scrolling
  const terminalWindowRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)
  const projectsSectionRef = useRef<HTMLElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)

  // Typewriter effect for title
  useEffect(() => {
    const fullTitle = 'PAVSIC.NET'
    let i = 0
    const interval = setInterval(() => {
      setTitle(fullTitle.substring(0, i + 1))
      i++
      if (i === fullTitle.length) {
        clearInterval(interval)
        setTitleDone(true)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [])

  // Typewriter effect for subtitle after title is done
  useEffect(() => {
    if (!titleDone) return

    const fullSubtitle =
      language === 'sl' ? 'SPLETNI RAZVOJ' : 'WEB DEVELOPMENT'
    let i = 0
    const interval = setInterval(() => {
      setSubtitle(fullSubtitle.substring(0, i + 1))
      i++
      if (i === fullSubtitle.length) {
        clearInterval(interval)
        setSubtitleDone(true)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [titleDone, language])

  // Show command prompt after both animations are done
  useEffect(() => {
    if (titleDone && subtitleDone) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 500)
    }
  }, [titleDone, subtitleDone])

  // Implement automatic scrolling between sections
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling
      e.preventDefault()

      if (!terminalWindowRef.current) return

      // Get all section refs
      const sections = [
        heroSectionRef.current,
        projectsSectionRef.current,
        aboutSectionRef.current,
        contactSectionRef.current
      ]

      // Filter out any null refs
      const validSections = sections.filter(Boolean) as HTMLElement[]

      // Find the currently visible section
      const currentSectionIndex = validSections.findIndex(section => {
        const rect = section.getBoundingClientRect()
        // Consider a section "visible" if its top is near the viewport top
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSectionIndex === -1) return

      // Determine scroll direction
      if (e.deltaY > 0 && currentSectionIndex < validSections.length - 1) {
        // Scroll down to next section
        validSections[currentSectionIndex + 1].scrollIntoView({
          behavior: 'smooth'
        })
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up to previous section
        validSections[currentSectionIndex - 1].scrollIntoView({
          behavior: 'smooth'
        })
      }
    }

    // Add wheel event listener to terminal window
    const terminalWindow = terminalWindowRef.current
    if (terminalWindow) {
      terminalWindow.addEventListener('wheel', handleWheel, { passive: false })
    }

    // Clean up event listener on unmount
    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  // Toggle language
  const toggleLanguage = () => {
    const newLang = language === 'sl' ? 'en' : 'sl'
    setLanguage(newLang)
    setSubtitle('')
    setSubtitleDone(false)
  }

  return (
    <div className='terminal-screen'>
      <div className='terminal-header'>
        <div className='terminal-title'>PAVSIC.NET - Terminal</div>
        <div className='terminal-controls'>
          <button onClick={toggleLanguage} className='language-btn'>
            {language === 'sl' ? 'EN' : 'SL'}
          </button>
        </div>
      </div>

      <div className='terminal-window' ref={terminalWindowRef}>
        <section className='hero-section' ref={heroSectionRef}>
          <div className='section-content'>
            <div className='terminal-line'>
              C:\Users\Guest&gt; start pavsic.net
            </div>
            <div className='terminal-line'>Loading...</div>
            <div className='terminal-line'>
              Welcome to PAVSIC.NET Terminal v1.0.0
            </div>
            <div className='terminal-line'>
              Copyright (c) 2025 PAVSIC.NET. All rights reserved.
            </div>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-line'></div>

            <div className='terminal-output'>
              <h1 className='terminal-title-text'>
                {title}
                <span className={titleDone ? 'hidden' : 'cursor'}></span>
              </h1>
              <h2 className='terminal-subtitle-text'>
                {subtitle}
                <span
                  className={!titleDone || subtitleDone ? 'hidden' : 'cursor'}
                ></span>
              </h2>

              {showPrompt && (
                <div className='command-prompt'>
                  <div className='terminal-line'>
                    C:\Users\Guest&gt; explore
                  </div>
                  <div className='terminal-line'>
                    Available commands:
                    <ul className='command-list'>
                      <li>
                        <a href='#projects' className='command-link'>
                          projects
                        </a>{' '}
                        - View my projects
                      </li>
                      <li>
                        <a href='#about' className='command-link'>
                          about
                        </a>{' '}
                        - About me
                      </li>
                      <li>
                        <a href='#contact' className='command-link'>
                          contact
                        </a>{' '}
                        - Contact information
                      </li>
                    </ul>
                  </div>
                  <div className='terminal-line'>
                    C:\Users\Guest&gt; <span className='cursor'></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          id='projects'
          className='content-section'
          ref={projectsSectionRef}
        >
          <div className='section-content'>
            <div className='section-header'>
              <div className='terminal-line'>
                C:\Users\Guest&gt; cd projects
              </div>
              <div className='terminal-line'>
                C:\Users\Guest\projects&gt; dir
              </div>
            </div>
            <h2 className='section-title'>
              {language === 'sl' ? 'Projekti' : 'Projects'}
            </h2>
            <div className='terminal-line'>
              Directory of C:\Users\Guest\projects
            </div>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-line'>
              PROJECT_1.exe &lt;DIR&gt; 10,240 bytes 04/14/2025 10:30 AM
            </div>
            <div className='terminal-line'>
              PROJECT_2.exe &lt;DIR&gt; 15,360 bytes 03/22/2025 02:15 PM
            </div>
            <div className='terminal-line'>
              PROJECT_3.exe &lt;DIR&gt; 8,192 bytes 02/10/2025 09:45 AM
            </div>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-line'>3 File(s) 33,792 bytes</div>
            <div className='terminal-line'>
              C:\Users\Guest\projects&gt; <span className='cursor'></span>
            </div>
          </div>
        </section>

        <section id='about' className='content-section' ref={aboutSectionRef}>
          <div className='section-content'>
            <div className='section-header'>
              <div className='terminal-line'>C:\Users\Guest&gt; cd about</div>
              <div className='terminal-line'>
                C:\Users\Guest\about&gt; type README.txt
              </div>
            </div>
            <h2 className='section-title'>
              {language === 'sl' ? 'O Meni' : 'About Me'}
            </h2>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-text'>
              {language === 'sl'
                ? 'Sem spletni razvijalec s strastjo do ustvarjanja čistih, učinkovitih in uporabniku prijaznih spletnih strani. Z večletnimi izkušnjami v industriji se specializiram za gradnjo sodobnih spletnih aplikacij z uporabo najnovejših tehnologij in najboljših praks.'
                : 'I am a web developer with a passion for creating clean, efficient, and user-friendly websites. With years of experience in the industry, I specialize in building modern web applications using the latest technologies and best practices.'}
              <AsciiArt />
            </div>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-line'>
              C:\Users\Guest\about&gt; <span className='cursor'></span>
            </div>
          </div>
        </section>

        <section
          id='contact'
          className='content-section'
          ref={contactSectionRef}
        >
          <div className='section-content'>
            <div className='section-header'>
              <div className='terminal-line'>C:\Users\Guest&gt; cd contact</div>
              <div className='terminal-line'>
                C:\Users\Guest\contact&gt; type CONTACT.txt
              </div>
            </div>
            <h2 className='section-title'>
              {language === 'sl' ? 'Kontakt' : 'Contact'}
            </h2>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-text'>
              {language === 'sl'
                ? 'Vas zanima sodelovanje? Pošljite mi e-pošto!'
                : 'Interested in working together? Send me an email!'}
            </div>
            <div className='terminal-line'>
              EMAIL:{' '}
              <a href='mailto:info@pavsic.net' className='command-link'>
                info@pavsic.net
              </a>
            </div>
            <div className='terminal-line'>
              --------------------------------------------------
            </div>
            <div className='terminal-line'>
              C:\Users\Guest\contact&gt; <span className='cursor'></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

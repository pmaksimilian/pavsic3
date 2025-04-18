"use client"

import { useEffect, type RefObject } from "react"

interface Section {
  ref: HTMLElement
  id: string
}

/**
 * Custom hook to handle section navigation with mouse wheel
 * @param terminalRef Reference to the terminal window element
 * @param sectionRefs Array of section references with their IDs
 * @param onSectionChange Callback when section changes
 */
export function useSectionNavigation(
  terminalRef: RefObject<HTMLDivElement>,
  sectionRefs: { ref: RefObject<HTMLElement>; id: string }[],
  onSectionChange?: (sectionId: string) => void,
) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scrolling
      e.preventDefault()

      if (!terminalRef.current) return

      // Get all section refs with their IDs
      const sections = sectionRefs.map((section) => ({
        ref: section.ref.current,
        id: section.id,
      }))

      // Filter out any null refs
      const validSections = sections.filter(
        (section): section is { ref: HTMLElement; id: string } => section.ref !== null,
      )

      // Find the currently visible section
      const currentSectionIndex = validSections.findIndex((section) => {
        const rect = section.ref.getBoundingClientRect()
        // Consider a section "visible" if its top is near the viewport top
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSectionIndex === -1) return

      // Determine scroll direction
      if (e.deltaY > 0 && currentSectionIndex < validSections.length - 1) {
        // Scroll down to next section
        validSections[currentSectionIndex + 1].ref.scrollIntoView({
          behavior: "smooth",
        })
        if (onSectionChange) {
          onSectionChange(validSections[currentSectionIndex + 1].id)
        }
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        // Scroll up to previous section
        validSections[currentSectionIndex - 1].ref.scrollIntoView({
          behavior: "smooth",
        })
        if (onSectionChange) {
          onSectionChange(validSections[currentSectionIndex - 1].id)
        }
      }
    }

    // Add wheel event listener to terminal window
    const terminalWindow = terminalRef.current
    if (terminalWindow) {
      terminalWindow.addEventListener("wheel", handleWheel, { passive: false })
    }

    // Clean up event listener on unmount
    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener("wheel", handleWheel)
      }
    }
  }, [terminalRef, sectionRefs, onSectionChange])
}

"use client"

import { useState, useEffect, type RefObject } from "react"

interface Section {
  ref: HTMLElement | null
  id: string
}

/**
 * Custom hook to manage command path based on visible section
 * @param terminalRef Reference to the terminal window element
 * @param sectionRefs Array of section references with their IDs
 * @returns Current command path and update function
 */
export function useCommandPath(
  terminalRef: RefObject<HTMLDivElement>,
  sectionRefs: { ref: RefObject<HTMLElement>; id: string }[],
) {
  const [commandPath, setCommandPath] = useState("C:\\User\\Guest")

  // Function to update command path based on section ID
  const updateCommandPath = (section: string) => {
    if (section === "home") {
      setCommandPath("C:\\User\\Guest")
    } else {
      setCommandPath(`C:\\User\\Guest\\${section}`)
    }
  }

  // Find the currently visible section
  const findVisibleSection = (): string | null => {
    if (!terminalRef.current) return null

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

    if (currentSectionIndex !== -1) {
      return validSections[currentSectionIndex].id
    }

    return null
  }

  // Set up scroll event listener to update command path
  useEffect(() => {
    const handleScroll = () => {
      const visibleSection = findVisibleSection()
      if (visibleSection) {
        updateCommandPath(visibleSection)
      }
    }

    // Add scroll event listener to terminal window
    const terminalWindow = terminalRef.current
    if (terminalWindow) {
      terminalWindow.addEventListener("scroll", handleScroll)
      // Initial check for the current section
      handleScroll()
    }

    // Clean up event listener on unmount
    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener("scroll", handleScroll)
      }
    }
  }, [terminalRef, sectionRefs])

  return { commandPath, updateCommandPath }
}

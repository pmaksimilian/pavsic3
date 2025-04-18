"use client";

import { useEffect, useState, type RefObject } from "react";

interface Section {
  ref: HTMLElement;
  id: string;
}

/**
 * Custom hook to handle section navigation with mouse wheel and manual scroll
 * @param terminalRef Reference to the terminal window element
 * @param sectionRefs Array of section references with their IDs
 * @param onSectionChange Callback when section changes
 */
export function useSectionNavigation(
  terminalRef: RefObject<HTMLDivElement>,
  sectionRefs: { ref: RefObject<HTMLElement>; id: string }[],
  onSectionChange?: (sectionId: string) => void
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionRefs.map((section) => ({
      ref: section.ref.current,
      id: section.id,
    })).filter(
      (section): section is { ref: HTMLElement; id: string } => section.ref !== null
    );

    const updateActiveSection = () => {
      const visible = sections.find((section) => {
        const rect = section.ref.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (visible && visible.id !== activeSection) {
        setActiveSection(visible.id);
        onSectionChange?.(visible.id);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const currentSectionIndex = sections.findIndex((section) => {
        const rect = section.ref.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSectionIndex === -1) return;

      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        const next = sections[currentSectionIndex + 1];
        next.ref.scrollIntoView({ behavior: "smooth" });
        setActiveSection(next.id);
        onSectionChange?.(next.id);
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        const prev = sections[currentSectionIndex - 1];
        prev.ref.scrollIntoView({ behavior: "smooth" });
        setActiveSection(prev.id);
        onSectionChange?.(prev.id);
      }
    };

    const container = terminalRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("scroll", updateActiveSection, { passive: true });
    }

    // Trigger initial update
    updateActiveSection();

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("scroll", updateActiveSection);
      }
    };
  }, [terminalRef, sectionRefs, onSectionChange, activeSection]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.find((s) => s.id === id)?.ref.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      onSectionChange?.(id);
    }
  };

  return {
    scrollToSection,
    currentSection: activeSection,
  };
}

"use client";

import { useEffect, useState, type RefObject } from "react";

export function useSectionNavigation(
  terminalRef: RefObject<HTMLDivElement>,
  sectionRefs: { ref: RefObject<HTMLElement>; id: string }[],
  onSectionChange?: (sectionId: string) => void
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!terminalRef.current) return;

      const sections = sectionRefs.map((section) => ({
        ref: section.ref.current,
        id: section.id,
      }));

      const validSections = sections.filter(
        (section): section is { ref: HTMLElement; id: string } =>
          section.ref !== null
      );

      const currentSectionIndex = validSections.findIndex((section) => {
        const rect = section.ref.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSectionIndex === -1) return;

      if (e.deltaY > 0 && currentSectionIndex < validSections.length - 1) {
        const next = validSections[currentSectionIndex + 1];
        next.ref.scrollIntoView({ behavior: "smooth" });
        setActiveSection(next.id);
        onSectionChange?.(next.id);
      } else if (e.deltaY < 0 && currentSectionIndex > 0) {
        const prev = validSections[currentSectionIndex - 1];
        prev.ref.scrollIntoView({ behavior: "smooth" });
        setActiveSection(prev.id);
        onSectionChange?.(prev.id);
      }
    };

    const terminalWindow = terminalRef.current;
    if (terminalWindow) {
      terminalWindow.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (terminalWindow) {
        terminalWindow.removeEventListener("wheel", handleWheel);
      }
    };
  }, [terminalRef, sectionRefs, onSectionChange]);

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

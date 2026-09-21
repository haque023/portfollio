import { useEffect, useState } from 'react'
import { sections } from '../data/navigation'

/**
 * Returns the id of the navbar item that matches the section currently in view.
 * Uses a single throttled scroll listener rather than one observer per section.
 */
export function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = sections[0]?.id ?? 'home'

      for (const section of sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= line) current = section.id
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = sections[sections.length - 1]?.id ?? current

      const match = sections.find((s) => s.id === current)
      setActive(match?.navGroup ?? current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled])

  return enabled ? active : null
}

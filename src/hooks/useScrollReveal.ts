import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Pre-render-safe scroll reveal. Content is visible by default, so the static HTML and the first
 * client render are identical and nothing is hidden without JavaScript. After mount, elements
 * that start below the fold are hidden until they scroll into view. Reduced motion never hides.
 */
export function useScrollReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHidden(false)
          observer.disconnect()
        } else {
          setHidden(true)
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduce])

  return { ref, hidden }
}

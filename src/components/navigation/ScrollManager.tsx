import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Handles scroll position on navigation: scrolls to `#hash` targets, otherwise to the top.
 * In-page moves use CSS smooth scrolling (disabled under reduced motion); route changes are instant.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const routeChanged = previousPath.current !== pathname
    previousPath.current = pathname
    const behavior: ScrollBehavior = routeChanged ? 'instant' : 'auto'

    if (!hash) {
      window.scrollTo({ top: 0, behavior })
      return
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView({ behavior, block: 'start' })
  }, [pathname, hash, key])

  return null
}

import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Fades and lifts content in when it scrolls into view. Rendered fully visible in the
 * pre-rendered HTML and for reduced-motion users (see useScrollReveal).
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, hidden } = useScrollReveal<HTMLDivElement>()

  return (
    <m.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

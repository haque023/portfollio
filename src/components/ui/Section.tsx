import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from '../animations/Reveal'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
  )
}

interface SectionProps {
  id: string
  index?: string
  eyebrow: string
  title: string
  description?: ReactNode
  children: ReactNode
  className?: string
}

/** Consistent section shell: anchor id, numbered eyebrow, h2 heading and optional intro. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('py-20 sm:py-28', className)}>
      <Container>
        <Reveal className="mb-10 max-w-3xl sm:mb-14">
          {/* One h2 holding the plain section label and the descriptive title, so the heading
              carries the keyword ("Experience") while the visual design stays the same. */}
          <h2 id={headingId}>
            <span className="mb-3 block font-mono text-xs tracking-[0.18em] text-accent uppercase">
              {index && <span className="text-fg-subtle">{index} / </span>}
              {eyebrow}
            </span>{' '}
            <span className="block text-3xl font-semibold sm:text-4xl">{title}</span>
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}

import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { ProjectStatus } from '../../types'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line-strong/70 bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-fg-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

const statusStyles: Record<ProjectStatus, string> = {
  Production: 'border-signal/40 bg-signal/10 text-signal',
  MVP: 'border-accent/40 bg-accent/10 text-accent',
  Prototype: 'border-amber/40 bg-amber/10 text-amber',
  Research: 'border-fg-subtle/50 bg-white/5 text-fg-muted',
  Concept: 'border-fg-subtle/50 bg-white/5 text-fg-muted',
  Reference: 'border-accent/40 bg-accent/10 text-accent',
}

/** Communicates how mature a project honestly is. */
export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide uppercase',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}

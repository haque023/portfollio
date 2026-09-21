import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

/** Vertical connector with a slow travelling pulse. The pulse is disabled by prefers-reduced-motion. */
export function FlowConnector({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex flex-col items-center', className)}>
      <div className="relative h-6 w-px overflow-hidden bg-line-strong">
        <span className="absolute inset-x-0 top-0 h-2 animate-flow bg-gradient-to-b from-transparent via-accent to-transparent" />
      </div>
      <ChevronDown className="-mt-1 size-3.5 text-fg-subtle" />
    </div>
  )
}

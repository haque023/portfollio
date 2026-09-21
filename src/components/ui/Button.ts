import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-colors duration-200 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-white',
  secondary:
    'border border-line-strong bg-surface-2/60 text-fg hover:border-accent/60 hover:bg-surface-2',
  ghost: 'text-fg-muted hover:bg-white/5 hover:text-fg',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3.5 text-sm',
}

/** Class names for anything that should look like a button (a, Link or button). */
export function buttonStyles(variant: Variant = 'primary', size: Size = 'md', extra?: string) {
  return cn(base, variants[variant], sizes[size], extra)
}

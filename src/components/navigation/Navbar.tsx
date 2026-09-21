import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { Container } from '../ui/Section'

const MENU_ID = 'mobile-menu'

const hrefFor = (id: string) => ({ pathname: '/', hash: id === 'home' ? '' : `#${id}` })

export function Navbar() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(24)
  const active = useActiveSection(pathname === '/')
  // The menu is "open at" a pathname, so navigating to another route closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const setOpen = (value: boolean) => setOpenAt(value ? pathname : null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = (returnFocus = false) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  // Escape closes; a pointer press outside closes; focus moves into the menu when it opens.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenAt(null)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpenAt(null)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[padding] duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <Container>
        <nav
          aria-label="Primary"
          className={cn(
            'relative flex items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4',
            scrolled
              ? 'h-12 border-line-strong/70 bg-ink/80 shadow-lg shadow-black/30 backdrop-blur-md'
              : 'h-14 border-transparent',
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg"
            aria-label={`${profile.name} - home`}
          >
            <span className="flex size-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent">
              MH
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              {profile.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={hrefFor(item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'group relative block rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            ref={buttonRef}
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-fg-muted hover:bg-white/5 hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>

          <AnimatePresence>
            {open && (
              <m.div
                ref={panelRef}
                id={MENU_ID}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line-strong bg-surface/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-md lg:hidden"
              >
                <ul>
                  {navItems.map((item) => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <Link
                          to={hrefFor(item.id)}
                          onClick={() => close()}
                          aria-current={isActive ? 'location' : undefined}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors hover:bg-white/5',
                            isActive ? 'text-accent' : 'text-fg',
                          )}
                        >
                          {item.label}
                          {isActive && (
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </m.div>
            )}
          </AnimatePresence>
        </nav>
      </Container>
    </header>
  )
}

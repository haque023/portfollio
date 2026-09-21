/**
 * Subtle technical backdrop: a masked grid, two slow-drifting glows and a faint scan line.
 * Pure CSS (transform/opacity only) so it costs no JavaScript and stays off the main thread.
 * All motion is disabled by the global prefers-reduced-motion rule.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0" />
      <div className="absolute -top-32 -left-24 size-[28rem] animate-drift rounded-full bg-accent/15 blur-[110px] will-change-transform" />
      <div
        className="absolute top-1/3 -right-24 size-[24rem] animate-drift rounded-full bg-signal/10 blur-[110px] will-change-transform"
        style={{ animationDirection: 'alternate-reverse' }}
      />
      <div className="absolute inset-y-0 left-0 w-full overflow-hidden">
        <div className="absolute inset-x-0 h-px animate-scan bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}

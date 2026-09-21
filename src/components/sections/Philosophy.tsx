import { principles } from '../../data/philosophy'
import { Reveal } from '../animations/Reveal'
import { Section } from '../ui/Section'

export function Philosophy() {
  return (
    <Section
      id="philosophy"
      index="07"
      eyebrow="Engineering philosophy"
      title="Principles I build by"
      className="pt-0 sm:pt-0"
    >
      <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle, i) => (
          <li key={principle.title}>
            <Reveal delay={(i % 4) * 0.05}>
              <div className="h-full border-l border-line-strong pl-5 transition-colors hover:border-accent/60">
                <p className="font-mono text-[11px] text-fg-subtle">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 font-semibold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}

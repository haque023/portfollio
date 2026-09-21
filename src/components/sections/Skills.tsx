import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getTier, skillGroups, tierLegend } from '../../data/skills'
import { cn } from '../../lib/cn'
import type { ProficiencyTier, SkillGroup } from '../../types'
import { Reveal } from '../animations/Reveal'
import { Section } from '../ui/Section'

const barStyles: Record<ProficiencyTier, string> = {
  professional: 'bg-accent',
  strong: 'bg-accent/65',
  project: 'bg-accent/40',
  exploratory:
    'bg-[repeating-linear-gradient(90deg,var(--color-accent)_0_3px,transparent_3px_6px)] opacity-50',
}

function TierSwatch({ tier }: { tier: ProficiencyTier }) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block h-1.5 w-6 rounded-full', barStyles[tier])}
    />
  )
}

function SkillCard({ group }: { group: SkillGroup }) {
  const { ref, hidden } = useScrollReveal<HTMLElement>()

  return (
    <article ref={ref} className="card h-full p-5 sm:p-6">
      <h3 className="text-lg font-semibold">{group.title}</h3>
      <p className="mt-1 text-sm text-fg-muted">{group.description}</p>
      <ul className="mt-5 space-y-3">
        {group.skills.map((skill, i) => {
          const tier = getTier(skill.score)
          return (
            <li key={skill.name}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span
                  className={cn(
                    tier === 'exploratory' || tier === 'project' ? 'text-fg-muted' : 'text-fg',
                  )}
                >
                  {skill.name}
                </span>
                <span className="shrink-0 font-mono text-xs text-fg-subtle">
                  {skill.score.toFixed(1)}
                  <span className="sr-only"> out of 10</span>
                </span>
              </div>
              <div aria-hidden="true" className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className={cn(
                    'h-full origin-left rounded-full transition-transform duration-700 ease-out',
                    barStyles[tier],
                  )}
                  style={{
                    width: `${skill.score * 10}%`,
                    transform: hidden ? 'scaleX(0)' : 'scaleX(1)',
                    transitionDelay: `${Math.min(i, 10) * 40}ms`,
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Technical expertise"
      title="What I work with, and how deeply"
      description="Grouped by area. Ratings are my own honest self-assessment, and established production experience is deliberately separated from project, research and exploratory work."
    >
      <Reveal className="mb-8 rounded-2xl border border-line bg-surface/60 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-fg-muted">
          <strong className="font-medium text-fg">Self-assessed, not certified.</strong> Scores are
          on a 10-point scale and are not test results or externally validated measurements.
        </p>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {tierLegend.map((t) => (
            <li key={t.tier} className="flex items-start gap-3">
              <span className="mt-2">
                <TierSwatch tier={t.tier} />
              </span>
              <span className="text-sm">
                <span className="font-medium text-fg">{t.label}</span>{' '}
                <span className="font-mono text-xs text-fg-subtle">{t.range}</span>
                <span className="block text-xs text-fg-subtle">{t.hint}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <li key={group.id}>
            <SkillCard group={group} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

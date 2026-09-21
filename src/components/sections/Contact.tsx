import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { socialLinks } from '../../data/social'
import { Reveal } from '../animations/Reveal'
import { buttonStyles } from '../ui/Button'
import { SocialIcon } from '../ui/BrandIcons'
import { Section } from '../ui/Section'

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title="Let's talk"
      description="Reach out about AI engineering, .NET backend or enterprise AI integration work. Email is the quickest way to reach me."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="card bg-accent/[0.04] p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Start a conversation</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              A short note about the problem, the systems involved and the timeline is all I need to
              get started.
            </p>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}`}
              className={buttonStyles('primary', 'md', 'mt-6')}
            >
              <Mail className="size-4" aria-hidden="true" />
              Email me
            </a>
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {socialLinks.map((link, i) => {
            const external = link.kind === 'github' || link.kind === 'linkedin'
            return (
              <li key={link.kind}>
                <Reveal delay={i * 0.05}>
                  <a
                    href={link.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="card flex items-center gap-4 p-4 transition-colors hover:border-accent/50"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-accent">
                      <SocialIcon kind={link.kind} className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] tracking-wider text-fg-subtle uppercase">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm font-medium">{link.display}</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

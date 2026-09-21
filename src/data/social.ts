import { env } from '../lib/env'
import { profile } from './profile'
import type { SocialLink } from '../types'

/** GitHub and LinkedIn appear only when configured through environment variables. */
export const socialLinks: SocialLink[] = [
  ...(env.githubUsername
    ? [
        {
          kind: 'github' as const,
          label: 'GitHub',
          href: `https://github.com/${env.githubUsername}`,
          display: `github.com/${env.githubUsername}`,
        },
      ]
    : []),
  ...(env.linkedinUrl
    ? [
        {
          kind: 'linkedin' as const,
          label: 'LinkedIn',
          href: env.linkedinUrl,
          display: env.linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
        },
      ]
    : []),
  {
    kind: 'email',
    label: 'Email',
    href: `mailto:${profile.email}`,
    display: profile.email,
  },
  {
    kind: 'phone',
    label: 'Phone',
    href: `tel:${profile.phoneHref}`,
    display: profile.phone,
  },
]

export const githubLink = socialLinks.find((s) => s.kind === 'github')
export const linkedinLink = socialLinks.find((s) => s.kind === 'linkedin')

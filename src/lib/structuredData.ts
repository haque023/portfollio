import { experience, education } from '../data/experience.ts'
import { profile } from '../data/profile.ts'
import { site } from '../data/site.ts'

interface StructuredDataOptions {
  /** Absolute site URL ending in "/", when configured. */
  siteUrl?: string
  github?: string
  linkedin?: string
}

const knowsAbout = [
  'Large language models',
  'Retrieval-augmented generation',
  'Semantic search',
  'AI agents',
  'C#',
  '.NET',
  'ASP.NET Core',
  'Python',
  'FastAPI',
  'Microsoft Azure',
  'Docker',
  'Kubernetes',
  'Industrial IoT',
]

/**
 * Builds the JSON-LD graph (Person + WebSite). Only facts present in the portfolio data
 * are included; phone number and other personal details are intentionally left out.
 */
export function buildStructuredData({ siteUrl, github, linkedin }: StructuredDataOptions) {
  const current = experience.find((e) => e.end === null) ?? experience[0]
  const school = education[0]
  const personId = siteUrl ? `${siteUrl}#person` : undefined
  const sameAs = [github ? `https://github.com/${github}` : undefined, linkedin].filter(Boolean)

  const person = {
    '@type': 'Person',
    ...(personId && { '@id': personId }),
    name: profile.name,
    jobTitle: current?.role ?? profile.headline,
    description: site.description,
    ...(siteUrl && { url: siteUrl }),
    ...(current && { worksFor: { '@type': 'Organization', name: current.company } }),
    ...(school && { alumniOf: { '@type': 'CollegeOrUniversity', name: school.institution } }),
    knowsAbout,
    ...(sameAs.length > 0 && { sameAs }),
  }

  const website = {
    '@type': 'WebSite',
    ...(siteUrl && { '@id': `${siteUrl}#website`, url: siteUrl }),
    name: `${profile.name} - Portfolio`,
    description: site.description,
    inLanguage: 'en',
    ...(personId && { author: { '@id': personId }, publisher: { '@id': personId } }),
  }

  return { '@context': 'https://schema.org', '@graph': [person, website] }
}

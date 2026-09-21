export interface Profile {
  name: string
  /** Hero headline title, e.g. "Senior Software Engineer | AI Engineer". */
  headline: string
  roles: string[]
  tagline: string
  location?: string
  email: string
  /** Phone number exactly as it should be displayed. */
  phone: string
  /** E.164 number used for the `tel:` link. */
  phoneHref: string
  /** Path (relative to the site base) where the CV PDF is expected. */
  cvPath: string
  summary: string[]
  /** Short factual statements shown in the About section. */
  focusAreas: { title: string; description: string }[]
}

export interface Stat {
  value: string
  label: string
  /** Extra context shown under the label. */
  note?: string
}

export type SocialKind = 'github' | 'linkedin' | 'email' | 'phone'

export interface SocialLink {
  kind: SocialKind
  label: string
  href: string
  /** Text shown for the link (handle, address, number). */
  display: string
}

/**
 * Self-assessed proficiency on a 10-point scale. Derived from the profile's rating table;
 * NOT a certification or externally validated score.
 */
export interface Skill {
  name: string
  score: number
  /** Free-form context, e.g. "project / research use". */
  note?: string
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  skills: Skill[]
}

export type ProficiencyTier = 'professional' | 'strong' | 'project' | 'exploratory'

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  /** Free-form start, e.g. "March 2021". */
  start: string
  /** `null` marks the current position. */
  end: string | null
  location?: string
  summary: string
  highlights: string[]
  technologies: string[]
  /** Optional measurable facts. Only add figures that are verified. */
  metrics?: { value: string; label: string }[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  result?: string
  notes?: string[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date?: string
  credentialUrl?: string
  /** Short extra facts, e.g. instructors or course length. */
  details?: string[]
}

export interface LearningItem {
  id: string
  title: string
  description: string
  tags: string[]
}

export type ProjectStatus =
  'Production' | 'MVP' | 'Prototype' | 'Research' | 'Concept' | 'Reference'

export type ProjectCategory =
  'AI & RAG' | 'AI Agents' | 'Enterprise Systems' | 'Industrial AI' | 'Research'

/** A node in a project's architecture diagram. Nodes render top-to-bottom as lanes. */
export interface ArchitectureLayer {
  label: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  status: ProjectStatus
  /** One-sentence card description (also used for page meta). */
  summary: string
  overview: string
  problem: string
  solution: string
  architectureHighlights: string[]
  architecture: ArchitectureLayer[]
  technologies: string[]
  keyFeatures: string[]
  challenges: string[]
  /** Only verified outcomes. Leave empty when nothing has been measured. */
  results: string[]
  github?: string
  demo?: string
}

export interface GithubRepo {
  name: string
  description: string
  technologies: string[]
  url: string
  /** Only set when provided manually or fetched dynamically. */
  stars?: number
  forks?: number
}

export interface Principle {
  title: string
  description: string
}

export interface FlowNode {
  id: string
  label: string
  detail: string
  tech: string
}

export interface SupportPanel {
  id: string
  title: string
  items: { label: string; detail?: string }[]
}

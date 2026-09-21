export interface SectionConfig {
  id: string
  /** Label shown in the navbar. Sections without a label are grouped under `navGroup`. */
  label?: string
  /** Nav item that should be highlighted while this section is in view. */
  navGroup?: string
}

/** Page sections in scroll order. The navbar shows every entry that has a `label`. */
export const sections: SectionConfig[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'learning', navGroup: 'experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', navGroup: 'projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'philosophy', navGroup: 'architecture' },
  { id: 'contact', label: 'Contact' },
]

export const navItems = sections.filter(
  (s): s is SectionConfig & { label: string } => s.label !== undefined,
)

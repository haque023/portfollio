const PLACEHOLDER = /yourdomain\.com|yourusername|yourprofile/i

/** Returns the trimmed value, or undefined when it is empty or still a documented placeholder. */
function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed && !PLACEHOLDER.test(trimmed) ? trimmed : undefined
}

export const env = {
  siteUrl: clean(import.meta.env.VITE_SITE_URL)?.replace(/\/+$/, ''),
  githubUsername: clean(import.meta.env.VITE_GITHUB_USERNAME),
  linkedinUrl: clean(import.meta.env.VITE_LINKEDIN_URL),
  /** Always ends with "/". */
  base: import.meta.env.BASE_URL,
}

/** Resolves a public-folder path (e.g. "cv/file.pdf") against the configured base path. */
export const publicUrl = (path: string) => `${env.base}${path.replace(/^\/+/, '')}`

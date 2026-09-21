import type { GithubRepo } from '../types'

/**
 * Selected repositories, configured manually so the site never depends on the GitHub API.
 * The username comes from `VITE_GITHUB_USERNAME`.
 *
 * Add information here once repositories are public, for example:
 * {
 *   name: 'agentmesh',
 *   description: 'Reference architecture for an enterprise AI platform.',
 *   technologies: ['Python', 'FastAPI'],
 *   url: 'https://github.com/<username>/agentmesh',
 *   stars: 0, // optional: only include real numbers
 * }
 */
export const repositories: GithubRepo[] = []

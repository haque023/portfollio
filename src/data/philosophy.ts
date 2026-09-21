import type { Principle } from '../types'

export const principles: Principle[] = [
  {
    title: 'Production first',
    description: 'A feature is done when it runs reliably for real users, not when the demo works.',
  },
  {
    title: 'Clean architecture',
    description:
      'Clear boundaries and replaceable adapters keep systems testable and easy to evolve.',
  },
  {
    title: 'API-first design',
    description:
      'Well-defined contracts let frontends, agents and other services integrate cleanly.',
  },
  {
    title: 'Observable systems',
    description: 'Logging, monitoring and tracing are designed in, so behaviour can be explained.',
  },
  {
    title: 'Performance optimization',
    description: 'Measure first, then fix the real bottleneck. Latency is a product feature.',
  },
  {
    title: 'Security-conscious design',
    description: 'Authentication, least privilege and controlled automation from the first sketch.',
  },
  {
    title: 'Scalable AI architecture',
    description: 'Swappable models and stores, asynchronous work and stateless services.',
  },
  {
    title: 'Practical AI over complexity',
    description: 'Use the simplest approach that solves the problem, and evaluate it honestly.',
  },
]

import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { buttonStyles } from '../components/ui/Button'
import { Container } from '../components/ui/Section'

export function NotFoundPage({ what = 'page' }: { what?: string }) {
  useDocumentMeta('Page not found | MD Emdadul Haque')

  return (
    <Container className="flex min-h-[70svh] flex-col items-start justify-center pt-32 pb-20">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">That {what} does not exist</h1>
      <p className="mt-4 max-w-md text-fg-muted">
        The link may be outdated or mistyped. Head back to the portfolio and pick up from there.
      </p>
      <Link to="/" className={buttonStyles('primary', 'md', 'mt-8')}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>
    </Container>
  )
}

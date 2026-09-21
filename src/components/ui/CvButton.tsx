import { Download, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { cvUrl, useCvAvailable } from '../../hooks/useCvAvailable'
import { buttonStyles } from './Button'

interface CvButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

/**
 * "Download CV" link. If the PDF has not been added to /public/cv yet, it degrades to a
 * mailto request instead of linking to a 404.
 */
export function CvButton({ variant = 'secondary', className }: CvButtonProps) {
  const status = useCvAvailable()

  if (status === 'missing') {
    return (
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent('CV request')}`}
        className={buttonStyles(variant, 'md', className)}
      >
        <Mail className="size-4" aria-hidden="true" />
        Request CV
      </a>
    )
  }

  return (
    <a
      href={cvUrl}
      download="MD-Emdadul-Haque-CV.pdf"
      className={buttonStyles(variant, 'md', className)}
    >
      <Download className="size-4" aria-hidden="true" />
      Download CV
    </a>
  )
}

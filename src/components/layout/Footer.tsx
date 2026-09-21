import { Link } from 'react-router-dom'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { socialLinks } from '../../data/social'
import { SocialIcon } from '../ui/BrandIcons'
import { Container } from '../ui/Section'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-fg-muted">{profile.headline}</p>
          <p className="mt-4 text-sm text-fg-subtle">
            &copy; {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind
            CSS and Framer Motion.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={{ pathname: '/', hash: item.id === 'home' ? '' : `#${item.id}` }}
              className="text-fg-muted hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ul className="flex gap-2">
          {socialLinks.map((link) => (
            <li key={link.kind}>
              <a
                href={link.href}
                aria-label={link.label}
                {...(link.kind === 'github' || link.kind === 'linkedin'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex size-10 items-center justify-center rounded-xl border border-line-strong text-fg-muted transition-colors hover:border-accent/60 hover:text-fg"
              >
                <SocialIcon kind={link.kind} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}

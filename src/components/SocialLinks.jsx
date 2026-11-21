import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { socialLinks } from '../data/portfolio'
import { safeHttpUrl } from '../utils/url'

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
}

/**
 * Renders only the channels that have a configured URL.
 * Renders nothing at all when nothing is configured, so empty buttons can
 * never appear.
 */
export default function SocialLinks({ size = 18, className = '', itemClassName = '' }) {
  if (socialLinks.length === 0) return null

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Social profiles">
      {socialLinks.map((link) => {
        const Icon = ICONS[link.id] ?? Mail
        const isExternal = link.id !== 'email'
        const href = isExternal ? safeHttpUrl(link.href) : link.href
        if (!href) return null
        return (
          <li key={link.id}>
            <a
              href={href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={link.label}
              title={link.label}
              className={`grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors hover:border-neon/40 hover:bg-neon/[0.06] hover:text-neon ${itemClassName}`}
            >
              <Icon size={size} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

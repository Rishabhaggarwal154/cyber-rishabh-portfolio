import { ArrowUp, Mail } from 'lucide-react'
import { BrandMark, GithubIcon, LinkedinIcon } from './icons'
import { portfolio } from '../data/portfolio'
import { safeHttpUrl } from '../utils/url'

const YEAR = new Date().getFullYear()

const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    href: safeHttpUrl(portfolio.contact.github),
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
    href: safeHttpUrl(portfolio.contact.linkedin),
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    href: portfolio.contact.email ? `mailto:${portfolio.contact.email}` : '',
  },
].filter((item) => item.href)

export default function Footer() {
  const year = YEAR

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-page py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9" />
              <span className="font-mono text-sm font-bold tracking-tight text-bright">
                CYBER <span className="text-neon">//</span> RISHABH
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {portfolio.identity.title}
            </p>
            <p className="mt-2 max-w-sm font-mono text-[10.5px] leading-relaxed text-[#5d6e64]">
              {portfolio.identity.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-neon" aria-hidden="true" />
                Building in public
              </span>
              <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#5d6e64]">
                Portfolio v1.0
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon">// navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {portfolio.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      goTo(item.id)
                    }}
                    className="text-[12px] text-muted transition-colors hover:text-neon"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-neon">// connect</h2>
            {SOCIALS.length > 0 ? (
              <ul className="mt-4 space-y-2.5">
                {SOCIALS.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        {...(social.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="inline-flex items-center gap-2 text-[12px] text-muted transition-colors hover:text-neon"
                      >
                        <Icon size={14} />
                        {social.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mt-4 text-[11px] leading-relaxed text-[#5d6e64]">
                Social profiles and a public email have not been configured yet. Empty links are
                hidden rather than faked.
              </p>
            )}

            <button
              type="button"
              onClick={backToTop}
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-neon/35 hover:text-neon"
            >
              <ArrowUp size={12} aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-[#5d6e64]">
            © {year} {portfolio.identity.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-[#5d6e64]">
            Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Info, Lock, Mail, ShieldAlert } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { GithubIcon, LinkedinIcon } from '../components/icons'
import { portfolio } from '../data/portfolio'
import { safeHttpUrl } from '../utils/url'

const CHANNELS = [
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    value: portfolio.contact.email,
    href: portfolio.contact.email ? `mailto:${portfolio.contact.email}` : '',
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: GithubIcon,
    value: portfolio.contact.github,
    href: safeHttpUrl(portfolio.contact.github),
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedinIcon,
    value: portfolio.contact.linkedin,
    href: safeHttpUrl(portfolio.contact.linkedin),
    external: true,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative border-t border-line/60 bg-panel/50 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-neon/[0.035] blur-[100px]" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          id="contact-heading"
          index="07"
          label="contact"
          title="Start a conversation — with honest expectations."
          description="The form is fully validated, but it will not pretend to send anything until a real backend is connected and public contact channels are provided."
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <Reveal className="space-y-4">
            <div className="rounded-xl border border-line bg-card/50 p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                // direct_channels
              </p>

              <ul className="mt-4 space-y-2.5">
                {CHANNELS.map((channel) => {
                  const Icon = channel.icon
                  const available = Boolean(channel.href)

                  if (available) {
                    return (
                      <li key={channel.id}>
                        <a
                          href={channel.href}
                          {...(channel.external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="flex items-center gap-3 rounded-lg border border-line bg-ink/40 px-3.5 py-3 transition-colors hover:border-neon/35 hover:bg-neon/[0.04]"
                        >
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-neon/25 bg-neon/[0.06] text-neon">
                            <Icon size={15} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[11px] font-medium text-bright">
                              {channel.label}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-muted">
                              {channel.value}
                            </span>
                          </span>
                          <span aria-hidden="true" className="font-mono text-xs text-neon">
                            ↗
                          </span>
                        </a>
                      </li>
                    )
                  }

                  return (
                    <li
                      key={channel.id}
                      className="flex items-center gap-3 rounded-lg border border-dashed border-line/80 bg-ink/20 px-3.5 py-3"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-[#5d6e64]">
                        <Icon size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-medium text-muted">{channel.label}</span>
                        <span className="block font-mono text-[9.5px] text-[#5d6e64]">
                          not published yet
                        </span>
                      </span>
                      <Lock size={12} aria-hidden="true" className="text-[#4e5f56]" />
                    </li>
                  )
                })}
              </ul>

              <p className="mt-4 border-t border-line/70 pt-3 text-[10.5px] leading-relaxed text-muted">
                These channels are empty by design. They will become active links as soon as real
                URLs are added to the central configuration — no placeholder accounts are invented.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-card/30 p-5">
              <div className="flex items-start gap-2.5">
                <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-neon" />
                <div>
                  <p className="text-[11.5px] font-medium text-bright">Before you send</p>
                  <p className="mt-1 text-[10.5px] leading-relaxed text-muted">
                    Include a clear subject and enough context to reply. Avoid sharing passwords,
                    private keys, or confidential client details through any web form.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 px-1">
              <ShieldAlert size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[#5d6e64]" />
              <p className="font-mono text-[9.5px] leading-relaxed text-[#5d6e64]">
                // Security assessments are only discussed with explicit written authorization.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-line bg-card/60">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3 sm:px-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  // new_message
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#5d6e64]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${portfolio.contact.endpoint ? 'bg-neon' : 'bg-[#fbbf24]'}`}
                    aria-hidden="true"
                  />
                  {portfolio.contact.endpoint ? 'secure endpoint configured' : 'backend not connected'}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

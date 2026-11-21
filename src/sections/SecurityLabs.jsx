import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Crosshair,
  FileText,
  Globe,
  Info,
  Network,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

const CATEGORY_ICONS = {
  'Linux Practice': Terminal,
  'Networking Labs': Network,
  'Web Security Labs': Globe,
  'CTF Practice': Crosshair,
  'Authorized Vulnerability Assessment': ShieldCheck,
  'Security Writeups': FileText,
}

const STATUS_STYLES = {
  Learning: {
    pill: 'border-neon/30 bg-neon/[0.07] text-neon',
    dot: 'bg-neon',
  },
  Planned: {
    pill: 'border-line bg-white/[0.02] text-muted',
    dot: 'bg-[#5d6e64]',
  },
  Completed: {
    pill: 'border-emerald/40 bg-emerald/[0.1] text-[#7ee2a6]',
    dot: 'bg-emerald',
  },
}

function DetailBlock({ label, children }) {
  return (
    <div>
      <h4 className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5d6e64]">{label}</h4>
      <div className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{children}</div>
    </div>
  )
}

export default function SecurityLabs() {
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)
  const reduceMotion = useReducedMotion()

  const labs = portfolio.labs.entries
  const visibleLabs = filter === 'All' ? labs : labs.filter((lab) => lab.category === filter)

  const filters = ['All', ...portfolio.labs.categories]

  return (
    <section
      id="security-labs"
      aria-labelledby="labs-heading"
      className="relative border-t border-line/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="labs-heading"
          index="04"
          label="security labs"
          title="Practice with authorization, documented without exaggeration."
          description="A transparent record of learning labs, planned practice, and — only when true — completed work. No third-party targets and no sensitive findings are published."
        />

        <Reveal className="mb-6">
          <div className="flex items-start gap-3 rounded-lg border border-neon/20 bg-neon/[0.035] px-4 py-3">
            <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-neon" />
            <p className="text-[11.5px] leading-relaxed text-muted">
              <span className="font-medium text-bright">No lab is marked completed yet.</span>{' '}
              Entries below are labelled <span className="text-neon">Learning</span> or{' '}
              <span className="text-[#b7c4bc]">Planned</span>. Findings and lessons are recorded only
              when they genuinely exist.
            </p>
          </div>
        </Reveal>

        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter labs by category">
          {filters.map((category) => {
            const isActive = filter === category
            const count =
              category === 'All'
                ? labs.length
                : labs.filter((lab) => lab.category === category).length
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'border-neon/40 bg-neon/10 text-neon'
                    : 'border-line bg-white/[0.02] text-muted hover:border-neon/30 hover:text-bright'
                }`}
              >
                {category}
                <span
                  className={`font-mono text-[9px] ${isActive ? 'text-neon/70' : 'text-[#5d6e64]'}`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleLabs.map((lab, index) => {
              const Icon = CATEGORY_ICONS[lab.category] ?? ShieldCheck
              const status = STATUS_STYLES[lab.status] ?? STATUS_STYLES.Planned
              const isOpen = openId === lab.id
              const panelId = `lab-panel-${lab.id}`

              return (
                <motion.article
                  key={lab.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, delay: reduceMotion ? 0 : index * 0.03 }}
                  className={`overflow-hidden rounded-xl border bg-card/50 transition-colors ${
                    isOpen ? 'border-neon/30' : 'border-line hover:border-line/90'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink/50 text-neon">
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span
                        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${status.pill}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                        {lab.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold leading-snug text-bright">
                      {lab.name}
                    </h3>
                    <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[#5d6e64]">
                      {lab.category}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-muted">{lab.objective}</p>

                    <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label="Tools used">
                      {lab.tools.map((tool) => (
                        <li key={tool} className="chip">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : lab.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-3 border-t border-line/70 px-5 py-3 text-left text-[11px] text-muted transition-colors hover:bg-neon/[0.03] hover:text-neon sm:px-6"
                  >
                    <span className="font-mono uppercase tracking-[0.12em]">
                      {isOpen ? 'Hide methodology' : 'Methodology & notes'}
                    </span>
                    <span aria-hidden="true" className={`text-sm transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 border-t border-line/70 bg-ink/30 px-5 py-4 sm:px-6">
                          {lab.status === 'Planned' ? (
                            <p className="rounded border border-line bg-white/[0.02] px-3 py-2 font-mono text-[10px] leading-relaxed text-muted">
                              Planned — no activity has been performed for this entry.
                            </p>
                          ) : null}

                          <DetailBlock label="Methodology">
                            <ol className="space-y-1.5">
                              {lab.methodology.map((step, stepIndex) => (
                                <li key={step} className="flex gap-2">
                                  <span className="shrink-0 font-mono text-[9px] text-neon/70">
                                    {String(stepIndex + 1).padStart(2, '0')}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </DetailBlock>

                          <DetailBlock label="Findings">{lab.findings}</DetailBlock>

                          <DetailBlock label="Lessons learned">
                            <span className="text-[#b7c4bc]">{lab.lessons}</span>
                          </DetailBlock>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        {visibleLabs.length === 0 ? (
          <p className="rounded-lg border border-line bg-card/40 px-4 py-8 text-center text-sm text-muted">
            No labs in this category yet.
          </p>
        ) : null}

        <p className="mt-5 font-mono text-[10px] leading-relaxed text-[#5d6e64]">
          // All testing is limited to systems I own or have explicit written permission to assess.
          Sensitive targets, credentials, and unpublished findings are never listed here.
        </p>
      </div>
    </section>
  )
}

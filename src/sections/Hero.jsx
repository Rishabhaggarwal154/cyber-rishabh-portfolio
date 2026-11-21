import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, FolderCode, MapPin, ShieldCheck, TerminalSquare } from 'lucide-react'
import ProfileAvatar from '../components/ProfileAvatar'
import Terminal from '../components/Terminal'
import SocialLinks from '../components/SocialLinks'
import { portfolio } from '../data/portfolio'
import { useResumeStatus } from '../hooks/useResumeStatus'

const ROLES = portfolio.identity.roles

function useTypedRole() {
  const reduceMotion = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(reduceMotion ? ROLES[0].length : 0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined

    const current = ROLES[roleIndex]
    let delay = deleting ? 32 : 62

    if (!deleting && charIndex === current.length) delay = 2100
    if (deleting && charIndex === 0) delay = 380

    const timer = window.setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex((index) => index + 1)
      } else if (!deleting && charIndex === current.length) {
        setDeleting(true)
      } else if (deleting && charIndex > 0) {
        setCharIndex((index) => index - 1)
      } else {
        setDeleting(false)
        setRoleIndex((index) => (index + 1) % ROLES.length)
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [charIndex, deleting, reduceMotion, roleIndex])

  return {
    text: reduceMotion ? ROLES[0] : ROLES[roleIndex].slice(0, charIndex),
    reduceMotion,
  }
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const { text, reduceMotion } = useTypedRole()
  const resumeStatus = useResumeStatus()
  const resumeAvailable = resumeStatus === 'available'

  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-fade" />
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-emerald/[0.07] blur-[110px]" />
        <div className="absolute -right-32 top-24 h-[28rem] w-[28rem] rounded-full bg-neon/[0.05] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-page relative grid grid-cols-1 gap-12 pb-14 pt-28 sm:pt-32 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-36">
        {/* Intro */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-card/50 px-3 py-1.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-neon" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
              BCA student · cybersecurity track
            </span>
          </div>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.03em] text-bright sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient">Rishabh Aggarwal.</span>
          </h1>

          <p className="mt-5 flex min-h-[1.9rem] items-center gap-2 font-mono text-base text-muted sm:text-lg">
            <span aria-hidden="true" className="select-none text-neon">
              &gt;
            </span>
            <span className="text-bright" aria-label={`Role: ${portfolio.identity.primaryRole}`}>
              {text}
              {!reduceMotion ? (
                <span aria-hidden="true" className="ml-0.5 inline-block w-[2px] animate-blink bg-neon align-middle text-transparent">
                  |
                </span>
              ) : null}
            </span>
          </p>

          <p className="mt-2 text-sm font-medium text-muted sm:text-base">
            {portfolio.identity.subtitle}
          </p>

          <blockquote className="mt-6 border-l-2 border-neon/60 pl-4">
            <p className="max-w-xl text-sm italic leading-relaxed text-[#b7c4bc] sm:text-[15px]">
              &ldquo;{portfolio.identity.tagline}&rdquo;
            </p>
          </blockquote>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted">{portfolio.identity.bio}</p>

        <div className="mt-8 flex flex-col items-start gap-2.5 min-[380px]:flex-row min-[380px]:flex-wrap min-[380px]:items-center">
            <button type="button" onClick={() => scrollToSection('projects')} className="btn btn-primary">
              <FolderCode size={16} aria-hidden="true" />
              Explore Projects
              <ArrowRight size={15} aria-hidden="true" className="opacity-70" />
            </button>

            <button type="button" onClick={() => scrollToSection('about')} className="btn btn-secondary">
              About Me
            </button>

            <a
              href={resumeAvailable ? portfolio.media.resume : '#resume'}
              download={resumeAvailable ? portfolio.media.resumeFilename : undefined}
              onClick={(event) => {
                if (!resumeAvailable) {
                  event.preventDefault()
                  scrollToSection('resume')
                }
              }}
              className="btn btn-secondary"
              aria-label={
                resumeAvailable
                  ? 'Download the resume PDF'
                  : 'View resume details — the PDF is not uploaded yet'
              }
              title={
                resumeAvailable
                  ? 'Download the resume PDF'
                  : 'The resume PDF is not uploaded yet — open the resume section'
              }
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <SocialLinks size={17} />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#5d6e64]">
              {resumeStatus === 'checking' ? 'verifying resume…' : 'Built to be explored'}
            </p>
          </div>

          <dl className="mt-9 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line/70 sm:grid-cols-3">
            {[
              { label: 'Education', value: 'BCA', meta: 'Pursuing' },
              { label: 'Certification', value: 'NIELIT', meta: 'O Level passed' },
              { label: 'Featured build', value: 'FlareX', meta: 'Private' },
            ].map((item) => (
              <div key={item.label} className="bg-ink/90 px-4 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#5d6e64]">
                  {item.label}
                </dt>
                <dd className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-bright">{item.value}</span>
                  <span className="text-[11px] text-muted">{item.meta}</span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Profile + interactive terminal */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2rem] bg-neon/[0.04] blur-2xl"
          />

          <div className="relative overflow-hidden rounded-2xl border border-line bg-card/80 shadow-glow backdrop-blur">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-[#0f1a14]/80 px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              </div>
              <span className="font-mono text-[10px] text-muted">operator.profile</span>
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-neon">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
                local
              </span>
            </div>

            <div className="flex items-center gap-4 p-4 sm:p-5">
              <ProfileAvatar size={78} priority className="glow-box" />
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-bright sm:text-lg">
                  {portfolio.identity.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-neon sm:text-xs">
                  {portfolio.identity.primaryRole}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted">
                  <MapPin size={11} aria-hidden="true" className="shrink-0 text-[#5d6e64]" />
                  <span className="truncate">Hi-Tech Institute, Ghaziabad</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-y border-line/70 px-4 py-2.5 sm:px-5">
              <span className="chip">
                <ShieldCheck size={11} aria-hidden="true" className="text-neon" />
                NIELIT O Level
              </span>
              <span className="chip">
                <TerminalSquare size={11} aria-hidden="true" className="text-neon" />
                Linux learner
              </span>
              <span className="chip">FlareX build</span>
            </div>

            <Terminal />
          </div>

          <p className="mt-3 flex items-center justify-center gap-2 text-center font-mono text-[10px] text-[#5d6e64]">
            <span aria-hidden="true" className="h-px w-6 bg-line" />
            interactive terminal — try &ldquo;help&rdquo;
            <span aria-hidden="true" className="h-px w-6 bg-line" />
          </p>
        </motion.div>
      </div>
    </section>
  )
}

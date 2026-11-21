import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { BrandMark } from './icons'

const NAV = portfolio.nav

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(NAV[0].id)

  const toggleRef = useRef(null)
  const menuRef = useRef(null)
  const reduceMotion = useReducedMotion()

  /* Scroll state + active section (single passive listener, cheap reads). */
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 12)

      const offset = 130
      let current = NAV[0].id

      for (const item of NAV) {
        const el = document.getElementById(item.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= offset) current = item.id
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      if (nearBottom) current = NAV[NAV.length - 1].id

      setActive(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  /* Lock background scroll and support Escape while the mobile menu is open. */
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktop = (event) => {
      if (event.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktop)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [open])

  const goTo = useCallback(
    (id) => {      const wasOpen = open
      setOpen(false)

      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(null, '', `#${id}`)
      }

      const scroll = () => {
        document.getElementById(id)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      }

      if (wasOpen) {
        window.setTimeout(scroll, 60)
      } else {
        scroll()
      }
    },
    [open, reduceMotion],
  )

  const handleMenuKeyDown = (event) => {
    if (event.key !== 'Tab' || !menuRef.current) return

    const items = [
      toggleRef.current,
      ...menuRef.current.querySelectorAll('a[href], button:not([disabled])'),
    ].filter(Boolean)

    if (items.length === 0) return

    const first = items[0]
    const last = items[items.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || open
            ? 'border-line bg-ink/90 backdrop-blur-xl'
            : 'border-transparent bg-ink/40 backdrop-blur-sm'
        }`}
      >
        <nav aria-label="Main navigation" className="container-page">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault()
                goTo('home')
              }}
              className="group flex min-w-0 items-center gap-2.5 rounded-md"
              aria-label="CYBER // RISHABH — go to home"
            >
              <BrandMark className="h-8 w-8 shrink-0 transition-colors group-hover:border-neon/60" />
              <span className="truncate font-mono text-[13px] font-bold tracking-tight text-bright sm:text-sm">
                CYBER <span className="text-neon">//</span> RISHABH
              </span>
            </a>

            {/* Desktop navigation */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault()
                        goTo(item.id)
                      }}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative block rounded-md px-2.5 py-2 text-[12.5px] font-medium transition-colors ${
                        isActive ? 'text-neon' : 'text-muted hover:text-bright'
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          className="absolute inset-x-2.5 -bottom-[9px] h-px bg-neon"
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <span className="flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-neon" aria-hidden="true" />
                Learning in public
              </span>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="grid h-10 w-10 place-items-center rounded-md border border-line text-bright transition-colors hover:border-neon/40 hover:text-neon lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile / tablet navigation */}
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            onKeyDown={handleMenuKeyDown}
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-page flex min-h-full flex-col py-6">
              <p className="eyebrow mb-4">// navigate</p>

              <ul className="divide-y divide-line/70 border-y border-line/70">
                {NAV.map((item, index) => {
                  const isActive = active === item.id
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => {
                          event.preventDefault()
                          goTo(item.id)
                        }}
                        aria-current={isActive ? 'location' : undefined}
                        className={`flex items-center gap-4 py-3.5 text-lg font-medium transition-colors ${
                          isActive ? 'text-neon' : 'text-bright hover:text-neon'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-[#5d6e64]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`ml-auto h-1.5 w-1.5 rounded-full ${
                            isActive ? 'bg-neon' : 'bg-line'
                          }`}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto pt-8">
                <div className="rounded-lg border border-line bg-card/60 p-4 font-mono text-[11px] leading-relaxed text-muted">
                  <p className="text-neon">$ whoami</p>
                  <p className="mt-1">{portfolio.identity.name}</p>
                  <p>{portfolio.identity.primaryRole}</p>
                </div>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#5d6e64]">
                  CYBER // RISHABH
                </p>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.18 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-neon/40 bg-neon text-ink shadow-[0_0_28px_-6px_rgba(57,255,136,0.55)] transition-colors hover:bg-[#5bffa0] sm:bottom-7 sm:right-7"
        >
          <ArrowUp size={18} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

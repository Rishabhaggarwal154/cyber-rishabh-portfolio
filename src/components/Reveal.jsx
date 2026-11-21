import { motion, useReducedMotion } from 'framer-motion'

/**
 * Small reveal wrapper. Content is always visible; motion is an enhancement
 * and is skipped entirely when the user prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 20, className = '', once = true }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

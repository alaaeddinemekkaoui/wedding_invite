import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9998]"
      aria-hidden="true"
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, var(--accent-gold-dark), var(--accent-gold), var(--accent-gold-light))',
        }}
      />
    </motion.div>
  )
}

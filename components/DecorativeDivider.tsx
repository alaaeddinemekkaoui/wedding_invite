'use client'

import { motion } from 'framer-motion'

function DiamondOrnament() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 2L26 14L14 26L2 14L14 2Z" stroke="var(--accent-gold)" strokeWidth="1" fill="var(--accent-gold)" fillOpacity="0.15" />
      <path d="M14 7L21 14L14 21L7 14L14 7Z" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" strokeOpacity="0.7" />
      <circle cx="14" cy="14" r="2.5" fill="var(--accent-gold)" fillOpacity="0.7" />
    </svg>
  )
}

export default function DecorativeDivider() {
  return (
    <motion.div initial={{ opacity: 0, scaleX: 0.6 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-center py-2 px-8" aria-hidden="true">
      <div className="flex items-center gap-5 w-full max-w-xl mx-auto">
        <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)', opacity: 0.45 }} />
        <div className="shrink-0"><DiamondOrnament /></div>
        <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)', opacity: 0.45 }} />
      </div>
    </motion.div>
  )
}

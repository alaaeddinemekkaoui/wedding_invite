import { motion } from 'framer-motion'

function MoroccanStar({ size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer 8-pointed star */}
      <path
        d="M50 5 L58.7 35.6 L88.3 26.7 L69.3 50 L88.3 73.3 L58.7 64.4 L50 95 L41.3 64.4 L11.7 73.3 L30.7 50 L11.7 26.7 L41.3 35.6 Z"
        fill="var(--accent-gold)"
        fillOpacity="0.85"
      />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="14" fill="var(--bg-primary)" />
      <circle cx="50" cy="50" r="8" fill="var(--accent-gold)" fillOpacity="0.5" />
      {/* Outer ring */}
      <circle cx="50" cy="50" r="46" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" strokeOpacity="0.4" />
    </svg>
  )
}

export default function Preloader() {
  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
      aria-label="Chargement"
      role="status"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, var(--accent-gold), transparent)',
          opacity: 0.04,
        }}
      />

      {/* Moroccan star */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="mb-8"
      >
        <MoroccanStar size={64} />
      </motion.div>

      {/* Names */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-script name-safe text-5xl text-gradient-gold mb-2 select-none"
      >
        Ghita × Walid
      </motion.p>

      {/* Date & venue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        className="font-sans text-[10px] tracking-[0.45em] uppercase select-none"
        style={{ color: 'var(--text-muted)' }}
      >
        17 Avril &middot; Fès
      </motion.p>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="mt-12 w-36 h-[1.5px] overflow-hidden rounded-full"
        style={{ background: 'var(--border-color)' }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 0.9,
          }}
          className="h-full w-1/2 rounded-full"
          style={{ background: 'var(--accent-gold)' }}
        />
      </motion.div>
    </motion.div>
  )
}

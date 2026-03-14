import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, X } from 'lucide-react'

export default function MusicToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl px-4 py-3 text-[11px] max-w-[200px]"
            style={{ color: 'var(--text-secondary)' }}
            role="tooltip"
          >
            <p className="font-sans font-medium mb-0.5" style={{ color: 'var(--accent-gold)' }}>
              Ambiance musicale
            </p>
            <p className="font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              La musique sera disponible lors de votre arrivée.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.08 }}
        aria-label="Ambiance musicale"
        aria-expanded={open}
        className="w-10 h-10 rounded-full flex items-center justify-center glass-card transition-all duration-300"
        style={{ border: '1px solid var(--border-gold)' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={15} style={{ color: 'var(--text-muted)' }} />
            </motion.span>
          ) : (
            <motion.span key="music" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Music size={15} style={{ color: 'var(--accent-gold)' }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

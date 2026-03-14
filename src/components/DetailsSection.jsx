import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Calendar, MapPin, Star, X } from 'lucide-react'
import { config } from '../data/config'
import { RSVPFormCard } from './RSVPSection'

const DETAIL_ITEMS = [
  {
    icon: Heart,
    label: 'Les Maries',
    value: () => config.couple.combined,
    accent: true,
  },
  {
    icon: Calendar,
    label: 'Date',
    value: () => `${config.wedding.date} ${config.wedding.year}`,
  },
  {
    icon: MapPin,
    label: 'Lieu',
    value: () => config.wedding.fullVenue,
  },
  {
    icon: Star,
    label: 'Occasion',
    value: () => config.wedding.occasion,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function DetailCard({ icon: Icon, label, value, accent, index }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(201, 169, 110, 0.18)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-8 overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid var(--border-gold)' }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${index % 2 === 0 ? '20%' : '80%'} 0%, var(--accent-gold), transparent)`,
          opacity: 0,
        }}
      />

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))',
          boxShadow: '0 4px 16px rgba(201, 169, 110, 0.3)',
        }}
      >
        <Icon size={18} color="white" strokeWidth={1.8} aria-hidden="true" />
      </div>

      <p
        className="font-sans text-[10px] tracking-[0.38em] uppercase mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>

      <p
        className={`font-serif ${accent ? 'text-xl font-medium text-gradient-gold' : 'text-lg'} leading-snug`}
        style={accent ? {} : { color: 'var(--text-primary)' }}
      >
        {value()}
      </p>
    </motion.article>
  )
}

function RSVPModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center px-0 sm:px-4 py-0 sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="attendance-modal-heading"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
            style={{ background: 'rgba(16, 12, 9, 0.6)', backdropFilter: 'blur(10px)' }}
            aria-label="Fermer la fenetre"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem]"
          >
            <div className="px-4 pt-5 pb-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8">
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div>
                  <p
                    className="font-sans text-[10px] tracking-[0.45em] uppercase mb-3"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    {config.rsvp.eyebrow}
                  </p>
                  <h3
                    id="attendance-modal-heading"
                    className="font-serif text-2xl sm:text-3xl md:text-4xl italic"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {config.rsvp.heading}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base mt-3 pr-2" style={{ color: 'var(--text-secondary)' }}>
                    Entrez votre nom, le nombre total de personnes, votre numero de telephone et un petit mot si vous le souhaitez.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              <RSVPFormCard formIdPrefix="attendance-modal" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function DetailsSection() {
  const { details } = config
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="details" className="section-padding section-stage px-6" aria-labelledby="details-heading">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            {details.eyebrow}
          </p>
          <h2
            id="details-heading"
            className="font-serif text-4xl md:text-5xl italic"
            style={{ color: 'var(--text-primary)' }}
          >
            {details.heading}
          </h2>
          <div className="mt-8 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 14px 40px rgba(201,169,110,0.28)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-4 rounded-full font-sans text-[11px] tracking-[0.2em] sm:tracking-[0.28em] uppercase font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))',
                color: 'white',
              }}
            >
              Confirm your attendance
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {DETAIL_ITEMS.map((item, i) => (
            <DetailCard key={item.label} {...item} index={i} />
          ))}
        </motion.div>
      </div>

      <RSVPModal open={showModal} onClose={() => setShowModal(false)} />
    </section>
  )
}

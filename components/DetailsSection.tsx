'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Star } from 'lucide-react'
import { config } from '@/data/wedding-config'

const DETAIL_ITEMS = [
  { icon: Heart, label: 'Les Maries', value: () => config.couple.combined, accent: true },
  { icon: Calendar, label: 'Date', value: () => `${config.wedding.time} · ${config.wedding.date} ${config.wedding.year}`, accent: false },
  { icon: MapPin, label: 'Lieu', value: () => config.wedding.fullVenue, accent: false },
  { icon: Star, label: 'Occasion', value: () => config.wedding.occasion, accent: false },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function DetailCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Heart
  label: string
  value: () => string
  accent: boolean
}) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(177, 31, 38, 0.12)' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[2rem] p-8 overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ border: '1px solid var(--border-gold)' }} />

      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))', boxShadow: '0 10px 24px rgba(177, 31, 38, 0.22)' }}>
        <Icon size={20} color="white" strokeWidth={1.8} aria-hidden="true" />
      </div>

      <p className="font-sans text-[10px] tracking-[0.38em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>

      <p
        className={accent ? 'font-script text-[2.45rem] md:text-[3rem] leading-[0.98]' : 'font-serif text-lg leading-snug'}
        style={accent ? { color: 'var(--accent-gold)', textShadow: '0 6px 18px rgba(177, 31, 38, 0.08)' } : { color: 'var(--text-primary)' }}
      >
        {value()}
      </p>
    </motion.article>
  )
}

export default function DetailsSection() {
  const { details } = config

  return (
    <section id="details" className="section-padding section-stage px-6" aria-labelledby="details-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>
            {details.eyebrow}
          </p>
          <h2 id="details-heading" className="font-serif text-4xl md:text-5xl italic" style={{ color: 'var(--text-primary)' }}>
            {details.heading}
          </h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {DETAIL_ITEMS.map((item) => (
            <DetailCard key={item.label} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

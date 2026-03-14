import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Star } from 'lucide-react'
import { config } from '../data/config'

const DETAIL_ITEMS = [
  {
    icon: Heart,
    label: 'Les Mariés',
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
      {/* Hover gold border overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ border: '1px solid var(--border-gold)' }}
      />

      {/* Gold shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${index % 2 === 0 ? '20%' : '80%'} 0%, var(--accent-gold), transparent)`,
          opacity: 0,
        }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))',
          boxShadow: '0 4px 16px rgba(201, 169, 110, 0.3)',
        }}
      >
        <Icon size={18} color="white" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Label */}
      <p
        className="font-sans text-[10px] tracking-[0.38em] uppercase mb-2"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>

      {/* Value */}
      <p
        className={`font-serif ${accent ? 'text-xl font-medium text-gradient-gold' : 'text-lg'} leading-snug`}
        style={ accent ? {} : { color: 'var(--text-primary)' } }
      >
        {value()}
      </p>
    </motion.article>
  )
}

export default function DetailsSection() {
  const { details } = config

  return (
    <section id="details" className="section-padding px-6" aria-labelledby="details-heading">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
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
        </motion.div>

        {/* Cards */}
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
    </section>
  )
}

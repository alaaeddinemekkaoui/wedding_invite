import { motion } from 'framer-motion'
import { config } from '../data/config'

function MoroccanCorner() {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <path d="M0 0 L60 0 L60 60" stroke="var(--accent-gold)" strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
      <path d="M8 0 L60 52" stroke="var(--accent-gold)" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
      <path d="M18 0 L60 42" stroke="var(--accent-gold)" strokeWidth="0.4" fill="none" strokeOpacity="0.2" />
      <circle cx="52" cy="8" r="3" fill="var(--accent-gold)" fillOpacity="0.45" />
      <circle cx="42" cy="5" r="1.5" fill="var(--accent-gold)" fillOpacity="0.25" />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

function PersonCard({ label, name, bio, gradient }) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full rounded-3xl overflow-hidden transition-shadow duration-500"
        style={{
          background: gradient,
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        {/* Corner ornament */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-35 transition-opacity duration-500">
          <MoroccanCorner />
        </div>

        {/* Hover gold border */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ border: '1px solid var(--border-gold)' }}
        />

        <div className="relative p-10">
          <span
            className="block font-sans text-[10px] tracking-[0.4em] uppercase mb-3"
            style={{ color: 'var(--accent-gold)' }}
          >
            {label}
          </span>

          <h3 className="font-script name-safe text-6xl text-gradient-gold leading-[1.14] mb-5">{name}</h3>

          <div
            className="h-[1px] w-16 mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--accent-gold), transparent)',
            }}
          />

          <p className="font-serif text-base italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {bio}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CoupleSection() {
  const { coupleSection, couple } = config

  return (
    <section id="couple" className="section-padding px-6" aria-labelledby="couple-heading">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            {coupleSection.eyebrow}
          </motion.p>

          <motion.h2
            id="couple-heading"
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl italic mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {coupleSection.heading}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-serif text-lg italic leading-relaxed max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            {coupleSection.intro}
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14"
        >
          <PersonCard
            label={coupleSection.ghita.label}
            name={couple.name1}
            bio={coupleSection.ghita.bio}
            gradient="linear-gradient(135deg, color-mix(in srgb, var(--accent-blush) 8%, var(--bg-card)) 0%, var(--bg-card) 60%)"
          />
          <PersonCard
            label={coupleSection.walid.label}
            name={couple.name2}
            bio={coupleSection.walid.bio}
            gradient="linear-gradient(135deg, color-mix(in srgb, var(--accent-gold) 6%, var(--bg-card)) 0%, var(--bg-card) 60%)"
          />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, type: 'spring', bounce: 0.25 }}
          className="flex items-center justify-center gap-5"
          aria-hidden="true"
        >
          <span
            className="h-[1px] w-24"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }}
          />
          <span className="font-script text-4xl text-gradient-gold leading-none">
            {coupleSection.tagline}
          </span>
          <span
            className="h-[1px] w-24"
            style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

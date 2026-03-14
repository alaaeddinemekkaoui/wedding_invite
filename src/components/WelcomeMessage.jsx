import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '../data/config'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function WelcomeMessage() {
  return (
    <section
      id="bienvenue"
      className="section-padding section-stage px-6 relative overflow-hidden"
      aria-labelledby="welcome-heading"
    >
      {/* Soft background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, var(--accent-gold), transparent)',
          opacity: 0.04,
        }}
      />

      {/* Floating ornament left */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-6 top-1/3 w-20 h-20 pointer-events-none opacity-[0.12] hidden md:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="36" stroke="var(--accent-gold)" strokeWidth="0.8" fill="none" />
          <circle cx="40" cy="40" r="24" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" />
          <path d="M40 4L44 20L58 16L48 28L58 40L44 36L40 52L36 36L22 40L32 28L22 16L36 20Z"
            fill="var(--accent-gold)" fillOpacity="0.3" stroke="var(--accent-gold)" strokeWidth="0.6" />
        </svg>
      </motion.div>

      {/* Floating ornament right */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-6 bottom-1/3 w-16 h-16 pointer-events-none opacity-[0.10] hidden md:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 3L34 18L49 14L39 25L49 36L34 32L30 47L26 32L11 36L21 25L11 14L26 18Z"
            fill="var(--accent-gold)" fillOpacity="0.35" stroke="var(--accent-gold)" strokeWidth="0.7" />
          <circle cx="30" cy="30" r="7" fill="var(--accent-gold)" fillOpacity="0.15" />
        </svg>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-6"
            style={{ color: 'var(--accent-gold)' }}
          >
            Bienvenue
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-10"
            aria-hidden="true"
          >
            <span
              className="h-[1px] w-16"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }}
            />
            <Heart size={14} fill="currentColor" style={{ color: 'var(--accent-gold)' }} />
            <span
              className="h-[1px] w-16"
              style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }}
            />
          </motion.div>

          {/* Main welcome heading */}
          <motion.h2
            id="welcome-heading"
            variants={itemVariants}
            className="font-script leading-none mb-10 text-gradient-gold"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            Bienvenue à notre mariage
          </motion.h2>

          {/* Message card */}
          <motion.div
            variants={itemVariants}
            className="rounded-3xl p-10 md:p-14 mb-10"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              boxShadow: 'var(--shadow-card)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <p
              className="font-serif text-xl md:text-2xl italic leading-[1.9] mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              C'est avec une joie immense et un cœur plein d'amour que nous vous accueillons en ce jour si particulier.
            </p>
            <p
              className="font-serif text-lg italic leading-relaxed mb-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Votre présence à nos côtés rend ce moment encore plus précieux et inoubliable. Chaque sourire partagé, chaque instant vécu ensemble sera gravé à jamais dans notre mémoire.
            </p>
            <p
              className="font-serif text-lg italic leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Merci d'être là. Merci de partager avec nous ce début d'une belle et longue histoire d'amour.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--text-muted)' }}>
              Avec tout notre amour,
            </p>
            <p className="font-script name-safe text-5xl text-gradient-gold leading-[1.14]">
              {config.couple.combined}
            </p>
            <p
              className="font-sans text-[10px] tracking-[0.3em] uppercase mt-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {config.wedding.date} · {config.wedding.fullVenue}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

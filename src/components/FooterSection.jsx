import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '../data/config'

function MoroccanStarSmall() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="32" height="32">
      <path
        d="M20 2 L23.6 13.2 L35 9.6 L27.2 18.6 L35 27.6 L23.6 24 L20 35 L16.4 24 L5 27.6 L12.8 18.6 L5 9.6 L16.4 13.2 Z"
        fill="var(--accent-gold)"
        fillOpacity="0.35"
        stroke="var(--accent-gold)"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />
      <circle cx="20" cy="20" r="4" fill="var(--accent-gold)" fillOpacity="0.2" />
    </svg>
  )
}

export default function FooterSection() {
  const { footer, couple, wedding } = config

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        borderTop: '1px solid var(--border-color)',
      }}
      aria-label="Pied de page"
    >
      {/* Main closing section */}
      <section
        id="closing"
        className="section-padding px-6"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-gold), transparent)',
          backgroundOpacity: 0.04,
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Star ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <MoroccanStarSmall />
          </motion.div>

          {/* Couple names */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-5xl px-2 py-7 sm:px-10 sm:py-8"
          >
            <h2
              className="font-script name-safe whitespace-nowrap text-gradient-gold leading-[1.2]"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}
            >
              {couple.combined}
            </h2>
          </motion.div>

          {/* Date & venue */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-10 flex items-center justify-center gap-4 px-4 sm:px-8"
          >
            <span
              className="h-[1px] w-14"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }}
            />
            <p
              className="font-sans text-[10px] tracking-[0.42em] uppercase"
              style={{ color: 'var(--accent-gold)' }}
            >
              {wedding.date} · {wedding.fullVenue}
            </p>
            <span
              className="h-[1px] w-14"
              style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }}
            />
          </motion.div>

          {/* Closing message */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-serif text-xl md:text-2xl italic leading-relaxed mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {footer.closing}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="font-serif italic text-lg mb-12"
            style={{ color: 'var(--text-secondary)' }}
          >
            {footer.thankYou}
          </motion.p>


        </div>
      </section>

      {/* Bottom bar */}
      <div
        className="px-6 py-6"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="font-sans text-[10px] tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
            {footer.copyright}
          </p>

          {/* Heart icon */}
          <Heart size={12} fill="currentColor" style={{ color: 'var(--accent-gold)', opacity: 0.6 }} aria-hidden="true" />

          {/* Back to top */}
          <motion.button
            onClick={handleTop}
            whileHover={{ y: -2 }}
            className="font-sans text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            aria-label="Retourner en haut de page"
          >
            Retour en haut ↑
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

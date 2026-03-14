import { motion } from 'framer-motion'
import { MapPin, ExternalLink, Navigation } from 'lucide-react'
import { config } from '../data/config'

function MapPlaceholder() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full"
      style={{
        aspectRatio: '4/3',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-gold)',
      }}
      role="img"
      aria-label="Plan stylisé — Salle Dar Bassidi, Fès"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute left-0 right-0 h-[1px]"
            style={{
              top: `${(i + 1) * 10}%`,
              background: 'var(--accent-gold)',
              opacity: 0.08,
            }}
          />
        ))}
        {[...Array(9)].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute top-0 bottom-0 w-[1px]"
            style={{
              left: `${(i + 1) * 10}%`,
              background: 'var(--accent-gold)',
              opacity: 0.08,
            }}
          />
        ))}
      </div>

      {/* Decorative route lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 150 Q100 120 200 150 T400 130" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none" strokeOpacity="0.2" />
        <path d="M80 0 L80 300" stroke="var(--accent-gold)" strokeWidth="1" strokeOpacity="0.12" />
        <path d="M200 0 L200 300" stroke="var(--accent-gold)" strokeWidth="1.5" strokeOpacity="0.12" />
        <path d="M0 100 L400 100" stroke="var(--accent-gold)" strokeWidth="1.5" strokeOpacity="0.12" />
        <path d="M0 200 L400 200" stroke="var(--accent-gold)" strokeWidth="1" strokeOpacity="0.12" />
        {/* Block shapes */}
        <rect x="100" y="130" width="60" height="40" rx="4" fill="var(--accent-gold)" fillOpacity="0.06" stroke="var(--accent-gold)" strokeWidth="0.5" strokeOpacity="0.2" />
        <rect x="240" y="110" width="80" height="55" rx="4" fill="var(--accent-gold)" fillOpacity="0.06" stroke="var(--accent-gold)" strokeWidth="0.5" strokeOpacity="0.2" />
        <rect x="50" y="60" width="50" height="30" rx="4" fill="var(--accent-gold)" fillOpacity="0.04" stroke="var(--accent-gold)" strokeWidth="0.5" strokeOpacity="0.15" />
      </svg>

      {/* Pulsing location pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-10 h-10 rounded-full"
            style={{ background: 'var(--accent-gold)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            className="absolute w-10 h-10 rounded-full"
            style={{ background: 'var(--accent-gold)' }}
          />
          {/* Pin */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--accent-gold)', boxShadow: '0 4px 20px rgba(201,169,110,0.5)' }}
            >
              <MapPin size={18} color="white" strokeWidth={2} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        className="absolute bottom-0 left-0 right-0 py-3 px-4 text-center"
        style={{
          background: 'linear-gradient(0deg, var(--bg-secondary), transparent)',
        }}
      >
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Salle Dar Bassidi · Fès
        </p>
      </div>
    </div>
  )
}

export default function LocationSection() {
  const { location } = config

  return (
    <section id="lieu" className="section-padding section-stage px-6" aria-labelledby="location-heading">
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
            {location.eyebrow}
          </p>
          <h2
            id="location-heading"
            className="font-serif text-4xl md:text-5xl italic"
            style={{ color: 'var(--text-primary)' }}
          >
            {location.heading}
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            {/* Venue card */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))', boxShadow: '0 4px 16px rgba(201,169,110,0.3)' }}
                >
                  <Navigation size={16} color="white" strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl italic mb-0.5" style={{ color: 'var(--text-primary)' }}>
                    {location.venue}
                  </h3>
                  <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
                    {location.city}
                  </p>
                </div>
              </div>

              <div
                className="h-[1px] mb-5"
                style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)', opacity: 0.3 }}
              />

              <p className="font-serif italic text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {location.description}
              </p>
            </div>

            {/* Google Maps CTA */}
            <motion.a
              href={location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 12px 40px rgba(201,169,110,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-[11px] tracking-[0.26em] uppercase font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }}
              aria-label="Ouvrir Salle Dar Bassidi dans Google Maps (nouvel onglet)"
            >
              <MapPin size={15} strokeWidth={2} aria-hidden="true" />
              {location.mapButtonText}
              <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MapPlaceholder />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

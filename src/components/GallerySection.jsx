import { motion } from 'framer-motion'
import { config } from '../data/config'

// Gradient palettes: [light, dark]
const GALLERY_GRADIENTS = [
  ['linear-gradient(135deg, #F2C4CE 0%, #F5EDD9 60%, #E8D5A3 100%)', 'linear-gradient(135deg, #2A0D12 0%, #0D1F16 60%, #1A1208 100%)'],
  ['linear-gradient(135deg, #E8D5A3 0%, #FAFAF0 60%, #F2C4CE 100%)', 'linear-gradient(135deg, #1A1208 0%, #070F0C 60%, #2A0D12 100%)'],
  ['linear-gradient(135deg, #D5E8D5 0%, #F5EDD9 60%, #A8CCB5 100%)', 'linear-gradient(135deg, #0A1F0D 0%, #0D1F16 60%, #071409 100%)'],
  ['linear-gradient(135deg, #E8D5A3 0%, #F5F0E8 60%, #D4B896 100%)', 'linear-gradient(135deg, #2A1A08 0%, #1A1208 60%, #0A0C07 100%)'],
  ['linear-gradient(135deg, #F2C4CE 0%, #F0E8F5 60%, #E0C4DC 100%)', 'linear-gradient(135deg, #2A0D12 0%, #1A0A1A 60%, #140A14 100%)'],
  ['linear-gradient(135deg, #C4DCE8 0%, #EEF4F8 60%, #A8C4D4 100%)', 'linear-gradient(135deg, #0A1A2A 0%, #0D1F16 60%, #071218 100%)'],
]

function MoroccanStar({ opacity = 0.15 }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <path
        d="M40 4L47.3 27.1L71.3 20L54.1 38.4L71.3 56.8L47.3 49.7L40 72.8L32.7 49.7L8.7 56.8L25.9 38.4L8.7 20L32.7 27.1Z"
        stroke="var(--accent-gold)"
        strokeWidth="0.8"
        fill="var(--accent-gold)"
        fillOpacity="0.15"
        strokeOpacity="0.5"
      />
      <circle cx="40" cy="40" r="12" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" strokeOpacity="0.35" />
      <circle cx="40" cy="40" r="5" fill="var(--accent-gold)" fillOpacity="0.2" />
    </svg>
  )
}

function GalleryCard({ item, index, gradient }) {
  const isTall = item.aspect === 'tall'
  const [lightGrad, darkGrad] = gradient

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-2xl ${isTall ? 'row-span-2' : ''} break-inside-avoid mb-4`}
      style={{
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {/* Placeholder image */}
      <div
        className="w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        style={{
          paddingBottom: isTall ? '140%' : '75%',
          background: lightGrad,
        }}
      >
        <div
          className="hidden dark:block absolute inset-0"
          style={{ background: darkGrad }}
        />
      </div>

      {/* Central ornament */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 group-hover:scale-110"
      >
        <div className="w-20 h-20 opacity-60 group-hover:opacity-80 transition-opacity duration-500">
          <MoroccanStar />
        </div>
      </div>

      {/* Roman numeral */}
      <div
        className="absolute top-4 left-4 font-script text-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-400"
        style={{ color: 'var(--accent-gold)' }}
        aria-hidden="true"
      >
        {['I','II','III','IV','V','VI'][index]}
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-end p-5 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, rgba(10,15,12,0.7), transparent' }}
      >
        <p
          className="font-serif italic text-sm text-white/90 leading-snug transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
        >
          {item.alt}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function GallerySection() {
  const { gallery } = config

  return (
    <section id="galerie" className="section-padding px-6" aria-labelledby="gallery-heading">
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
            {gallery.eyebrow}
          </p>
          <h2
            id="gallery-heading"
            className="font-serif text-4xl md:text-5xl italic mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {gallery.heading}
          </h2>
          <p className="font-serif italic text-lg" style={{ color: 'var(--text-muted)' }}>
            {gallery.subtitle}
          </p>
        </motion.div>

        {/* Masonry gallery using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {gallery.images.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              gradient={GALLERY_GRADIENTS[i % GALLERY_GRADIENTS.length]}
            />
          ))}
        </div>

        {/* Note: replace placeholders with real images */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-8 font-sans text-[10px] tracking-[0.2em]"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Note sur la galerie"
        >
          Photos à venir · À bientôt
        </motion.p>
      </div>
    </section>
  )
}

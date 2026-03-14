import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { config } from '../data/config'

function MoroccanOrnamentLarge() {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Outer star */}
      <path
        d="M110 10 L122 45 L158 38 L138 68 L165 88 L130 95 L132 132 L110 111 L88 132 L90 95 L55 88 L82 68 L62 38 L98 45 Z"
        stroke="var(--accent-gold)"
        strokeWidth="0.8"
        fill="var(--accent-gold)"
        fillOpacity="0.08"
      />
      {/* Circles */}
      <circle cx="110" cy="110" r="90" stroke="var(--accent-gold)" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
      <circle cx="110" cy="110" r="70" stroke="var(--accent-gold)" strokeWidth="0.4" fill="none" strokeOpacity="0.2" />
      <circle cx="110" cy="110" r="50" stroke="var(--accent-gold)" strokeWidth="0.4" fill="none" strokeOpacity="0.15" />
      {/* Cross lines */}
      <line x1="110" y1="20" x2="110" y2="200" stroke="var(--accent-gold)" strokeWidth="0.3" strokeOpacity="0.2" />
      <line x1="20" y1="110" x2="200" y2="110" stroke="var(--accent-gold)" strokeWidth="0.3" strokeOpacity="0.2" />
      <line x1="45" y1="45" x2="175" y2="175" stroke="var(--accent-gold)" strokeWidth="0.3" strokeOpacity="0.15" />
      <line x1="175" y1="45" x2="45" y2="175" stroke="var(--accent-gold)" strokeWidth="0.3" strokeOpacity="0.15" />
      {/* Center dot */}
      <circle cx="110" cy="110" r="4" fill="var(--accent-gold)" fillOpacity="0.4" />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  const handleDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-visible"
      aria-label="Section principale"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Warm gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, var(--bg-secondary) 0%, var(--bg-primary) 70%)',
          }}
        />

        {/* Gold glow top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, var(--accent-gold), transparent)',
            opacity: 0.05,
            filter: 'blur(60px)',
          }}
        />

        {/* Blush glow bottom right */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, var(--accent-blush), transparent)',
            opacity: 0.07,
            filter: 'blur(50px)',
          }}
        />

        {/* Floating Moroccan ornament top-right */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute top-8 right-8 w-44 h-44 pointer-events-none opacity-[0.18] dark:opacity-[0.09]"
        >
          <MoroccanOrnamentLarge />
        </motion.div>

        {/* Floating Moroccan ornament bottom-left */}
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-10 left-6 w-32 h-32 pointer-events-none opacity-[0.13] dark:opacity-[0.07]"
        >
          <MoroccanOrnamentLarge />
        </motion.div>

        {/* Subtle noise / grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, var(--accent-gold) 0.5px, transparent 0.5px)',
            backgroundSize: '48px 48px',
            opacity: 0.025,
          }}
        />
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Top ornament line */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
            <span
              className="h-[1px] w-14"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }}
            />
            <Heart size={13} fill="currentColor" style={{ color: 'var(--accent-gold)' }} aria-hidden="true" />
            <span
              className="h-[1px] w-14"
              style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-5"
            style={{ color: 'var(--accent-gold)' }}
          >
            Mariage · 17 Avril 2026
          </motion.p>

          {/* Main title */}
          <motion.h1
            variants={itemVariants}
            className="font-script name-safe leading-[1.12] px-3 mb-8 text-gradient-gold"
            style={{ fontSize: 'clamp(4rem, 15vw, 11rem)' }}
          >
            {config.couple.name1} × {config.couple.name2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-serif text-lg sm:text-xl md:text-2xl italic leading-relaxed mb-10 max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {config.hero.subtitle}
          </motion.p>

          {/* Pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <span
              className="font-sans text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 rounded-full"
              style={{
                border: '1px solid var(--accent-gold)',
                color: 'var(--accent-gold)',
                background: 'rgba(201, 169, 110, 0.09)',
              }}
            >
              {config.wedding.date} · {config.wedding.year}
            </span>
            <span
              className="hidden sm:inline-block w-1 h-1 rounded-full"
              style={{ background: 'var(--accent-gold)', opacity: 0.5 }}
            />
            <span
              className="font-sans text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 rounded-full"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {config.wedding.fullVenue}
            </span>
          </motion.div>

          {/* CTA button */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center"
          >
            <motion.button
              onClick={handleDetails}
              whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 40px rgba(201, 169, 110, 0.35)' }}
              whileTap={{ scale: 0.96 }}
              className="px-9 py-4 rounded-full font-sans text-[11px] tracking-[0.26em] uppercase font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-gold)]"
              style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }}
            >
              {config.hero.cta1}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-sans text-[9px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={17} style={{ color: 'var(--accent-gold)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

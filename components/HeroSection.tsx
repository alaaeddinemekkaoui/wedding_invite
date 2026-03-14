'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'
import { config } from '@/data/wedding-config'
import FloralCorners from './FloralCorners'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

const titleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.22 } },
}

const writingLineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
}

const underlineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { delay: 0.18, duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
}

function WritingLine({ text, className = '' }: { text: string; className?: string }) {
  const letters = Array.from(text)

  return (
    <motion.div variants={writingLineVariants} className="relative block w-full">
      <span className={`block ${className}`}>
        {letters.map((character, index) => (
          <motion.span key={`${character}-${index}`} variants={letterVariants} className={character === ' ' ? 'inline-block w-[0.34em]' : 'inline-block'}>
            {character === ' ' ? '\u00A0' : character}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )
}

function MobileHeartSeparator({ animated }: { animated: boolean }) {
  const content = (
    <span className="flex w-full justify-center py-1">
      <Heart size={24} strokeWidth={1.85} style={{ color: 'var(--accent-olive)' }} fill="none" aria-hidden="true" />
    </span>
  )

  if (!animated) return content

  return (
    <motion.div variants={writingLineVariants} className="block w-full">
      <motion.span variants={letterVariants} className="block w-full">{content}</motion.span>
    </motion.div>
  )
}

function AnimatedCoupleNames({
  name1,
  name2,
  prefersReducedMotion,
  shouldAnimate,
}: {
  name1: string
  name2: string
  prefersReducedMotion: boolean | null
  shouldAnimate: boolean
}) {
  const fullText = `${name1} ♡ ${name2}`
  const titleToneClass = 'text-[var(--accent-gold)] [text-shadow:0_8px_24px_rgba(177,31,38,0.12)]'

  if (prefersReducedMotion) {
    return (
      <motion.div variants={itemVariants} className="mb-10 px-2">
        <h1 className={`font-script name-safe hidden whitespace-nowrap leading-[0.9] tracking-tight lg:block ${titleToneClass}`} style={{ fontSize: 'clamp(5.2rem, 15vw, 14rem)' }}>
          {fullText}
        </h1>
        <h1 className={`font-script name-safe leading-[0.92] tracking-tight lg:hidden ${titleToneClass}`} style={{ fontSize: 'clamp(4.6rem, 22vw, 7rem)' }}>
          <span className="block">{name1}</span>
          <MobileHeartSeparator animated={false} />
          <span className="block">{name2}</span>
        </h1>
      </motion.div>
    )
  }

  return (
    <motion.div className="mb-10 px-2" initial="hidden" animate={shouldAnimate ? 'visible' : 'hidden'} variants={titleVariants}>
      <motion.div className="relative hidden lg:inline-block" aria-label={fullText}>
        <WritingLine text={fullText} className={`font-script name-safe whitespace-nowrap leading-[0.9] tracking-tight ${titleToneClass}`} />
        <motion.div variants={underlineVariants} className="absolute -bottom-3 left-[10%] right-[10%] h-[2px] origin-left rounded-full" style={{ background: 'linear-gradient(90deg, rgba(177, 31, 38, 0), rgba(177, 31, 38, 0.85), rgba(154, 160, 93, 0.4), rgba(177, 31, 38, 0))' }} />
      </motion.div>
      <motion.div className={`font-script name-safe relative mx-auto flex w-full max-w-[24rem] flex-col items-center leading-[0.92] tracking-tight lg:hidden ${titleToneClass}`} style={{ fontSize: 'clamp(4.6rem, 22vw, 7rem)' }} aria-label={fullText}>
        <WritingLine text={name1} className={`font-script name-safe block w-full text-center ${titleToneClass}`} />
        <MobileHeartSeparator animated />
        <WritingLine text={name2} className={`font-script name-safe block w-full text-center ${titleToneClass}`} />
      </motion.div>
    </motion.div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [shouldAnimateNames, setShouldAnimateNames] = useState(!!prefersReducedMotion)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const floralOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])

  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldAnimateNames(true)
      return
    }

    const timer = window.setTimeout(() => setShouldAnimateNames(true), 1000)
    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion])

  const handleDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="accueil" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-visible" aria-label="Section principale">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, var(--bg-secondary) 0%, var(--bg-primary) 70%)' }} />
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, var(--accent-gold), transparent)', opacity: 0.05, filter: 'blur(60px)' }} />
        <motion.div animate={prefersReducedMotion ? undefined : { x: [0, 20, 0], y: [0, -14, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, var(--accent-blush), transparent)', opacity: 0.07, filter: 'blur(50px)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--accent-gold) 0.5px, transparent 0.5px)', backgroundSize: '48px 48px', opacity: 0.025 }} />
        <motion.div style={{ opacity: floralOpacity }} className="absolute inset-0 z-[1]">
          <FloralCorners />
        </motion.div>
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
        <motion.div variants={containerVariants} initial={prefersReducedMotion ? false : 'hidden'} animate="visible" className="flex flex-col items-center">
          <motion.div variants={itemVariants} className="mb-10 flex items-center gap-4">
            <span className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }} />
            <Heart size={13} fill="none" strokeWidth={1.9} style={{ color: 'var(--accent-olive)' }} aria-hidden="true" />
            <span className="h-[1px] w-16" style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }} />
          </motion.div>

          <motion.p variants={itemVariants} className="mb-5 font-sans text-[10px] uppercase tracking-[0.45em]" style={{ color: 'var(--accent-gold)' }}>
            Mariage · 17 Avril 2026
          </motion.p>

          <AnimatedCoupleNames name1={config.couple.name1} name2={config.couple.name2} prefersReducedMotion={prefersReducedMotion} shouldAnimate={shouldAnimateNames} />

          <motion.p variants={itemVariants} className="mb-10 max-w-2xl font-serif text-lg italic leading-relaxed sm:text-xl md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
            {config.hero.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.3em]" style={{ border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', background: 'rgba(177, 31, 38, 0.08)' }}>
              {config.wedding.time} · {config.wedding.date} · {config.wedding.year}
            </span>
            <span className="hidden h-1 w-1 rounded-full sm:inline-block" style={{ background: 'var(--accent-gold)', opacity: 0.5 }} />
            <span className="rounded-full px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.3em]" style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              {config.wedding.fullVenue}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
            <motion.button onClick={handleDetails} whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 40px rgba(177, 31, 38, 0.26)' }} whileTap={{ scale: 0.96 }} className="rounded-full px-9 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.26em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2" style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }}>
              {config.hero.cta1}
            </motion.button>
            <motion.a href="#rsvp" onClick={(e) => { e.preventDefault(); document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' }) }} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="rounded-full px-9 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.26em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-2" style={{ border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)' }}>
              {config.hero.cta2}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
        <span className="font-sans text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>Decouvrir</span>
        <motion.div animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={17} style={{ color: 'var(--accent-gold)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

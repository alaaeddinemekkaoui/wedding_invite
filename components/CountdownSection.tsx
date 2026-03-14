'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '@/data/wedding-config'

function getTimeLeft(targetDate: string) {
  const now = new Date().getTime()
  const target = new Date(targetDate).getTime()
  const diff = target - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  }
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))
  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000)
    return () => clearInterval(interval)
  }, [targetDate])
  return timeLeft
}

function pad(n: number) { return String(n).padStart(2, '0') }

function CountdownCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 40, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-2xl flex items-center justify-center overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="absolute inset-x-0 top-0 h-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, var(--accent-gold), transparent)', opacity: 0.06 }} />
        <div className="absolute inset-x-0 top-1/2 h-[1px] pointer-events-none" style={{ background: 'var(--border-color)', opacity: 0.6 }} />
        <AnimatePresence mode="popLayout">
          <motion.span key={pad(value)} initial={{ y: -32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 32, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="font-serif text-4xl sm:text-5xl md:text-5xl font-light text-gradient-gold select-none" aria-live="polite" aria-atomic="true">
            {pad(value)}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-sans text-[10px] tracking-[0.38em] uppercase" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </motion.div>
  )
}

export default function CountdownSection() {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [hideSeconds, setHideSeconds] = useState(false)
  const { countdown, wedding } = config
  const { days, hours, minutes, seconds, isPast } = useCountdown(wedding.dateISO)

  const updateLayout = useCallback(() => {
    const availableWidth = layoutRef.current?.clientWidth ?? window.innerWidth
    setHideSeconds(availableWidth < 430)
  }, [])

  useEffect(() => {
    updateLayout()
    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined' && layoutRef.current) {
      resizeObserver = new ResizeObserver(updateLayout)
      resizeObserver.observe(layoutRef.current)
    }
    window.addEventListener('resize', updateLayout)
    return () => { resizeObserver?.disconnect(); window.removeEventListener('resize', updateLayout) }
  }, [updateLayout])

  const countdownItems = [
    { value: days, label: countdown.labels.days, delay: 0 },
    { value: hours, label: countdown.labels.hours, delay: 0.08 },
    { value: minutes, label: countdown.labels.minutes, delay: 0.16 },
    ...(hideSeconds ? [] : [{ value: seconds, label: countdown.labels.seconds, delay: 0.24 }]),
  ]

  return (
    <section id="countdown" className="section-padding section-stage px-6 relative overflow-hidden" aria-labelledby="countdown-heading">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, var(--accent-gold), transparent)', opacity: 0.04 }} />
      <div ref={layoutRef} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>{countdown.eyebrow}</p>
          <h2 id="countdown-heading" className="font-serif text-4xl md:text-5xl italic" style={{ color: 'var(--text-primary)' }}>{countdown.heading}</h2>
        </motion.div>
        {isPast ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-script text-5xl text-gradient-gold">Le grand jour est arrivé !</motion.p>
        ) : (
          <div className="flex items-start justify-center gap-3 sm:gap-6 md:gap-8">
            {countdownItems.map((item, index) => (
              <div key={item.label} className="flex items-start gap-3 sm:gap-6 md:gap-8">
                <CountdownCard value={item.value} label={item.label} delay={item.delay} />
                {index < countdownItems.length - 1 && (
                  <div className="flex flex-col items-center justify-center h-24 sm:h-28 md:h-32 pb-6">
                    <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }} className="font-serif text-2xl sm:text-3xl md:text-4xl leading-none" style={{ color: 'var(--accent-gold)' }} aria-hidden="true">:</motion.span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-14 font-serif italic text-lg" style={{ color: 'var(--text-muted)' }} aria-label={`Date du mariage : ${config.wedding.date} ${config.wedding.year}`}>
          {config.wedding.date} {config.wedding.year} &middot; {config.wedding.fullVenue}
        </motion.p>
      </div>
    </section>
  )
}

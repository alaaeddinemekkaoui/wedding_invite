'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '@/data/wedding-config'
import FloralCorners from './FloralCorners'

export default function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => onOpen(), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[90] flex items-center justify-center px-5"
      style={{
        background:
          'radial-gradient(circle at top, rgba(154, 160, 93, 0.1), transparent 26%), radial-gradient(circle at bottom, rgba(177, 31, 38, 0.08), transparent 24%), var(--bg-primary)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(177, 31, 38, 0.08) 0.7px, transparent 0.7px)', backgroundSize: '34px 34px', opacity: 0.22 }} />
      <FloralCorners />

      <motion.button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        whileHover={!opening ? { y: -4, scale: 1.015 } : undefined}
        whileTap={!opening ? { scale: 0.985 } : undefined}
        className="relative w-full max-w-[34rem] min-h-[38rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded-[2.5rem]"
        aria-label="Ouvrir l'invitation"
      >
        <div className="absolute inset-x-2 top-6 h-[14rem] rounded-t-[2.4rem]" style={{ background: 'linear-gradient(180deg, rgba(255,250,245,0.98) 0%, rgba(250,240,232,0.98) 100%)', border: '1px solid rgba(177, 31, 38, 0.14)', boxShadow: '0 30px 70px rgba(115, 63, 52, 0.08)' }} />

        <motion.div
          animate={opening ? { rotateX: -178, y: -26 } : { rotateX: 0, y: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 1, 0.3, 1] }}
          className="absolute left-2 right-2 top-6 h-[14rem] origin-top"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            perspective: '1200px',
          }}
        >
          <div
            className="absolute inset-0 rounded-t-[2.4rem]"
            style={{
              background: 'linear-gradient(180deg, #fff9f3 0%, #f5e5db 100%)',
              border: '1px solid rgba(177, 31, 38, 0.12)',
              clipPath: 'polygon(2% 0, 98% 0, 50% 95%)',
              boxShadow: '0 20px 42px rgba(177, 31, 38, 0.1)',
            }}
          />
          <div className="absolute inset-x-0 top-[3.3rem] flex justify-center">
            <Heart size={28} strokeWidth={1.85} style={{ color: 'var(--accent-olive)' }} fill="none" />
          </div>
        </motion.div>

        <div className="absolute left-[1.2rem] right-[1.2rem] top-[10.8rem] h-[13rem] overflow-hidden rounded-[2rem] pointer-events-none">
          <div
            className="absolute left-0 top-0 h-full w-1/2"
            style={{
              background: 'linear-gradient(135deg, rgba(245,231,220,0.95), rgba(255,252,247,0.55))',
              clipPath: 'polygon(0 0, 100% 0, 50% 54%)',
              borderLeft: '1px solid rgba(177, 31, 38, 0.08)',
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-1/2"
            style={{
              background: 'linear-gradient(225deg, rgba(245,231,220,0.95), rgba(255,252,247,0.55))',
              clipPath: 'polygon(0 0, 100% 0, 50% 54%)',
              borderRight: '1px solid rgba(177, 31, 38, 0.08)',
            }}
          />
        </div>

        <motion.div
          animate={opening ? { y: -72, scale: 1.02 } : { y: 0, scale: 1 }}
          transition={{ duration: 1.15, ease: [0.2, 1, 0.3, 1] }}
          className="relative mx-auto mt-[10.6rem] rounded-[2.2rem] px-8 pt-16 pb-12 min-h-[25rem]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,252,247,0.98) 0%, rgba(250,244,237,0.98) 100%)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 30px 80px rgba(115, 63, 52, 0.12)',
          }}
        >
          <AnimatePresence mode="wait">
            {!opening ? (
              <motion.div
                key="closed"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="text-center flex min-h-[19rem] flex-col"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.42em] mb-7" style={{ color: 'var(--accent-gold)' }}>
                  Invitation
                </p>
                <div className="flex-1 flex flex-col justify-center">
                  <h1 className="font-script text-[4.6rem] sm:text-[5.5rem] leading-[0.84]" style={{ color: 'var(--accent-gold)' }}>
                    {config.couple.name1} <span style={{ color: 'var(--accent-olive)' }}>♡</span><br />
                    {config.couple.name2}
                  </h1>
                </div>
                <p className="font-serif italic text-base sm:text-[1.35rem] mt-10 pt-6" style={{ color: 'var(--text-secondary)' }}>
                  Touchez l&apos;enveloppe pour ouvrir le faire-part
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="opening"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.45 }}
                className="text-center flex min-h-[19rem] flex-col"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.42em] mb-7" style={{ color: 'var(--accent-gold)' }}>
                  Ouverture
                </p>
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="font-script text-[4.2rem] sm:text-[5rem] leading-[0.84]" style={{ color: 'var(--accent-gold)' }}>
                    {config.couple.name1} <span style={{ color: 'var(--accent-olive)' }}>♡</span><br />
                    {config.couple.name2}
                  </h2>
                </div>
                <p className="font-serif italic text-base sm:text-[1.35rem] mt-10 pt-6" style={{ color: 'var(--text-secondary)' }}>
                  Votre invitation s&apos;ouvre...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { config } from '../data/config'

export default function EnvelopeIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)
  const timeoutRef = useRef(null)

  const handleOpen = () => {
    if (isOpening) return

    setIsOpening(true)
    timeoutRef.current = window.setTimeout(() => {
      onOpen?.()
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6"
      style={{
        background:
          'radial-gradient(circle at top, rgba(201, 169, 110, 0.08), transparent 42%), var(--bg-primary)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 1.02 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-[42rem] flex-col items-center"
      >
        <p
          className="mb-3 font-sans text-[10px] uppercase tracking-[0.42em]"
          style={{ color: 'var(--accent-gold)' }}
        >
          Une invitation pour vous
        </p>

        <p
          className="mb-8 max-w-xl font-serif text-lg leading-relaxed sm:text-xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          Une douce enveloppe vous attend. Touchez-la pour ouvrir notre faire-part.
        </p>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          whileHover={isOpening ? undefined : { y: -4, scale: 1.01 }}
          whileTap={isOpening ? undefined : { scale: 0.985 }}
          className="relative block w-full max-w-[20rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] focus-visible:ring-offset-4 sm:max-w-[40rem]"
          aria-label="Ouvrir l'enveloppe d'invitation"
          style={{ filter: 'drop-shadow(0 30px 60px rgba(22, 18, 14, 0.18))' }}
        >
          <div className="relative mx-auto aspect-[1.38/1] w-full">
          <motion.div
            initial={{ y: 0, scale: 1 }}
            animate={isOpening ? { y: [0, -4, 6], scale: [1, 1.01, 0.995] } : { y: 0, scale: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ y: '52%', opacity: 0, scale: 0.94 }}
              animate={
                isOpening
                  ? { y: ['52%', '24%', '-18%'], opacity: [0, 1, 1], scale: [0.94, 1, 1.02] }
                  : { y: '52%', opacity: 0, scale: 0.94 }
              }
              transition={{ duration: 1.45, times: [0, 0.36, 1], ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[15%] right-[15%] top-[5.5%] z-10 overflow-hidden rounded-[0.4rem]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(252, 249, 244, 1) 0%, rgba(245, 238, 226, 0.98) 100%)',
                border: '1px solid rgba(153, 131, 97, 0.26)',
                boxShadow: '0 18px 40px rgba(70, 51, 24, 0.15)',
              }}
            >
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(circle at 20% 22%, rgba(255,255,255,0.54), transparent 16%), radial-gradient(circle at 84% 78%, rgba(162, 137, 92, 0.08), transparent 24%)',
                }}
              />

              <div className="relative px-4 py-5 text-center sm:px-8 sm:py-8">
                <p
                  className="font-sans text-[8px] uppercase tracking-[0.42em] sm:text-[9px]"
                  style={{ color: 'rgba(127, 103, 67, 0.72)' }}
                >
                  Invitation
                </p>
                <p
                  className="mt-3 font-script text-[1.8rem] leading-none sm:text-[3rem]"
                  style={{ color: '#8b6532' }}
                >
                  <span>{config.couple.name1}</span>
                  <span className="inline-flex px-2 align-middle">
                    <Heart
                      size={16}
                      strokeWidth={1.9}
                      style={{ color: '#8b6532' }}
                      fill="none"
                      aria-hidden="true"
                    />
                  </span>
                  <span>{config.couple.name2}</span>
                </p>
                <div
                  className="mx-auto mt-4 h-px w-[82%]"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(155, 121, 70, 0.42), transparent)' }}
                />
                <p
                  className="mt-4 font-serif text-[0.9rem] italic leading-relaxed sm:text-[1.22rem]"
                  style={{ color: 'rgba(93, 68, 35, 0.88)' }}
                >
                  {config.wedding.date} {config.wedding.year} · {config.wedding.city}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={
                isOpening
                  ? { opacity: [1, 1, 0], y: [0, 6, 18] }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.9,
                delay: 1.05,
                times: [0, 0.35, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 overflow-hidden rounded-[0.8rem] sm:rounded-[1rem]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(220, 215, 203, 0.98) 0%, rgba(209, 202, 186, 0.98) 100%)',
              }}
            >
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(255,255,255,0.12), transparent 30%, rgba(123, 101, 66, 0.04) 80%)',
                }}
              />

              <div
                className="absolute inset-x-[1.5%] bottom-[2.5%] top-[4%] rounded-[0.7rem] sm:rounded-[0.9rem]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(219, 213, 198, 0.98) 0%, rgba(208, 199, 178, 0.98) 100%)',
                }}
              />

              <motion.div
                initial={{ x: '0%' }}
                animate={isOpening ? { x: ['0%', '-14%'] } : { x: '0%' }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-[4%] left-[1.5%] z-20 w-[48.8%] origin-right"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(216, 210, 194, 1) 0%, rgba(205, 196, 173, 0.98) 100%)',
                  clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                }}
              />

              <motion.div
                initial={{ x: '0%' }}
                animate={isOpening ? { x: ['0%', '14%'] } : { x: '0%' }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-y-[4%] right-[1.5%] z-20 w-[48.8%] origin-left"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(216, 210, 194, 1) 0%, rgba(205, 196, 173, 0.98) 100%)',
                  clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                }}
              />

              <div
                className="absolute inset-x-[1.5%] bottom-[2.5%] z-10 h-[53%]"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(217, 209, 190, 0.45), rgba(201, 188, 159, 0.98))',
                  clipPath: 'polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)',
                }}
              />

              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: -178 } : { rotateX: 0 }}
                transition={{ duration: 1.12, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-[1.5%] top-[4%] z-30 h-[53%] origin-top"
                style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(228, 221, 203, 1) 0%, rgba(214, 205, 182, 0.98) 100%)',
                    clipPath: 'polygon(0 0, 50% 96%, 100% 0)',
                    filter: 'drop-shadow(0 8px 18px rgba(72, 48, 18, 0.12))',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
          </div>
        </motion.button>

        <motion.div
          animate={isOpening ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-7 flex items-center gap-4"
          style={{ color: 'var(--accent-gold)' }}
        >
          <span
            className="h-px w-14"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }}
          />
          <span className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.34em]">
            <Heart size={13} strokeWidth={1.8} aria-hidden="true" />
            Ouvrir
          </span>
          <span
            className="h-px w-14"
            style={{ background: 'linear-gradient(270deg, transparent, var(--accent-gold))' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

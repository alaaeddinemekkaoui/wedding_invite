import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play, Volume2 } from 'lucide-react'
import { config } from '../data/config'

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const music = config.music

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = music.volume ?? 0.45
    audio.loop = music.loop ?? true

    const handleCanPlay = () => {
      setAudioReady(true)
      setAudioError(false)
    }

    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handleError = () => {
      setAudioReady(false)
      setAudioError(true)
      setIsPlaying(false)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('error', handleError)
    }
  }, [music.loop, music.volume])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
      setOpen(true)
    } catch {
      setAudioError(true)
      setAudioReady(false)
      setIsPlaying(false)
      setOpen(true)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      <audio ref={audioRef} preload="auto" src={music.src} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card max-w-[230px] rounded-2xl px-4 py-3 text-[11px]"
            style={{ color: 'var(--text-secondary)' }}
            role="tooltip"
          >
            <p className="mb-0.5 font-sans font-medium" style={{ color: 'var(--accent-gold)' }}>
              {music.title}
            </p>
            <p className="font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {audioError ? music.missingMessage : music.description}
            </p>
            {!audioError && (
              <p className="mt-2 flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent-gold)' }}>
                <Volume2 size={12} aria-hidden="true" />
                {isPlaying ? music.buttonPause : audioReady ? music.buttonPlay : 'Chargement'}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => setOpen((value) => !value)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.04 }}
          aria-label="Informations musicales"
          aria-expanded={open}
          className="h-10 w-10 rounded-full glass-card flex items-center justify-center transition-all duration-300"
          style={{ border: '1px solid var(--border-gold)' }}
        >
          <Music size={15} style={{ color: 'var(--accent-gold)' }} />
        </motion.button>

        <motion.button
          onClick={togglePlayback}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.04 }}
          aria-label={isPlaying ? music.buttonPause : music.buttonPlay}
          className="h-10 w-10 rounded-full glass-card flex items-center justify-center transition-all duration-300"
          style={{ border: '1px solid var(--border-gold)' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span
                key="pause"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Pause size={15} style={{ color: 'var(--accent-gold)' }} />
              </motion.span>
            ) : (
              <motion.span
                key="play"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Play size={15} style={{ color: 'var(--accent-gold)' }} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}

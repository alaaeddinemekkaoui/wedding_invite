import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { config } from '../data/config'

function scrollTo(href) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trap focus / close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const handleLink = (e, href) => {
    e.preventDefault()
    scrollTo(href)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-2xl shadow-sm'
            : 'py-5 bg-transparent'
        }`}
        style={
          scrolled
            ? {
                background: 'var(--bg-glass)',
                borderBottom: '1px solid var(--border-color)',
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#accueil"
            onClick={(e) => handleLink(e, '#accueil')}
            whileHover={{ scale: 1.04 }}
            className="inline-flex min-h-[2.5rem] items-center justify-center px-1.5 py-1 font-script leading-[1.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
            aria-label="Accueil — Ghita × Walid"
            style={{
              color: 'var(--accent-gold)',
              textShadow: '0 2px 12px rgba(201, 169, 110, 0.12)',
            }}
          >
            <span className="flex items-center gap-2 text-[1.85rem] sm:text-[1.95rem]">
              <span>G</span>
              <Heart
                size={15}
                strokeWidth={1.9}
                className="translate-y-[1px]"
                style={{ color: 'var(--accent-gold)' }}
                fill="none"
                aria-hidden="true"
              />
              <span>W</span>
            </span>
          </motion.a>

          {/* Desktop navigation */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
            {config.navbar.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="relative font-sans text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onFocus={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onBlur={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                  style={{ background: 'var(--accent-gold)' }}
                />
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
              style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                    <X size={16} style={{ color: 'var(--text-primary)' }} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}>
                    <Menu size={16} style={{ color: 'var(--text-primary)' }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[68px] left-0 right-0 z-40 md:hidden backdrop-blur-2xl"
            style={{
              background: 'var(--bg-glass)',
              borderBottom: '1px solid var(--border-color)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            }}
          >
            <div className="flex flex-col py-8 px-8 gap-7">
              {config.navbar.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.065, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => handleLink(e, link.href)}
                  className="font-sans text-sm tracking-[0.28em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] rounded"
                  style={{ color: 'var(--text-secondary)' }}
                  onFocus={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                  onBlur={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Gold line at bottom */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="h-[1px] origin-left"
                style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)', opacity: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

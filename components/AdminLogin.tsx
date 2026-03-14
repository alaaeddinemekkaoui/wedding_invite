'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'

interface AdminLoginProps {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Mot de passe requis')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message || 'Mot de passe incorrect')
        return
      }

      onLogin()
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-primary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-3xl p-10"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-card)' }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))', boxShadow: '0 4px 20px rgba(201,169,110,0.3)' }}>
            <Lock size={22} color="white" strokeWidth={1.8} />
          </div>
        </div>

        <h1 className="font-serif text-3xl italic text-center mb-2" style={{ color: 'var(--text-primary)' }}>Administration</h1>
        <p className="font-sans text-sm text-center mb-8" style={{ color: 'var(--text-muted)' }}>Accès réservé aux organisateurs</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <label htmlFor="admin-password" className="sr-only">Mot de passe</label>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Mot de passe"
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-10 rounded-xl font-sans text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent-gold)] focus:ring-offset-1"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded"
              style={{ color: 'var(--text-muted)' }}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm text-center" role="alert" style={{ color: 'var(--accent-blush)' }}>{error}</motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className="w-full py-3.5 rounded-full font-sans text-[11px] tracking-[0.26em] uppercase font-medium transition-all duration-300 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)]"
            style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

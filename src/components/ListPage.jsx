import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Users, MessageSquare, CalendarDays, RefreshCw } from 'lucide-react'

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('fr-MA', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return value
  }
}

export default function ListPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSubmissions = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/rsvp', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger la liste.')
      }

      setSubmissions(Array.isArray(data.submissions) ? data.submissions : [])
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={16} />
              Retour a l'invitation
            </a>
            <p
              className="font-sans text-[10px] tracking-[0.4em] uppercase mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              RSVP List
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl italic" style={{ color: 'var(--text-primary)' }}>
              Confirmations recues
            </h1>
          </div>

          <button
            type="button"
            onClick={loadSubmissions}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-full font-sans text-[11px] tracking-[0.22em] uppercase"
            style={{
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))',
              color: 'white',
            }}
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="rounded-[2rem] p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Chargement des confirmations...</p>
          </div>
        ) : error ? (
          <div className="rounded-[2rem] p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid rgba(217, 113, 113, 0.3)' }}>
            <p style={{ color: 'var(--accent-blush)' }}>{error}</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="rounded-[2rem] p-8 text-center" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Aucune confirmation enregistree pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {submissions.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.04, 0.25), duration: 0.35 }}
                className="rounded-[2rem] p-5 sm:p-6"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <h2 className="font-serif text-2xl italic" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      #{item.id}
                    </p>
                  </div>
                  <div
                    className="rounded-full px-3 py-1.5 text-xs font-sans uppercase tracking-[0.22em]"
                    style={{
                      background: 'rgba(201, 169, 110, 0.12)',
                      color: 'var(--accent-gold-dark)',
                    }}
                  >
                    {item.guests} people
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                    <Phone size={16} />
                    <span>{item.phone}</span>
                  </p>
                  <p className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                    <Users size={16} />
                    <span>{item.guests} total guest{item.guests > 1 ? 's' : ''}</span>
                  </p>
                  <p className="flex items-center gap-3" style={{ color: 'var(--text-secondary)' }}>
                    <CalendarDays size={16} />
                    <span>{formatDate(item.created_at)}</span>
                  </p>
                  <div className="flex items-start gap-3 pt-2" style={{ color: 'var(--text-secondary)' }}>
                    <MessageSquare size={16} className="mt-1 shrink-0" />
                    <p>{item.message || 'No message left.'}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

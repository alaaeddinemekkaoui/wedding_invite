'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Users, UserCheck, Search, Download, Trash2, RefreshCw } from 'lucide-react'

interface RSVPEntry {
  id: number
  name: string
  phone: string
  guest_count: number
  created_at: string
}

interface Stats {
  total_confirmations: number
  total_guests: number
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [entries, setEntries] = useState<RSVPEntry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [rsvpRes, statsRes] = await Promise.all([
        fetch('/api/rsvp'),
        fetch('/api/stats'),
      ])

      if (rsvpRes.status === 401 || statsRes.status === 401) {
        onLogout()
        return
      }

      const rsvpData = await rsvpRes.json()
      const statsData = await statsRes.json()

      if (rsvpData.success) setEntries(rsvpData.data)
      if (statsData.success) setStats(statsData.data)
    } catch {
      console.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [onLogout])

  useEffect(() => { fetchData() }, [fetchData])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // Ignore
    }
    onLogout()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette confirmation ?')) return
    setDeleting(id)
    try {
      const res = await fetch('/api/rsvp', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id))
        if (stats) {
          const deleted = entries.find((e) => e.id === id)
          if (deleted) {
            setStats({
              total_confirmations: stats.total_confirmations - 1,
              total_guests: stats.total_guests - deleted.guest_count,
            })
          }
        }
      }
    } catch {
      console.error('Delete failed')
    } finally {
      setDeleting(null)
    }
  }

  const handleExportCSV = () => {
    const header = 'Nom,Téléphone,Accompagnants,Date\n'
    const rows = filtered
      .map((e) => `"${e.name}","${e.phone}",${e.guest_count},"${new Date(e.created_at).toLocaleString('fr-FR')}"`)
      .join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvp-export-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase()
    return e.name.toLowerCase().includes(q) || e.phone.includes(q)
  })

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-soft)',
    borderRadius: '16px',
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-2xl px-6 py-4" style={{ background: 'var(--bg-glass)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl italic" style={{ color: 'var(--text-primary)' }}>
            Dashboard Admin
          </h1>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={fetchData}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Actualiser"
            >
              <RefreshCw size={16} />
            </motion.button>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <LogOut size={13} />
              Déconnexion
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="p-6" style={cardStyle}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))' }}>
                <UserCheck size={18} color="white" />
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Confirmations</span>
            </div>
            <p className="font-serif text-4xl" style={{ color: 'var(--text-primary)' }}>
              {loading ? '—' : stats?.total_confirmations ?? 0}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="p-6" style={cardStyle}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))' }}>
                <Users size={18} color="white" />
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Total Invités</span>
            </div>
            <p className="font-serif text-4xl" style={{ color: 'var(--text-primary)' }}>
              {loading ? '—' : stats?.total_guests ?? 0}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="p-6 sm:col-span-2 lg:col-span-1" style={cardStyle}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark))' }}>
                <Users size={18} color="white" />
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Dernière Entrée</span>
            </div>
            <p className="font-serif text-lg" style={{ color: 'var(--text-primary)' }}>
              {loading ? '—' : entries.length > 0 ? new Date(entries[0].created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) : 'Aucune'}
            </p>
          </motion.div>
        </div>

        {/* Table section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden" style={cardStyle}>
          {/* Table header */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <h2 className="font-serif text-xl italic" style={{ color: 'var(--text-primary)' }}>Liste des Confirmations</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Rechercher…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg font-sans text-sm outline-none transition-all"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', width: '200px' }}
                  aria-label="Rechercher par nom ou téléphone"
                />
              </div>
              <motion.button
                onClick={handleExportCSV}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-sans text-[11px] tracking-[0.15em] uppercase"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                aria-label="Exporter en CSV"
              >
                <Download size={13} />
                CSV
              </motion.button>
            </div>
          </div>

          {/* Table body */}
          {loading ? (
            <div className="p-16 text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 rounded-full mx-auto mb-4" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--accent-gold)' }} />
              <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>Chargement…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Users size={40} className="mx-auto mb-4" style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
              <p className="font-serif italic text-lg" style={{ color: 'var(--text-muted)' }}>
                {search ? 'Aucun résultat trouvé' : 'Aucune confirmation pour le moment'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th className="text-left px-6 py-4 font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Nom</th>
                    <th className="text-left px-6 py-4 font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Téléphone</th>
                    <th className="text-center px-6 py-4 font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Accompagnants</th>
                    <th className="text-left px-6 py-4 font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Date</th>
                    <th className="w-12 px-4 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((entry) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="group transition-colors"
                        style={{ borderBottom: '1px solid var(--border-color)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td className="px-6 py-4 font-sans text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{entry.name}</td>
                        <td className="px-6 py-4 font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>{entry.phone}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full font-sans text-sm font-medium" style={{ background: 'rgba(201,169,110,0.12)', color: 'var(--accent-gold)' }}>
                            {entry.guest_count}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-sans text-xs" style={{ color: 'var(--text-muted)' }}>
                          {new Date(entry.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-4">
                          <motion.button
                            onClick={() => handleDelete(entry.id)}
                            disabled={deleting === entry.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                            style={{ color: 'var(--accent-blush)' }}
                            aria-label={`Supprimer ${entry.name}`}
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}

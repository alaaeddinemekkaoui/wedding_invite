'use client'

import { useState, useEffect } from 'react'
import AdminLogin from '@/components/AdminLogin'
import AdminDashboard from '@/components/AdminDashboard'
import { ThemeProvider } from '@/components/ThemeProvider'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if already authenticated by trying to fetch stats
    fetch('/api/stats')
      .then((res) => {
        if (res.ok) setAuthenticated(true)
      })
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--border-color)', borderTopColor: 'var(--accent-gold)' }} />
      </div>
    )
  }

  return authenticated ? (
    <AdminDashboard onLogout={() => setAuthenticated(false)} />
  ) : (
    <AdminLogin onLogin={() => setAuthenticated(true)} />
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Ghita × Walid — Invitation de Mariage',
  description:
    'Vous êtes chaleureusement invités à célébrer notre mariage — 17 Avril, Salle Dar Bassidi, Fès',
  openGraph: {
    title: 'Ghita × Walid — Invitation de Mariage',
    description:
      'Vous êtes chaleureusement invités à célébrer notre mariage — 17 Avril, Salle Dar Bassidi, Fès',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

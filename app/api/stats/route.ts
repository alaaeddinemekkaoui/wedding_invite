import { NextResponse } from 'next/server'
import { getRSVPStats } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json(
        { success: false, message: 'Non autorisé' },
        { status: 401 }
      )
    }

    const stats = await getRSVPStats()
    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error('Stats GET error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

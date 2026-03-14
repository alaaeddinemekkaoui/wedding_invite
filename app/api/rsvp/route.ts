import { NextRequest, NextResponse } from 'next/server'
import { validateRSVP } from '@/lib/validators'
import { insertRSVP, getAllRSVPs } from '@/lib/db'
import { isAuthenticated } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { valid, errors, sanitized } = validateRSVP(body)

    if (!valid || !sanitized) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const row = await insertRSVP(
      sanitized.name,
      sanitized.phone,
      sanitized.guest_count
    )

    return NextResponse.json({ success: true, data: row }, { status: 201 })
  } catch (error) {
    console.error('RSVP POST error:', error)

    const message =
      error instanceof Error && error.message.includes('DATABASE_URL')
        ? 'Configuration base de donnees manquante sur le serveur.'
        : 'Erreur serveur. Veuillez reessayer.'

    return NextResponse.json(
      { success: false, errors: [{ field: 'server', message }] },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const authed = await isAuthenticated()
    if (!authed) {
      return NextResponse.json(
        { success: false, message: 'Non autorise' },
        { status: 401 }
      )
    }

    const rsvps = await getAllRSVPs()
    return NextResponse.json({ success: true, data: rsvps })
  } catch (error) {
    console.error('RSVP GET error:', error)

    const message =
      error instanceof Error && error.message.includes('DATABASE_URL')
        ? 'Configuration base de donnees manquante sur le serveur.'
        : 'Erreur serveur'

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    )
  }
}

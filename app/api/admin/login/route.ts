import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''

    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Mot de passe requis' },
        { status: 400 }
      )
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, message: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }

    await createSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 60 * 60 * 24 // 24 hours in seconds

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) {
    throw new Error(
      'ADMIN_PASSWORD environment variable is not set. ' +
        'Please add it to your .env.local or Vercel environment variables.'
    )
  }
  return pw
}

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || 'default-dev-secret-change-in-production-please'
}

function signToken(payload: string): string {
  const secret = getSessionSecret()
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  return hmac.digest('hex')
}

function createSessionToken(): string {
  const timestamp = Date.now().toString()
  const signature = signToken(timestamp)
  return `${timestamp}.${signature}`
}

function verifySessionToken(token: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [timestamp, signature] = parts
  const expectedSignature = signToken(timestamp)

  // Timing-safe comparison
  if (signature.length !== expectedSignature.length) return false

  const sigBuffer = Buffer.from(signature, 'hex')
  const expectedBuffer = Buffer.from(expectedSignature, 'hex')

  if (sigBuffer.length !== expectedBuffer.length) return false

  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false

  // Check expiration
  const ts = parseInt(timestamp, 10)
  if (isNaN(ts)) return false

  const age = (Date.now() - ts) / 1000
  return age < SESSION_DURATION
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword()
  if (password.length !== expected.length) return false
  return crypto.timingSafeEqual(
    Buffer.from(password),
    Buffer.from(expected)
  )
}

export async function createSession(): Promise<void> {
  const token = createSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token)
}

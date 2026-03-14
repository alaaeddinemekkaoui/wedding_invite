import { neon } from '@neondatabase/serverless'

let schemaReadyPromise: Promise<void> | null = null

function getDbUrl(): string {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
        'Please add it to your .env.local file or Vercel environment variables.'
    )
  }
  return url
}

export function getDb() {
  return neon(getDbUrl())
}

async function ensureDatabaseSchema() {
  if (!schemaReadyPromise) {
    const sql = getDb()
    schemaReadyPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS rsvp (
          id SERIAL PRIMARY KEY,
          name VARCHAR(200) NOT NULL,
          phone VARCHAR(30) NOT NULL,
          guest_count INTEGER NOT NULL DEFAULT 0,
          message TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `

      await sql`
        ALTER TABLE rsvp
        ADD COLUMN IF NOT EXISTS message TEXT
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp (created_at DESC)
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_rsvp_name ON rsvp (name)
      `
    })()
  }

  await schemaReadyPromise
}

/**
 * Initialize the database schema.
 * Call this once during setup or use the SQL in schema/init.sql manually.
 */
export async function initializeDatabase() {
  await ensureDatabaseSchema()
}

export interface RSVPRow {
  id: number
  name: string
  phone: string
  guest_count: number
  message: string
  created_at: string
}

export async function insertRSVP(
  name: string,
  phone: string,
  guestCount: number,
  message?: string
): Promise<RSVPRow> {
  await ensureDatabaseSchema()
  const sql = getDb()
  const sanitizedMessage = message?.trim() ?? ''
  const rows = await sql`
    INSERT INTO rsvp (name, phone, guest_count, message)
    VALUES (${name}, ${phone}, ${guestCount}, ${sanitizedMessage})
    RETURNING id, name, phone, guest_count, message, created_at
  `
  return rows[0] as RSVPRow
}

export async function getAllRSVPs(): Promise<RSVPRow[]> {
  await ensureDatabaseSchema()
  const sql = getDb()
  const rows = await sql`
    SELECT id, name, phone, guest_count, COALESCE(message, '') AS message, created_at
    FROM rsvp
    ORDER BY created_at DESC
  `
  return rows as RSVPRow[]
}

export async function deleteRSVP(id: number): Promise<boolean> {
  await ensureDatabaseSchema()
  const sql = getDb()
  const rows = await sql`
    DELETE FROM rsvp WHERE id = ${id} RETURNING id
  `
  return rows.length > 0
}

export async function getRSVPStats(): Promise<{
  total_confirmations: number
  total_guests: number
}> {
  await ensureDatabaseSchema()
  const sql = getDb()
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total_confirmations,
      COALESCE(SUM(guest_count), 0)::int AS total_guests
    FROM rsvp
  `
  return rows[0] as { total_confirmations: number; total_guests: number }
}

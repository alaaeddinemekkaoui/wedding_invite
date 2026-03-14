import { neon } from '@neondatabase/serverless'

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

/**
 * Initialize the database schema.
 * Call this once during setup or use the SQL in schema/init.sql manually.
 */
export async function initializeDatabase() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS rsvp (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      guest_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export interface RSVPRow {
  id: number
  name: string
  phone: string
  guest_count: number
  created_at: string
}

export async function insertRSVP(
  name: string,
  phone: string,
  guestCount: number
): Promise<RSVPRow> {
  const sql = getDb()
  const rows = await sql`
    INSERT INTO rsvp (name, phone, guest_count)
    VALUES (${name}, ${phone}, ${guestCount})
    RETURNING id, name, phone, guest_count, created_at
  `
  return rows[0] as RSVPRow
}

export async function getAllRSVPs(): Promise<RSVPRow[]> {
  const sql = getDb()
  const rows = await sql`
    SELECT id, name, phone, guest_count, created_at
    FROM rsvp
    ORDER BY created_at DESC
  `
  return rows as RSVPRow[]
}

export async function deleteRSVP(id: number): Promise<boolean> {
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
  const sql = getDb()
  const rows = await sql`
    SELECT
      COUNT(*)::int AS total_confirmations,
      COALESCE(SUM(guest_count), 0)::int AS total_guests
    FROM rsvp
  `
  return rows[0] as { total_confirmations: number; total_guests: number }
}

import { Pool } from 'pg'

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
    })
  : null

let tableReadyPromise

export function assertDatabaseConfigured() {
  if (!pool) {
    throw new Error('Database connection is missing. Add POSTGRES_URL or DATABASE_URL.')
  }
}

export function validateSubmission({ name, phone, guests, message = '' }) {
  const trimmedName = typeof name === 'string' ? name.trim() : ''
  const trimmedPhone = typeof phone === 'string' ? phone.trim() : ''
  const trimmedMessage = typeof message === 'string' ? message.trim() : ''
  const guestCount = Number.parseInt(guests, 10)

  if (trimmedName.length < 2) {
    return { error: 'Name is required.', status: 400 }
  }

  if (!/^[+\d\s\-()]{7,}$/.test(trimmedPhone)) {
    return { error: 'Phone number is invalid.', status: 400 }
  }

  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20) {
    return { error: 'Guest count must be between 1 and 20.', status: 400 }
  }

  return {
    data: {
      name: trimmedName,
      phone: trimmedPhone,
      guests: guestCount,
      message: trimmedMessage,
    },
  }
}

export async function ensureRsvpTable() {
  assertDatabaseConfigured()

  if (!tableReadyPromise) {
    tableReadyPromise = pool.query(`
      CREATE TABLE IF NOT EXISTS rsvp_confirmations (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        guests INTEGER NOT NULL,
        message TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
  }

  await tableReadyPromise
}

export async function createRsvpSubmission(input) {
  assertDatabaseConfigured()
  await ensureRsvpTable()

  const result = await pool.query(
    `
      INSERT INTO rsvp_confirmations (name, phone, guests, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at;
    `,
    [input.name, input.phone, input.guests, input.message || null]
  )

  return result.rows[0]
}

export async function listRsvpSubmissions() {
  assertDatabaseConfigured()
  await ensureRsvpTable()

  const result = await pool.query(`
    SELECT id, name, phone, guests, message, created_at
    FROM rsvp_confirmations
    ORDER BY created_at DESC;
  `)

  return result.rows
}

import {
  assertDatabaseConfigured,
  createRsvpSubmission,
  listRsvpSubmissions,
  validateSubmission,
} from '../lib/rsvpStore.js'

function json(body, init = {}) {
  return Response.json(body, {
    headers: {
      'Cache-Control': 'no-store',
    },
    ...init,
  })
}

export async function GET() {
  try {
    assertDatabaseConfigured()
    const submissions = await listRsvpSubmissions()
    return json({ submissions })
  } catch (error) {
    const message = error.message?.includes('Database connection is missing')
      ? error.message
      : 'Unable to load RSVPs right now.'

    console.error('RSVP list failed:', error)
    return json({ error: message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    assertDatabaseConfigured()

    const payload = await request.json()
    const validation = validateSubmission(payload ?? {})

    if (validation.error) {
      return json({ error: validation.error }, { status: validation.status })
    }

    const submission = await createRsvpSubmission(validation.data)
    return json({ success: true, submission }, { status: 201 })
  } catch (error) {
    const message = error.message?.includes('Database connection is missing')
      ? error.message
      : 'Unable to save RSVP right now.'

    console.error('RSVP save failed:', error)
    return json({ error: message }, { status: 500 })
  }
}

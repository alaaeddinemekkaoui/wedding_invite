import http from 'node:http'
import {
  assertDatabaseConfigured,
  createRsvpSubmission,
  listRsvpSubmissions,
  validateSubmission,
} from '../lib/rsvpStore.js'

const port = Number.parseInt(process.env.API_PORT || '3001', 10)

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(body))
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    sendJson(res, 404, { error: 'Not found' })
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)

  if (url.pathname !== '/api/rsvp') {
    sendJson(res, 404, { error: 'Not found' })
    return
  }

  try {
    assertDatabaseConfigured()

    if (req.method === 'GET') {
      const submissions = await listRsvpSubmissions()
      sendJson(res, 200, { submissions })
      return
    }

    if (req.method === 'POST') {
      let rawBody = ''

      for await (const chunk of req) {
        rawBody += chunk
      }

      const payload = rawBody ? JSON.parse(rawBody) : {}
      const validation = validateSubmission(payload)

      if (validation.error) {
        sendJson(res, validation.status, { error: validation.error })
        return
      }

      const submission = await createRsvpSubmission(validation.data)
      sendJson(res, 201, { success: true, submission })
      return
    }

    sendJson(res, 405, { error: 'Method not allowed' })
  } catch (error) {
    const message = error.message?.includes('Database connection is missing')
      ? error.message
      : req.method === 'GET'
        ? 'Unable to load RSVPs right now.'
        : 'Unable to save RSVP right now.'

    console.error('Local RSVP API failed:', error)
    sendJson(res, 500, { error: message })
  }
})

server.listen(port, () => {
  console.log(`Local RSVP API listening on http://localhost:${port}`)
})

export interface RSVPInput {
  name: string
  phone: string
  guest_count: number
}

export interface ValidationError {
  field: string
  message: string
}

export function validateRSVP(data: unknown): {
  valid: boolean
  errors: ValidationError[]
  sanitized?: RSVPInput
} {
  const errors: ValidationError[] = []

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: [{ field: 'body', message: 'Invalid request body' }] }
  }

  const body = data as Record<string, unknown>

  // Name validation
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  if (!name) {
    errors.push({ field: 'name', message: 'Le nom est requis' })
  } else if (name.length < 2) {
    errors.push({ field: 'name', message: 'Le nom est trop court' })
  } else if (name.length > 200) {
    errors.push({ field: 'name', message: 'Le nom est trop long' })
  }

  // Phone validation
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  if (!phone) {
    errors.push({ field: 'phone', message: 'Le numéro de téléphone est requis' })
  } else if (!/^[+\d\s\-()]{7,20}$/.test(phone)) {
    errors.push({ field: 'phone', message: 'Numéro de téléphone invalide' })
  }

  // Guest count validation
  const guestRaw = body.guest_count
  const guestCount =
    typeof guestRaw === 'number'
      ? guestRaw
      : typeof guestRaw === 'string'
        ? parseInt(guestRaw, 10)
        : NaN

  if (isNaN(guestCount) || guestCount < 0) {
    errors.push({ field: 'guest_count', message: 'Le nombre d\'accompagnants est requis' })
  } else if (guestCount > 50) {
    errors.push({ field: 'guest_count', message: 'Maximum 50 accompagnants' })
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    errors: [],
    sanitized: {
      name: name.replace(/[<>]/g, ''),
      phone: phone.replace(/[<>]/g, ''),
      guest_count: guestCount,
    },
  }
}

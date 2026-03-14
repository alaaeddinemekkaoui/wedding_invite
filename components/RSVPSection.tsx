'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { config } from '@/data/wedding-config'

interface FormData {
  name: string
  phone: string
  guest_count: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  guest_count?: string
  message?: string
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[10px] tracking-[0.36em] uppercase" style={{ color: error ? 'var(--accent-blush)' : 'var(--text-muted)' }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="font-sans text-xs" role="alert" style={{ color: 'var(--accent-blush)' }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-primary)',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'Montserrat, sans-serif',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

function StyledInput({ hasError, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)

  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        borderColor: hasError ? 'var(--accent-blush)' : focused ? 'var(--accent-gold)' : 'var(--border-color)',
        boxShadow: focused ? '0 0 0 3px rgba(177, 31, 38, 0.1)' : 'none',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function StyledTextarea({ hasError, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasError?: boolean }) {
  const [focused, setFocused] = useState(false)

  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        minHeight: '120px',
        resize: 'vertical',
        borderColor: hasError ? 'var(--accent-blush)' : focused ? 'var(--accent-gold)' : 'var(--border-color)',
        boxShadow: focused ? '0 0 0 3px rgba(177, 31, 38, 0.1)' : 'none',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function SuccessState() {
  const { rsvp, couple } = config

  return (
    <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center py-12 px-8 gap-6" role="status" aria-live="polite">
      <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.5 }}>
        <CheckCircle2 size={56} style={{ color: 'var(--accent-gold)' }} strokeWidth={1.5} />
      </motion.div>
      <div>
        <h3 className="font-serif text-3xl italic mb-3 text-gradient-gold">{rsvp.successHeading}</h3>
        <p className="font-serif italic text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rsvp.successMessage}</p>
      </div>
      <div className="flex items-center gap-3 mt-2" aria-hidden="true">
        <span className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }} />
        <span className="font-script text-2xl text-gradient-gold">{couple.combined}</span>
        <span className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)' }} />
      </div>
    </motion.div>
  )
}

export default function RSVPSection() {
  const { rsvp } = config
  const [form, setForm] = useState<FormData>({ name: '', phone: '', guest_count: '0', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = (): FormErrors => {
    const next: FormErrors = {}

    if (!form.name.trim()) next.name = 'Veuillez entrer votre nom'
    else if (form.name.trim().length < 2) next.name = 'Nom trop court'

    if (!form.phone.trim()) next.phone = 'Veuillez entrer votre numero de telephone'
    else if (!/^[+\d\s\-()]{7,}$/.test(form.phone.trim())) next.phone = 'Numero de telephone invalide'

    const guestCount = parseInt(form.guest_count, 10)
    if (isNaN(guestCount) || guestCount < 0) next.guest_count = 'Nombre invalide'
    else if (guestCount > 50) next.guest_count = 'Maximum 50 accompagnants'

    if (form.message.trim().length > 1000) next.message = 'Le message est trop long'

    return next
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (serverError) setServerError('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`rsvp-${firstKey}`)?.focus()
      return
    }

    setSubmitting(true)
    setServerError('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          guest_count: parseInt(form.guest_count, 10),
          message: form.message.trim(),
        }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        const msg = data.errors?.[0]?.message || 'Une erreur est survenue. Veuillez reessayer.'
        setServerError(msg)
        return
      }

      setSubmitted(true)
    } catch {
      setServerError('Erreur de connexion. Veuillez reessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="section-padding px-6" aria-labelledby="rsvp-heading">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-12">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4" style={{ color: 'var(--accent-gold)' }}>{rsvp.eyebrow}</p>
          <h2 id="rsvp-heading" className="font-serif text-4xl md:text-5xl italic mb-4" style={{ color: 'var(--text-primary)' }}>{rsvp.heading}</h2>
          <p className="font-serif italic text-lg" style={{ color: 'var(--text-secondary)' }}>{rsvp.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: 0.05, duration: 0.7 }} className="text-center mb-8">
          <p className="font-serif italic text-base leading-relaxed" style={{ color: 'var(--accent-gold)' }}>{rsvp.message}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessState key="success" />
            ) : (
              <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit} noValidate className="p-8 md:p-10 flex flex-col gap-6" aria-label="Formulaire de confirmation de presence">
                <div className="h-[2px] -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-2" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold), var(--accent-gold-light), var(--accent-gold), transparent)' }} aria-hidden="true" />

                <Field label={rsvp.fields.name} error={errors.name}>
                  <StyledInput id="rsvp-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Votre nom complet" autoComplete="name" hasError={!!errors.name} aria-required="true" aria-invalid={!!errors.name} />
                </Field>

                <Field label={rsvp.fields.phone} error={errors.phone}>
                  <StyledInput id="rsvp-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+212 6 00 00 00 00" autoComplete="tel" hasError={!!errors.phone} aria-required="true" aria-invalid={!!errors.phone} />
                </Field>

                <Field label={rsvp.fields.guests} error={errors.guest_count}>
                  <StyledInput id="rsvp-guest_count" type="number" name="guest_count" value={form.guest_count} onChange={handleChange} min="0" max="50" hasError={!!errors.guest_count} aria-required="true" aria-invalid={!!errors.guest_count} />
                </Field>

                <Field label={rsvp.fields.message} error={errors.message}>
                  <StyledTextarea
                    id="rsvp-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Laissez un petit mot aux maries..."
                    hasError={!!errors.message}
                    aria-invalid={!!errors.message}
                  />
                </Field>

                {serverError && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-sm text-center" role="alert" style={{ color: 'var(--accent-blush)' }}>{serverError}</motion.p>
                )}

                <motion.button type="submit" disabled={submitting} whileHover={!submitting ? { scale: 1.03, y: -2, boxShadow: '0 14px 40px rgba(177,31,38,0.28)' } : {}} whileTap={!submitting ? { scale: 0.97 } : {}} className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-[11px] tracking-[0.26em] uppercase font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-gold)]" style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }} aria-busy={submitting}>
                  {submitting ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block" aria-hidden="true" />
                      {rsvp.submittingLabel}
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2} aria-hidden="true" />
                      {rsvp.submitLabel}
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send, User, Phone, Users, MessageSquare } from 'lucide-react'
import { config } from '../data/config'

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-sans text-[10px] tracking-[0.36em] uppercase"
        style={{ color: error ? 'var(--accent-blush)' : 'var(--text-muted)' }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-sans text-xs"
            role="alert"
            style={{ color: 'var(--accent-blush)' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputBase = {
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

function StyledInput({ hasError, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{
        ...inputBase,
        borderColor: hasError ? 'var(--accent-blush)' : focused ? 'var(--accent-gold)' : 'var(--border-color)',
        boxShadow: focused ? '0 0 0 3px rgba(201, 169, 110, 0.12)' : 'none',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function StyledTextarea({ hasError, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      {...props}
      rows={4}
      style={{
        ...inputBase,
        resize: 'vertical',
        minHeight: '100px',
        borderColor: hasError ? 'var(--accent-blush)' : focused ? 'var(--accent-gold)' : 'var(--border-color)',
        boxShadow: focused ? '0 0 0 3px rgba(201, 169, 110, 0.12)' : 'none',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    />
  )
}

function StyledSelect({ hasError, children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <select
      {...props}
      style={{
        ...inputBase,
        appearance: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
        borderColor: hasError ? 'var(--accent-blush)' : focused ? 'var(--accent-gold)' : 'var(--border-color)',
        boxShadow: focused ? '0 0 0 3px rgba(201, 169, 110, 0.12)' : 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 4L6 8L10 4' stroke='%23C9A96E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 14px center',
        paddingRight: '36px',
      }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e) }}
    >
      {children}
    </select>
  )
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-12 px-8 gap-6"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.5 }}
      >
        <CheckCircle2 size={56} style={{ color: 'var(--accent-gold)' }} strokeWidth={1.5} />
      </motion.div>
      <div>
        <h3 className="font-serif text-3xl italic mb-3 text-gradient-gold">
          {config.rsvp.successHeading}
        </h3>
        <p className="font-serif italic text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {config.rsvp.successMessage}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-2" aria-hidden="true">
        <span className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))' }} />
        <span className="font-script text-2xl text-gradient-gold">{config.couple.combined}</span>
        <span className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)' }} />
      </div>
    </motion.div>
  )
}

export default function RSVPSection() {
  const { rsvp } = config

  const [form, setForm] = useState({
    name: '',
    phone: '',
    guests: '1',
    attending: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Veuillez entrer votre nom complet'
    else if (form.name.trim().length < 2) next.name = 'Nom trop court'

    if (!form.phone.trim()) next.phone = 'Veuillez entrer votre numéro de téléphone'
    else if (!/^[+\d\s\-()]{7,}$/.test(form.phone.trim())) next.phone = 'Numéro de téléphone invalide'

    const g = parseInt(form.guests, 10)
    if (!form.guests || isNaN(g) || g < 1) next.guests = 'Minimum 1 invité'
    else if (g > 20) next.guests = 'Maximum 20 invités'

    if (!form.attending) next.attending = 'Veuillez indiquer votre présence'

    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field
      const firstKey = Object.keys(validationErrors)[0]
      document.getElementById(`rsvp-${firstKey}`)?.focus()
      return
    }

    setSubmitting(true)

    // ── To connect to a real backend, replace this block: ──────────────
    // await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // })
    // ────────────────────────────────────────────────────────────────────

    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="section-padding px-6" aria-labelledby="rsvp-heading">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            {rsvp.eyebrow}
          </p>
          <h2
            id="rsvp-heading"
            className="font-serif text-4xl md:text-5xl italic mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {rsvp.heading}
          </h2>
          <p className="font-serif italic text-lg" style={{ color: 'var(--text-secondary)' }}>
            {rsvp.subtitle}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
            boxShadow: 'var(--shadow-card)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessState key="success" />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
                className="p-8 md:p-10 flex flex-col gap-6"
                aria-label="Formulaire de confirmation de présence"
              >
                {/* Gold top accent */}
                <div
                  className="h-[2px] -mx-8 md:-mx-10 -mt-8 md:-mt-10 mb-2"
                  style={{
                    background: 'linear-gradient(90deg, transparent, var(--accent-gold), var(--accent-gold-light), var(--accent-gold), transparent)',
                  }}
                  aria-hidden="true"
                />

                {/* Name */}
                <Field label={rsvp.fields.name} error={errors.name}>
                  <div className="relative">
                    <StyledInput
                      id="rsvp-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      autoComplete="name"
                      hasError={!!errors.name}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'rsvp-name-error' : undefined}
                    />
                  </div>
                </Field>

                {/* Phone */}
                <Field label={rsvp.fields.phone} error={errors.phone}>
                  <StyledInput
                    id="rsvp-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+212 6 00 00 00 00"
                    autoComplete="tel"
                    hasError={!!errors.phone}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                </Field>

                {/* Guests & Attending — two columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label={rsvp.fields.guests} error={errors.guests}>
                    <StyledInput
                      id="rsvp-guests"
                      type="number"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      min="1"
                      max="20"
                      hasError={!!errors.guests}
                      aria-required="true"
                      aria-invalid={!!errors.guests}
                    />
                  </Field>

                  <Field label={rsvp.fields.attending} error={errors.attending}>
                    <StyledSelect
                      id="rsvp-attending"
                      name="attending"
                      value={form.attending}
                      onChange={handleChange}
                      hasError={!!errors.attending}
                      aria-required="true"
                      aria-invalid={!!errors.attending}
                    >
                      <option value="" disabled>Choisir…</option>
                      {rsvp.attendingOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </StyledSelect>
                  </Field>
                </div>

                {/* Message */}
                <Field label={rsvp.fields.message} error={errors.message}>
                  <StyledTextarea
                    id="rsvp-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Un message pour les mariés… (optionnel)"
                    hasError={!!errors.message}
                  />
                </Field>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={!submitting ? { scale: 1.03, y: -2, boxShadow: '0 14px 40px rgba(201,169,110,0.35)' } : {}}
                  whileTap={!submitting ? { scale: 0.97 } : {}}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans text-[11px] tracking-[0.26em] uppercase font-medium transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent-gold)]"
                  style={{ background: 'var(--accent-gold)', color: 'var(--bg-primary)' }}
                  aria-busy={submitting}
                >
                  {submitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full inline-block"
                        aria-hidden="true"
                      />
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

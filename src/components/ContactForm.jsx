import { useRef, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Lock,
  Send,
} from 'lucide-react'
import { portfolio } from '../data/portfolio'

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  else if (values.name.trim().length > 80) errors.name = 'Name must be 80 characters or fewer.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'

  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  else if (values.subject.trim().length > 120) errors.subject = 'Subject must be 120 characters or fewer.'

  if (!values.message.trim()) errors.message = 'Please write a message.'
  else if (values.message.trim().length < 20)
    errors.message = 'Please write at least 20 characters so the message is useful.'
  else if (values.message.trim().length > 3000)
    errors.message = 'Message must be 3,000 characters or fewer.'

  return errors
}

/** Only same-origin paths or HTTPS endpoints are accepted. */
function safeEndpoint(raw) {
  if (!raw) return ''
  if (raw.startsWith('/')) return raw
  try {
    const url = new URL(raw)
    if (url.protocol === 'https:') return url.toString()
    if (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)) {
      return url.toString()
    }
  } catch {
    return ''
  }
  return ''
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-1.5 text-[11px] font-medium text-red-400">
      {message}
    </p>
  )
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const endpoint = safeEndpoint(portfolio.contact.endpoint)

  const handleChange = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)

    if (touched[name]) {
      setErrors(validate(next))
    }

    if (status !== 'idle' && status !== 'submitting') {
      setStatus('idle')
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((previous) => ({ ...previous, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      })
      return
    }

    // Honeypot: real visitors never see or fill this field.
    if (values.website.trim()) {
      return
    }

    if (!endpoint) {
      setStatus('unconfigured')
      return
    }

    setStatus('submitting')
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12000)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          website: values.website,
        }),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setStatus('sent')
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div aria-live="polite">
        {status === 'sent' ? (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-emerald/35 bg-emerald/[0.07] px-4 py-3">
            <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7ee2a6]" />
            <div>
              <p className="text-xs font-semibold text-[#a7f3c6]">Message sent.</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                The configured endpoint accepted your message. A reply will use the email address you
                provided.
              </p>
            </div>
          </div>
        ) : null}

        {status === 'unconfigured' ? (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-[#fbbf24]/30 bg-[#fbbf24]/[0.05] px-4 py-3">
            <AlertTriangle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#fbbf24]" />
            <div>
              <p className="text-xs font-semibold text-bright">Nothing was sent.</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                {portfolio.contact.email
                  ? 'No form backend is connected yet, so nothing was sent. Please use the published email channel instead.'
                  : 'No form backend is connected yet and no public email address has been published, so this message has not been delivered anywhere. Your text remains in the form.'}
              </p>
              <p className="mt-2 break-words font-mono text-[9.5px] text-[#5d6e64]">
                {portfolio.contact.endpointNote}
              </p>
            </div>
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-400/30 bg-red-400/[0.05] px-4 py-3">
            <AlertTriangle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-red-400" />
            <div>
              <p className="text-xs font-semibold text-red-300">Message was not delivered.</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                The configured endpoint did not accept the request. Please try again later.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Honeypot — hidden from visitors and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-[11px] font-medium text-[#b7c4bc]">
            Full Name <span className="text-neon">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            aria-required="true"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
            className="field"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name ? <FieldError id="contact-name-error" message={errors.name} /> : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-[11px] font-medium text-[#b7c4bc]">
            Email <span className="text-neon">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            required
            aria-required="true"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
            className="field"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email ? <FieldError id="contact-email-error" message={errors.email} /> : null}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-subject" className="mb-1.5 block text-[11px] font-medium text-[#b7c4bc]">
          Subject <span className="text-neon">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={120}
          required
          aria-required="true"
          aria-invalid={touched.subject && !!errors.subject}
          aria-describedby={touched.subject && errors.subject ? 'contact-subject-error' : undefined}
          className="field"
          placeholder="What would you like to discuss?"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.subject ? <FieldError id="contact-subject-error" message={errors.subject} /> : null}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label htmlFor="contact-message" className="text-[11px] font-medium text-[#b7c4bc]">
            Message <span className="text-neon">*</span>
          </label>
          <span className="font-mono text-[9px] text-[#5d6e64]">
            {values.message.trim().length}/3000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={3000}
          required
          aria-required="true"
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={
            touched.message && errors.message
              ? 'contact-message-error'
              : 'contact-message-hint'
          }
          className="field min-h-[130px] resize-y"
          placeholder="Share context, a question, or a project idea. Minimum 20 characters."
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p id="contact-message-hint" className="mt-1.5 text-[10px] text-[#5d6e64]">
          Do not include passwords, private keys, or other sensitive credentials.
        </p>
        {touched.message ? <FieldError id="contact-message-error" message={errors.message} /> : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 size={16} aria-hidden="true" className="animate-spin" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </button>

        <p className="flex items-center gap-1.5 text-[10px] leading-relaxed text-[#5d6e64]">
          <Lock size={11} aria-hidden="true" className="shrink-0" />
          Honeypot protected. Nothing is stored in your browser.
        </p>
      </div>
    </form>
  )
}

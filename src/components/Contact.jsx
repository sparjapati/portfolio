import React, { useEffect, useMemo, useRef, useState } from 'react'
import RevealSection from './RevealSection'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useDebounce } from '../hooks/useDebounce'
import './Contact.css'

// Anti-spam tuning. None of this is a real wall — the EmailJS keys are in the
// bundle — but it stops drive-by bots and accidental double-sends.
const SUBMIT_COOLDOWN_MILLIS = 60 * 1000
const MIN_FILL_TIME_MILLIS = 3 * 1000
const DRAFT_SAVE_DEBOUNCE_MILLIS = 400
// Sliding: every save restarts the window, so a draft expires seven days after
// it was last edited, not seven days after it was started.
const DRAFT_TTL_MILLIS = 7 * 24 * 60 * 60 * 1000
const LAST_SENT_KEY = 'contact:lastSent'
const DRAFT_KEY = 'contact:draft'
const EMPTY_DRAFT = { name: '', email: '', message: '' }

// Restore only the three real fields, and only when they are strings: stored
// data can be stale or hand-edited, and the honeypot must never be repopulated
// or a user who once tripped it would stay trapped across every visit.
function toDraft(stored) {
  return {
    name: typeof stored?.name === 'string' ? stored.name : '',
    email: typeof stored?.email === 'string' ? stored.email : '',
    message: typeof stored?.message === 'string' ? stored.message : '',
  }
}

export default function Contact() {
  const { value: lastSentAt, setValue: setLastSentAt } = useSessionStorage(LAST_SENT_KEY, 0)
  const {
    value: savedDraft,
    setValue: setSavedDraft,
    remove: removeSavedDraft,
  } = useLocalStorage(DRAFT_KEY, EMPTY_DRAFT, { ttlMillis: DRAFT_TTL_MILLIS })

  const [form, setForm] = useState(() => ({ ...toDraft(savedDraft), honey: '' }))
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const mountedAtRef = useRef(Date.now())
  const submittingRef = useRef(false)

  const draft = useMemo(
    () => ({ name: form.name, email: form.email, message: form.message }),
    [form.name, form.email, form.message]
  )
  const debouncedDraft = useDebounce(draft, DRAFT_SAVE_DEBOUNCE_MILLIS)
  const hasDraft = Boolean(form.name || form.email || form.message)

  // Persist once typing pauses. An emptied form removes the key outright rather
  // than storing blanks, so a cleared draft never comes back on reload.
  useEffect(() => {
    const isEmpty = !debouncedDraft.name && !debouncedDraft.email && !debouncedDraft.message
    if (isEmpty) removeSavedDraft()
    else setSavedDraft(debouncedDraft)
  }, [debouncedDraft, setSavedDraft, removeSavedDraft])

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleClear = () => {
    setForm({ ...EMPTY_DRAFT, honey: '' })
    removeSavedDraft()
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // Guard the handler itself: a double-click can land before the button
    // re-renders as disabled, which would fire two sends.
    if (submittingRef.current) return
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }

    // Honeypot filled, or the form was completed faster than a human could:
    // show success but never send, so the bot gets nothing to tune against.
    // The draft is deliberately left alone — nothing was actually sent.
    const filledTooFast = Date.now() - mountedAtRef.current < MIN_FILL_TIME_MILLIS
    if (form.honey || filledTooFast) {
      setStatus('sent')
      return
    }

    const cooldownRemaining = lastSentAt + SUBMIT_COOLDOWN_MILLIS - Date.now()
    if (cooldownRemaining > 0) {
      setError(
        `Please wait ${Math.ceil(cooldownRemaining / 1000)}s before sending another message.`
      )
      return
    }

    submittingRef.current = true
    setStatus('sending')
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setLastSentAt(Date.now())
      // Reset the fields too, or the debounced save would write the draft back
      // moments after it was removed.
      setForm({ ...EMPTY_DRAFT, honey: '' })
      removeSavedDraft()
      setStatus('sent')
    } catch {
      setStatus('failed')
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <RevealSection id="contact" ariaLabel="Contact" className="contact-section">
      <p className="contact-overline">What's Next?</p>
      <h2 className="contact-heading">Get In Touch</h2>
      <p className="contact-copy">
        I'm currently open to new opportunities. Whether you have a question or just want
        to say hi, I'll get back to you!
      </p>
      {status === 'sent' ? (
        <p className="contact-success" role="status">Message sent! I'll get back to you soon.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="form-error" role="alert">{error}</p>}
          {status === 'failed' && (
            <p className="form-error" role="alert">Something went wrong. Please try again later.</p>
          )}
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
            disabled={status === 'sending'}
          />
          <label htmlFor="contact-email" className="sr-only">Your Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            disabled={status === 'sending'}
          />
          <label htmlFor="contact-message" className="sr-only">Your Message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="form-input"
            rows={5}
            disabled={status === 'sending'}
          />
          {/* Honeypot: positioned off-screen and hidden from assistive tech and
              the tab order, so only a form-filling bot ever populates it. */}
          <input
            type="text"
            name="honey"
            value={form.honey}
            onChange={handleChange}
            className="form-honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="form-actions">
            <button type="submit" className="form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {hasDraft && (
              <button
                type="button"
                className="form-clear"
                onClick={handleClear}
                disabled={status === 'sending'}
              >
                Clear draft
              </button>
            )}
          </div>
        </form>
      )}
    </RevealSection>
  )
}

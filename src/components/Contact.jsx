import React, { useState, useEffect, useRef } from 'react'
import RevealSection from './RevealSection'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef(null)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    window.location.href = `mailto:parjapatsanjay1999@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`
    setSent(true)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('parjapatsanjay1999@gmail.com').then(() => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      setCopied(true)
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500)
    })
  }

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  return (
    <RevealSection id="contact" ariaLabel="Contact" className="contact-section">
      <p className="contact-overline">What's Next?</p>
      <h2 className="contact-heading">Get In Touch</h2>
      <p className="contact-copy">
        I'm currently open to new opportunities. Whether you have a question or just want
        to say hi, I'll get back to you!
      </p>
      <div className="contact-email-row">
        <span className="contact-email-display">parjapatsanjay1999@gmail.com</span>
        <button
          type="button"
          className="copy-email-btn"
          onClick={handleCopyEmail}
          aria-label="Copy email"
        >
          {copied ? (
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span className="copy-btn-label">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      {sent ? (
        <p className="contact-success" role="status">Opening your email client...</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="form-error" role="alert">{error}</p>}
          <label htmlFor="contact-name" className="sr-only">Your Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
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
          />
          <button type="submit" className="form-submit">Send Message</button>
        </form>
      )}
    </RevealSection>
  )
}

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import RevealSection from './RevealSection'
import CopiableText from './CopiableText'
import CopyButton from './CopyButton'
import { LINKS } from '../data/links'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      )
      setStatus('sent')
    } catch {
      setStatus('failed')
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
      <CopiableText text={LINKS.email}>
        <div className="contact-email-row">
          <span className="contact-email-display">{LINKS.email}</span>
          <CopyButton ariaLabel="Copy email" />
        </div>
      </CopiableText>
      {status === 'sent' ? (
        <p className="contact-success" role="status">Message sent! I'll get back to you soon.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {error && <p className="form-error" role="alert">{error}</p>}
          {status === 'failed' && (
            <p className="form-error" role="alert">Something went wrong. Please try again or email me directly.</p>
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
          <button type="submit" className="form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </RevealSection>
  )
}

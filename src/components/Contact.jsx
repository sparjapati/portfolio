import React, { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

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

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div ref={ref} className="reveal">
        <p className="contact-overline">What's Next?</p>
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-copy">
          I'm currently open to new opportunities. Whether you have a question or just want
          to say hi, I'll get back to you!
        </p>
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
      </div>
    </section>
  )
}

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Contact from '../../components/Contact'
import { LINKS } from '../../data/links'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn().mockResolvedValue({}) },
}))

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

import emailjs from '@emailjs/browser'

describe('Contact', () => {
  it('renders Get In Touch heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: /Get In Touch/i })).toBeInTheDocument()
  })

  it('renders name, email, message fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty form', () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument()
  })

  it('error message has role alert for screen readers', () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders copy email button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /copy email/i })).toBeInTheDocument()
  })

  it('calls clipboard.writeText with correct email on copy click', async () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /copy email/i }))
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(LINKS.email)
  })

  it('shows Copied! feedback after clicking copy button', async () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /copy email/i }))
    expect(await screen.findByText('Copied!')).toBeInTheDocument()
  })

  it('calls emailjs.send with form values on submit', async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'Test User', name: 'name' } })
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'test@example.com', name: 'email' } })
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello!', name: 'message' } })
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    await waitFor(() => expect(emailjs.send).toHaveBeenCalled())
  })

  it('shows success message after sending', async () => {
    render(<Contact />)
    fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'Test User', name: 'name' } })
    fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'test@example.com', name: 'email' } })
    fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello!', name: 'message' } })
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    expect(await screen.findByText(/Message sent/i)).toBeInTheDocument()
  })
})

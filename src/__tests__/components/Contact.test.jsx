import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Contact from '../../components/Contact'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

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
})

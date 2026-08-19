import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Contact from '../../components/Contact'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn().mockResolvedValue({}) },
}))

import emailjs from '@emailjs/browser'

const MIN_FILL_TIME_MILLIS = 3 * 1000
const SUBMIT_COOLDOWN_MILLIS = 60 * 1000
const LAST_SENT_KEY = 'contact:lastSent'
const DRAFT_KEY = 'contact:draft'

// Date.now is stubbed so the fill-time floor and cooldown can be exercised
// without the tests actually waiting.
let now = 1_700_000_000_000
const advance = millis => { now += millis }

const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'Test User', name: 'name' } })
  fireEvent.change(screen.getByPlaceholderText(/Your Email/i), { target: { value: 'test@example.com', name: 'email' } })
  fireEvent.change(screen.getByPlaceholderText(/Your Message/i), { target: { value: 'Hello!', name: 'message' } })
}

const submit = () => fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))

describe('Contact', () => {
  beforeEach(() => {
    now = 1_700_000_000_000
    sessionStorage.clear()
    localStorage.clear()
    emailjs.send.mockClear()
    vi.spyOn(Date, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

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
    submit()
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument()
  })

  it('error message has role alert for screen readers', () => {
    render(<Contact />)
    submit()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('calls emailjs.send with form values on submit', async () => {
    render(<Contact />)
    fillForm()
    advance(MIN_FILL_TIME_MILLIS)
    submit()
    await waitFor(() => expect(emailjs.send).toHaveBeenCalled())
    expect(emailjs.send.mock.calls[0][2]).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello!',
    })
  })

  it('shows success message after sending', async () => {
    render(<Contact />)
    fillForm()
    advance(MIN_FILL_TIME_MILLIS)
    submit()
    expect(await screen.findByText(/Message sent/i)).toBeInTheDocument()
  })

  describe('spam protection', () => {
    it('keeps the honeypot field out of the tab order and the accessibility tree', () => {
      const { container } = render(<Contact />)
      const honeypot = container.querySelector('input[name="honey"]')
      expect(honeypot).toBeInTheDocument()
      expect(honeypot).toHaveAttribute('tabindex', '-1')
      expect(honeypot).toHaveAttribute('aria-hidden', 'true')
    })

    it('fakes success without sending when the honeypot is filled', async () => {
      const { container } = render(<Contact />)
      fillForm()
      fireEvent.change(container.querySelector('input[name="honey"]'), {
        target: { value: 'bot was here', name: 'honey' },
      })
      advance(MIN_FILL_TIME_MILLIS)
      submit()
      expect(await screen.findByText(/Message sent/i)).toBeInTheDocument()
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('fakes success without sending when the form is filled faster than a human could', async () => {
      render(<Contact />)
      fillForm()
      advance(MIN_FILL_TIME_MILLIS - 1)
      submit()
      expect(await screen.findByText(/Message sent/i)).toBeInTheDocument()
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('blocks a repeat send inside the cooldown and reports the remaining wait', () => {
      sessionStorage.setItem(LAST_SENT_KEY, String(now))
      render(<Contact />)
      fillForm()
      advance(MIN_FILL_TIME_MILLIS)
      submit()
      expect(screen.getByRole('alert')).toHaveTextContent(/Please wait 57s/i)
      expect(emailjs.send).not.toHaveBeenCalled()
    })

    it('allows a send once the cooldown has elapsed', async () => {
      sessionStorage.setItem(LAST_SENT_KEY, String(now))
      render(<Contact />)
      fillForm()
      advance(SUBMIT_COOLDOWN_MILLIS)
      submit()
      await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1))
    })

    it('records the send time so the cooldown survives a reload', async () => {
      render(<Contact />)
      fillForm()
      advance(MIN_FILL_TIME_MILLIS)
      submit()
      await screen.findByText(/Message sent/i)
      expect(sessionStorage.getItem(LAST_SENT_KEY)).toBe(String(now))
    })

    it('sends only once when the submit button is double-clicked', async () => {
      render(<Contact />)
      fillForm()
      advance(MIN_FILL_TIME_MILLIS)
      const button = screen.getByRole('button', { name: /Send Message/i })
      fireEvent.click(button)
      fireEvent.click(button)
      await waitFor(() => expect(emailjs.send).toHaveBeenCalled())
      expect(emailjs.send).toHaveBeenCalledTimes(1)
    })
  })

  describe('draft persistence', () => {
    // Drafts are stored inside a { value, expiresAt } envelope by the ttl option.
    const readDraft = () => JSON.parse(localStorage.getItem(DRAFT_KEY))?.value
    const storeDraft = (draft, expiresAt = now + 1000) =>
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ value: draft, expiresAt }))

    it('restores a saved draft into the fields', () => {
      storeDraft({ name: 'Saved User', email: 'saved@example.com', message: 'Half-written thought' })
      render(<Contact />)
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('Saved User')
      expect(screen.getByPlaceholderText(/Your Email/i)).toHaveValue('saved@example.com')
      expect(screen.getByPlaceholderText(/Your Message/i)).toHaveValue('Half-written thought')
    })

    it('starts empty when the stored draft is malformed', () => {
      localStorage.setItem(DRAFT_KEY, '{not json')
      render(<Contact />)
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('')
    })

    it('never restores the honeypot from a stored draft', () => {
      storeDraft({ name: 'A', honey: 'trapped' })
      const { container } = render(<Contact />)
      expect(container.querySelector('input[name="honey"]')).toHaveValue('')
    })

    it('saves the draft once typing pauses', async () => {
      render(<Contact />)
      fillForm()
      await waitFor(() => expect(readDraft()).toEqual({
        name: 'Test User', email: 'test@example.com', message: 'Hello!',
      }), { timeout: 2000 })
    })

    it('does not persist the honeypot value', async () => {
      const { container } = render(<Contact />)
      fillForm()
      fireEvent.change(container.querySelector('input[name="honey"]'), {
        target: { value: 'bot was here', name: 'honey' },
      })
      await waitFor(() => expect(readDraft()).toBeTruthy(), { timeout: 2000 })
      expect(readDraft()).not.toHaveProperty('honey')
    })

    it('does not restore a draft whose ttl has expired', () => {
      storeDraft({ name: 'Stale User', email: 'stale@example.com', message: 'Old' }, now - 1)
      render(<Contact />)
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('')
      expect(localStorage.getItem(DRAFT_KEY)).toBeNull()
    })

    it('hides the clear button until a field has content', () => {
      render(<Contact />)
      expect(screen.queryByRole('button', { name: /Clear draft/i })).not.toBeInTheDocument()
      fireEvent.change(screen.getByPlaceholderText(/Your Name/i), { target: { value: 'A', name: 'name' } })
      expect(screen.getByRole('button', { name: /Clear draft/i })).toBeInTheDocument()
    })

    it('clear empties the fields and deletes the saved draft', () => {
      storeDraft({ name: 'Saved User', email: 'saved@example.com', message: 'Half-written thought' })
      render(<Contact />)
      fireEvent.click(screen.getByRole('button', { name: /Clear draft/i }))
      expect(screen.getByPlaceholderText(/Your Name/i)).toHaveValue('')
      expect(screen.getByPlaceholderText(/Your Message/i)).toHaveValue('')
      expect(localStorage.getItem(DRAFT_KEY)).toBeNull()
    })

    it('deletes the saved draft after a successful send', async () => {
      storeDraft({ name: 'x', email: 'x', message: 'x' })
      render(<Contact />)
      fillForm()
      advance(MIN_FILL_TIME_MILLIS)
      submit()
      await screen.findByText(/Message sent/i)
      expect(localStorage.getItem(DRAFT_KEY)).toBeNull()
    })

    it('keeps the draft when the honeypot traps the submission', async () => {
      const { container } = render(<Contact />)
      fillForm()
      await waitFor(() => expect(readDraft()).toBeTruthy(), { timeout: 2000 })
      fireEvent.change(container.querySelector('input[name="honey"]'), {
        target: { value: 'bot was here', name: 'honey' },
      })
      advance(MIN_FILL_TIME_MILLIS)
      submit()
      await screen.findByText(/Message sent/i)
      expect(readDraft()).toBeTruthy()
    })
  })
})

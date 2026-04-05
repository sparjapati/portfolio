import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import BackToTop from '../../components/BackToTop'

describe('BackToTop', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
    window.scrollTo = vi.fn()
  })

  it('is hidden when scrollY is 0', () => {
    const { container } = render(<BackToTop />)
    const btn = container.querySelector('button[aria-label="Back to top"]')
    expect(btn).toHaveAttribute('aria-hidden', 'true')
  })

  it('becomes visible after scrolling past 400px', () => {
    render(<BackToTop />)
    Object.defineProperty(window, 'scrollY', { value: 401, configurable: true })
    fireEvent.scroll(window)
    const btn = screen.getByRole('button', { name: /back to top/i })
    expect(btn).toHaveAttribute('aria-hidden', 'false')
  })

  it('calls window.scrollTo on click', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
    render(<BackToTop />)
    fireEvent.scroll(window)
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})

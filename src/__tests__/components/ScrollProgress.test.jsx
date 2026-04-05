import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ScrollProgress from '../../components/ScrollProgress'

describe('ScrollProgress', () => {
  it('renders a progress bar element', () => {
    render(<ScrollProgress />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has aria-label', () => {
    render(<ScrollProgress />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Page scroll progress')
  })

  it('updates aria-valuenow on scroll', () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 1100 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 100 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 })
    render(<ScrollProgress />)
    fireEvent.scroll(window)
    const bar = screen.getByRole('progressbar')
    expect(Number(bar.getAttribute('aria-valuenow'))).toBeGreaterThan(0)
  })
})

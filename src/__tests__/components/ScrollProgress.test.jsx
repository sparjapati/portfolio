import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import ScrollProgress from '../../components/ScrollProgress'

// The scroll handler is throttled to one run per animation frame, so assertions
// must wait a frame for the state to land.
const flushFrame = () =>
  act(async () => {
    await new Promise(resolve => requestAnimationFrame(resolve))
  })

describe('ScrollProgress', () => {
  it('renders a progress bar element', () => {
    render(<ScrollProgress />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has aria-label', () => {
    render(<ScrollProgress />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Page scroll progress')
  })

  it('updates aria-valuenow on scroll', async () => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 1100 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 100 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 })
    render(<ScrollProgress />)
    fireEvent.scroll(window)
    await flushFrame()
    const bar = screen.getByRole('progressbar')
    expect(Number(bar.getAttribute('aria-valuenow'))).toBeGreaterThan(0)
  })
})

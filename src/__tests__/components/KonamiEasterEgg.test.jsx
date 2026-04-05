import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import KonamiEasterEgg from '../../components/KonamiEasterEgg'

describe('KonamiEasterEgg', () => {
  it('renders the easter egg overlay', () => {
    render(<KonamiEasterEgg onDismiss={() => {}} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows terminal-style content with konami text', () => {
    render(<KonamiEasterEgg onDismiss={() => {}} />)
    expect(screen.getByText(/konami/i)).toBeInTheDocument()
  })

  it('calls onDismiss when close button clicked', () => {
    const onDismiss = vi.fn()
    render(<KonamiEasterEgg onDismiss={onDismiss} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onDismiss).toHaveBeenCalled()
  })

  it('calls onDismiss on Escape key', () => {
    const onDismiss = vi.fn()
    render(<KonamiEasterEgg onDismiss={onDismiss} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onDismiss).toHaveBeenCalled()
  })
})

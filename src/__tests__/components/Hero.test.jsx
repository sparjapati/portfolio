import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Hero from '../../components/Hero'

vi.mock('../../hooks/useTypewriter', () => ({
  useTypewriter: () => 'I build scalable backend systems.',
}))

describe('Hero', () => {
  it('renders greeting', () => {
    render(<Hero />)
    expect(screen.getByText(/Hi, my name is/i)).toBeInTheDocument()
  })

  it('renders name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sanjay')
  })

  it('renders typewriter output', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('I build scalable backend systems.')
  })

  it('renders GitHub social link', () => {
    render(<Hero />)
    expect(screen.getByLabelText('GitHub profile')).toHaveAttribute('href', 'https://github.com/sparjapati')
  })
})

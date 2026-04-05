import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Hero from '../../components/Hero'
import { LINKS } from '../../data/links'

vi.mock('../../hooks/useTypewriter', () => ({
  useTypewriter: () => 'I build scalable backend systems.',
}))

vi.mock('../../hooks/useCursorSpotlight', () => ({
  useCursorSpotlight: () => ({ ref: { current: null }, style: {} }),
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
    expect(screen.getByLabelText('GitHub profile')).toHaveAttribute('href', LINKS.github)
  })

  it('renders LinkedIn social link', () => {
    render(<Hero />)
    expect(screen.getByLabelText('LinkedIn profile')).toHaveAttribute('href', LINKS.linkedin)
  })

  it('renders open to opportunities badge', () => {
    render(<Hero />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/Open to new opportunities/i)
  })
})

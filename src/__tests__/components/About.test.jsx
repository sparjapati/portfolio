import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import About from '../../components/About'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('About', () => {
  it('renders section heading', () => {
    render(<About />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders education history heading', () => {
    render(<About />)
    expect(screen.getByText(/Education History/i)).toBeInTheDocument()
  })

  it('renders NIT Kurukshetra entry', () => {
    render(<About />)
    expect(screen.getByText(/National Institute of Technology/i)).toBeInTheDocument()
  })

  it('renders all 3 education entries', () => {
    render(<About />)
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3)
  })
})

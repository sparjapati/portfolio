import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Skills from '../../components/Skills'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Skills', () => {
  it('renders section heading', () => {
    render(<Skills />)
    expect(screen.getByText('Technologies I Work With')).toBeInTheDocument()
  })

  it('renders Languages category', () => {
    render(<Skills />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders Java skill', () => {
    render(<Skills />)
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('renders core competency tags', () => {
    render(<Skills />)
    expect(screen.getByText('Microservices')).toBeInTheDocument()
  })

  it('renders section title with ghost echo attribute', () => {
    render(<Skills />)
    expect(screen.getByText('Technologies I Work With')).toHaveAttribute('data-echo', 'Technologies I Work With')
  })
})

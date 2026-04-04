import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Projects from '../../components/Projects'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

vi.mock('../../hooks/useTilt', () => ({
  useTilt: () => ({ ref: { current: null }, style: {} }),
}))

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />)
    expect(screen.getByText("Some Things I've Built")).toBeInTheDocument()
  })

  it('renders project title', () => {
    render(<Projects />)
    expect(screen.getByText('Continuous Assessment Analytical Application')).toBeInTheDocument()
  })

  it('renders tech tags', () => {
    render(<Projects />)
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Projects />)
    expect(screen.getByText('GitHub Repo')).toBeInTheDocument()
  })

  it('renders section title with ghost echo attribute', () => {
    render(<Projects />)
    expect(screen.getByText("Some Things I've Built")).toHaveAttribute('data-echo', "Some Things I've Built")
  })

  it('renders project cards with tilt-compatible structure', () => {
    render(<Projects />)
    // Each card is rendered — useTilt mock returns empty style, cards should still render
    const cards = document.querySelectorAll('.project-card')
    expect(cards.length).toBeGreaterThan(0)
  })
})

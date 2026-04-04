import React from 'react'
import { render, screen } from '@testing-library/react'
import Experience from '../../components/Experience'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Experience', () => {
  it('renders section heading', () => {
    render(<Experience />)
    expect(screen.getByText('Experiences')).toBeInTheDocument()
  })

  it('renders SE II role', () => {
    render(<Experience />)
    expect(screen.getByText('Software Engineer II')).toBeInTheDocument()
  })

  it('renders Oxyzo company', () => {
    render(<Experience />)
    expect(screen.getAllByText(/Oxyzo/i).length).toBeGreaterThan(0)
  })

  it('renders Employee of Month achievement', () => {
    render(<Experience />)
    expect(screen.getByText(/Employee of the Month/i)).toBeInTheDocument()
  })

  it('renders section title with ghost echo attribute', () => {
    render(<Experience />)
    expect(screen.getByText('Experiences')).toHaveAttribute('data-echo', 'Experiences')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders credit text', () => {
    render(<Footer />)
    expect(screen.getByText(/Designed & Built by Sanjay/i)).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Sanjay/i)).toBeInTheDocument()
  })
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/Navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('<Sanjay />')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    ;['About', 'Skills', 'Projects', 'Experience', 'Contact'].forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders resume link pointing to PDF', () => {
    render(<Navbar />)
    const resumeLink = screen.getByText('RESUME')
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/Sanjay-SE2.pdf')
  })

  it('toggles mobile menu on hamburger click', () => {
    render(<Navbar />)
    const hamburger = screen.getByLabelText('Toggle menu')
    expect(screen.getByRole('navigation').querySelector('.nav-links')).not.toHaveClass('open')
    fireEvent.click(hamburger)
    expect(screen.getByRole('navigation').querySelector('.nav-links')).toHaveClass('open')
  })
})

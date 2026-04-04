import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/Navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    expect(screen.getByText('<Sanjay />')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    ;['About', 'Skills', 'Projects', 'Experience', 'Contact'].forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders resume link pointing to PDF', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    const resumeLink = screen.getByText('RESUME')
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/Sanjay-SE2.pdf')
  })

  it('toggles mobile menu on hamburger click', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    const hamburger = screen.getByLabelText('Toggle menu')
    expect(screen.getByRole('navigation').querySelector('.nav-links')).not.toHaveClass('open')
    fireEvent.click(hamburger)
    expect(screen.getByRole('navigation').querySelector('.nav-links')).toHaveClass('open')
  })

  it('renders theme toggle button with correct aria-label when dark', () => {
    render(<Navbar theme="dark" toggleTheme={() => {}} />)
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument()
  })

  it('renders theme toggle button with correct aria-label when light', () => {
    render(<Navbar theme="light" toggleTheme={() => {}} />)
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument()
  })

  it('calls toggleTheme when theme button is clicked', () => {
    const toggleTheme = vi.fn()
    render(<Navbar theme="dark" toggleTheme={toggleTheme} />)
    fireEvent.click(screen.getByLabelText('Switch to light mode'))
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})

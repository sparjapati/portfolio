import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '../../components/ThemeToggle'

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle theme="dark" toggleTheme={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label "Switch to light mode" when theme is dark', () => {
    render(<ThemeToggle theme="dark" toggleTheme={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('has aria-label "Switch to dark mode" when theme is light', () => {
    render(<ThemeToggle theme="light" toggleTheme={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('calls toggleTheme when clicked', () => {
    const toggleTheme = vi.fn()
    render(<ThemeToggle theme="dark" toggleTheme={toggleTheme} />)
    fireEvent.click(screen.getByRole('button'))
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})

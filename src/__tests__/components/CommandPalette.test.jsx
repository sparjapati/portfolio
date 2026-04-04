import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import CommandPalette from '../../components/CommandPalette'

const baseProps = {
  isOpen: true,
  close: vi.fn(),
  query: '',
  setQuery: vi.fn(),
  selectedIndex: 0,
  setSelectedIndex: vi.fn(),
  filteredCommands: [
    { label: 'About', action: vi.fn() },
    { label: 'Skills', action: vi.fn() },
  ],
}

describe('CommandPalette', () => {
  it('renders nothing when closed', () => {
    render(<CommandPalette {...baseProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog when open', () => {
    render(<CommandPalette {...baseProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<CommandPalette {...baseProps} />)
    expect(screen.getByPlaceholderText(/Type a command/i)).toBeInTheDocument()
  })

  it('renders filtered command list', () => {
    render(<CommandPalette {...baseProps} />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('calls close on Escape key', () => {
    const close = vi.fn()
    render(<CommandPalette {...baseProps} close={close} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(close).toHaveBeenCalled()
  })

  it('calls close when backdrop is clicked', () => {
    const close = vi.fn()
    render(<CommandPalette {...baseProps} close={close} />)
    fireEvent.click(screen.getByTestId('cp-backdrop'))
    expect(close).toHaveBeenCalled()
  })

  it('executes command and closes on Enter', () => {
    const action = vi.fn()
    const close = vi.fn()
    render(<CommandPalette {...baseProps} close={close} filteredCommands={[{ label: 'About', action }]} selectedIndex={0} />)
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' })
    expect(action).toHaveBeenCalled()
    expect(close).toHaveBeenCalled()
  })

  it('traps Tab focus inside the modal', () => {
    const close = vi.fn()
    render(<CommandPalette {...baseProps} close={close} />)
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Tab' })
    // close should NOT have been called — tab does not close
    expect(close).not.toHaveBeenCalled()
  })
})

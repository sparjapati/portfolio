import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { useCommandPalette } from '../../hooks/useCommandPalette'

describe('useCommandPalette', () => {
  it('is closed by default', () => {
    const { result } = renderHook(() => useCommandPalette({ toggleTheme: () => {} }))
    expect(result.current.isOpen).toBe(false)
  })

  it('opens and closes', () => {
    const { result } = renderHook(() => useCommandPalette({ toggleTheme: () => {} }))
    act(() => result.current.open())
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.close())
    expect(result.current.isOpen).toBe(false)
  })

  it('filters commands by query', () => {
    const { result } = renderHook(() => useCommandPalette({ toggleTheme: () => {} }))
    act(() => { result.current.setQuery('about') })
    expect(result.current.filteredCommands.length).toBeGreaterThan(0)
    expect(result.current.filteredCommands[0].label.toLowerCase()).toContain('about')
  })

  it('returns all 10 commands when query is empty', () => {
    const { result } = renderHook(() => useCommandPalette({ toggleTheme: () => {} }))
    expect(result.current.filteredCommands.length).toBe(10)
  })

  it('resets query and selectedIndex on open', () => {
    const { result } = renderHook(() => useCommandPalette({ toggleTheme: () => {} }))
    act(() => { result.current.setQuery('test') })
    act(() => result.current.open())
    expect(result.current.query).toBe('')
    expect(result.current.selectedIndex).toBe(0)
  })
})

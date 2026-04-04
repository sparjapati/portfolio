import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../../hooks/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
  })

  it('defaults to dark when OS prefers dark and no localStorage', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('defaults to light when OS prefers light and no localStorage', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('reads localStorage override over OS preference', () => {
    localStorage.setItem('theme', 'light')
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) // OS says dark
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('toggleTheme flips dark to light and writes to localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('toggleTheme flips light to dark and writes to localStorage', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})

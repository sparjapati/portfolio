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
    localStorage.setItem('theme', JSON.stringify('light'))
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) // OS says dark
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('toggleTheme flips dark to light and writes to localStorage', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe(JSON.stringify('light'))
  })

  it('toggleTheme flips light to dark and writes to localStorage', () => {
    localStorage.setItem('theme', JSON.stringify('light'))
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'))
  })

  it('does not write to localStorage until the visitor picks a theme', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()
  })

  it('follows a changed OS preference while no theme has been picked', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    const { result, rerender } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    window.matchMedia = vi.fn().mockReturnValue({ matches: false })
    rerender()
    expect(result.current.theme).toBe('light')
  })

  it('honours a legacy raw-string theme from before the JSON format', () => {
    localStorage.setItem('theme', 'light') // pre-migration format, not JSON
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) // OS says dark
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('rewrites a legacy raw-string theme as JSON on the next toggle', () => {
    localStorage.setItem('theme', 'light')
    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())
    expect(localStorage.getItem('theme')).toBe(JSON.stringify('dark'))
  })

  it('ignores an unrecognised stored value and falls back to OS preference', () => {
    localStorage.setItem('theme', JSON.stringify('purple'))
    window.matchMedia = vi.fn().mockReturnValue({ matches: true })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })
})

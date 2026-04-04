import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useTypewriter } from '../../hooks/useTypewriter'

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts with empty string', () => {
    const { result } = renderHook(() => useTypewriter('Hello', 80))
    expect(result.current).toBe('')
  })

  it('types one character per interval', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 80))
    act(() => vi.advanceTimersByTime(80))
    expect(result.current).toBe('H')
    act(() => vi.advanceTimersByTime(80))
    expect(result.current).toBe('Hi')
  })

  it('stops at full string length', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 80))
    act(() => vi.advanceTimersByTime(80))
    act(() => vi.advanceTimersByTime(80))
    expect(result.current).toBe('Hi')
  })
})

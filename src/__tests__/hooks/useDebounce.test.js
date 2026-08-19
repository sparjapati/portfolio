import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useDebounce } from '../../hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('first', 400))
    expect(result.current).toBe('first')
  })

  it('does not update before the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'first' },
    })
    rerender({ value: 'second' })
    act(() => vi.advanceTimersByTime(399))
    expect(result.current).toBe('first')
  })

  it('updates once the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'first' },
    })
    rerender({ value: 'second' })
    act(() => vi.advanceTimersByTime(400))
    expect(result.current).toBe('second')
  })

  it('restarts the timer on every change, settling only on the last value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(300))
    rerender({ value: 'abc' })
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('a')
    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('abc')
  })

  it('debounces object values by identity', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: { name: '' } },
    })
    const latest = { name: 'Sanjay' }
    rerender({ value: latest })
    act(() => vi.advanceTimersByTime(400))
    expect(result.current).toBe(latest)
  })

  it('does not update after unmount', () => {
    const { result, rerender, unmount } = renderHook(({ value }) => useDebounce(value, 400), {
      initialProps: { value: 'first' },
    })
    rerender({ value: 'second' })
    unmount()
    act(() => vi.advanceTimersByTime(400))
    expect(result.current).toBe('first')
  })
})

import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useLocalStorage } from '../../hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('falls back to the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('missing', 42))
    expect(result.current.value).toBe(42)
  })

  it('reads an existing stored value over the initial value', () => {
    localStorage.setItem('count', '7')
    const { result } = renderHook(() => useLocalStorage('count', 0))
    expect(result.current.value).toBe(7)
  })

  it('does not write to storage until setValue is called', () => {
    renderHook(() => useLocalStorage('untouched', 'initial'))
    expect(localStorage.getItem('untouched')).toBeNull()
  })

  it('persists and exposes a new value', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0))
    act(() => result.current.setValue(5))
    expect(result.current.value).toBe(5)
    expect(localStorage.getItem('count')).toBe('5')
  })

  it('supports a functional update against the latest value', () => {
    const { result } = renderHook(() => useLocalStorage('count', 1))
    act(() => {
      result.current.setValue(n => n + 1)
      result.current.setValue(n => n + 1)
    })
    expect(result.current.value).toBe(3)
    expect(localStorage.getItem('count')).toBe('3')
  })

  it('round-trips non-string values through JSON', () => {
    const { result } = renderHook(() => useLocalStorage('draft', null))
    act(() => result.current.setValue({ name: 'Sanjay', tags: ['a', 'b'] }))
    const { result: reread } = renderHook(() => useLocalStorage('draft', null))
    expect(reread.current.value).toEqual({ name: 'Sanjay', tags: ['a', 'b'] })
  })

  it('remove deletes the key and resets to the initial value', () => {
    localStorage.setItem('draft', '"typed"')
    const { result } = renderHook(() => useLocalStorage('draft', 'empty'))
    act(() => result.current.remove())
    expect(result.current.value).toBe('empty')
    expect(localStorage.getItem('draft')).toBeNull()
  })

  it('falls back to the initial value when the stored JSON is corrupt', () => {
    localStorage.setItem('broken', '{not json')
    const { result } = renderHook(() => useLocalStorage('broken', 'safe'))
    expect(result.current.value).toBe('safe')
  })

  it('falls back to the initial value when reading throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const { result } = renderHook(() => useLocalStorage('blocked', 'safe'))
    expect(result.current.value).toBe('safe')
  })

  it('keeps updating in memory when writing throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    const { result } = renderHook(() => useLocalStorage('blocked', 0))
    act(() => result.current.setValue(9))
    expect(result.current.value).toBe(9)
  })

  describe('with a ttl', () => {
    const TTL_MILLIS = 60 * 1000
    let now = 1_700_000_000_000

    beforeEach(() => {
      now = 1_700_000_000_000
      vi.spyOn(Date, 'now').mockImplementation(() => now)
    })

    const renderWithTtl = () =>
      renderHook(() => useLocalStorage('draft', 'empty', { ttlMillis: TTL_MILLIS }))

    it('wraps the stored value with an expiry', () => {
      const { result } = renderWithTtl()
      act(() => result.current.setValue('typed'))
      expect(JSON.parse(localStorage.getItem('draft'))).toEqual({
        value: 'typed',
        expiresAt: now + TTL_MILLIS,
      })
    })

    it('reads the value back before it expires', () => {
      const { result } = renderWithTtl()
      act(() => result.current.setValue('typed'))
      now += TTL_MILLIS - 1
      expect(renderWithTtl().result.current.value).toBe('typed')
    })

    it('drops the value and deletes the key once expired', () => {
      const { result } = renderWithTtl()
      act(() => result.current.setValue('typed'))
      now += TTL_MILLIS
      expect(renderWithTtl().result.current.value).toBe('empty')
      expect(localStorage.getItem('draft')).toBeNull()
    })

    it('treats a plain pre-ttl value as absent', () => {
      localStorage.setItem('draft', JSON.stringify('written before the ttl existed'))
      expect(renderWithTtl().result.current.value).toBe('empty')
    })

    it('restarts the expiry window on every write', () => {
      const first = renderWithTtl()
      act(() => first.result.current.setValue('typed'))
      now += TTL_MILLIS - 1
      const second = renderWithTtl()
      act(() => second.result.current.setValue('typed again'))
      now += TTL_MILLIS - 1
      expect(renderWithTtl().result.current.value).toBe('typed again')
    })

    it('remove still deletes the key', () => {
      const { result } = renderWithTtl()
      act(() => result.current.setValue('typed'))
      act(() => result.current.remove())
      expect(result.current.value).toBe('empty')
      expect(localStorage.getItem('draft')).toBeNull()
    })
  })
})

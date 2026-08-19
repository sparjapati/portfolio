import { renderHook, act } from '@testing-library/react'
import { useSessionStorage } from '../../hooks/useSessionStorage'

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('falls back to the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useSessionStorage('missing', 42))
    expect(result.current.value).toBe(42)
  })

  it('reads an existing stored value over the initial value', () => {
    sessionStorage.setItem('count', '7')
    const { result } = renderHook(() => useSessionStorage('count', 0))
    expect(result.current.value).toBe(7)
  })

  it('does not write to storage until setValue is called', () => {
    renderHook(() => useSessionStorage('untouched', 'initial'))
    expect(sessionStorage.getItem('untouched')).toBeNull()
  })

  it('persists and exposes a new value', () => {
    const { result } = renderHook(() => useSessionStorage('count', 0))
    act(() => result.current.setValue(5))
    expect(result.current.value).toBe(5)
    expect(sessionStorage.getItem('count')).toBe('5')
  })

  it('supports a functional update against the latest value', () => {
    const { result } = renderHook(() => useSessionStorage('count', 1))
    act(() => {
      result.current.setValue(n => n + 1)
      result.current.setValue(n => n + 1)
    })
    expect(result.current.value).toBe(3)
    expect(sessionStorage.getItem('count')).toBe('3')
  })

  it('round-trips non-string values through JSON', () => {
    const { result } = renderHook(() => useSessionStorage('profile', null))
    act(() => result.current.setValue({ name: 'Sanjay', tags: ['a', 'b'] }))
    expect(sessionStorage.getItem('profile')).toBe('{"name":"Sanjay","tags":["a","b"]}')

    const { result: reread } = renderHook(() => useSessionStorage('profile', null))
    expect(reread.current.value).toEqual({ name: 'Sanjay', tags: ['a', 'b'] })
  })

  it('falls back to the initial value when the stored JSON is corrupt', () => {
    sessionStorage.setItem('broken', '{not json')
    const { result } = renderHook(() => useSessionStorage('broken', 'safe'))
    expect(result.current.value).toBe('safe')
  })

  it('falls back to the initial value when reading throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const { result } = renderHook(() => useSessionStorage('blocked', 'safe'))
    expect(result.current.value).toBe('safe')
  })

  it('keeps updating in memory when writing throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    const { result } = renderHook(() => useSessionStorage('blocked', 0))
    act(() => result.current.setValue(9))
    expect(result.current.value).toBe(9)
  })
})

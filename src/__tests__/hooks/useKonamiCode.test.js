import { renderHook, act } from '@testing-library/react'
import { useKonamiCode } from '../../hooks/useKonamiCode'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

function fireKeys(keys) {
  keys.forEach(key => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  })
}

describe('useKonamiCode', () => {
  it('activated is false by default', () => {
    const { result } = renderHook(() => useKonamiCode())
    expect(result.current.activated).toBe(false)
  })

  it('activates after full Konami sequence', () => {
    const { result } = renderHook(() => useKonamiCode())
    act(() => fireKeys(KONAMI))
    expect(result.current.activated).toBe(true)
  })

  it('does not activate on partial sequence', () => {
    const { result } = renderHook(() => useKonamiCode())
    act(() => fireKeys(KONAMI.slice(0, 5)))
    expect(result.current.activated).toBe(false)
  })

  it('reset sets activated back to false', () => {
    const { result } = renderHook(() => useKonamiCode())
    act(() => fireKeys(KONAMI))
    expect(result.current.activated).toBe(true)
    act(() => result.current.reset())
    expect(result.current.activated).toBe(false)
  })
})

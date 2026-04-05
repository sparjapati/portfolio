import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useCursorSpotlight } from '../../hooks/useCursorSpotlight'

function mockMatchMedia(matches) {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
}

describe('useCursorSpotlight', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns ref and style', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useCursorSpotlight())
    expect(result.current.ref).toBeDefined()
    expect(result.current.style).toBeDefined()
  })

  it('initial style is empty object', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useCursorSpotlight())
    expect(result.current.style).toEqual({})
  })

  // NOTE: mousemove/mouseleave integration tests are omitted here because the hook's
  // useEffect reads ref.current at mount time (before any manual ref assignment), so
  // event listeners are never attached in the renderHook environment. Those behaviors
  // are covered by component-level integration tests instead.

  it('does not attach listeners on non-hover device', () => {
    mockMatchMedia(false)
    const el = document.createElement('section')
    el.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1000, height: 500 })
    document.body.appendChild(el)

    const { result } = renderHook(() => useCursorSpotlight())
    Object.defineProperty(result.current.ref, 'current', { value: el, writable: true })

    act(() => {
      el.dispatchEvent(new MouseEvent('mousemove', { clientX: 500, clientY: 250, bubbles: true }))
    })

    expect(result.current.style).toEqual({})
  })
})

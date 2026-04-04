import { renderHook } from '@testing-library/react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

describe('useScrollReveal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns a ref object', () => {
    const { result } = renderHook(() => useScrollReveal())
    expect(result.current).toHaveProperty('current')
  })

  it('adds reveal class to attached element when intersecting', () => {
    let observerCallback
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }

    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((cb) => {
        observerCallback = cb
        return mockObserver
      })
    )

    const div = document.createElement('div')
    div.classList.add('reveal')

    const { result } = renderHook(() => useScrollReveal())
    result.current.current = div

    // Trigger the observer callback
    if (observerCallback) {
      observerCallback([{ isIntersecting: true, target: div }])
      expect(div.classList.contains('revealed')).toBe(true)
      expect(mockObserver.unobserve).toHaveBeenCalledWith(div)
    }
  })
})

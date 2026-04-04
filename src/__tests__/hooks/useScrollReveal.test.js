import { renderHook, act } from '@testing-library/react'
import { useRef, useLayoutEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

describe('useScrollReveal', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useScrollReveal())
    expect(result.current).toHaveProperty('current')
  })

  it('adds revealed class when element intersects', () => {
    const div = document.createElement('div')
    div.classList.add('reveal')
    document.body.appendChild(div)

    let capturedCallback
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    vi.stubGlobal('IntersectionObserver', vi.fn((cb) => {
      capturedCallback = cb
      return mockObserver
    }))

    // Use a wrapper that pre-populates the ref so the effect sees a non-null element
    const { result } = renderHook(() => {
      const revealRef = useScrollReveal()
      // Synchronously set the ref before the effect fires via useLayoutEffect
      useLayoutEffect(() => {
        revealRef.current = div
      }, [])
      return revealRef
    })

    expect(capturedCallback).toBeDefined()
    capturedCallback([{ isIntersecting: true }])
    expect(div.classList.contains('revealed')).toBe(true)

    document.body.removeChild(div)
    vi.unstubAllGlobals()
  })

  it('disconnects observer on unmount', () => {
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))

    const div = document.createElement('div')
    document.body.appendChild(div)

    const { unmount, result } = renderHook(() => {
      const revealRef = useScrollReveal()
      useLayoutEffect(() => {
        revealRef.current = div
      }, [])
      return revealRef
    })

    unmount()
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(1)

    document.body.removeChild(div)
    vi.unstubAllGlobals()
  })
})

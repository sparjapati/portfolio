import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useActiveSection } from '../../hooks/useActiveSection'

describe('useActiveSection', () => {
  let mockObserve

  beforeEach(() => {
    mockObserve = vi.fn()
    global.IntersectionObserver = vi.fn(() => ({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('returns empty string by default', () => {
    const { result } = renderHook(() => useActiveSection(['about', 'skills']))
    expect(result.current).toBe('')
  })

  it('observes each section element', () => {
    document.body.innerHTML = '<section id="about"></section><section id="skills"></section>'
    renderHook(() => useActiveSection(['about', 'skills']))
    expect(global.IntersectionObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalledTimes(2)
  })
})

import React from 'react'
import { renderHook } from '@testing-library/react'
import { vi } from 'vitest'
import { useTilt } from '../../hooks/useTilt'

beforeEach(() => {
  vi.spyOn(window, 'matchMedia').mockReturnValue({
    matches: true,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useTilt', () => {
  it('returns ref and style object', () => {
    const { result } = renderHook(() => useTilt())
    expect(result.current.ref).toBeDefined()
    expect(result.current.style).toBeDefined()
  })

  it('initial style has empty transform', () => {
    const { result } = renderHook(() => useTilt())
    expect(result.current.style.transform).toBe('')
  })
})

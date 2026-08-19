import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useThrottle } from '../../hooks/useThrottle'

const flushFrame = () =>
  act(async () => {
    await new Promise(resolve => requestAnimationFrame(resolve))
  })

describe('useThrottle', () => {
  it('does not run the callback synchronously', () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => result.current('a'))
    expect(spy).not.toHaveBeenCalled()
  })

  it('runs the callback on the next frame', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => result.current('a'))
    await flushFrame()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('a')
  })

  it('collapses calls made within one frame into a single run', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => {
      result.current(1)
      result.current(2)
      result.current(3)
    })
    await flushFrame()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('uses the most recent arguments when calls collapse', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => {
      result.current('stale')
      result.current('latest')
    })
    await flushFrame()
    expect(spy).toHaveBeenCalledWith('latest')
  })

  it('runs again on a later frame', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => result.current('first'))
    await flushFrame()
    act(() => result.current('second'))
    await flushFrame()
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenLastCalledWith('second')
  })

  it('keeps a stable identity across renders', () => {
    const { result, rerender } = renderHook(({ cb }) => useThrottle(cb), {
      initialProps: { cb: vi.fn() },
    })
    const first = result.current
    rerender({ cb: vi.fn() })
    expect(result.current).toBe(first)
  })

  it('invokes the latest callback after a re-render', async () => {
    const stale = vi.fn()
    const latest = vi.fn()
    const { result, rerender } = renderHook(({ cb }) => useThrottle(cb), {
      initialProps: { cb: stale },
    })
    rerender({ cb: latest })
    act(() => result.current())
    await flushFrame()
    expect(stale).not.toHaveBeenCalled()
    expect(latest).toHaveBeenCalledTimes(1)
  })

  it('cancel drops a pending frame', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => {
      result.current()
      result.current.cancel()
    })
    await flushFrame()
    expect(spy).not.toHaveBeenCalled()
  })

  it('runs normally again after a cancel', async () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useThrottle(spy))
    act(() => {
      result.current()
      result.current.cancel()
      result.current('after')
    })
    await flushFrame()
    expect(spy).toHaveBeenCalledWith('after')
  })

  it('does not run a pending callback after unmount', async () => {
    const spy = vi.fn()
    const { result, unmount } = renderHook(() => useThrottle(spy))
    act(() => result.current())
    unmount()
    await flushFrame()
    expect(spy).not.toHaveBeenCalled()
  })
})

import { useEffect, useMemo, useRef } from 'react'

/**
 * Rate-limits a callback to at most once per animation frame. Calls made within
 * the same frame collapse into one, invoked with the most recent arguments — so
 * a handler runs at the browser's paint rate instead of the event's fire rate.
 *
 * Use for continuous events (scroll, mousemove) where the value must keep
 * tracking but only the latest reading is worth rendering. This is not a
 * debounce: it does not wait for the event stream to stop.
 *
 * The returned function is stable across renders and carries a `cancel()` that
 * drops a frame still pending.
 */
export function useThrottle(callback) {
  const callbackRef = useRef(callback)
  const frameRef = useRef(null)
  const argsRef = useRef([])

  // Track the latest callback without changing the throttled function's identity.
  useEffect(() => {
    callbackRef.current = callback
  })

  const throttled = useMemo(() => {
    const run = (...args) => {
      argsRef.current = args
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        callbackRef.current(...argsRef.current)
      })
    }
    run.cancel = () => {
      if (frameRef.current === null) return
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    return run
  }, [])

  useEffect(() => throttled.cancel, [throttled])

  return throttled
}

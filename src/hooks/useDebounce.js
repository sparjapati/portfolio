import { useEffect, useState } from 'react'

/**
 * Returns `value` delayed until it has stopped changing for `delayMillis`.
 * Every change restarts the timer, so a rapidly-changing value settles once
 * instead of on every step.
 *
 * Use when only the final value matters and acting on the intermediate ones is
 * wasteful — persisting a draft, firing a search request. For values that must
 * keep tracking continuously (scroll position, cursor position), throttle with
 * useThrottle instead.
 */
export function useDebounce(value, delayMillis) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMillis)
    return () => clearTimeout(timer)
  }, [value, delayMillis])

  return debouncedValue
}

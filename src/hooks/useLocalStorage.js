import { useCallback, useRef, useState } from 'react'

function isEnvelope(parsed) {
  return (
    parsed !== null &&
    typeof parsed === 'object' &&
    typeof parsed.expiresAt === 'number' &&
    'value' in parsed
  )
}

// localStorage throws in Safari private mode and when the quota is exceeded, so
// every access is guarded. On failure the value still works in memory for the
// life of the page — it just stops surviving a reload.
function readStored(key, fallbackValue, ttlMillis) {
  let parsed
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallbackValue
    parsed = JSON.parse(raw)
  } catch {
    return fallbackValue
  }

  if (!ttlMillis) return parsed

  // With a TTL configured the value is always wrapped, so a bare value was
  // written before the TTL existed and is treated as absent.
  if (!isEnvelope(parsed)) return fallbackValue
  if (parsed.expiresAt <= Date.now()) {
    try {
      localStorage.removeItem(key)
    } catch {
      // Unreadable storage; the fallback below still applies.
    }
    return fallbackValue
  }
  return parsed.value
}

/**
 * useState backed by localStorage, JSON-serialized. Reads once on mount, so the
 * key is assumed stable for the lifetime of the component; changing it will not
 * re-read the new key's value.
 *
 * `remove` deletes the key entirely and resets the value to `initialValue`,
 * which is how a caller clears persisted data rather than storing an empty one.
 *
 * Pass `{ ttlMillis }` to expire the value. Expiry is sliding — every write
 * restarts the window — and is only evaluated when the value is read on mount,
 * so a value never disappears out from under a page that is already open.
 * Enabling a TTL on a key that already holds a plain value discards it once.
 */
export function useLocalStorage(key, initialValue, { ttlMillis } = {}) {
  const [value, setValueState] = useState(() => readStored(key, initialValue, ttlMillis))
  // Mirrors `value` so a functional update resolves against the latest value
  // without doing the write inside a React updater.
  const valueRef = useRef(value)
  const initialValueRef = useRef(initialValue)

  const setValue = useCallback(next => {
    const resolved = typeof next === 'function' ? next(valueRef.current) : next
    valueRef.current = resolved
    try {
      const payload = ttlMillis
        ? { value: resolved, expiresAt: Date.now() + ttlMillis }
        : resolved
      localStorage.setItem(key, JSON.stringify(payload))
    } catch {
      // Persistence failed; the in-memory value below is still updated.
    }
    setValueState(resolved)
  }, [key, ttlMillis])

  const remove = useCallback(() => {
    valueRef.current = initialValueRef.current
    try {
      localStorage.removeItem(key)
    } catch {
      // Nothing persisted to remove; the in-memory reset below still applies.
    }
    setValueState(initialValueRef.current)
  }, [key])

  return { value, setValue, remove }
}

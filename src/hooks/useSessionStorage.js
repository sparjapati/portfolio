import { useCallback, useRef, useState } from 'react'

// sessionStorage throws in Safari private mode and when the quota is exceeded,
// so every access is guarded. On failure the value still works in memory for
// the life of the page — it just stops surviving a reload.
function readStored(key, fallbackValue) {
  try {
    const raw = sessionStorage.getItem(key)
    return raw === null ? fallbackValue : JSON.parse(raw)
  } catch {
    return fallbackValue
  }
}

/**
 * useState backed by sessionStorage, JSON-serialized. Reads once on mount, so
 * the key is assumed stable for the lifetime of the component; changing it
 * will not re-read the new key's value.
 */
export function useSessionStorage(key, initialValue) {
  const [value, setValueState] = useState(() => readStored(key, initialValue))
  // Mirrors `value` so a functional update resolves against the latest value
  // without doing the write inside a React updater.
  const valueRef = useRef(value)

  const setValue = useCallback(next => {
    const resolved = typeof next === 'function' ? next(valueRef.current) : next
    valueRef.current = resolved
    try {
      sessionStorage.setItem(key, JSON.stringify(resolved))
    } catch {
      // Persistence failed; the in-memory value below is still updated.
    }
    setValueState(resolved)
  }, [key])

  return { value, setValue }
}

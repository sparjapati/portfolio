import { useState, useRef, useEffect } from 'react'

export function useCopyToClipboard(resetDelay = 10000) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  async function copy(text) {
    await navigator.clipboard.writeText(text)
    clearTimeout(timerRef.current)
    setCopied(true)
    timerRef.current = setTimeout(() => setCopied(false), resetDelay)
  }

  return { copied, copy }
}

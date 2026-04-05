import { useState, useEffect, useRef } from 'react'

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode() {
  const [activated, setActivated] = useState(false)
  const bufferRef = useRef([])

  useEffect(() => {
    function handleKeyDown(e) {
      bufferRef.current = [...bufferRef.current, e.key].slice(-KONAMI_SEQUENCE.length)
      if (bufferRef.current.join(',') === KONAMI_SEQUENCE.join(',')) {
        setActivated(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function reset() {
    bufferRef.current = []
    setActivated(false)
  }

  return { activated, reset }
}

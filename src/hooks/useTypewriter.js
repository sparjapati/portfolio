import { useState, useEffect } from 'react'

export function useTypewriter(text, speed = 80) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    // Intentional reset: resets the animation state when the text prop changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayed('')
  }, [text])

  useEffect(() => {
    if (displayed.length >= text.length) return
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayed, text, speed])

  return displayed
}

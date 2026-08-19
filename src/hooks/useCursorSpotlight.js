import { useRef, useState, useEffect } from 'react'
import { useThrottle } from './useThrottle'

export function useCursorSpotlight() {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  // Throttled to one update per frame: mousemove fires far faster than the
  // browser paints, and every event here allocates a new style object.
  const handleMouseMove = useThrottle(e => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setStyle({
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(100,255,218,0.06) 0%, transparent 60%)`,
    })
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return

    function handleMouseLeave() {
      // Drop any frame still pending, or it would repaint the spotlight
      // immediately after the cursor has already left.
      handleMouseMove.cancel()
      setStyle({})
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove])

  return { ref, style }
}

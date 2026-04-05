import { useRef, useState, useEffect } from 'react'

export function useCursorSpotlight() {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return

    function handleMouseMove(e) {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setStyle({
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(100,255,218,0.06) 0%, transparent 60%)`,
      })
    }

    function handleMouseLeave() {
      setStyle({})
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { ref, style }
}

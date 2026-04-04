import { useRef, useState, useEffect } from 'react'

export function useTilt() {
  const ref = useRef(null)
  const [style, setStyle] = useState({ transform: '', background: '' })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover)').matches) return

    function handleMouseMove(e) {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const rotateX = (-y / (rect.height / 2)) * 10
      const rotateY = (x / (rect.width / 2)) * 10
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        background: `radial-gradient(circle at ${px}% ${py}%, rgba(100,255,218,0.08) 0%, transparent 70%)`,
      })
    }

    function handleMouseLeave() {
      setStyle({ transform: '', background: '' })
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

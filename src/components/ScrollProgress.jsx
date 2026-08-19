import React, { useState, useEffect } from 'react'
import { useThrottle } from '../hooks/useThrottle'
import './ScrollProgress.css'

function readProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
}

export default function ScrollProgress() {
  // Read during the first render so the bar is already correct on paint; the
  // effect re-reads in case the browser restores a scroll position after mount.
  const [progress, setProgress] = useState(readProgress)
  const handleScroll = useThrottle(() => setProgress(readProgress()))

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="scroll-progress"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}

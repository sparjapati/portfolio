import React, { useState, useEffect } from 'react'
import { useThrottle } from '../hooks/useThrottle'
import './BackToTop.css'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const handleScroll = useThrottle(() => setVisible(window.scrollY > 400))

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <button
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      aria-hidden={String(!visible)}
      tabIndex={visible ? 0 : -1}
    >
      <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

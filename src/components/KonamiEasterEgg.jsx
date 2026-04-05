import React, { useEffect, useRef } from 'react'
import './KonamiEasterEgg.css'

const LINES = [
  '> Konami Code activated...',
  '> Initializing cheat mode...',
  '> Hello, curious developer! 👾',
  '> You found the easter egg.',
  '> Extra lives: ∞',
]

export default function KonamiEasterEgg({ onDismiss }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Escape') onDismiss()
  }

  return (
    <div className="konami-backdrop" onClick={onDismiss}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Easter egg"
        className="konami-terminal"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="konami-titlebar">
          <span className="konami-dot konami-dot--red" />
          <span className="konami-dot konami-dot--yellow" />
          <span className="konami-dot konami-dot--green" />
          <span className="konami-title">bash — 80×24</span>
          <button className="konami-close" onClick={onDismiss} aria-label="Close easter egg">✕</button>
        </div>
        <div className="konami-body">
          {LINES.map((line, i) => (
            <p key={i} className="konami-line" style={{ animationDelay: `${i * 0.3}s` }}>{line}</p>
          ))}
          <span className="konami-cursor">█</span>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function RevealSection({ id, ariaLabel, className, children }) {
  const ref = useScrollReveal()
  return (
    <section
      id={id}
      className={`section${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      <div ref={ref} className="reveal">
        {children}
      </div>
    </section>
  )
}

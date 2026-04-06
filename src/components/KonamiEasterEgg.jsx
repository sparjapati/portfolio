import React, { useEffect, useRef } from 'react'
import { buildKonamiLines, buildKonamiJson } from '../data/konamiLines'
import CopiableText from './CopiableText'
import CopyButton from './CopyButton'
import './KonamiEasterEgg.css'

const LINES = buildKonamiLines()
const JSON_TEXT = buildKonamiJson()

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
      <CopiableText text={JSON_TEXT}>
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
            <span className="konami-title">curl — sanjay.dev/api/me</span>
            <CopyButton className="konami-copy" ariaLabel="Copy JSON response" />
            <button className="konami-close" onClick={onDismiss} aria-label="Close easter egg">✕</button>
          </div>
          <div className="konami-body">
            {LINES.map((line, i) => (
              line.type === 'blank'
                ? <br key={i} />
                : line.html
                  ? (
                    <p
                      key={i}
                      className={`konami-line konami-line--${line.type}`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                      dangerouslySetInnerHTML={{ __html: line.html }}
                    />
                  )
                  : (
                    <p
                      key={i}
                      className={`konami-line konami-line--${line.type}`}
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      {line.text}
                    </p>
                  )
            ))}
            <span className="konami-cursor">█</span>
          </div>
        </div>
      </CopiableText>
    </div>
  )
}

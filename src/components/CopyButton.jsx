import React from 'react'
import { useCopyContext } from './CopyContext'

export default function CopyButton({ className = 'copy-email-btn', ariaLabel = 'Copy' }) {
  const { copied, copy } = useCopyContext()

  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      aria-label={copied ? 'Copied' : ariaLabel}
    >
      {copied ? (
        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span className="copy-btn-label">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

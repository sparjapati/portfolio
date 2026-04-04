import React from 'react'
import './Toast.css'

export default function Toast({ message, type }) {
  if (!message) return null
  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span className="toast-icon">{type === 'success' ? '✓' : '✗'}</span>
      {message}
    </div>
  )
}

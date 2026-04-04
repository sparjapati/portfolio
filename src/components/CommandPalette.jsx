import React, { useEffect, useRef } from 'react'
import './CommandPalette.css'

export default function CommandPalette({
  isOpen,
  close,
  query,
  setQuery,
  selectedIndex,
  setSelectedIndex,
  filteredCommands,
}) {
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  if (!isOpen) return null

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      // Focus stays on the input — Tab is trapped inside the modal
      if (inputRef.current) inputRef.current.focus()
      return
    } else if (e.key === 'Escape') {
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const cmd = filteredCommands[selectedIndex]
      if (cmd) {
        cmd.action()
        close()
      }
    }
  }

  return (
    <div
      className="cp-backdrop"
      data-testid="cp-backdrop"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="cp-modal"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <input
          ref={inputRef}
          className="cp-input"
          type="text"
          placeholder="Type a command or search..."
          value={query}
          onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
          aria-label="Command search"
        />
        <ul className="cp-list" role="listbox" aria-label="Commands">
          {filteredCommands.map((cmd, i) => (
            <li
              key={cmd.label}
              role="option"
              aria-selected={i === selectedIndex}
              className={`cp-item${i === selectedIndex ? ' cp-item--active' : ''}`}
              onClick={() => { cmd.action(); close() }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              {cmd.label}
            </li>
          ))}
          {filteredCommands.length === 0 && (
            <li className="cp-empty">No commands found</li>
          )}
        </ul>
      </div>
    </div>
  )
}

import { useState, useEffect, useCallback, useRef } from 'react'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function useCommandPalette({ toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const previousFocusRef = useRef(null)

  const commands = [
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Skills', action: () => scrollToSection('skills') },
    { label: 'Projects', action: () => scrollToSection('projects') },
    { label: 'Experience', action: () => scrollToSection('experience') },
    { label: 'Contact', action: () => scrollToSection('contact') },
    { label: 'GitHub', action: () => window.open('https://github.com/sparjapati', '_blank') },
    { label: 'LinkedIn', action: () => window.open('https://linkedin.com/in/sparjapati', '_blank') },
    { label: 'X / Twitter', action: () => window.open('https://x.com/_sparjapati_', '_blank') },
    { label: 'Copy email', action: () => navigator.clipboard.writeText('parjapatsanjay1999@gmail.com') },
    { label: 'Toggle theme', action: toggleTheme },
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  )

  const open = useCallback(() => {
    previousFocusRef.current = document.activeElement
    setQuery('')
    setSelectedIndex(0)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    if (previousFocusRef.current) previousFocusRef.current.focus()
  }, [])

  useEffect(() => {
    function handleKeyDown(e) {
      const tag = document.activeElement?.tagName
      const inInput = tag === 'INPUT' || tag === 'TEXTAREA'

      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        isOpen ? close() : open()
        return
      }
      if (e.key === '/' && !inInput && !isOpen) {
        e.preventDefault()
        open()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, open, close])

  return {
    isOpen,
    open,
    close,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
  }
}

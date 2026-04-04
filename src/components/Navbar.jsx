import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hamburgerRef = useRef(null)
  const navLinksRef = useRef(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Escape key + focus trap when menu open
  useEffect(() => {
    if (!menuOpen) {
      // Return focus to hamburger when menu closes
      if (wasOpen.current) hamburgerRef.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true

    // Move focus to first nav link when menu opens
    const firstLink = navLinksRef.current?.querySelector('a')
    firstLink?.focus()

    const handleKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); return }
      if (e.key !== 'Tab') return
      const focusable = Array.from(
        navLinksRef.current?.querySelectorAll('a') ?? []
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav aria-label="Primary" className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-logo">&lt;Sanjay /&gt;</span>
        <ul ref={navLinksRef} className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={handleLinkClick}>
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Sanjay-SE2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
              aria-label="Resume (opens in new tab)"
            >
              RESUME
            </a>
          </li>
        </ul>
        <button
          ref={hamburgerRef}
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

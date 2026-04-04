import React, { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-logo">&lt;Sanjay /&gt;</span>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
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
            >
              RESUME
            </a>
          </li>
        </ul>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

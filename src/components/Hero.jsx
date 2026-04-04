import React from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import './Hero.css'

export default function Hero() {
  const typed = useTypewriter('I build scalable backend systems.')

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-name">Sanjay</h1>
        <h2 className="hero-tagline">
          {typed}<span className="cursor" aria-hidden="true">|</span>
        </h2>
        <p className="hero-bio">
          Backend-focused Software Engineer with experience building fintech systems at scale.
          NIT Kurukshetra CS grad, currently SE II at Oxyzo Financial Services.
        </p>
        <div className="hero-links">
          <a
            href="https://github.com/sparjapati"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
          >
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/sparjapati"
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
          >
            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

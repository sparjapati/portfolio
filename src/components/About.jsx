import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { education } from '../data/experience'
import './About.css'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="About Me">About Me</h2>
        <div className="about-content">
          <p className="about-bio">
            Hello! I'm Sanjay, a backend-focused Software Engineer with a strong foundation in
            computer science and a passion for building reliable, high-performance systems.
            I thrive on solving complex engineering problems — from designing event-driven
            architectures to optimizing database queries at scale. Currently working as SE II
            at Oxyzo Financial Services, where I build fintech infrastructure used by thousands.
          </p>
          <div className="education">
            <h3 className="education-title">
              <span className="slash">/</span> Education History
            </h3>
            <div className="edu-list">
              {education.map(edu => (
                <div key={edu.id} className="edu-card">
                  <div className="edu-left">
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree}</p>
                  </div>
                  <div className="edu-right">
                    <p className="edu-period">{edu.period}</p>
                    <p className="edu-score">{edu.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

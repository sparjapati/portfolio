import React from 'react'
import { education } from '../data/experience'
import RevealSection from './RevealSection'
import SectionTitle from './SectionTitle'
import './About.css'

export default function About() {
  return (
    <RevealSection id="about" ariaLabel="About Me">
      <SectionTitle text="About Me" />
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
            <span className="slash" aria-hidden="true">/</span> Education History
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
    </RevealSection>
  )
}

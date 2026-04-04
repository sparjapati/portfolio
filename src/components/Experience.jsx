import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { experiences } from '../data/experience'
import './Experience.css'

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" className="section" aria-label="Experience">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="Experiences">Experiences</h2>
        <div className="timeline">
          {experiences.map(exp => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-period">{exp.period}</div>
              <div className="timeline-content">
                <h3 className="exp-role">{exp.role}</h3>
                <h4 className="exp-company">{exp.company}</h4>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="bullet-arrow" aria-hidden="true">▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {exp.achievement && (
                  <div className="achievement-badge">
                    ★ {exp.achievement}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

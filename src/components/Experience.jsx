import React from 'react'
import { experiences } from '../data/experience'
import RevealSection from './RevealSection'
import SectionTitle from './SectionTitle'
import BulletList from './BulletList'
import './Experience.css'

export default function Experience() {
  return (
    <RevealSection id="experience" ariaLabel="Experiences">
      <SectionTitle text="Experiences" />
      <div className="timeline">
        {experiences.map(exp => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-period">{exp.period}</div>
            <div className="timeline-content">
              <h3 className="exp-role">{exp.role}</h3>
              <h4 className="exp-company">{exp.company}</h4>
              <BulletList items={exp.bullets} className="exp-bullets" />
              {exp.achievement && (
                <div className="achievement-badge">
                  ★ {exp.achievement}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  )
}

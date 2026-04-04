import React from 'react'
import { skillGroups, competencies } from '../data/skills'
import RevealSection from './RevealSection'
import SectionTitle from './SectionTitle'
import './Skills.css'

export default function Skills() {
  return (
    <RevealSection id="skills" ariaLabel="Skills">
      <SectionTitle text="Technologies I Work With" />
      <div className="skills-layout">
        <div className="skill-groups">
          {skillGroups.map(group => (
            <div key={group.category} className="skill-group">
              <h3 className="skill-category">{group.category}</h3>
              <ul className="skill-list">
                {group.items.map(item => (
                  <li key={item} className="skill-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="competencies">
          <h3 className="skill-category">Core Competencies</h3>
          <ul className="competency-tags">
            {competencies.map(c => (
              <li key={c} className="competency-tag">{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </RevealSection>
  )
}

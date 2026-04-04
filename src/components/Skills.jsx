import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { skillGroups, competencies } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className="section" aria-label="Skills">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="Technologies I Work With">
          Technologies I Work With
        </h2>
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
      </div>
    </section>
  )
}

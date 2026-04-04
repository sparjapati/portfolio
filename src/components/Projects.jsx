import React from 'react'
import { projects } from '../data/projects'
import { useTilt } from '../hooks/useTilt'
import RevealSection from './RevealSection'
import SectionTitle from './SectionTitle'
import BulletList from './BulletList'
import './Projects.css'

function ExternalIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ProjectCard({ project }) {
  const { ref, style } = useTilt()
  return (
    <div className="project-card" ref={ref} style={style}>
      <div className="project-label">Featured Project</div>
      <h3 className="project-title">{project.title}</h3>
      <div className="project-desc">
        <BulletList items={project.bullets} />
      </div>
      <ul className="project-tech">
        {project.tech.map(t => <li key={t}>{t}</li>)}
      </ul>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <GithubIcon />
          <span>GitHub Repo</span>
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
            <ExternalIcon />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <RevealSection id="projects" ariaLabel="Projects">
      <SectionTitle text="Some Things I've Built" />
      <div className="projects-list">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </RevealSection>
  )
}

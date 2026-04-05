import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialSidebar from '../../components/SocialSidebar'
import { LINKS } from '../../data/links'

describe('SocialSidebar', () => {
  it('renders GitHub link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', LINKS.github)
  })

  it('renders LinkedIn link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', LINKS.linkedin)
  })

  it('renders email link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', `mailto:${LINKS.email}`)
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import SocialSidebar from '../../components/SocialSidebar'

describe('SocialSidebar', () => {
  it('renders GitHub link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/sparjapati')
  })

  it('renders LinkedIn link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://linkedin.com/in/sparjapati')
  })

  it('renders email link', () => {
    render(<SocialSidebar />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:parjapatsanjay1999@gmail.com')
  })
})

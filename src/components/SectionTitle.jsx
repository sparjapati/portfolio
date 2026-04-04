import React from 'react'

export default function SectionTitle({ text }) {
  return (
    <h2 className="section-title" data-echo={text}>{text}</h2>
  )
}

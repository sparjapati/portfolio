import React from 'react'

export default function BulletList({ items, className }) {
  return (
    <ul className={className}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="bullet-arrow" aria-hidden="true">▹</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

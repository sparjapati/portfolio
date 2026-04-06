import React from 'react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { CopyContext } from './CopyContext'

export default function CopiableText({ text, children }) {
  const { copied, copy } = useCopyToClipboard()
  return (
    <CopyContext.Provider value={{ copied, copy: () => copy(text) }}>
      {children}
    </CopyContext.Provider>
  )
}

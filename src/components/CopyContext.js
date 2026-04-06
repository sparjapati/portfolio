import { createContext, useContext } from 'react'

export const CopyContext = createContext(null)

export function useCopyContext() {
  const ctx = useContext(CopyContext)
  if (!ctx) throw new Error('Must be used inside CopiableText')
  return ctx
}

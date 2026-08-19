import { useEffect, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

const THEME_KEY = 'theme'

const isTheme = value => value === 'dark' || value === 'light'

function preferredTheme() {
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'dark'
}

// Themes saved before this key moved to JSON are bare strings ("dark"), which
// JSON.parse rejects. Reading one here hands it to useLocalStorage as the
// fallback, so a returning visitor keeps the theme they picked; their next
// toggle rewrites it in the current format. Removable once traffic has cycled.
function readLegacyTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    return isTheme(raw) ? raw : null
  } catch {
    return null
  }
}

export function useTheme() {
  const legacyTheme = useMemo(() => readLegacyTheme(), [])
  const { value: storedTheme, setValue: setStoredTheme } = useLocalStorage(THEME_KEY, legacyTheme)

  // Nothing is written until the visitor actually picks a theme, so the site
  // keeps following their OS setting until then.
  const theme = isTheme(storedTheme) ? storedTheme : preferredTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setStoredTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggleTheme }
}

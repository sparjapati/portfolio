import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import BackToTop from './components/BackToTop'
import CommandPalette from './components/CommandPalette'
import Toast from './components/Toast'
import KonamiEasterEgg from './components/KonamiEasterEgg'
import { useTheme } from './hooks/useTheme'
import { useCommandPalette } from './hooks/useCommandPalette'
import { useActiveSection } from './hooks/useActiveSection'
import { useKonamiCode } from './hooks/useKonamiCode'
import { useState, useRef } from 'react'
import './App.css'

function App() {
  const { theme, toggleTheme } = useTheme()
  const { activated: konamiActivated, reset: konamiReset } = useKonamiCode()
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)

  function showToast({ message, type = 'success' }) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message, type })
    toastTimerRef.current = setTimeout(() => setToast(null), 2000)
  }

  const palette = useCommandPalette({ toggleTheme, showToast })
  const activeSection = useActiveSection(['about', 'skills', 'projects', 'experience', 'contact'])

  return (
    <div className="app">
      <ScrollProgress />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar theme={theme} toggleTheme={toggleTheme} onOpenPalette={palette.open} activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <BackToTop />
      <Toast message={toast?.message} type={toast?.type} />
      <CommandPalette
        isOpen={palette.isOpen}
        close={palette.close}
        query={palette.query}
        setQuery={palette.setQuery}
        selectedIndex={palette.selectedIndex}
        setSelectedIndex={palette.setSelectedIndex}
        filteredCommands={palette.filteredCommands}
      />
      {konamiActivated && <KonamiEasterEgg onDismiss={konamiReset} />}
    </div>
  )
}

export default App

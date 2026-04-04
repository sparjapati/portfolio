# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed developer portfolio cloning aditiarya.netlify.app with Sanjay's content.

**Architecture:** Single-page React + Vite app with anchor-based smooth scroll, plain CSS with custom properties, and no external UI libraries. Content is separated into data files so sections can be updated without touching component code.

**Tech Stack:** React 18, Vite 5, Vitest, @testing-library/react, plain CSS

---

## File Map

```
src/
  data/
    skills.js          ← skills grouped by category
    projects.js        ← project cards data
    experience.js      ← work/education timeline data
  hooks/
    useTypewriter.js   ← types a string one char at a time
    useScrollReveal.js ← attaches IntersectionObserver, returns ref
  components/
    Navbar.jsx / Navbar.css
    SocialSidebar.jsx / SocialSidebar.css
    Hero.jsx / Hero.css
    About.jsx / About.css
    Skills.jsx / Skills.css
    Projects.jsx / Projects.css
    Experience.jsx / Experience.css
    Contact.jsx / Contact.css
    Footer.jsx / Footer.css
  App.jsx
  App.css
  index.css            ← CSS custom properties + reset
  main.jsx
src/__tests__/
  hooks/
    useTypewriter.test.js
    useScrollReveal.test.js
  components/
    Navbar.test.jsx
    Hero.test.jsx
    About.test.jsx
    Skills.test.jsx
    Projects.test.jsx
    Experience.test.jsx
    Contact.test.jsx
    Footer.test.jsx
public/
  Sanjay-SE2.pdf
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React project**

```bash
cd /Users/sanjay/Documents/projects/portfolio
npm create vite@latest . -- --template react
npm install
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Configure Vitest in `vite.config.js`**

Replace the generated `vite.config.js` with:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
```

- [ ] **Step 3: Create test setup file `src/setupTests.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Update `package.json` scripts**

Add to the `"scripts"` section:
```json
"test": "vitest",
"test:ui": "vitest --ui"
```

- [ ] **Step 5: Copy resume PDF to public folder**

```bash
cp /Users/sanjay/Documents/projects/portfolio/Sanjay-SE2.pdf /Users/sanjay/Documents/projects/portfolio/public/Sanjay-SE2.pdf
```

- [ ] **Step 6: Run dev server to verify scaffold works**

```bash
npm run dev
```

Expected: Vite dev server starts at `http://localhost:5173`, default React page loads.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React project with Vitest"
```

---

## Task 2: Global CSS Design Tokens

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.jsx`, `src/App.css`

- [ ] **Step 1: Write `src/index.css` with CSS custom properties and reset**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #0a0f1e;
  --bg-card: #112240;
  --accent: #64ffda;
  --accent-dim: rgba(100, 255, 218, 0.1);
  --text-primary: #ccd6f6;
  --text-secondary: #8892b0;
  --nav-bg: rgba(10, 15, 30, 0.85);
  --font-sans: 'Inter', 'Calibre', system-ui, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
  --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  --max-width: 1000px;
  --nav-height: 70px;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
}

ul {
  list-style: none;
}

/* Scroll reveal utility class */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Section layout utility */
.section {
  padding: 100px 0;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: 25px;
  padding-right: 25px;
}

/* Ghost heading utility */
.section-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 60px;
  gap: 12px;
}

.section-title::before {
  content: attr(data-echo);
  position: absolute;
  font-size: 5rem;
  font-weight: 700;
  color: rgba(204, 214, 246, 0.04);
  white-space: nowrap;
  z-index: -1;
  user-select: none;
}
```

- [ ] **Step 2: Clear `src/App.css` and replace with layout styles**

```css
.app {
  position: relative;
}

main {
  padding-top: var(--nav-height);
}
```

- [ ] **Step 3: Replace `src/App.jsx` with minimal shell**

```jsx
function App() {
  return (
    <div className="app">
      <main>
        <p style={{ color: 'var(--accent)', padding: '2rem' }}>Portfolio loading...</p>
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 4: Verify styling loads**

```bash
npm run dev
```

Expected: Black background with cyan "Portfolio loading..." text.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global CSS design tokens and reset"
```

---

## Task 3: Content Data Files

**Files:**
- Create: `src/data/skills.js`
- Create: `src/data/projects.js`
- Create: `src/data/experience.js`

- [ ] **Step 1: Create `src/data/skills.js`**

```js
export const skillGroups = [
  {
    category: 'Languages',
    items: ['Java', 'Kotlin', 'Python', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['Spring Boot', 'React.js', 'Flask', 'Native Android SDK'],
  },
  {
    category: 'DB & Tools',
    items: ['MySQL', 'ElasticSearch', 'Redis', 'Docker', 'Git', 'Jenkins', 'Postman', 'IntelliJ IDEA'],
  },
]

export const competencies = [
  'Microservices',
  'Event-Driven Architecture',
  'Data Structures & Algorithms',
  'JWT & Auth',
  'Multithreading',
  'ActiveMQ',
  'REST APIs',
  'Spring Data JPA',
  'Hibernate',
]
```

- [ ] **Step 2: Create `src/data/projects.js`**

```js
export const projects = [
  {
    id: 1,
    title: 'Continuous Assessment Analytical Application',
    period: 'Jan 2023 – Jun 2023',
    bullets: [
      'Built a quiz conducting platform for teachers, students, and management.',
      'Automated quiz result storage and retrieval, reducing manual effort by 60%.',
      'Designed a user-friendly graphical interface for result analysis.',
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
    github: 'https://github.com/sparjapati',
    live: null,
  },
]
```

- [ ] **Step 3: Create `src/data/experience.js`**

```js
export const experiences = [
  {
    id: 1,
    role: 'Software Engineer II',
    company: 'Oxyzo Financial Services Ltd. (Ofbusiness)',
    period: 'Apr 2025 – Present',
    bullets: [
      'Developed a masking algorithm to conceal Aadhaar numbers within uploaded documents, masking over 12,00,000 existing records.',
      'Integrated external banking switchable APIs (Federal Bank, IndusInd Bank, Axis Bank) using SSL encryption and encrypted payload formats to automate loan repayment.',
    ],
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Oxyzo Financial Services Ltd. (Ofbusiness)',
    period: 'Jun 2023 – Mar 2025',
    bullets: [
      'Single-handedly built and maintained the Cheque Module, enabling finance team to automate cheque payment management.',
      'Created backend system for beneficiary organization onboarding, reducing manual effort by 80%+.',
      'Enhanced cheque listing with a dedicated Elastic Index for efficient internal access.',
      'Implemented Email and WhatsApp notifications, leading to a 47% rise in buyer portal traffic.',
      'Designed event-driven encrypted cache for third-party API responses (Google Vision), saving Rs. 2 lakhs in API costs in one month.',
    ],
    achievement: 'Employee of the Month — Feb 2025',
  },
  {
    id: 3,
    role: 'Native Android Developer Intern',
    company: 'Seraphic Infosolutions Pvt. Ltd.',
    period: 'Feb 2022 – Jun 2022',
    bullets: [
      'Built a Nap-taking application with soft music, Google In-App Purchases, and WorkManager for sound downloads.',
      'Built a surveying native app using REST APIs, Retrofit, local caching, and notifications.',
    ],
  },
]

export const education = [
  {
    id: 1,
    institution: 'National Institute of Technology, Kurukshetra',
    degree: 'B.Tech in Computer Science',
    period: 'Aug 2019 – May 2023',
    score: 'GPA: 8.0',
  },
  {
    id: 2,
    institution: 'Adarsh Sr. Sec. School, Kairu, Bhiwani',
    degree: '12th Standard CBSE',
    period: 'Mar 2018',
    score: '89.4%',
  },
  {
    id: 3,
    institution: 'Adarsh Sr. Sec. School, Kairu, Bhiwani',
    degree: '10th Standard CBSE',
    period: 'Mar 2016',
    score: '94.2%',
  },
]
```

- [ ] **Step 4: Commit**

```bash
git add src/data/
git commit -m "feat: add content data files for skills, projects, experience"
```

---

## Task 4: useTypewriter Hook (TDD)

**Files:**
- Create: `src/hooks/useTypewriter.js`
- Create: `src/__tests__/hooks/useTypewriter.test.js`

- [ ] **Step 1: Create test directory**

```bash
mkdir -p src/__tests__/hooks src/__tests__/components
```

- [ ] **Step 2: Write failing test `src/__tests__/hooks/useTypewriter.test.js`**

```js
import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useTypewriter } from '../../hooks/useTypewriter'

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts with empty string', () => {
    const { result } = renderHook(() => useTypewriter('Hello', 80))
    expect(result.current).toBe('')
  })

  it('types one character per interval', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 80))
    act(() => vi.advanceTimersByTime(80))
    expect(result.current).toBe('H')
    act(() => vi.advanceTimersByTime(80))
    expect(result.current).toBe('Hi')
  })

  it('stops at full string length', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 80))
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current).toBe('Hi')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test -- useTypewriter
```

Expected: FAIL — "Cannot find module '../../hooks/useTypewriter'"

- [ ] **Step 4: Implement `src/hooks/useTypewriter.js`**

```js
import { useState, useEffect } from 'react'

export function useTypewriter(text, speed = 80) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
  }, [text])

  useEffect(() => {
    if (displayed.length >= text.length) return
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayed, text, speed])

  return displayed
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- useTypewriter
```

Expected: PASS — 3 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useTypewriter.js src/__tests__/hooks/useTypewriter.test.js
git commit -m "feat: add useTypewriter hook with tests"
```

---

## Task 5: useScrollReveal Hook (TDD)

**Files:**
- Create: `src/hooks/useScrollReveal.js`
- Create: `src/__tests__/hooks/useScrollReveal.test.js`

- [ ] **Step 1: Write failing test `src/__tests__/hooks/useScrollReveal.test.js`**

```js
import { renderHook } from '@testing-library/react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

describe('useScrollReveal', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useScrollReveal())
    expect(result.current).toHaveProperty('current')
  })

  it('adds reveal class to attached element when intersecting', () => {
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }
    let observerCallback
    vi.stubGlobal('IntersectionObserver', vi.fn((cb) => {
      observerCallback = cb
      return mockObserver
    }))

    const div = document.createElement('div')
    div.classList.add('reveal')
    const { result } = renderHook(() => useScrollReveal())
    result.current.current = div

    // Re-run effect by triggering intersection
    observerCallback([{ isIntersecting: true, target: div }])
    expect(div.classList.contains('revealed')).toBe(true)

    vi.unstubAllGlobals()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- useScrollReveal
```

Expected: FAIL — "Cannot find module '../../hooks/useScrollReveal'"

- [ ] **Step 3: Implement `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- useScrollReveal
```

Expected: PASS — 2 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScrollReveal.js src/__tests__/hooks/useScrollReveal.test.js
git commit -m "feat: add useScrollReveal hook with tests"
```

---

## Task 6: Navbar Component (TDD)

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Navbar.css`
- Create: `src/__tests__/components/Navbar.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Navbar.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../../components/Navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('<Sanjay />')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    ;['About', 'Skills', 'Projects', 'Experience', 'Contact'].forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument()
    })
  })

  it('renders resume link pointing to PDF', () => {
    render(<Navbar />)
    const resumeLink = screen.getByText('RESUME')
    expect(resumeLink.closest('a')).toHaveAttribute('href', '/Sanjay-SE2.pdf')
  })

  it('toggles mobile menu on hamburger click', () => {
    render(<Navbar />)
    const hamburger = screen.getByLabelText('Toggle menu')
    expect(screen.getByRole('navigation').querySelector('.nav-links')).not.toHaveClass('open')
    fireEvent.click(hamburger)
    expect(screen.getByRole('navigation').querySelector('.nav-links')).toHaveClass('open')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Navbar
```

Expected: FAIL — "Cannot find module '../../components/Navbar'"

- [ ] **Step 3: Create `src/components/Navbar.jsx`**

```jsx
import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-logo">&lt;Sanjay /&gt;</span>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={handleLinkClick}>
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Sanjay-SE2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              RESUME
            </a>
          </li>
        </ul>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Create `src/components/Navbar.css`**

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: var(--transition);
}

.navbar.scrolled {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.nav-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--accent);
  cursor: pointer;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-primary);
  transition: var(--transition);
}

.nav-links a:hover {
  color: var(--accent);
}

.resume-btn {
  border: 1px solid var(--accent) !important;
  color: var(--accent) !important;
  padding: 8px 16px;
  border-radius: 4px;
  transition: var(--transition) !important;
}

.resume-btn:hover {
  background: var(--accent-dim) !important;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--accent);
  transition: var(--transition);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: var(--nav-height);
    right: 0;
    bottom: 0;
    width: 70vw;
    max-width: 300px;
    background: var(--bg-card);
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    padding: 2rem;
  }

  .nav-links.open {
    transform: translateX(0);
  }

  .nav-links a {
    font-size: 1rem;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Navbar
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.jsx src/components/Navbar.css src/__tests__/components/Navbar.test.jsx
git commit -m "feat: add Navbar component with mobile menu"
```

---

## Task 7: SocialSidebar Component (TDD)

**Files:**
- Create: `src/components/SocialSidebar.jsx`
- Create: `src/components/SocialSidebar.css`
- Create: `src/__tests__/components/SocialSidebar.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/SocialSidebar.test.jsx`**

```jsx
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
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- SocialSidebar
```

Expected: FAIL — "Cannot find module '../../components/SocialSidebar'"

- [ ] **Step 3: Create `src/components/SocialSidebar.jsx`**

```jsx
import './SocialSidebar.css'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/sparjapati',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/sparjapati',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:parjapatsanjay1999@gmail.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function SocialSidebar() {
  return (
    <aside className="social-sidebar">
      <ul>
        {LINKS.map(({ label, href, icon }) => (
          <li key={label}>
            <a href={href} aria-label={label} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              {icon}
            </a>
          </li>
        ))}
      </ul>
      <div className="sidebar-line" />
    </aside>
  )
}
```

- [ ] **Step 4: Create `src/components/SocialSidebar.css`**

```css
.social-sidebar {
  position: fixed;
  bottom: 0;
  left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.social-sidebar ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-sidebar a {
  color: var(--text-secondary);
  transition: var(--transition);
  display: block;
  line-height: 0;
}

.social-sidebar a:hover {
  color: var(--accent);
  transform: translateY(-3px);
}

.sidebar-line {
  width: 1px;
  height: 90px;
  background: var(--text-secondary);
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .social-sidebar {
    display: none;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- SocialSidebar
```

Expected: PASS — 3 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/SocialSidebar.jsx src/components/SocialSidebar.css src/__tests__/components/SocialSidebar.test.jsx
git commit -m "feat: add fixed social sidebar"
```

---

## Task 8: Hero Section (TDD)

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/Hero.css`
- Create: `src/__tests__/components/Hero.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Hero.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Hero from '../../components/Hero'

vi.mock('../../hooks/useTypewriter', () => ({
  useTypewriter: () => 'I build scalable backend systems.',
}))

describe('Hero', () => {
  it('renders greeting', () => {
    render(<Hero />)
    expect(screen.getByText(/Hi, my name is/i)).toBeInTheDocument()
  })

  it('renders name', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sanjay')
  })

  it('renders typewriter output', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('I build scalable backend systems.')
  })

  it('renders GitHub social link', () => {
    render(<Hero />)
    expect(screen.getByLabelText('GitHub profile')).toHaveAttribute('href', 'https://github.com/sparjapati')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Hero
```

Expected: FAIL — "Cannot find module '../../components/Hero'"

- [ ] **Step 3: Create `src/components/Hero.jsx`**

```jsx
import { useTypewriter } from '../hooks/useTypewriter'
import './Hero.css'

export default function Hero() {
  const typed = useTypewriter('I build scalable backend systems.')

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-name">Sanjay</h1>
        <h2 className="hero-tagline">
          {typed}<span className="cursor" aria-hidden="true">|</span>
        </h2>
        <p className="hero-bio">
          Backend-focused Software Engineer with experience building fintech systems at scale.
          NIT Kurukshetra CS grad, currently SE II at Oxyzo Financial Services.
        </p>
        <div className="hero-links">
          <a
            href="https://github.com/sparjapati"
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/sparjapati"
            aria-label="LinkedIn profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-icon-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/Hero.css`**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 25px;
  max-width: var(--max-width);
  margin: 0 auto;
}

.hero-content {
  max-width: 700px;
}

.hero-greeting {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.hero-name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
  margin-bottom: 0.5rem;
}

.hero-tagline {
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--text-secondary);
  line-height: 1.1;
  margin-bottom: 2rem;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--accent);
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-bio {
  max-width: 500px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.hero-links {
  display: flex;
  gap: 1.5rem;
}

.hero-icon-link {
  color: var(--text-secondary);
  transition: var(--transition);
  line-height: 0;
}

.hero-icon-link:hover {
  color: var(--accent);
  transform: translateY(-3px);
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Hero
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css src/__tests__/components/Hero.test.jsx
git commit -m "feat: add Hero section with typewriter animation"
```

---

## Task 9: About Section (TDD)

**Files:**
- Create: `src/components/About.jsx`
- Create: `src/components/About.css`
- Create: `src/__tests__/components/About.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/About.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import About from '../../components/About'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('About', () => {
  it('renders section heading', () => {
    render(<About />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('renders education history heading', () => {
    render(<About />)
    expect(screen.getByText(/Education History/i)).toBeInTheDocument()
  })

  it('renders NIT Kurukshetra entry', () => {
    render(<About />)
    expect(screen.getByText(/National Institute of Technology/i)).toBeInTheDocument()
  })

  it('renders all 3 education entries', () => {
    render(<About />)
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(3)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- About
```

Expected: FAIL — "Cannot find module '../../components/About'"

- [ ] **Step 3: Create `src/components/About.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { education } from '../data/experience'
import './About.css'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" className="section">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="About Me">About Me</h2>
        <div className="about-content">
          <p className="about-bio">
            Hello! I'm Sanjay, a backend-focused Software Engineer with a strong foundation in
            computer science and a passion for building reliable, high-performance systems.
            I thrive on solving complex engineering problems — from designing event-driven
            architectures to optimizing database queries at scale. Currently working as SE II
            at Oxyzo Financial Services, where I build fintech infrastructure used by thousands.
          </p>
          <div className="education">
            <h3 className="education-title">
              <span className="slash">/</span> Education History
            </h3>
            <div className="edu-list">
              {education.map(edu => (
                <div key={edu.id} className="edu-card">
                  <div className="edu-left">
                    <h4>{edu.institution}</h4>
                    <p>{edu.degree}</p>
                  </div>
                  <div className="edu-right">
                    <p className="edu-period">{edu.period}</p>
                    <p className="edu-score">{edu.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/About.css`**

```css
.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about-bio {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.education-title {
  font-family: var(--font-mono);
  font-size: 1.1rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.slash {
  margin-right: 6px;
}

.edu-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edu-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: var(--bg-card);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 6px;
  padding: 1.25rem 1.5rem;
  transition: var(--transition);
}

.edu-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.edu-left h4 {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 4px;
}

.edu-left p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.edu-right {
  text-align: right;
}

.edu-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 4px;
}

.edu-score {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .edu-card {
    flex-direction: column;
    gap: 0.75rem;
  }

  .edu-right {
    text-align: left;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- About
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/About.jsx src/components/About.css src/__tests__/components/About.test.jsx
git commit -m "feat: add About section with education history"
```

---

## Task 10: Skills Section (TDD)

**Files:**
- Create: `src/components/Skills.jsx`
- Create: `src/components/Skills.css`
- Create: `src/__tests__/components/Skills.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Skills.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Skills from '../../components/Skills'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Skills', () => {
  it('renders section heading', () => {
    render(<Skills />)
    expect(screen.getByText('Technologies I Work With')).toBeInTheDocument()
  })

  it('renders Languages category', () => {
    render(<Skills />)
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })

  it('renders Java skill', () => {
    render(<Skills />)
    expect(screen.getByText('Java')).toBeInTheDocument()
  })

  it('renders core competency tags', () => {
    render(<Skills />)
    expect(screen.getByText('Microservices')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Skills
```

Expected: FAIL — "Cannot find module '../../components/Skills'"

- [ ] **Step 3: Create `src/components/Skills.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { skillGroups, competencies } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="skills" className="section">
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
```

- [ ] **Step 4: Create `src/components/Skills.css`**

```css
.skills-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-group {
  background: var(--bg-card);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 6px;
  padding: 1.5rem;
}

.skill-category {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-category::before {
  content: '—';
  color: var(--accent);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-item {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 4px;
  padding: 4px 12px;
  transition: var(--transition);
}

.skill-item:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.competencies {
  background: var(--bg-card);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 6px;
  padding: 1.5rem;
  align-self: start;
}

.competency-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.competency-tag {
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 20px;
  padding: 5px 14px;
  transition: var(--transition);
}

.competency-tag:hover {
  color: var(--accent);
  border-color: var(--accent);
}

@media (max-width: 768px) {
  .skills-layout {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Skills
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Skills.jsx src/components/Skills.css src/__tests__/components/Skills.test.jsx
git commit -m "feat: add Skills section"
```

---

## Task 11: Projects Section (TDD)

**Files:**
- Create: `src/components/Projects.jsx`
- Create: `src/components/Projects.css`
- Create: `src/__tests__/components/Projects.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Projects.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Projects from '../../components/Projects'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />)
    expect(screen.getByText("Some Things I've Built")).toBeInTheDocument()
  })

  it('renders project title', () => {
    render(<Projects />)
    expect(screen.getByText('Continuous Assessment Analytical Application')).toBeInTheDocument()
  })

  it('renders tech tags', () => {
    render(<Projects />)
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Projects />)
    expect(screen.getByText('GitHub Repo')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Projects
```

Expected: FAIL — "Cannot find module '../../components/Projects'"

- [ ] **Step 3: Create `src/components/Projects.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { projects } from '../data/projects'
import './Projects.css'

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export default function Projects() {
  const ref = useScrollReveal()

  return (
    <section id="projects" className="section">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="Some Things I've Built">
          Some Things I've Built
        </h2>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-label">Featured Project</div>
              <h3 className="project-title">{project.title}</h3>
              <div className="project-desc">
                <ul>
                  {project.bullets.map((b, i) => (
                    <li key={i}><span className="bullet-arrow">▹</span>{b}</li>
                  ))}
                </ul>
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
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/Projects.css`**

```css
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 8px;
  padding: 2rem;
  transition: var(--transition);
}

.project-card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px -10px rgba(100, 255, 218, 0.1);
}

.project-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  cursor: default;
}

.project-desc ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-desc li {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  display: flex;
  gap: 0.5rem;
}

.bullet-arrow {
  color: var(--accent);
  flex-shrink: 0;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.project-tech li {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.project-links {
  display: flex;
  gap: 1.25rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: var(--transition);
}

.project-link:hover {
  color: var(--accent);
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Projects
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Projects.jsx src/components/Projects.css src/__tests__/components/Projects.test.jsx
git commit -m "feat: add Projects section"
```

---

## Task 12: Experience Section (TDD)

**Files:**
- Create: `src/components/Experience.jsx`
- Create: `src/components/Experience.css`
- Create: `src/__tests__/components/Experience.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Experience.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Experience from '../../components/Experience'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Experience', () => {
  it('renders section heading', () => {
    render(<Experience />)
    expect(screen.getByText('Experiences')).toBeInTheDocument()
  })

  it('renders SE II role', () => {
    render(<Experience />)
    expect(screen.getByText('Software Engineer II')).toBeInTheDocument()
  })

  it('renders Oxyzo company', () => {
    render(<Experience />)
    expect(screen.getAllByText(/Oxyzo/i).length).toBeGreaterThan(0)
  })

  it('renders Employee of Month achievement', () => {
    render(<Experience />)
    expect(screen.getByText(/Employee of the Month/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Experience
```

Expected: FAIL — "Cannot find module '../../components/Experience'"

- [ ] **Step 3: Create `src/components/Experience.jsx`**

```jsx
import { useScrollReveal } from '../hooks/useScrollReveal'
import { experiences } from '../data/experience'
import './Experience.css'

export default function Experience() {
  const ref = useScrollReveal()

  return (
    <section id="experience" className="section">
      <div ref={ref} className="reveal">
        <h2 className="section-title" data-echo="Experiences">Experiences</h2>
        <div className="timeline">
          {experiences.map(exp => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-period">{exp.period}</div>
              <div className="timeline-content">
                <h3 className="exp-role">{exp.role}</h3>
                <h4 className="exp-company">{exp.company}</h4>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="bullet-arrow">▹</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {exp.achievement && (
                  <div className="achievement-badge">
                    ★ {exp.achievement}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/Experience.css`**

```css
.timeline {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-left: 2px solid rgba(100, 255, 218, 0.2);
  padding-left: 2rem;
  margin-left: 2rem;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2.6rem;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 2px var(--accent);
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.exp-role {
  font-size: 1.15rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.exp-company {
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 400;
  margin-bottom: 1rem;
}

.exp-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exp-bullets li {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  display: flex;
  gap: 0.5rem;
}

.bullet-arrow {
  color: var(--accent);
  flex-shrink: 0;
}

.achievement-badge {
  display: inline-block;
  margin-top: 1rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 4px 12px;
}

@media (max-width: 600px) {
  .timeline {
    margin-left: 0.5rem;
    padding-left: 1.25rem;
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Experience
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Experience.jsx src/components/Experience.css src/__tests__/components/Experience.test.jsx
git commit -m "feat: add Experience section with timeline"
```

---

## Task 13: Contact Section (TDD)

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Contact.css`
- Create: `src/__tests__/components/Contact.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Contact.test.jsx`**

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Contact from '../../components/Contact'

vi.mock('../../hooks/useScrollReveal', () => ({
  useScrollReveal: () => ({ current: null }),
}))

describe('Contact', () => {
  it('renders Get In Touch heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: /Get In Touch/i })).toBeInTheDocument()
  })

  it('renders name, email, message fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Your Message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty form', () => {
    render(<Contact />)
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Contact
```

Expected: FAIL — "Cannot find module '../../components/Contact'"

- [ ] **Step 3: Create `src/components/Contact.jsx`**

```jsx
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Contact.css'

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    window.location.href = `mailto:parjapatsanjay1999@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`
    setSent(true)
  }

  return (
    <section id="contact" className="section contact-section">
      <div ref={ref} className="reveal">
        <p className="contact-overline">What's Next?</p>
        <h2 className="contact-heading">Get In Touch</h2>
        <p className="contact-copy">
          I'm currently open to new opportunities. Whether you have a question or just want
          to say hi, I'll get back to you!
        </p>
        {sent ? (
          <p className="contact-success">Opening your email client...</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {error && <p className="form-error">{error}</p>}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="form-input"
              rows={5}
            />
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/Contact.css`**

```css
.contact-section {
  text-align: center;
}

.contact-overline {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.contact-heading {
  font-size: clamp(1.8rem, 5vw, 3rem);
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.contact-copy {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto 3rem;
  line-height: 1.7;
}

.contact-form {
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.form-input {
  background: var(--bg-card);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  padding: 0.85rem 1rem;
  outline: none;
  transition: var(--transition);
  resize: vertical;
}

.form-input:focus {
  border-color: var(--accent);
}

.form-input::placeholder {
  color: var(--text-secondary);
}

.form-submit {
  align-self: center;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent);
  background: transparent;
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 14px 40px;
  cursor: pointer;
  transition: var(--transition);
}

.form-submit:hover {
  background: var(--accent-dim);
}

.form-error {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: #ff6b6b;
}

.contact-success {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--accent);
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- Contact
```

Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.css src/__tests__/components/Contact.test.jsx
git commit -m "feat: add Contact section with form and mailto fallback"
```

---

## Task 14: Footer Component (TDD)

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.css`
- Create: `src/__tests__/components/Footer.test.jsx`

- [ ] **Step 1: Write failing test `src/__tests__/components/Footer.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer', () => {
  it('renders credit text', () => {
    render(<Footer />)
    expect(screen.getByText(/Designed & Built by Sanjay/i)).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Sanjay/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- Footer
```

Expected: FAIL — "Cannot find module '../../components/Footer'"

- [ ] **Step 3: Create `src/components/Footer.jsx`**

```jsx
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>Designed & Built by Sanjay</p>
      <p className="footer-copy">© 2026 Sanjay. All rights reserved.</p>
    </footer>
  )
}
```

- [ ] **Step 4: Create `src/components/Footer.css`**

```css
.footer {
  text-align: center;
  padding: 2rem 1rem;
  border-top: 1px solid rgba(100, 255, 218, 0.08);
}

.footer p {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 2;
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- Footer
```

Expected: PASS — 2 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.css src/__tests__/components/Footer.test.jsx
git commit -m "feat: add Footer component"
```

---

## Task 15: Assemble App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with full assembly**

```jsx
import Navbar from './components/Navbar'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <SocialSidebar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

- [ ] **Step 2: Run full test suite**

```bash
npm test
```

Expected: All tests pass (green)

- [ ] **Step 3: Start dev server and visually verify all sections**

```bash
npm run dev
```

Check:
- Navbar fixed at top with blur on scroll
- Hero full-viewport with typewriter animation
- About section with 3 education cards
- Skills section with 3 groups + competency tags
- Projects card for Continuous Assessment app
- Experience timeline with 3 entries + achievement badge
- Contact form with validation
- Footer

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: assemble all sections into App"
```

---

## Task 16: Build & Deploy Prep

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: `dist/` folder created with no errors

- [ ] **Step 3: Preview production build locally**

```bash
npm run preview
```

Expected: Site loads at `http://localhost:4173`, all sections visible

- [ ] **Step 4: Commit**

```bash
git add netlify.toml
git commit -m "feat: add Netlify deploy config"
```

---

## Task 17: Update page title and meta

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update `index.html` head**

Open `index.html` and replace the `<head>` section with:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Sanjay — Software Engineer II specializing in backend systems, fintech, and scalable architecture." />
  <title>Sanjay | Software Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
```

- [ ] **Step 2: Run build to confirm no errors**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update page title, meta description, and add Inter font"
```

# Portfolio Website Design Spec
**Date:** 2026-04-04  
**Reference:** https://aditiarya.netlify.app/  
**Approach:** Faithful clone — same layout and visual design, Sanjay's content

---

## 1. Architecture

**Stack:** React + Vite, plain CSS (no UI library)  
**Deployment:** Netlify or Vercel (static build)  
**Routing:** None — single-page, anchor-based smooth scroll

### File Structure
```
src/
  components/
    Navbar.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Experience.jsx
    Contact.jsx
    Footer.jsx
    SocialSidebar.jsx
  hooks/
    useTypewriter.js       ← typewriter animation
    useScrollReveal.js     ← fade-in-up on scroll (Intersection Observer)
  App.jsx
  index.css                ← CSS custom properties (colors, fonts, reset)
public/
  Sanjay-SE2.pdf           ← resume download
```

---

## 2. Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0f1e` | Page background |
| `--accent` | `#64ffda` | CTAs, highlights, borders |
| `--text-primary` | `#ccd6f6` | Body text |
| `--text-secondary` | `#8892b0` | Muted text, dates |
| `--card-bg` | `#112240` | Card backgrounds |
| `--nav-bg` | `#0a0f1ecc` | Navbar (semi-transparent) |

### Typography
- Primary font: `'Calibre', 'Inter', sans-serif`
- Mono font: `'SF Mono', 'Fira Code', monospace` — used for labels, nav logo, accent text

### Animations
- **Typewriter:** Custom `useTypewriter` hook cycling through phrases, blinking cursor
- **Scroll reveal:** `useScrollReveal` using `IntersectionObserver`, fade-in-up on section entry
- **Ghost headings:** CSS `::after` pseudo-element on `<h2>` repeating the text, large and faded behind

---

## 3. Sections

### Navbar
- Fixed top, blurs on scroll
- Logo: `<Sanjay />` (monospace styled)
- Nav links: About · Skills · Projects · Experience · Contact
- Resume button: outlined cyan, links to `/Sanjay-SE2.pdf` (opens in new tab)
- Mobile: hamburger menu collapses links

### Hero
- Full-viewport-height section
- Line 1: "Hi, my name is" (small, accent color)
- Line 2: **Sanjay** (large h1, white)
- Line 3: Typewriter animation — *"I build scalable backend systems."* (h2, secondary color)
- Line 4: Bio — "Backend-focused Software Engineer with experience building fintech systems at scale. NIT Kurukshetra CS grad, currently SE II at Oxyzo Financial Services."
- Social icons: GitHub (`github.com/sparjapati`) + LinkedIn (`linkedin.com/in/sparjapati`)
- No profile photo

### Fixed Social Sidebar (left)
- GitHub, LinkedIn, Email icons stacked vertically
- Visible on desktop only

### About
- Section heading with ghost echo effect
- Bio paragraph (expanded from resume narrative)
- Education History subsection (`/ Education History`):
  - NIT Kurukshetra — B.Tech CS, GPA 8.0 (Aug 2019 – May 2023)
  - Adarsh Sr. Sec. School — 12th CBSE, 89.4% (Mar 2018)
  - Adarsh Sr. Sec. School — 10th CBSE, 94.2% (Mar 2016)

### Skills
- Section heading with ghost echo
- Left column — tech grid by category:
  - **Languages:** Java, Kotlin, Python, JavaScript, SQL, Bash
  - **Frameworks & Libraries:** Spring Boot, React.js, Flask, Native Android SDK
  - **DB & Tools:** MySQL, ElasticSearch, Redis, Docker, Git, Jenkins, Postman, IntelliJ IDEA
- Right column — core competencies (tag pills):
  - Microservices, Event-Driven Architecture, DSA, JWT, Multithreading, ActiveMQ, REST APIs, Spring Data JPA, Hibernate

### Projects
- Section heading with ghost echo
- Featured project cards (alternating image-left / image-right layout):
  - **Continuous Assessment Analytical Application** (Jan–Jun 2023)
    - Built a quiz conducting platform for teachers, students, and management
    - Automated quiz result storage and retrieval, reducing manual effort by 60%
    - Designed user-friendly graphical interface for result analysis
    - Tech tags: Java, Spring Boot, React.js, MySQL
    - GitHub link
- Remaining card slots empty, ready to be filled later

### Experience
- Section heading with ghost echo
- Vertical timeline, most recent first:
  1. **Software Engineer II** — Oxyzo Financial Services (Apr 2025 – Present)
     - Masking algorithm for Aadhaar documents (12,00,000+ docs)
     - Integrated banking switchable APIs (Federal, IndusInd, Axis) with SSL
  2. **Software Engineer** — Oxyzo Financial Services (Jun 2023 – Mar 2025)
     - Built and owned the Cheque Module end-to-end
     - 80%+ reduction in manual onboarding effort
     - ElasticSearch index for cheque listing
     - Email/WhatsApp notifications → 47% rise in buyer portal traffic
     - Encrypted cache for third-party APIs (saved Rs. 2L/month)
  3. **Native Android Developer Intern** — Seraphic Infosolutions (Feb–Jun 2022)
     - Nap-taking app with Google In-App Purchases + WorkManager
     - Surveying app with REST/Retrofit, local caching, notifications
- Achievement badge: Employee of the Month (Feb 2025)

### Contact
- "What's Next?" label (small, accent)
- "Get In Touch" h2
- Short copy: "I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll get back to you!"
- Contact form: Name, Email, Message fields + Submit button
- Mailto fallback: `parjapatsanjay1999@gmail.com`

### Footer
- "Designed & Built by Sanjay"
- © 2026 Sanjay. All rights reserved.

---

## 4. Responsive Behavior
- Navbar collapses to hamburger on mobile (`< 768px`)
- Social sidebar hidden on mobile
- Project cards stack vertically on mobile
- Experience timeline adapts to single column

---

## 5. Out of Scope
- Backend/form submission service (contact form uses mailto fallback for now)
- Blog section
- Dark/light mode toggle
- Analytics

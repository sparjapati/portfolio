# sanjay-verma.in — Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/2c475cb4-d11f-4402-bfec-3fa32ca4bddc/deploy-status)](https://app.netlify.com/projects/sparjapati-portfolio/deploys)

Personal portfolio of **Sanjay Verma** — Software Engineer II at Oxyzo Financial Services, specializing in backend systems and fintech infrastructure. Built with React 19 + Vite 8, zero UI libraries.

🔗 **[sanjay-verma.in](https://sanjay-verma.in)**

---

## Features

- **Dark / Light theme** — persisted to `localStorage`
- **Typewriter effect** — animated role description in hero
- **3D card tilt** — perspective tilt + radial gradient on project cards (pointer devices only)
- **Cursor spotlight** — radial gradient follows cursor across the hero section
- **Active section tracking** — navbar highlights the current section while scrolling
- **Scroll progress bar** — thin accent bar at the top of the page
- **Back-to-top button** — appears after scrolling 400px
- **Command palette** — `Ctrl K` or `/` to open; search and execute nav/social commands
- **Toast notifications** — feedback for clipboard actions
- **Scroll reveal** — sections fade in on entry via IntersectionObserver
- **Konami code easter egg** — `↑↑↓↓←→←→BA`
- **Fully accessible** — semantic HTML, ARIA roles, keyboard navigation, focus traps, `prefers-reduced-motion` support
- **SEO** — Open Graph, Twitter Card, JSON-LD Person schema, canonical URL, sitemap, robots.txt

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Bundler | Vite 8 |
| Styling | Pure CSS custom properties — no UI framework |
| Testing | Vitest + @testing-library/react (99 tests) |
| Linting | ESLint |
| Deployment | Netlify |

---

## Project Structure

```
src/
├── components/       # UI components (Navbar, Hero, Projects, CommandPalette, …)
├── hooks/            # Custom hooks (useTheme, useTilt, useCommandPalette, …)
├── data/             # Static data (projects, skills, experience, links)
└── __tests__/        # Vitest test suite
public/
├── og-image.png      # Open Graph image (1200×630)
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Connect

- GitHub: [@sparjapati](https://github.com/sparjapati)
- LinkedIn: [sparjapati](https://linkedin.com/in/sparjapati)
- X / Twitter: [@_sparjapati_](https://x.com/_sparjapati_)
- Email: parjapatsanjay1999@gmail.com

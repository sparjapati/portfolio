import { LINKS } from './links'
import { skillGroups } from './skills'
import { experiences } from './experience'

const k = (s) => `<span class="k-key">${s}</span>`
const str = (v) => `<span class="k-str">"${v}"</span>`
const bool = (v) => `<span class="k-bool">${v}</span>`

function jsonLine(indent, html) {
  return { html: `${indent}${html}`, type: 'json' }
}

export function buildKonamiJson() {
  const allSkills = skillGroups.flatMap((g) => g.items)
  const expList = experiences.map((e) => ({
    role: e.role,
    company: e.company.split('(')[0].trim(),
    period: e.period,
  }))
  return JSON.stringify(
    {
      name: 'Sanjay Parjapat',
      role: 'Software Engineer II',
      available_for_work: LINKS.available_for_work,
      skills: allSkills,
      experience: expList,
      links: {
        github: LINKS.github,
        linkedin: LINKS.linkedin,
        email: LINKS.email,
      },
    },
    null,
    2
  )
}

export function buildKonamiLines() {
  const allSkills = skillGroups.flatMap((g) => g.items)
  const preview = allSkills.slice(0, 5)
  const remaining = allSkills.length - preview.length
  const skillsHtml =
    preview.map((s) => `<span class="k-str">"${s}"</span>`).join(', ') +
    `, <span class="k-dim">/* +${remaining} more */</span>`

  const expLines = experiences.flatMap((e, i) => {
    const comma = i < experiences.length - 1 ? ',' : ''
    const company = e.company.split('(')[0].trim()
    return [
      { text: '    {', type: 'json' },
      jsonLine('      ', `${k('"role"')}: ${str(e.role)},`),
      jsonLine('      ', `${k('"company"')}: ${str(company)},`),
      jsonLine('      ', `${k('"period"')}: ${str(e.period)}`),
      { text: `    }${comma}`, type: 'json' },
    ]
  })

  return [
    { text: '$ curl -s https://sanjay.dev/api/me | jq', type: 'cmd' },
    { text: '  % Total    % Received % Xferd  Avg Speed', type: 'dim' },
    { text: '100   842  100   842    0     0   1337      0 --:--:-- 1337', type: 'dim' },
    { text: '', type: 'blank' },
    { text: 'HTTP/1.1 200 OK', type: 'header' },
    { text: 'Content-Type: application/json; charset=utf-8', type: 'header' },
    { text: 'X-Powered-By: \u2615 coffee', type: 'header' },
    { text: '', type: 'blank' },
    { text: '# Konami Code activated \u2014 you found the easter egg', type: 'comment' },
    { text: '{', type: 'json' },
    jsonLine('  ', `${k('"name"')}: ${str('Sanjay Parjapat')},`),
    jsonLine('  ', `${k('"role"')}: ${str('Software Engineer II')},`),
    jsonLine('  ', `${k('"available_for_work"')}: ${bool(String(LINKS.available_for_work))},`),
    jsonLine('  ', `${k('"skills"')}: [${skillsHtml}],`),
    { text: '  "experience": [', type: 'json' },
    ...expLines,
    { text: '  ],', type: 'json' },
    { text: '  "links": {', type: 'json' },
    jsonLine('    ', `${k('"github"')}: ${str(LINKS.github)},`),
    jsonLine('    ', `${k('"linkedin"')}: ${str(LINKS.linkedin)},`),
    jsonLine('    ', `${k('"email"')}: ${str(LINKS.email)}`),
    { text: '  }', type: 'json' },
    { text: '}', type: 'json' },
  ]
}

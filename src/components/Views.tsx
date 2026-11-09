import { useState } from 'react'
import {
  achievements,
  courses,
  education,
  experience,
  internships,
  moreProjects,
  profile,
  projects,
  simulations,
  skills,
  stats,
  type Entry,
} from '../data'
import { solvePhone } from '../utils'
import type { View } from '../views'
import AgentTerminal from './AgentTerminal'
import { ExternalIcon, Lamp, Rich, Tabs, Tag } from './ui'

const chip = 'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider'

type Go = { go: (v: View) => void }

const btnPrimary =
  'rounded-lg bg-accent px-3.5 py-2 font-mono text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:text-bg'
const btnGhost =
  'rounded-lg border border-line bg-surface px-3.5 py-2 font-mono text-sm font-semibold transition-colors hover:border-accent hover:text-accent'

export function Overview({ go }: Go) {
  return (
    <div className="my-auto space-y-5">
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted">
            <Lamp />
            online · building AI at Accumax
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Hi, I'm <span className="glow text-accent">{profile.name}</span>.
          </h1>
          <p className="mt-2 font-mono text-base text-accent sm:text-lg">{profile.role}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>
          {/* Only on large, tall screens, so the page never needs to scroll */}
          <p className="mt-3 hidden max-w-xl text-sm leading-relaxed text-muted lg:[@media(min-height:820px)]:block">
            <Rich text={profile.summary} />
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <a href={profile.resume} target="_blank" rel="noreferrer" className={btnPrimary}>
              $ resume
            </a>
            <button onClick={() => go('ask')} className={btnGhost}>
              $ ask agent
            </button>
            <button onClick={() => go('projects')} className={btnGhost}>
              $ projects
            </button>
          </div>
        </div>
        {/* Decorative terminal: desktop only, where it sits beside the text */}
        <div className="hidden lg:block">
          <AgentTerminal />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="hud border border-line bg-bg px-3 py-2.5 sm:px-4 sm:py-3">
            <dt className="sr-only">{s.label}</dt>
            <dd className="glow font-mono text-2xl font-bold tracking-tight text-accent">{s.value}</dd>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted" aria-hidden="true">
              {s.label}
            </p>
          </div>
        ))}
      </dl>
    </div>
  )
}

function EntryGrid({ items }: { items: Entry[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((e) => (
        <li key={e.org} className="rounded-lg border border-line bg-bg p-4">
          <h3 className="font-bold">{e.org}</h3>
          <p className="mt-0.5 font-mono text-xs text-accent">{e.role}</p>
          <p className="font-mono text-xs text-muted">{e.period}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
        </li>
      ))}
    </ul>
  )
}

export function ExperienceView() {
  const tabs = [
    ...experience.map((j) => ({ key: j.company, title: j.company, sub: j.period })),
    { key: 'internships', title: 'Internships', sub: `${internships.length} side missions` },
    { key: 'simulations', title: 'Job simulations', sub: `${simulations.length} training sims` },
  ]
  const [sel, setSel] = useState(tabs[0].key)
  const job = experience.find((j) => j.company === sel)

  return (
    <div className="my-auto space-y-5">
      <Tabs items={tabs} value={sel} onChange={setSel} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />

      {job && (
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-bold sm:text-2xl">{job.company}</h2>
            <span className="font-mono text-sm text-accent">{job.role}</span>
            {job.period.endsWith('Present') ? (
              <span className={`${chip} border-accent/50 text-accent`}>
                <Lamp /> active mission
              </span>
            ) : (
              <span className={`${chip} border-line text-muted`}>✓ mission complete</span>
            )}
            {job.link && (
              <a
                href={job.link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                {job.link.label} <ExternalIcon />
              </a>
            )}
          </div>
          <ul className="mt-4 space-y-3 text-sm text-muted sm:text-base">
            {job.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="shrink-0 font-mono text-accent">
                  ›
                </span>
                <span>
                  <Rich text={b} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sel === 'internships' && <EntryGrid items={internships} />}
      {sel === 'simulations' && <EntryGrid items={simulations} />}
    </div>
  )
}

export function ProjectsView() {
  const tabs = [
    ...projects.map((p) => ({ key: p.title, title: p.title, sub: p.date })),
    { key: 'more', title: 'More projects', sub: `${moreProjects.length} more` },
  ]
  const [sel, setSel] = useState(tabs[0].key)
  const p = projects.find((x) => x.title === sel)

  return (
    <div className="my-auto space-y-5">
      <Tabs items={tabs} value={sel} onChange={setSel} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />

      {p && (
        <div className="rounded-lg border border-line bg-bg p-5">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 className="text-xl font-bold sm:text-2xl">{p.title}</h2>
              <span className="flex items-center gap-3">
                <span className={`${chip} border-line text-muted`}>✓ quest complete</span>
                <span className="font-mono text-sm text-muted">{p.date}</span>
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-muted sm:text-lg">
              <Rich text={p.description} />
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-accent hover:underline"
            >
              view on github <ExternalIcon />
            </a>
          </div>
        </div>
      )}

      {sel === 'more' && (
        <ul className="grid gap-3 lg:grid-cols-2">
          {moreProjects.map((m) => (
            <li key={m.title} className="rounded-lg border border-line bg-bg p-4">
              <h3 className="font-bold leading-snug">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
            </li>
          ))}
        </ul>
      )}
      {sel === 'more' && (
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-accent hover:underline"
        >
          more on github <ExternalIcon />
        </a>
      )}
    </div>
  )
}

export function SkillsView() {
  const tabs = skills.map((g) => ({ key: g.group, title: g.group, sub: `${g.items.length} skills` }))
  const [sel, setSel] = useState(tabs[0].key)
  const current = skills.find((g) => g.group === sel) ?? skills[0]

  return (
    <div className="my-auto space-y-4">
      <Tabs items={tabs} value={sel} onChange={setSel} cols="grid-cols-2 sm:grid-cols-4" />
      <div className="hud border border-line bg-bg p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">loadout</p>
        <h2 className="mt-0.5 font-mono text-sm font-semibold text-accent">{current.group}</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {current.items.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AchievementsView() {
  return (
    <div className="my-auto space-y-3">
      <p className="flex justify-between font-mono text-xs uppercase tracking-widest text-muted">
        <span>achievements</span>
        <span className="text-accent">
          {achievements.length}/{achievements.length} unlocked
        </span>
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <li key={a.title} className="hud border border-line bg-bg p-3 sm:p-4">
            <p className="flex justify-between font-mono text-[11px] text-muted">
              <span>#{String(i + 1).padStart(2, '0')}</span>
              <span className="text-accent">★ unlocked</span>
            </p>
            <h2 className="glow mt-1 font-mono text-sm font-semibold text-accent">{a.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{a.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function EducationView() {
  return (
    <div className="my-auto space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((e) => (
          <div key={e.degree} className="rounded-lg border border-line bg-bg p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">{e.period}</p>
            <h2 className="mt-2 text-xl font-bold">{e.degree}</h2>
            <p className="mt-1 text-muted">{e.school}</p>
            <p className="font-mono text-xs text-muted">{e.where}</p>
            <p className="mt-3 font-mono text-lg font-semibold text-accent">{e.score}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-line bg-bg p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">courses · {courses.period}</p>
        <h2 className="mt-2 text-lg font-bold">{courses.title}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {courses.providers.map((c) => (
            <li key={c}>
              <Tag>{c}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      window.setTimeout(() => setDone(false), 1500)
    } catch {
      /* clipboard blocked: the link next to it still works */
    }
  }
  return (
    <button
      onClick={copy}
      aria-label={`Copy ${value}`}
      className="shrink-0 rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {done ? 'copied ✓' : 'copy'}
    </button>
  )
}

export function ContactView() {
  const [phone, setPhone] = useState<string | null>(null)
  const socials = [
    { label: 'linkedin', href: profile.linkedin },
    { label: 'github', href: profile.github },
    { label: 'whatsapp', href: profile.whatsapp },
    { label: 'instagram', href: profile.instagram },
  ]
  const rowLink = 'flex min-w-0 flex-wrap items-baseline gap-x-4 transition-colors hover:text-accent'

  return (
    <div className="my-auto space-y-5">
      <h2 className="text-2xl font-bold sm:text-3xl">Let's work together.</h2>
      <p className="max-w-2xl leading-relaxed text-muted sm:text-lg">
        I'm open to AI/ML Engineer, GenAI Engineer and Full Stack AI roles. The fastest way to reach me is email.
      </p>

      <ul className="divide-y divide-line rounded-lg border border-line bg-bg font-mono text-sm">
        <li className="flex items-center justify-between gap-3 px-4 py-3">
          <a href={`mailto:${profile.email}`} className={rowLink}>
            <span className="w-16 shrink-0 text-muted">email</span>
            <span className="min-w-0 break-all text-accent">{profile.email}</span>
          </a>
          <CopyButton value={profile.email} />
        </li>
        <li className="flex items-center justify-between gap-3 px-4 py-3">
          {phone ? (
            <a href={`tel:${phone.replace(/-/g, '')}`} className={rowLink}>
              <span className="w-16 shrink-0 text-muted">phone</span>
              <span className="min-w-0 text-accent">{phone}</span>
            </a>
          ) : (
            <p className="flex min-w-0 flex-wrap items-baseline gap-x-4">
              <span className="w-16 shrink-0 text-muted">phone</span>
              <span className="min-w-0 break-all text-accent">+91 √{profile.phoneSquared}</span>
            </p>
          )}
          {phone ? (
            <CopyButton value={phone} />
          ) : (
            <button
              onClick={() => setPhone(solvePhone())}
              className="shrink-0 rounded-md border border-accent/60 px-2.5 py-1 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
            >
              solve
            </button>
          )}
        </li>
      </ul>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {s.label} <ExternalIcon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

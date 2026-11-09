import { useEffect, useState } from 'react'
import { experience, profile, projects, skills } from '../data'

type Step =
  | { kind: 'cmd'; text: string }
  | { kind: 'tool'; name: string; note: string }
  | { kind: 'done'; text: string }

// Counts come from the real data, so the "agent run" never drifts from the page.
const steps: Step[] = [
  { kind: 'cmd', text: 'agent run "who is tushar arora?"' },
  { kind: 'tool', name: 'read_profile()', note: profile.role },
  { kind: 'tool', name: 'get_experience()', note: `${experience.length} roles` },
  { kind: 'tool', name: 'list_projects()', note: `${projects.length} projects` },
  { kind: 'tool', name: 'get_skills()', note: `${skills.length} groups` },
  { kind: 'done', text: 'answer ready' },
]

const answerRows: [string, string][] = [
  ['now', `${experience[0].company} (${experience[0].period})`],
  ['stack', 'Claude · RAG · Angular · Node.js · Azure'],
  ['status', 'open to roles'],
]

/** Reveals one step at a time; shows everything at once for reduced-motion users. */
function useStepper(total: number, ms: number) {
  const [n, setN] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? total : 0,
  )
  useEffect(() => {
    if (n >= total) return
    const id = window.setTimeout(() => setN(n + 1), ms)
    return () => window.clearTimeout(id)
  }, [n, total, ms])
  return n
}

export default function AgentTerminal() {
  const n = useStepper(steps.length, 380)
  const finished = n >= steps.length

  return (
    // Decorative: its content is duplicated in readable text elsewhere on the page.
    <div aria-hidden="true" className="overflow-hidden rounded-xl border border-line bg-bg font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-2 border-b border-line bg-panel px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="truncate text-muted">agent · run</span>
      </div>
      <div className="min-h-[16rem] space-y-1 p-4">
        {steps.slice(0, n).map((s, i) => (
          <p key={i} className="break-words">
            {s.kind === 'cmd' && (
              <>
                <span className="text-accent">$</span> {s.text}
              </>
            )}
            {s.kind === 'tool' && (
              <>
                <span className="text-accent">✓</span> {s.name} <span className="text-muted">→ {s.note}</span>
              </>
            )}
            {s.kind === 'done' && (
              <>
                <span className="text-accent">●</span> <span className="font-semibold">{s.text}</span>
              </>
            )}
          </p>
        ))}

        {finished && (
          <dl className="mt-2 space-y-1 border-t border-line pt-2">
            {answerRows.map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <dt className="w-14 shrink-0 text-muted">{k}</dt>
                <dd className="min-w-0 break-words">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="caret h-5" />
      </div>
    </div>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { experience, moreProjects, projects } from '../data'

// Counts come from the real data, so the boot log never drifts from the site.
const lines: { ok?: boolean; text: string; note?: string }[] = [
  { text: 'tushar-os · booting…' },
  { ok: true, text: 'Mounted /home/tushar/experience', note: `${experience.length} roles` },
  { ok: true, text: 'Mounted /home/tushar/projects', note: `${projects.length + moreProjects.length} projects` },
  { ok: true, text: 'Started claude-agents.service', note: '11+ AI features' },
  { ok: true, text: 'Started rag-pipeline.service', note: '366K+ documents' },
  { ok: true, text: 'Started form-sniffer.service', note: '150+ form types' },
  { ok: true, text: 'Reached target open-to-roles.target' },
  { text: 'tushar login: tushar' },
]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Linux-style boot sequence, shown once per tab. Any key or click skips it. */
export default function Boot() {
  const [show, setShow] = useState(() => {
    if (prefersReducedMotion()) return false
    try {
      return !sessionStorage.getItem('booted')
    } catch {
      return true
    }
  })
  const [n, setN] = useState(0)

  const done = useCallback(() => {
    setShow(false)
    try {
      sessionStorage.setItem('booted', '1')
    } catch {
      /* storage unavailable: it will just boot again next visit */
    }
  }, [])

  useEffect(() => {
    if (!show) return
    const id = window.setTimeout(n < lines.length ? () => setN(n + 1) : done, n < lines.length ? 140 : 1100)
    return () => window.clearTimeout(id)
  }, [show, n, done])

  useEffect(() => {
    if (!show) return
    window.addEventListener('keydown', done)
    window.addEventListener('pointerdown', done)
    return () => {
      window.removeEventListener('keydown', done)
      window.removeEventListener('pointerdown', done)
    }
  }, [show, done])

  if (!show) return null

  return (
    // Decorative: the real page is underneath and fully readable.
    <div aria-hidden="true" className="fixed inset-0 z-[100] flex items-center bg-bg p-6 font-mono text-xs sm:p-12 sm:text-sm">
      <div className="mx-auto w-full max-w-2xl space-y-1.5">
        {lines.slice(0, n).map((l, i) => (
          <p key={i} className="break-words">
            {l.ok && (
              <>
                <span className="text-muted">[ </span>
                <span className="font-bold text-accent">OK</span>
                <span className="text-muted"> ] </span>
              </>
            )}
            {l.text} {l.note && <span className="text-muted">({l.note})</span>}
          </p>
        ))}
        {n >= lines.length && (
          <p className="caret pt-2 text-accent">Welcome aboard. Press any key to continue</p>
        )}
      </div>
    </div>
  )
}

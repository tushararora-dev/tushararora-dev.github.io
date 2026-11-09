import { useCallback, useEffect, useState } from 'react'
import About from './components/About'
import AskAgent from './components/AskAgent'
import Boot from './components/Boot'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import {
  AchievementsView,
  ContactView,
  EducationView,
  ExperienceView,
  Overview,
  ProjectsView,
  SkillsView,
} from './components/Views'
import { viewFromHash, views, type View } from './views'

/** Click the next/previous tab of the visible tab row, like switching weapons in a game. */
function stepTab(dir: 1 | -1): boolean {
  const tabs = Array.from(document.querySelectorAll<HTMLElement>('[role="tab"]'))
  if (!tabs.length) return false
  const cur = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')
  tabs[(cur + dir + tabs.length) % tabs.length].click()
  return true
}

export default function App() {
  const [view, setView] = useState<View>(() => viewFromHash() ?? 'overview')
  const [visited, setVisited] = useState<Set<View>>(() => new Set([viewFromHash() ?? 'overview']))
  const [toast, setToast] = useState(false)

  const go = useCallback((v: View) => {
    setView(v)
    try {
      window.history.replaceState(null, '', `#${v}`)
    } catch {
      /* some embedded contexts block this; navigation still works */
    }
  }, [])

  useEffect(() => {
    setVisited((prev) => (prev.has(view) ? prev : new Set(prev).add(view)))
  }, [view])

  // Visiting every tool unlocks a small achievement
  useEffect(() => {
    if (visited.size !== views.length) return
    setToast(true)
    const id = window.setTimeout(() => setToast(false), 4500)
    return () => window.clearTimeout(id)
  }, [visited.size])

  // Support typing/pasting a #hash into the address bar
  useEffect(() => {
    const onHash = () => {
      const v = viewFromHash()
      if (v) setView(v)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Pilot controls: W/S or ↑/↓ switch tools, A/D or ←/→ switch tabs, number keys jump. Ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target instanceof Element && e.target.closest('input, textarea, [contenteditable]')) return

      const i = Number(e.key) - 1
      if (Number.isInteger(i) && i >= 0 && i < views.length) {
        go(views[i].id)
        return
      }

      const key = e.key.toLowerCase()
      const down = key === 'arrowdown' || key === 's'
      const up = key === 'arrowup' || key === 'w'
      if (down || up) {
        e.preventDefault()
        const cur = views.findIndex((v) => v.id === view)
        go(views[(cur + (down ? 1 : -1) + views.length) % views.length].id)
        return
      }

      const right = key === 'arrowright' || key === 'd'
      const left = key === 'arrowleft' || key === 'a'
      if ((right || left) && stepTab(right ? 1 : -1)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [view, go])

  const current = views.find((v) => v.id === view)!

  return (
    <div className="app-bg flex h-dvh flex-col overflow-hidden">
      <TopBar />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <Sidebar view={view} visited={visited} go={go} />

        <main className="flex min-h-0 min-w-0 flex-1 p-3 sm:p-5">
          <section className="hud flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-line bg-surface/90 backdrop-blur">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line bg-panel px-4 py-2.5 font-mono text-xs sm:text-sm">
              <p className="min-w-0 break-words">
                <span className="text-warn">⚙</span> <span className="font-semibold text-accent">{current.tool}</span>
                <span className="text-muted">({current.args ?? ''})</span>
              </p>
              {/* key remounts the badge so the check re-animates on every switch */}
              <span key={view} className="check-in text-accent">
                ✓ {current.result()}
              </span>
            </div>

            <div key={view} className="view-in no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-6">
              {view === 'overview' && <Overview go={go} />}
              {view === 'about' && <About />}
              {view === 'experience' && <ExperienceView />}
              {view === 'projects' && <ProjectsView />}
              {view === 'skills' && <SkillsView />}
              {view === 'achievements' && <AchievementsView />}
              {view === 'education' && <EducationView />}
              {view === 'contact' && <ContactView />}
              {view === 'ask' && <AskAgent go={go} />}
            </div>
          </section>
        </main>
      </div>

      {toast && (
        <div
          role="status"
          className="view-in fixed bottom-4 left-1/2 z-[80] -translate-x-1/2 rounded-md border border-accent/60 bg-surface px-4 py-2 font-mono text-xs shadow-lg sm:text-sm"
        >
          <span className="text-warn">★</span> Achievement unlocked: <span className="text-accent">Full recon</span> · explored all{' '}
          {views.length} tools
        </div>
      )}

      <div className="crt" aria-hidden="true" />
      <Boot />
    </div>
  )
}

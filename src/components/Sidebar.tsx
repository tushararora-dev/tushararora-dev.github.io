import { profile } from '../data'
import { useAge } from '../hooks'
import { toDMS } from '../utils'
import { views, type View } from '../views'
import { Lamp } from './ui'

type Props = { view: View; visited: Set<View>; go: (v: View) => void }

function LiveAge({ digits = 9 }: { digits?: number }) {
  return <span className="tabular-nums">{useAge().toFixed(digits)}</span>
}

const kbd = 'rounded border border-line px-1'

export default function Sidebar({ view, visited, go }: Props) {
  const { lat, lon } = profile.gps

  return (
    <>
      {/* Desktop: instrument cluster + tool list */}
      <aside className="hidden w-64 shrink-0 flex-col gap-4 border-r border-line p-4 lg:flex">
        <section aria-label="Status">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">status</p>
          <p className="mb-2 flex items-center gap-2 font-mono text-xs text-accent">
            <Lamp /> online · open to roles
          </p>
          <dl className="space-y-1 font-mono text-xs">
            <div className="flex gap-2">
              <dt className="w-8 shrink-0 text-muted">age</dt>
              <dd>
                <LiveAge />
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-8 shrink-0 text-muted">gps</dt>
              <dd className="min-w-0 break-words">
                {toDMS(lat, 'N', 'S').replace(/\.\d"/, '"')} {toDMS(lon, 'E', 'W').replace(/\.\d"/, '"')}
              </dd>
            </div>
          </dl>

          {/* Exploration meter: fills as you visit each tool */}
          <div className="mt-3">
            <p className="flex justify-between font-mono text-xs text-muted">
              <span>explored</span>
              <span className="text-accent">
                {visited.size}/{views.length}
              </span>
            </p>
            <div className="mt-1 flex gap-1" aria-hidden="true">
              {views.map((v) => (
                <span
                  key={v.id}
                  className={`h-1.5 flex-1 rounded-sm transition-colors ${visited.has(v.id) ? 'bg-accent' : 'bg-line'}`}
                />
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Sections">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">tools</p>
          <ul className="space-y-0.5">
            {views.map((v, i) => {
              const active = v.id === view
              return (
                <li key={v.id}>
                  <button
                    onClick={() => go(v.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-1.5 text-left font-mono text-sm transition-colors ${
                      active
                        ? 'glow border-accent/50 bg-accent/10 text-accent'
                        : 'border-transparent text-muted hover:bg-panel hover:text-ink'
                    }`}
                  >
                    <span className="w-3 text-xs opacity-60">{i + 1}</span>
                    ./{v.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <p className="mt-auto font-mono text-xs leading-relaxed text-muted">
          <kbd className={kbd}>W</kbd> <kbd className={kbd}>S</kbd> tools · <kbd className={kbd}>A</kbd> <kbd className={kbd}>D</kbd> tabs ·{' '}
          <kbd className={kbd}>1</kbd>–<kbd className={kbd}>{views.length}</kbd> jump
        </p>
      </aside>

      {/* Mobile: tools scroll sideways inside this strip, never the page */}
      <nav className="no-scrollbar shrink-0 overflow-x-auto border-b border-line lg:hidden" aria-label="Sections">
        <ul className="flex w-max gap-1 px-3 py-2">
          {views.map((v) => {
            const active = v.id === view
            return (
              <li key={v.id}>
                <button
                  onClick={() => go(v.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md border px-3 py-1.5 font-mono text-sm transition-colors ${
                    active ? 'border-accent/50 bg-accent/10 text-accent' : 'border-transparent text-muted'
                  }`}
                >
                  ./{v.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

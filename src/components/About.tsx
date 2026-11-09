import { useState } from 'react'
import { offTheClock, profile, services } from '../data'
import { useAge } from '../hooks'
import { bearingDeg, compass, daysAlive, haversineKm, toDMS } from '../utils'
import { Tabs } from './ui'

function AgeCard() {
  const age = useAge()
  return (
    <div className="hud border border-line bg-bg p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">age · live</p>
      <p className="glow mt-1 font-mono text-2xl font-bold tabular-nums text-accent sm:text-3xl">{age.toFixed(9)}</p>
      <p className="mt-1 font-mono text-xs text-muted">years · {daysAlive().toLocaleString('en-IN')} days on this planet</p>
    </div>
  )
}

type Distance = { km: number; dir: string }

function GpsCard() {
  const { lat, lon, place } = profile.gps
  const [dist, setDist] = useState<Distance | null>(null)
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  function locate() {
    if (!('geolocation' in navigator)) {
      setNote('Location is not available in this browser.')
      return
    }
    setBusy(true)
    setNote('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setDist({
          km: haversineKm(latitude, longitude, lat, lon),
          dir: compass(bearingDeg(latitude, longitude, lat, lon)),
        })
        setBusy(false)
      },
      () => {
        setNote('No problem, location stays off.')
        setBusy(false)
      },
      { timeout: 8000 },
    )
  }

  return (
    <div className="hud border border-line bg-bg p-4">
      <div className="flex items-center gap-4">
        {/* Decorative radar */}
        <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
          <circle cx="50" cy="50" r="48" className="fill-none stroke-line" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="32" className="fill-none stroke-line" strokeWidth="1" />
          <circle cx="50" cy="50" r="16" className="fill-none stroke-line" strokeWidth="1" />
          <path d="M50 2V98M2 50H98" className="stroke-line" strokeWidth="1" />
          <g className="radar-sweep" style={{ transformOrigin: '50px 50px' }}>
            <path d="M50 50 L50 2 A48 48 0 0 1 84 16 Z" className="fill-accent/30" />
          </g>
          <circle cx="50" cy="50" r="3.5" className="fill-accent" />
        </svg>

        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">gps · home base</p>
          <p className="mt-1 break-words font-mono text-sm font-semibold text-accent">
            {toDMS(lat, 'N', 'S')} {toDMS(lon, 'E', 'W')}
          </p>
          <p className="font-mono text-xs text-muted">
            {lat.toFixed(4)}, {lon.toFixed(4)}
          </p>
          <p className="mt-1 text-xs text-muted">{place} · city-level</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-3">
        <button
          onClick={locate}
          disabled={busy}
          className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {busy ? 'locating…' : '$ how far am I from you?'}
        </button>
        {dist && (
          <p className="font-mono text-xs">
            ≈ <span className="font-semibold text-accent">{Math.round(dist.km).toLocaleString('en-IN')} km</span> away, to your {dist.dir}
          </p>
        )}
        {note && <p className="font-mono text-xs text-muted">{note}</p>}
        <p className="w-full text-xs text-muted">Computed in your browser. Your location is never sent anywhere.</p>
      </div>
    </div>
  )
}

function CodeCard() {
  const age = useAge()
  const k = 'text-warn'
  const s = 'text-accent'
  return (
    <pre className="hud no-scrollbar overflow-x-auto border border-line bg-bg p-4 font-mono text-xs leading-relaxed sm:text-sm">
      <code>
        <span className={k}>class</span> Me:{'\n'}
        {'  '}
        <span className={k}>def</span> __init__(self):{'\n'}
        {'    '}self.name = <span className={s}>"{profile.name}"</span>
        {'\n'}
        {'    '}self.role = <span className={s}>"{profile.role}"</span>
        {'\n'}
        {'    '}self.age = <span className={s}>{age.toFixed(2)}</span>
        {'\n'}
        {'    '}self.country = <span className={s}>"India"</span>
        {'\n'}
        {'    '}self.coding_since = <span className={s}>{profile.codingSince}</span>
        {'\n'}
        {'    '}self.freelancing_since = <span className={s}>{profile.freelancingSince}</span>
      </code>
    </pre>
  )
}

const tabs = [
  { key: 'me', title: 'Me', sub: 'live age · gps' },
  { key: 'do', title: 'What I do', sub: `${services.length} areas` },
  { key: 'off', title: 'Off the clock', sub: 'games · travel · creative' },
]

export default function AboutView() {
  const [sel, setSel] = useState('me')

  return (
    <div className="my-auto space-y-4">
      <Tabs items={tabs} value={sel} onChange={setSel} cols="grid-cols-3" />

      {sel === 'me' && (
        <>
          <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
            <CodeCard />
            <div className="grid gap-3">
              <AgeCard />
              <GpsCard />
            </div>
          </div>
          {/* Only on tall screens, so nothing needs to scroll */}
          <p className="hidden max-w-3xl text-sm leading-relaxed text-muted [@media(min-height:860px)]:block">
            I've taken coding seriously since {profile.codingSince} and have been freelancing since {profile.freelancingSince}. These days
            I turn LLM ideas into shipped products, and off the clock I'm into esports and budget travel.
          </p>
        </>
      )}

      {sel === 'do' && (
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="rounded-lg border border-line bg-bg p-3">
              <h2 className="font-mono text-xs font-semibold text-accent sm:text-sm">{s.title}</h2>
              {/* Phones show titles only, so the tab fits one screen */}
              <p className="mt-1 hidden text-sm leading-relaxed text-muted sm:block">{s.text}</p>
            </li>
          ))}
        </ul>
      )}

      {sel === 'off' && (
        <ul className="grid gap-3 sm:grid-cols-3">
          {offTheClock.map((o) => (
            <li key={o.title} className="rounded-lg border border-line bg-bg p-5">
              <h2 className="font-mono text-sm font-semibold text-accent">{o.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{o.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

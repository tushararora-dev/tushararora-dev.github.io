import type { ReactNode } from 'react'

/** Renders text where **double asterisks** mark bold words. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

/** Pulsing status lamp, like an indicator light on a control panel. */
export function Lamp() {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
    </span>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-line bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent">
      {children}
    </span>
  )
}

export function ExternalIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M8 5H5.5A1.5 1.5 0 0 0 4 6.5v8A1.5 1.5 0 0 0 5.5 16h8a1.5 1.5 0 0 0 1.5-1.5V12M11 4h5v5M16 4l-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Row of selectable tabs. Equal columns on desktop, two per row on phones. */
export function Tabs({
  items,
  value,
  onChange,
  cols = 'grid-cols-2 lg:auto-cols-fr lg:grid-flow-col',
}: {
  items: { key: string; title: string; sub: string }[]
  value: string
  onChange: (key: string) => void
  /** Tailwind grid classes; the default gives equal columns on desktop. */
  cols?: string
}) {
  return (
    <div role="tablist" className={`grid gap-2 ${cols}`}>
      {items.map((i) => {
        const active = i.key === value
        return (
          <button
            key={i.key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(i.key)}
            className={`min-w-0 rounded-lg border px-3 py-2 text-left transition-colors ${
              active ? 'border-accent bg-accent/10' : 'border-line bg-bg hover:border-accent/60'
            }`}
          >
            <span className={`block truncate text-sm font-semibold ${active ? 'text-accent' : ''}`}>{i.title}</span>
            <span className="block truncate font-mono text-xs text-muted">{i.sub}</span>
          </button>
        )
      })}
    </div>
  )
}

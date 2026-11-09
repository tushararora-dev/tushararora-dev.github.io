import { useState } from 'react'
import { profile, roles } from '../data'
import { useCycle } from '../hooks'

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  }
  return { dark, toggle }
}

/** Cycles through the roles. The real title stays readable for screen readers. */
function RoleBadge() {
  const role = useCycle(roles, 2200)
  return (
    <>
      <span className="sr-only">{profile.role}</span>
      <span aria-hidden="true" className="block truncate">
        {role}
      </span>
    </>
  )
}

export default function TopBar() {
  const { dark, toggle } = useTheme()

  return (
    // Three equal-weight columns keep the name and role centered on the screen
    <header className="grid h-12 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <p className="caret hidden font-mono text-sm font-semibold md:block">
          <span className="text-accent">tushar@portfolio</span>
          <span className="text-muted">:~$</span>
        </p>
      </div>

      <div className="min-w-0 text-center leading-tight">
        <p className="text-sm font-bold tracking-tight sm:text-base">{profile.name}</p>
        <p className="font-mono text-xs text-accent">
          <RoleBadge />
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={toggle}
          className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted transition-colors hover:text-accent"
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {dark ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
              <path d="M21 13.5A8.5 8.5 0 1 1 10.5 3a7 7 0 0 0 10.5 10.5z" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          aria-label="Resume (opens Google Drive)"
          className="rounded-md bg-accent px-2.5 py-1.5 font-mono text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-3 dark:text-bg"
        >
          {/* Shorter on phones so the name stays centered */}
          <span className="sm:hidden">cv</span>
          <span className="hidden sm:inline">resume</span>
        </a>
      </div>
    </header>
  )
}

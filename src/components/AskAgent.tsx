import { useEffect, useRef, useState, type FormEvent } from 'react'
import { achievements, education, experience, internships, offTheClock, profile, projects, simulations, skills } from '../data'
import { ageYears } from '../utils'
import type { View } from '../views'
import { Rich } from './ui'

type Jump = { label: string; view?: View; href?: string }
type Answer = { trace: string[]; text: string; jump?: Jump }
type Reply = Answer & { question: string; shown: number; ready: boolean }

const chips = ['Why hire you?', 'Experience', 'Projects', 'Skills', 'Contact', 'Resume']

/**
 * Keyword matcher. There is no LLM behind this: every answer is built from the
 * same data that renders the site, so it can never say something the resume doesn't.
 */
function answer(question: string): Answer {
  const s = question.toLowerCase()

  if (/(contact|e-?mail|reach|linkedin|github|phone|call|number)/.test(s)) {
    return {
      trace: ['get_contact()'],
      text: `• **Email:** ${profile.email}\n• **LinkedIn:** linkedin.com/in/tushararora-dev\n• **GitHub:** github.com/tushararora-dev`,
      jump: { label: 'Open contact', view: 'contact' },
    }
  }
  if (/(resume|cv|pdf|download)/.test(s)) {
    return {
      trace: ['open_link("resume")'],
      text: 'My resume is on Google Drive. This opens it in a new tab.',
      jump: { label: 'Open resume', href: profile.resume },
    }
  }
  // Specific topics (RAG, agents, Claude...) are checked before the generic "projects" rule,
  // so "what has he built with RAG?" gets the RAG answer rather than a project list.
  if (/(rag|agent|llm|claude|genai|generative|accumax|vector|ai feature)/.test(s)) {
    return {
      trace: ['search_resume("accumax")', 'read_bullets(2)'],
      text: `${experience[0].bullets[1]}\n\n${experience[0].bullets[2]}`,
      jump: { label: 'See experience', view: 'experience' },
    }
  }
  if (/(project|built|build|portfolio|github repo)/.test(s)) {
    return {
      trace: ['list_projects()'],
      text:
        `**${projects.length} projects** across ML, recommendation, deep learning and GenAI:\n` +
        projects.map((p) => `• **${p.title}**: ${p.tags.slice(0, 3).join(', ')}`).join('\n'),
      jump: { label: 'See projects', view: 'projects' },
    }
  }
  if (/(skill|stack|tech|tools|language|framework)/.test(s)) {
    return {
      trace: ['get_skills()'],
      text: skills.map((g) => `• **${g.group}:** ${g.items.slice(0, 4).join(', ')}`).join('\n'),
      jump: { label: 'See all skills', view: 'skills' },
    }
  }
  if (/(education|degree|cgpa|study|college|university|mca|bca)/.test(s)) {
    return {
      trace: ['get_education()'],
      text: education.map((e) => `• **${e.degree}**, ${e.school} (${e.score})`).join('\n'),
      jump: { label: 'See education', view: 'education' },
    }
  }
  if (/(experience|work|job|intern|role|career|banao|synapse|company)/.test(s)) {
    return {
      trace: ['get_experience()'],
      text:
        experience.map((j) => `• **${j.company}** (${j.period}): ${j.role}`).join('\n') +
        `\n• Plus **${internships.length} earlier internships** and **${simulations.length} job simulations**.`,
      jump: { label: 'See experience', view: 'experience' },
    }
  }
  if (/(achiev|award|proud|highlight|unlock)/.test(s)) {
    return {
      trace: ['get_achievements()'],
      text: achievements.slice(0, 5).map((a) => `• **${a.title}:** ${a.text}`).join('\n') + `\n• …and ${achievements.length - 5} more unlocked.`,
      jump: { label: 'See all achievements', view: 'achievements' },
    }
  }
  if (/\bage\b|how old|born|birth/.test(s)) {
    return {
      trace: ['get_age()'],
      text: `I'm **${ageYears().toFixed(2)} years old**, and the counter on my About page ticks live.`,
      jump: { label: 'See the live counter', view: 'about' },
    }
  }
  if (/(where|location|based|city|gps|ghaziabad)/.test(s)) {
    return {
      trace: ['get_location()'],
      text: `I'm based in **${profile.gps.place}** (${profile.gps.lat.toFixed(4)}°N, ${profile.gps.lon.toFixed(4)}°E). My About page can even tell you how far that is from you.`,
      jump: { label: 'Open the GPS card', view: 'about' },
    }
  }
  if (/(hobb|interest|esport|gaming|travel|\bfun\b|free time)/.test(s)) {
    return {
      trace: ['get_interests()'],
      text: offTheClock.map((o) => `• **${o.title}:** ${o.text}`).join('\n'),
      jump: { label: 'See off the clock', view: 'about' },
    }
  }
  if (/(why|hire|fit|strength|stand out|summary|who|about)/.test(s)) {
    return {
      trace: ['read_profile()', 'summarize()'],
      text:
        '• **Ships AI end to end:** Claude agents, RAG and the Angular/Node UI around them.\n' +
        '• **1+ year** owning all AI features at Accumax, now in pilot with 10 firms.\n' +
        '• **Strong ML base:** MCA in AI (CGPA 8.9/10) and 11 models built at SynapseHealthTech.',
      jump: { label: 'See the proof', view: 'experience' },
    }
  }
  return {
    trace: ['match_intent()'],
    text: "I'm a demo that matches keywords and answers from my resume. I'm not a live LLM. Try **experience**, **projects**, **skills**, **education** or **contact**.",
  }
}

const greeting =
  "Hi! Ask about Tushar's experience, projects or skills. This is a demo: it matches keywords and answers from his resume, with no live LLM."

export default function AskAgent({ go }: { go: (v: View) => void }) {
  const [reply, setReply] = useState<Reply | null>(null)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  function ask(raw: string) {
    const question = raw.trim()
    if (!question || busy) return

    const a = answer(question)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const step = reduce ? 0 : 380

    setReply({ ...a, question, shown: 0, ready: false })
    setInput('')
    setBusy(true)

    a.trace.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setReply((r) => r && { ...r, shown: i + 1 }), step * (i + 1)),
      )
    })
    timers.current.push(
      window.setTimeout(() => {
        setReply((r) => r && { ...r, ready: true })
        setBusy(false)
      }, step * (a.trace.length + 1)),
    )
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    ask(input)
  }

  return (
    <div className="my-auto space-y-4">
      {/* Only the latest exchange is shown, so this never needs a scrollbar */}
      <div className="min-h-[13rem] space-y-2 rounded-lg border border-line bg-bg p-4" aria-live="polite">
        {!reply ? (
          <p className="text-sm leading-relaxed text-muted sm:text-base">{greeting}</p>
        ) : (
          <>
            <p className="font-mono text-sm">
              <span className="text-warn">&gt;</span> {reply.question}
            </p>
            {reply.trace.slice(0, reply.shown).map((t) => (
              <p key={t} className="font-mono text-xs text-muted">
                <span className="text-accent">✓</span> {t}
              </p>
            ))}
            {!reply.ready && <p className="caret font-mono text-xs text-muted">running</p>}
            {reply.ready && (
              <>
                <p className="whitespace-pre-line pt-1 text-sm leading-relaxed text-muted sm:text-base">
                  <Rich text={reply.text} />
                </p>
                {reply.jump &&
                  (reply.jump.view ? (
                    <button
                      onClick={() => go(reply.jump!.view!)}
                      className="pt-1 font-mono text-sm font-semibold text-accent hover:underline"
                    >
                      → {reply.jump.label}
                    </button>
                  ) : (
                    <a
                      href={reply.jump.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block pt-1 font-mono text-sm font-semibold text-accent hover:underline"
                    >
                      → {reply.jump.label}
                    </a>
                  ))}
              </>
            )}
          </>
        )}
      </div>

      <ul className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <li key={c}>
            <button
              onClick={() => ask(c)}
              disabled={busy}
              className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {c}
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Ask the agent a question"
          placeholder='e.g. "what has he built with RAG?"'
          className="min-w-0 flex-1 rounded-md border border-line bg-bg px-3 py-2 font-mono text-sm placeholder:text-muted/70 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded-md bg-accent px-4 py-2 font-mono text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 dark:text-bg"
        >
          run
        </button>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { ageYears } from './utils'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Live age in years. Ticks 10x a second, or once a second for reduced-motion users. */
export function useAge(): number {
  const [age, setAge] = useState(() => ageYears())
  useEffect(() => {
    const id = window.setInterval(() => setAge(ageYears()), prefersReducedMotion() ? 1000 : 100)
    return () => window.clearInterval(id)
  }, [])
  return age
}

/** Cycles through a list on a timer. Stays on the first item for reduced-motion users. */
export function useCycle<T>(items: T[], ms: number): T {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), ms)
    return () => window.clearInterval(id)
  }, [items.length, ms])
  return items[i]
}

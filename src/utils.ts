import { profile } from './data'

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25

export function ageYears(now = Date.now()): number {
  return (now - new Date(profile.birthdate).getTime()) / MS_PER_YEAR
}

export function daysAlive(now = Date.now()): number {
  return Math.floor((now - new Date(profile.birthdate).getTime()) / 86_400_000)
}

/** Integer square root (Newton's method) for BigInt. */
export function isqrt(n: bigint): bigint {
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

/** Solves the phone-number puzzle on the Contact page. */
export function solvePhone(): string {
  const digits = isqrt(BigInt(profile.phoneSquared)).toString()
  return `+91-${digits.slice(0, 5)}-${digits.slice(5)}`
}

/** Decimal degrees to degrees-minutes-seconds, e.g. 28°40'09.1"N */
export function toDMS(value: number, positive: string, negative: string): string {
  const abs = Math.abs(value)
  const d = Math.floor(abs)
  const mFloat = (abs - d) * 60
  const m = Math.floor(mFloat)
  const s = (mFloat - m) * 60
  return `${d}°${String(m).padStart(2, '0')}'${s.toFixed(1).padStart(4, '0')}"${value >= 0 ? positive : negative}`
}

const rad = (deg: number) => (deg * Math.PI) / 180

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = rad(lat2 - lat1)
  const dLon = rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

/** Initial compass bearing from point 1 to point 2, in degrees. */
export function bearingDeg(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = rad(lon2 - lon1)
  const y = Math.sin(dLon) * Math.cos(rad(lat2))
  const x = Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(dLon)
  return (Math.atan2(y, x) * (180 / Math.PI) + 360) % 360
}

const POINTS = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west']
export function compass(deg: number): string {
  return POINTS[Math.round(deg / 45) % 8]
}

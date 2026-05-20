import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE_NAME = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

function b64urlEncode(buf: Buffer | string): string {
  const b = typeof buf === 'string' ? Buffer.from(buf) : buf
  return b.toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function b64urlDecode(s: string): Buffer {
  s = s.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return Buffer.from(s, 'base64')
}

function sign(payload: string, secret: string): string {
  return b64urlEncode(createHmac('sha256', secret).update(payload).digest())
}

export function verifyAdminPassword(submitted: string): boolean {
  const expected = useRuntimeConfig().adminPassword
  if (!expected) return false
  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  if (a.length !== b.length) {
    // Still spend the work to avoid timing leaks on length
    const pad = Buffer.alloc(Math.max(a.length, b.length))
    timingSafeEqual(pad, pad)
    return false
  }
  return timingSafeEqual(a, b)
}

export function createAdminSession(event: H3Event): void {
  const secret = useRuntimeConfig().adminSessionSecret
  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: 'ADMIN_SESSION_SECRET not configured' })
  }
  const now = Math.floor(Date.now() / 1000)
  const payload = b64urlEncode(JSON.stringify({ iat: now, exp: now + MAX_AGE_SECONDS }))
  const sig = sign(payload, secret)
  const value = `${payload}.${sig}`

  setCookie(event, COOKIE_NAME, value, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS
  })
}

export function clearAdminSession(event: H3Event): void {
  setCookie(event, COOKIE_NAME, '', {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
}

export function isAdminAuthenticated(event: H3Event): boolean {
  const secret = useRuntimeConfig().adminSessionSecret
  if (!secret) return false
  const raw = getCookie(event, COOKIE_NAME)
  if (!raw) return false
  const [payload, sig] = raw.split('.')
  if (!payload || !sig) return false

  const expected = sign(payload, secret)
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false

  try {
    const decoded = JSON.parse(b64urlDecode(payload).toString('utf-8')) as { iat: number; exp: number }
    if (typeof decoded.exp !== 'number') return false
    if (decoded.exp < Math.floor(Date.now() / 1000)) return false
    return true
  } catch {
    return false
  }
}

export function requireAdmin(event: H3Event): void {
  if (!isAdminAuthenticated(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

export function generateSessionSecret(): string {
  return randomBytes(32).toString('base64url')
}

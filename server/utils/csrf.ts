import { randomBytes, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE_NAME = 'csrf_token'
const HEADER_NAME = 'x-csrf-token'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

// Issue a fresh CSRF token cookie (readable by client JS — that's the point of
// the double-submit pattern: the client echoes it back as a header on mutating
// requests, which a cross-origin attacker can't do without breaking SOP).
export function issueCsrfToken(event: H3Event): string {
  const token = randomBytes(32).toString('base64url')
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: false,
    secure: !import.meta.dev,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS
  })
  return token
}

export function clearCsrfToken(event: H3Event): void {
  setCookie(event, COOKIE_NAME, '', {
    httpOnly: false,
    secure: !import.meta.dev,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
}

export function requireCsrf(event: H3Event): void {
  const cookie = getCookie(event, COOKIE_NAME)
  const header = getRequestHeader(event, HEADER_NAME)
  if (!cookie || !header) {
    throw createError({ statusCode: 403, statusMessage: 'Missing CSRF token' })
  }
  const a = Buffer.from(cookie)
  const b = Buffer.from(header)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid CSRF token' })
  }
}

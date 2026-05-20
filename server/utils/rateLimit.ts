import type { H3Event } from 'h3'

interface Bucket {
  tokens: number
  updatedAt: number
}

const buckets = new Map<string, Bucket>()

export interface RateLimitOptions {
  // Max requests allowed within the window.
  capacity: number
  // Window length in milliseconds — tokens refill linearly across this period.
  windowMs: number
  // Logical bucket name (so different endpoints don't share counters).
  key: string
}

function clientIp(event: H3Event): string {
  const fwd = getRequestHeader(event, 'x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim()
  const real = getRequestHeader(event, 'x-real-ip')
  if (real) return real.trim()
  return event.node.req.socket?.remoteAddress ?? 'unknown'
}

export function enforceRateLimit(event: H3Event, opts: RateLimitOptions): void {
  const ip = clientIp(event)
  const id = `${opts.key}:${ip}`
  const now = Date.now()
  const refillPerMs = opts.capacity / opts.windowMs

  const existing = buckets.get(id)
  let bucket: Bucket
  if (!existing) {
    bucket = { tokens: opts.capacity, updatedAt: now }
  } else {
    const elapsed = now - existing.updatedAt
    const refilled = Math.min(opts.capacity, existing.tokens + elapsed * refillPerMs)
    bucket = { tokens: refilled, updatedAt: now }
  }

  if (bucket.tokens < 1) {
    const retryMs = Math.ceil((1 - bucket.tokens) / refillPerMs)
    setResponseHeader(event, 'Retry-After', String(Math.ceil(retryMs / 1000)))
    buckets.set(id, bucket)
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  bucket.tokens -= 1
  buckets.set(id, bucket)
}

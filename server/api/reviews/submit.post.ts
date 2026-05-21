import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { useDb } from '../../db'
import { hashToken } from '../../utils/tokens'
import { enforceRateLimit } from '../../utils/rateLimit'
import { sanitizeComment, sanitizeName } from '../../utils/sanitize'

const BodySchema = z.object({
  token: z.string().min(1).max(256),
  name: z.string().trim().min(1).max(120),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1).max(1000)
})

interface InviteRow {
  id: string
  expires_at: number
  used_at: number | null
}

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, { key: 'reviews:submit', capacity: 5, windowMs: 60_000 })

  const body = await readBody(event)
  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid review submission',
      data: { issues: parsed.error.issues }
    })
  }

  const { token, rating } = parsed.data
  const name = sanitizeName(parsed.data.name)
  const comment = sanitizeComment(parsed.data.comment)
  if (!name || !comment) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid review submission' })
  }

  const db = useDb()
  const now = Date.now()
  const tokenHash = hashToken(token)

  const { data: invite, error: lookupErr } = await db
    .from('invites')
    .select('id, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle<InviteRow>()

  if (lookupErr) {
    console.error('[reviews/submit] lookup failed', lookupErr)
    throw createError({ statusCode: 500, statusMessage: 'Failed to load invite' })
  }
  if (!invite) {
    throw createError({ statusCode: 404, statusMessage: 'Invite not found' })
  }
  if (invite.used_at !== null) {
    throw createError({ statusCode: 409, statusMessage: 'Invite already used' })
  }
  if (invite.expires_at < now) {
    throw createError({ statusCode: 410, statusMessage: 'Invite expired' })
  }

  // Conditional update doubles as a single-use lock: only the request that
  // flips used_at from null to `now` is allowed to insert the review.
  const { data: claimed, error: claimErr } = await db
    .from('invites')
    .update({ used_at: now })
    .eq('id', invite.id)
    .is('used_at', null)
    .select('id')

  if (claimErr) {
    console.error('[reviews/submit] claim failed', claimErr)
    throw createError({ statusCode: 500, statusMessage: 'Failed to claim invite' })
  }
  if (!claimed || claimed.length !== 1) {
    throw createError({ statusCode: 409, statusMessage: 'Invite already used' })
  }

  const reviewId = randomUUID()
  const { error: insertErr } = await db.from('reviews').insert({
    id: reviewId,
    invite_id: invite.id,
    name,
    rating,
    comment,
    created_at: now,
    is_published: false
  })

  if (insertErr) {
    // Best-effort rollback of the invite claim so a retry can succeed.
    await db.from('invites').update({ used_at: null }).eq('id', invite.id)
    console.error('[reviews/submit] insert failed', insertErr)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save review' })
  }

  setResponseStatus(event, 201)
  return { ok: true, id: reviewId }
})
